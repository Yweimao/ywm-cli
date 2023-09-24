import downloadGitRepo from "download-git-repo";
import { promisify } from "util";
import { wrapLoading } from "./loading.js";
import chalk from "chalk";
const download = promisify(downloadGitRepo);
/**
 *
 * @param repoUrl 模版仓库地址
 * @param targetDirectory 下载存储的地址
 * @param projectName 项目名字
 */
export const downloadProject = async (
  repoUrl,
  targetDirectory,
  projectName
) => {
  wrapLoading(
    `\r\n正在下载模板，请稍后...`,
    () => download(`direct:${repoUrl}`, targetDirectory, { clone: true }),
    `${chalk.black.bold("下载成功！执行以下命令打开并运行项目:")}
      \r\n  ${chalk.gray.bold(`cd ${projectName}`)}
      \r\n  ${chalk.gray.bold("pnpm install")}
      \r\n  ${chalk.gray.bold("npm run dev")}
      `
  );
};
