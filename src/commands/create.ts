import path from "path";
import inquirer from "inquirer";
import { existsSync, rmSync } from "fs";
import { wrapLoading } from "../utils/loading.js";
import { downloadProject } from "../utils/download.js";

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

  // 1.拉取项目模板
  let { projectType } = await inquirer.prompt([
    {
      name: "projectType",
      type: "list",
      message: "请选择项目模版",
      choices: [
        { name: "vue2-template", value: "vue2" },
        { name: "vue3-template", value: "vue3" },
        { name: "react-template", value: "react" },
      ],
    },
  ]);
  const repoUrl = "https://github.com/Yweimao/vite-flow.git#main";
  // 下载项目模版
  await downloadProject(repoUrl, targetDir, name);
}
