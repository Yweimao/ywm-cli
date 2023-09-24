var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ora from "ora";
import chalk from "chalk";
export const wrapLoading = (message, fn, successMeaage) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora(message);
    spinner.start();
    try {
        const res = yield fn();
        spinner.succeed(`${chalk.gray.bold(`${successMeaage}`)}`);
        return res;
    }
    catch (error) {
        spinner.fail("Request failed, refetch ...");
    }
});
