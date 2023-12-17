import path from "path";
import fs from "fs/promises";

import chalk from "chalk";
import inquirer from "inquirer";

import { parseVerificationFile } from "../core/verificationTxt.js";
import { AVP_INPUT_DIRECTORY } from "../core/constants.js";
import { fileExists, fileExistsCaseSensitive } from "../utils/fileUtil.js";
import { promptErrorHandler } from "../error/inquirerErrorHandler.js";

/**
 * 
 * @param {Array} autoFixableFiles 
 */
const fixFiles = async (autoFixableFiles) => {
  for (const fixableFile of autoFixableFiles) {
    const newFileName = path.basename(fixableFile).toLowerCase();
    const absoluteFolderPath = await fs.realpath(path.dirname(fixableFile));

    const oldPath = await fs.realpath(fixableFile);
    const newPath = path.join(absoluteFolderPath, newFileName)

    await fs.rename(oldPath, newPath);

    console.log(`${chalk.green(newPath)}`);
  }

  console.log("Done!");
};


const renameFiles = async () => {
  const assets = parseVerificationFile();

  const okFiles = [];
  const autoFixableFiles = [];
  const missingFiles = [];

  for (const asset of assets) {
    const file = path.join(AVP_INPUT_DIRECTORY, asset.path);

    const assetFileExistsSensitive = await fileExistsCaseSensitive(file);

    // Wrong means containing uppercased chars in 
    // name and not all lower-cased as it should be...
    const existsButWrongName = assetFileExistsSensitive === false
      ? await fileExists(file)
      : false;

    if (assetFileExistsSensitive) {
      okFiles.push(file);
    } else if (existsButWrongName) {
      autoFixableFiles.push(file);
    } else if (!existsButWrongName) {
      missingFiles.push(file);
    }
  }

  console.log("--- CORRECT FILE NAMES ---");
  console.log("These files are okay, don't forget to check the MD5s.\n");
  okFiles.forEach(file => console.log(chalk.green(file)));
  console.log("\n");

  console.log("--- MISSING FILES ---");
  console.log("Add these missing files\n");
  missingFiles.forEach(file => console.log(chalk.redBright(file)));
  console.log("\n");

  console.log("--- AUTO FIXABLE FILES ---");
  console.log("These files can be renamed automagicly\n");

  for (const fixableFile of autoFixableFiles) {
    const newFileName = path.basename(fixableFile).toLowerCase();
    const realPath = await fs.realpath(fixableFile);

    console.log(`${chalk.yellow(realPath)} => ${newFileName}`);
  }

  console.log("");

  const { shouldFixFiles } = await inquirer
    .prompt({
      name: "shouldFixFiles",
      type: 'confirm', 
      message: "Do you want to rename these files now?"
    })
    .catch(promptErrorHandler);

  if (!shouldFixFiles) return;

  await fixFiles(autoFixableFiles);
};

export default renameFiles;
