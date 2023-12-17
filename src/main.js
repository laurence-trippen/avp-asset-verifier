import chalk from "chalk";
import inquirer from "inquirer";

import figletAsync from "./utils/figletAsync.js";
import { fileExists } from "./utils/fileUtil.js";
import { promptErrorHandler } from "./error/inquirerErrorHandler.js";
import checkFiles from "./cli/checkFiles.js";
import renameFiles from "./cli/renameFiles.js";
import checkIntegrity from "./cli/checkIntegrity.js";
import { checkOgFiles } from "./core/ogFiles.js";

const main = async () => {
  let shouldRun = true;

  const title = await figletAsync("AvP Asset Verifier");
  console.log(chalk.yellow(title));
  console.log(chalk.bgYellow(" Weyland-Yutani Corp. \n"));

  const verificationTxtExists = await fileExists('verification.txt');

  if (verificationTxtExists) {
    console.log(chalk.green("[SUCCESS]\tverification.txt found."));
  } else {
    console.log(chalk.red("[FAILURE]\tverifcation.txt not found!"));
    process.exit(1);
  }

  console.log("\n");
  console.log("Workdir", chalk.yellow(process.cwd()), "\n");

  await checkOgFiles();

  while (shouldRun) {
    const operationOptions = {
      RENAME_FILES: "Rename Files",
      CHECK_FILES: "Check Files",
      CHECK_INTEGRITY: "Check Integrity",
      EXIT: "Exit",
    };

    const { chooseOperation } = await inquirer
      .prompt({
        name: "chooseOperation",
        type: "list",
        message: "Choose an operation:\n",
        choices: [...Object.values(operationOptions)],
      })
      .catch(promptErrorHandler);

    switch (chooseOperation) {
      case operationOptions.RENAME_FILES:
        renameFiles();
        break;
      case operationOptions.CHECK_FILES:
        await checkFiles();
        break;
      case operationOptions.CHECK_INTEGRITY:
        checkIntegrity();
        break;
      case operationOptions.EXIT:
        shouldRun = false;
      default:
        break;
    }
  }

  console.log("\nWey-Yu wishes a safe day!");
  process.exit(0);
};

main().catch(err => console.error(err));
