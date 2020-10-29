const logSymbols = require('log-symbols');
const fs = require('fs');
const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const ora = require('ora'); // 进度显示工具
const chalk = require('chalk'); // 颜色显示工具

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

function createDir(appName) {
  return new Promise((resolve, reject) => {
    fs.mkdir(`./${appName}`, function (err) {
      if (err) {
        reject();
      } else {
        resolve();
      }
    })
  })
}

async function clone(remote, appName, options = { clone: true }) {
  const process = ora(`开始下载项目模板 ${chalk.blue(remote)}`);
  process.start();
  process.color = 'yellow';
  process.text = `正在下载项目模板... ${chalk.yellow(remote)}`;
  download(remote, appName, options, (err) => {
    if (err) {
      process.color = "red";
      process.text = `项目模板下载失败 ${chalk.green(remote)}`;
      process.fail();
    } else {
      process.color = "green";
      process.text = `项目模板下载成功 ${chalk.green(remote)}`;
      process.succeed();
    }
  })
}
module.exports = {
  cleanArgs,
  createDir,
  clone
}