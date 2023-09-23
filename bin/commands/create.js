var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "path";
import inquirer from "inquirer";
import { existsSync, rmSync } from "fs";
import { wrapLoading } from "../utils/loading.js";
export default function (name, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取当前的工作目录
        const cwd = process.cwd();
        const targetDir = path.join(cwd, name);
        // 判断文件夹是否存在
        if (existsSync(targetDir)) {
            if (options.force) {
                rmSync(targetDir, { recursive: true }); //递归删除子文件夹
            }
            else {
                let { action } = yield inquirer.prompt([
                    {
                        name: "action",
                        type: "list",
                        message: "目录存在了是否覆盖",
                        choices: [
                            {
                                name: "overwrite",
                                value: "overwrite",
                            },
                            { name: "cancel", value: false },
                        ],
                    },
                ]);
                if (!action) {
                    return console.log("用户取消创建");
                }
                if (action === "overwrite") {
                    yield wrapLoading(`\r\nRemoving...`, () => rmSync(targetDir, { recursive: true }));
                }
            }
        }
    });
}
