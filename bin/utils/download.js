var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export const downloadProject = (repoUrl, targetDirectory, projectName) => __awaiter(void 0, void 0, void 0, function* () {
    wrapLoading(`\r\n正在下载模板，请稍后...`, () => download(`direct:${repoUrl}`, targetDirectory, { clone: true }), `${chalk.black.bold("下载成功！执行以下命令打开并运行项目:")}
      \r\n  ${chalk.gray.bold(`cd ${projectName}`)}
      \r\n  ${chalk.gray.bold("pnpm install")}
      \r\n  ${chalk.gray.bold("npm run dev")}
      `);
});
