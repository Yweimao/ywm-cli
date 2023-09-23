import path from "path";
import inquirer from "inquirer";
import { existsSync, rmSync } from "fs";
import { wrapLoading } from "../utils/loading.js";
export default async function (name, options) {
  // 获取当前的工作目录
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);

  // 判断文件夹是否存在
  if (existsSync(targetDir)) {
    if (options.force) {
      rmSync(targetDir, { recursive: true }); //递归删除子文件夹
    } else {
      let { action } = await inquirer.prompt([
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
        await wrapLoading(`\r\nRemoving...`, () =>
          rmSync(targetDir, { recursive: true })
        );
      }
    }
  }
}
