# 全局安装
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm i -g  typescript eslint ts-node nodemon mocha chai

# 局部安装dev
cnpm i --save-dev typescript eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
cnpm i --save-dev @types/cheerio
cnpm i --save-dev @types/download
cnpm i --save-dev @types/node  @types/mocha @types/chai 
cnpm i --save-dev @types/koa @types/koa-router @types/koa-bodyparser

# 局部安装
cnpm i --save mocha chai
cnpm i --save cheerio
cnpm i --save koa koa-router koa-bodyparser
cnpm i --save download


# npm操作
npm publish
npm view <pack>
npm view <pack> versions
npm outdated
npm udpate <pack>
npm ls
npm ls --depth=0
npm rm
npm root /or -g 查看目录 

## 插件 npm-check-update
ncu -h
ncu -u = overwrite package.json

## npm更新
npm i npm@latest -g
npm -v


## bilyFash
npm i --save request
npm i --save @alicloud/pop-core
npm i --save nodejieba
