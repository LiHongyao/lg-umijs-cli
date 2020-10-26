#! /usr/bin/env node

// 添加命令的库
const program = require('commander');


program
  .version(`Version is ${require('../package.json').version}`)
  .description('lg-cli 帮助指南')
  .usage('<command> [options]');

program
  .command('create <app-name>')
  .description('创建新项目')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('-c, --clone', 'Use git clone when fetching remote preset')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    require('../lib/create')(name, options)
  });

// 解析命令行参数
program.parse(process.argv);

// 工具函数
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
