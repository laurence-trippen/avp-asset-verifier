import chalk from "chalk";

import figletAsync from "./utils/figletAsync.js";
import { fileExists } from "./utils/fileUtil.js";
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

  const assets = parseVerificationFile();
  assets.forEach(asset => console.log(asset, asset.fileName));
};

main();
