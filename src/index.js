#! /usr/bin/env node

// 添加命令的库
const program = require('commander');
// 工具库
const { cleanArgs } = require('./utils/common');
// 常量
const { version } = require('./utils/constants');



program
  .version(`当前版本：${version}`)
  .description('欢迎使用「lg-umijs-cli」')

program
  .command('create <app-name>')
  .alias('c')
  .description('创建新项目')
  .option('-f, --force', '如果目录下已存在目标项目，则覆盖它')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    require('./create')(name, options)
  });


// 解析命令行参数
program.parse(process.argv);


