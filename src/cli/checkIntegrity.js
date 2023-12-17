import path from "path";

import md5File from "md5-file";
import chalk from "chalk";

import { AVP_INPUT_DIRECTORY } from "../core/constants.js";
import { fileExists } from "../utils/fileUtil.js";
import { parseVerificationFile } from "../core/verificationTxt.js";

const checkIntegrity = async () => {
  const assets = parseVerificationFile();

  let matching = 0;
  let notMatching = 0;
  let notFound = 0;

  for (const asset of assets) {
    const file = path.join(AVP_INPUT_DIRECTORY, asset.path);
    const exists = await fileExists(file);

    if (exists) {
      const hash = await md5File(file);
      const isMatching = hash === asset.md5;

      if (isMatching)
        matching += 1;
      else
        notMatching += 1;

      const coloredMessage = isMatching === true
        ? chalk.greenBright(file)
        : chalk.yellow(file);

      console.log(coloredMessage);
    } else {
      console.log(chalk.redBright(file));

      notFound += 1;
    }
  }

  const matchingString = chalk.bgGreen(` Matching ${matching}x `);
  const notMatchingString = chalk.bgYellow(` Not Matching ${notMatching}x `);
  const notFoundString = chalk.bgRed(` Not Found ${notFound}x `);

  console.log(`\nResult: ${matchingString} ${notMatchingString} ${notFoundString}\n`);
};

export default checkIntegrity;
