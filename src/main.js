import path from "path";
import fs from "fs/promises";

import chalk from "chalk";

import figletAsync from "./utils/figletAsync.js";
import { fileExists, fileExistsCaseSensitive } from "./utils/fileUtil.js";
import { parseVerificationFile } from "./core/verification.js";

const main = async () => {
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

  const inputDirectory = "og_files";

  const assets = parseVerificationFile();
  
  const filesToCheck = assets.map(asset => path.join(inputDirectory, asset.path));



  for (const file of filesToCheck) {
    const assetFileExists = await fileExists(file);

    if (assetFileExists) {
      // console.log(path.basename(file));
    }

    const coloredFileName = assetFileExists === true
      ? chalk.greenBright(file)
      : chalk.redBright(file);

    // console.log(coloredFileName);
  }


  const exists = await fileExistsCaseSensitive("og_files/avp_huds/queen.RIF");

  console.log(exists);
};

main();
