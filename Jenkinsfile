@Library('deployment-library@main') _

// portofolio-event-music-fe — PROD (ns portofolio)
// NEXT_PUBLIC_* baked at build time from Vault endless-creative-corps/portofolio-event-music-fe
// (build-arg allowlist in Dockerfile); NEXTAUTH_* injected at runtime from the same path via ESO.
// Served at https://endlessapp.my.id/ (ingress nginx-endlessapp).
deployPipelineVaultBuildEso(
    gitRepository: 'https://github.com/enrichoalkalas01/portofolio-event-music-fe.git',
    gitBranch: 'master',
    gitCredentialsId: 'github-credentials',

    registryUrl: '192.168.20.21',
    registryCredentialsId: 'harbor-credentials',
    imageName: 'portofolio-event-music-fe',
    imageFolder: 'other',

    namespace: 'portofolio',
    helmValuesFile: 'values/values.production.yml',
    servicePort: '30802',

    vaultBuildPath: 'endless-creative-corps/data/portofolio-event-music-fe',
    vaultAddr: 'http://192.168.20.16:30220',

    vaultRuntimePath: 'portofolio-event-music-fe',
    vaultRuntimeStoreName: 'vault-backend-endless',
    vaultRuntimeRefreshInterval: '1m',
)
