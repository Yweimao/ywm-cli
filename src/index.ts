#! /usr/bin/env node

import { program } from "commander";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
// 获取绝对路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
// 获取package.json中的信息
const pkg = require(join(__dirname, "../package.json"));

//输出版本号信息的命令
program.version(`tree-cli@${pkg.version}`).usage("<command> [options]");

// 1.通过脚手架来创建一个项目 create（拉取仓库的模板）
// 2.配置拉取的信息，配置系统文件 config
program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, vale) => {
    console.log(name, vale);
  });

program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>", "set option value")
  .option("-d, --delete <path>", "delete option from config")
  .action((name, vale) => {
    console.log(name, vale);
  });

program.addHelpText(
  "after",
  `${chalk.blueBright(
    "my-cli <command> --help"
  )} for detailed usage of given command`
);

// 解析用户传递的参数
program.parse(process.argv); //直接解析用户参数 --help是自带的参数
