const fsextra = require('fs-extra');
const path = require('path');
const logSymbols = require('log-symbols'); // 着色符号
const inquirer = require('inquirer'); // 命令行交互工具
const { createDir, clone } = require('../utils');
const remote = 'github:LiHongyao/umijs-template#main'



const existsChoices = [{
  name: 'action',
  type: 'list',
  message: '当前目录下已存在该项目，请选择操作项：',
  choices: [
    { name: '替换已有项目', value: 'overwrite' },
    { name: '取消创建', value: false }
  ]
}]

async function create(appName, options) {
  // 获取当前命令执行时的工作目录
  const cwd = process.cwd();
  // 创建目标目录
  const targetDir = path.join(cwd, appName);
  // 判断目标目录是否已存在
  if (fsextra.existsSync(targetDir)) {
    // 如果强制创建（调用create命令是携带了-f参数）则删除已有目录
    if (options.force) {
      await fsextra.remove(targetDir);
      await createDir(appName);
      clone(remote, appName)
    } else {
      // 弹框提示用户选择后续操作
      let { action } = await inquirer.prompt(existsChoices);
      if (!action) {
        console.log(logSymbols.info, '用户取消创建');
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





module.exports = create;