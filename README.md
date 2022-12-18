# setup-bds

This action allows you to setup a BDS server. Here's an example workflow:

```yml
name: 'setup-bds'
on:
  push:
    branches:
      - main

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: setup-bds@v1
        with:
          # For these two options, see https://github.com/Bedrock-OSS/BDS-Versions/blob/main/versions.json
          BDS_VERSION: latest # This is an alias for the most up to date version, you can use exact versions
          BDS_CHANNEL: preview # The channel is either stable, or preview

          EULA_ACCEPT: true # You must accept the EULA to download
          PP_ACCEPT: true # and the privacy policy too!
```
