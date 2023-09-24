import ora from "ora";
import chalk from "chalk";
export const wrapLoading = async (message, fn, successMeaage?) => {
  const spinner = ora(message);
  spinner.start();
  try {
    const res = await fn();
    spinner.succeed(`${chalk.gray.bold(`${successMeaage}`)}`);
    return res;
  } catch (error) {
    spinner.fail("Request failed, refetch ...");
  }
};
