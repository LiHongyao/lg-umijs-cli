/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-21 17:05:02
 * @LastEditTime: 2021-01-24 02:08:09
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /lg-umijs-cli/src/create.js
 */
const fs = require("fs");
const path = require("path");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { overrideDir, clone } = require("./utils/common");

// 项目模板选择
const templateChoices = [
  {
    name: "template",
    type: "list",
    message: "请选择您要创建的项目模板类型：",
    choices: [
      { name: "H5", value: "H5" },
      { name: "MP", value: "MP" },
      { name: "ADMIN", value: "ADMIN" },
      { name: "KS-APP", value: "KS-APP" },
    ],
  },
];
// 文件存在处理方式
const existsChoices = [
  {
    name: "action",
    type: "list",
    message: "当前目录下已存在该项目，请选择操作项：",
    choices: [
      { name: "替换已有项目", value: true },
      { name: "取消创建", value: false },
    ],
  },
];

async function create(appName, options) {
  // 输出问候语句
  console.log(
    logSymbols.info,
    chalk.bold.whiteBright.bgBlack(
      "Hello，我是耀哥，欢迎使用「lg-umijs-cli」脚手架!!!"
    )
  );
  // 模板选择
  const { template } = await inquirer.prompt(templateChoices);
  // 根据用户选择的模板类型赋值git仓库地址
  let remote = "";
  // direct:https://URI 的形式克隆避免 “git clone' failed with status 128”
  switch (template) {
    case "H5":
      remote =
        "direct:https://github.com/LiHongyao/umijs-template__h5.git#main";
      break;
    case "MP":
      remote =
        "direct:https://github.com/LiHongyao/umijs-template__mp.git#main";
      break;
    case "ADMIN":
      remote =
        "direct:https://github.com/LiHongyao/umijs-template__admin.git#master";
      break;
    case "KS-APP":
      remote =
        "direct:https://github.com/LiHongyao/ks-app-template.git#master";
      break;
  }
  // 获取当前命令执行时的工作目录
  const cwd = process.cwd();
  // 创建目标目录
  const targetDir = path.join(cwd, appName);
  // 检查目标目录是否已存在
  const exist = await fs.existsSync(targetDir);
  if (exist) {
    // 目标目录存在
    // 判断是否强制删除并创建目录
    if (options.force) {
      overrideDir(targetDir, appName);
      clone(remote, appName);
    } else {
      let { action } = await inquirer.prompt(existsChoices);
      if (action) {
        overrideDir(targetDir, appName);
        clone(remote, appName);
      } else {
        console.log(
          logSymbols.info,
          chalk.bold.grey("您已取消项目创建，程序终止。")
        );
        process.exit(1);
      }
    }
  } else {
    // 目标目录不存在
    fs.mkdirSync(`./${appName}`);
    console.log(logSymbols.success, chalk.bold.green("目标目录已创建"));
    clone(remote, appName);
  }
}

module.exports = create;
