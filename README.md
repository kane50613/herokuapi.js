# Heroku-API-Client

Unofficial heroku api wrapper for NodeJS

### 📦 Install

```shell
npm i heroku-api-client
```

### 📖 Usage 

commonjs
```js 
const {getAccount} = require("heroku-api-client")

const account = await getAccount(process.env.HEROKU_API_KEY)
```

mjs
commonjs
```ts 
import { getAccount } from "heroku-api-client";

const account = await getAccount(process.env.HEROKU_API_KEY)
```

### ❤️  Contribute

feel free to make a pull request or join our [Discord Server](https://discord.gg/yeecord)