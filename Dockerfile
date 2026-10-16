# Stage 1: dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat && npm install -g pnpm@10.33.0

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: build
FROM node:20-alpine AS builder
RUN npm install -g pnpm@10.33.0
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* are inlined into the JS bundle, so they must exist at build time.
# Jenkins (deployPipelineVaultV2, vaultMode 'build') passes the Vault path as a
# BuildKit secret `vault_secrets` (KEY=value lines); without BuildKit it falls back
# to --build-arg, picked up by the ARGs below. Only public keys are exported, so
# runtime secrets such as NEXTAUTH_SECRET never reach the build or the image.
ARG NEXT_PUBLIC_URL_API
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_IMAGE_BASE_URL

RUN --mount=type=secret,id=vault_secrets,required=false \
    if [ -f /run/secrets/vault_secrets ]; then \
        while IFS='=' read -r key value || [ -n "$key" ]; do \
            case "$key" in NEXT_PUBLIC_*) export "$key=$value" ;; esac; \
        done < /run/secrets/vault_secrets; \
    fi; \
    echo "NEXT_PUBLIC_URL_API=${NEXT_PUBLIC_URL_API}"; \
    pnpm build

# Stage 3: runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME="0.0.0.0" \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# NEXTAUTH_URL and NEXTAUTH_SECRET are injected at runtime (values env + ESO secret).
CMD ["node", "node_modules/next/dist/bin/next", "start"]
