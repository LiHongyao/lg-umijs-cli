# # 前言

为提升前端开发效率，减少不必要的配置项目环境的时间，特开发 `lg-umijs-cli` 脚手架供产研中心前端组的小伙伴使用。框架模板基于umijs + typescript 实现，内置常用的工具函数、api请求、dva、移动端适配、H5与原生交互、全局样式等功能。下面例举框架技术栈的一些参照地址，仅供参考：

模板地址：https://github.com/LiHongyao/umijs-template

# # 安装模板

```shell
# 切换至桌面
$ cd Desktop
# 创建项目
$ npx lg-umijs-cli create my-project
# 切换至项目目录
$ cd my-project
# 安装项目依赖
$ npm install
# 启动项目
$ npm run start
# 打测试环境包
$ npm run test
# 打正式环境包
$ npm run build
```

# # 关于 lg-umijs-cli

## 1. 引用的三方库

- chalk：终端输出字体颜色
- commander：命令行交互（参数解析）
- download-git-repo：拉取git模板
- fs-extra：fs操作拓展
- inquirer：交互式命令行工具（命令行选择功能）（https://www.npmjs.com/package/inquirer）
- log-symbols：日志输出
- ora：图标（loading、success、warning...）
- validate-npm-package-name：检验npm名字取的对不对
- update-notifier：cli 更新后续可以加上

## 2. 链接指令

- npm link
- npm unlink

## 3. 更新包
```
npm version <update_type>
```
update_type 有三个参数：
- patch：补丁
- minor：小版本
- major：大版本
具体咋用：

1. 比如我想来个1.0.1版本，注意，是最后一位修改了增1，那么命令：npm version patch，回车就可以了；
2. 比如我想来个1.1.0版本，注意，是第二位修改了增1，那么命令：npm version minor，回车就可以了；
3. 比如我想来个2.0.0版本，注意，是第一位修改了增1，那么命令：npm version major，回车就可以了；

升级版本后还需要publish发布