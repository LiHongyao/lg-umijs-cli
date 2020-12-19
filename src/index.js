#! /usr/bin/env node
const program = require("commander");
const create = require("./create");
const { cleanArgs } = require("./utils/common");
const { version, name } = require("./utils/constants");

// 1. 版本提示
program.version(`当前版本：${version}`).description(`欢迎使用「${name}」`);

// 2. 创建项目命令
program
  .command("create <app-name>")
  .alias("c")
  .description("创建新项目")
  .option("-f, --force", "如果目录下已存在目标项目，则覆盖它")
  .action((name, cmd) => {
    create(name, cleanArgs(cmd));
  });

// 3. 解析命令行参数
program.parse(process.argv);

