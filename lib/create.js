const fsextra = require('fs-extra');
const fs = require('fs');
const path = require('path');
// 颜色显示工具
const chalk = require('chalk');
const symbols = require('log-symbols');
const { promisify } = require('util');
// 命令行交互工具
const inquirer = require('inquirer');
// 进度显示工具
const ora = require('ora');
// 下载git 仓库代码工具
const download = require('download-git-repo');


const remote = 'github:LiHongyao/umijs-template#main'


async function create(appName, options) {
  const cwd = process.cwd(); // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, appName); // 目标目录
  // 判断是否已经存在该目录
  if (fsextra.existsSync(targetDir)) {
    // 如果强制创建/删除已有的
    if (options.force) {
      await fsextra.remove(targetDir);
      await createDir(appName);
      clone(remote, appName)
    } else {
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '当前目录已存在该项目，请选择如下操作：',
          choices: [
            { name: '替换已有项目', value: 'overwrite' },
            { name: '取消创建', value: false }
          ]
        }
      ]);
      if (!action) {
        console.log('取消操作')
      } else if (action === 'overwrite') {
        console.log(`Removing....`);
        await fsextra.remove(targetDir)
        await createDir(appName)
        clone(remote, appName)
      }
    }
  } else {
    await createDir(appName)
    clone(remote, appName)
  }
}


function createDir(appName) {
  fs.mkdir(`./${appName}`, function (err) {
    if (err) {
      // console.log('创建失败')
    } else {
      // console.log('创建成功')
    }
  })
}

async function clone(remote, appName, options = { clone: true }) {


  const process = ora(`开始下载 ${chalk.blue(remote)}`);
  process.start();
  process.color = 'yellow';
  process.text = `正在下载... ${chalk.yellow(remote)}`;
  download(remote, appName, options, (err) => {
    if (err) {
      process.color = "red";
      process.text = `下载失败 ${chalk.green(remote)}`;
      process.fail();
    } else {
      process.color = "green";
      process.text = `下载成功 ${chalk.green(remote)}`;
      process.succeed();
    }
  })



}
module.exports = (...args) => {
  return create(...args);
}