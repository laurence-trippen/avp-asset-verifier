import chalk from "chalk";
import inquirer from "inquirer";

import figletAsync from "./utils/figletAsync.js";
import { fileExists } from "./utils/fileUtil.js";
import { promptErrorHandler } from "./error/inquirerErrorHandler.js";
import checkFiles from "./cli/checkFiles.js";
import renameFiles from "./cli/renameFiles.js";
import checkIntegrity from "./cli/checkIntegrity.js";

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

  // TODO: Check og_files


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
      case chooseOperation.RENAME_FILES:
        renameFiles();
        break;
      case chooseOperation.CHECK_FILES:
        checkFiles();
        break;
      case chooseOperation.CHECK_INTEGRITY:
        checkIntegrity();
        break;
      case chooseOperation.EXIT:
        shouldRun = false;
      default:
        break;
    }
  }
};

main().catch(err => console.error(err));
