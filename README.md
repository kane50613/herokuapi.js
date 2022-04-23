# Heroku.js

Unofficial heroku api wrapper for NodeJS

### 📦 Install

```shell
npm i heroku.js
```

### 📖 Usage 

- commonjs
    ```js 
    const {getAccount} = require("heroku.js")
    
    const account = await getAccount(process.env.HEROKU_API_KEY)
    ```

- mjs
    ```ts 
    import { getAccount } from "heroku.js";
    
    const account = await getAccount(process.env.HEROKU_API_KEY)
    ```

### ❤️  Contribute

feel free to make a pull request or join our [Discord Server](https://discord.gg/yeecord)