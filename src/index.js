#! /usr/bin/env node

// 添加命令的库
const program = require('commander');
// 工具库
const { cleanArgs } = require('../utils');


program
  .version(`当前版本：${require('../package.json').version}`)
  .description('Hello，我是耀哥，欢迎使用「lg-umijs-cli」')
  .usage('<command> [options]');

program
  .command('create <app-name>')
  .description('创建项目')
  .option('-f, --force', '如果目录下已存在目标项目，则覆盖它')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    require('../lib/create')(name, options)
  });

// 解析命令行参数
program.parse(process.argv);


