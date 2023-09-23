import ora from "ora";
export const wrapLoading = async (message, fn) => {
  const spinner = ora(message);
  spinner.start();
  try {
    const res = await fn();
    spinner.succeed();
    return res;
  } catch (error) {
    spinner.fail("Request failed, refetch ...");
  }
};
