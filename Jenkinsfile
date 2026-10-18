@Library('deployment-library@main') _

// portofolio-event-music-fe — DEV (ns portofolio)
// NEXT_PUBLIC_* baked at build time from Vault `portofolio/portofolio-event-music-fe`;
// the same path feeds runtime secrets (NEXTAUTH_SECRET) via ESO (vaultRuntime in values). NodePort dev 31183.
deployPipelineVaultV2(
    gitRepository: 'https://github.com/enrichoalkalas01/portofolio-event-music-fe.git',
    gitBranch: 'master',
    gitCredentialsId: 'github-credentials',

    registryUrl: '192.168.20.21',
    registryCredentialsId: 'harbor-credentials',
    imageName: 'portofolio-event-music-fe',
    imageFolder: 'other',

    namespace: 'portofolio',
    helmValuesFile: 'values/values.dev.yml',
    servicePort: '31183',

    vaultMode: 'build',
    vaultSecretPath: 'portofolio/data/portofolio-event-music-fe',
    vaultAddr: 'http://192.168.20.16:30220',
)
