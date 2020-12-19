const fs = require("fs");
const logSymbols = require("log-symbols");
const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
const ora = require("ora");
const chalk = require("chalk");

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ""));
    if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
      args[key] = cmd[key];
    }
  });
  return args;
}

function deleteFolderRecursive(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.readdirSync(filePath).forEach(function (file) {
    var curPath = filePath + "/" + file;
    if (fs.statSync(curPath).isDirectory()) {
      // recurse
      deleteFolderRecursive(curPath);
    } else {
      // delete file
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(filePath);
}

function overrideDir(targetDir, appName) {
  deleteFolderRecursive(targetDir);
  console.log(logSymbols.success, chalk.bold.green("原有目标目录已移除"));
  fs.mkdirSync(`./${appName}`);
  console.log(logSymbols.success, chalk.bold.green("目标目录已创建"));
}

async function clone(remote, appName, options = { clone: true }) {
  const spinner = ora(chalk.bold.blue("正在下载项目模板... "));
  spinner.start();
  download(remote, appName, options, (err) => {
    if (err) {
      spinner.text = chalk.bold.red("项目模板下载失败");
      spinner.fail();
      process.exit(1);
    } else {
      spinner.color = "green";
      spinner.text = chalk.bold.green("项目模板下载成功");
      spinner.succeed();
      console.log(
        logSymbols.info,
        chalk.bold.whiteBright.bgBlack("程序不是年轻的专利，但是，他属于年轻。加油吧，骚年！")
      );
      process.exit(1);
    }
  });
}
module.exports = {
  cleanArgs,
  clone,
  overrideDir,
};
