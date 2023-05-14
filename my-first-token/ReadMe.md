# Quick start developing with TIP-3

Following the step by step guide here:
https://docs.venom.foundation/build/development-guides/how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3

> ## NOTE that the issue with the guide above is it fails to tell you to install tip3

## Initialize Project

```bash
npx locklift init --path my-first-token
npm i tip3
```

> "my-first-token" is basically the root folder name or project name

- Add TIP-3 implementation repository as a **_devDependencies_** in the corresponding section of package.json file;

```json
{
  "devDependencies": {
    "tip3": "git://github.com/broxus/tip3#v5",
    ...
  },
}
```

## Compile Project

- ### In the locklift.config.ts,

  - add the following code to the compiler code block;

  ```ts
  compiler: {
      ...
      externalContracts: {
      "node_modules/tip3/build": ["TokenRoot", "TokenWallet"],
      },
  }
  ```

  - also add **// @ts-ignore** just above **import { FactorySource } from "./build/factorySource";** if it raises an error to hold until you run the docker snippet below.

- Compile your contracts and make sure that artifacts were created

```bash
npx locklift build
```

## Deploy Project

- We can deploy a new token to local network. For this, make sure the local node is running, if not, follow the next command;

```bash
docker run -d --name local-node -e USER_AGREEMENT=yes -p80:80 tonlabs/local-node
```

<!-- Digest: sha256:1dfe3ad0118d8c3ab4ea2291b13bf7d76f243c536a562c1a546b7b143c5157e2
Status: Downloaded newer image for tonlabs/local-node:latest
9635ddb3f02ffcc99db57369ee9573ff2f827924915b0b61c02e57d969d3ffbf -->

- Now deploy;

```bash
npx locklift run -s ./scripts/01-deploy-token.ts -n local
```

<!-- First Venom Token: 0:15e849aa6e950a380b868b679d32fba11808cf9b6ad869488591176ce7e1db47 -->
