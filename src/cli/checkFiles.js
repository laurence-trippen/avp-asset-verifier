import path from "path";

import chalk from "chalk";

import { AVP_INPUT_DIRECTORY } from "../core/constants.js";
import { parseVerificationFile } from "../core/verificationTxt.js";
import { fileExists, fileExistsCaseSensitive } from "../utils/fileUtil.js";

const checkFiles = async () => {
  const assets = parseVerificationFile();
  
  let found = 0;
  let wrongName = 0;
  let notFound = 0;

  for (const asset of assets) {
    const file = path.join(AVP_INPUT_DIRECTORY, asset.path);

    const assetFileExistsSensitive = await fileExistsCaseSensitive(file);

    const existsButWrongName = assetFileExistsSensitive === false
      ? await fileExists(file)
      : false;

    const coloredFileName = assetFileExistsSensitive === true
      ? chalk.greenBright(file)
      : existsButWrongName 
        ? chalk.yellow(file) 
        : chalk.redBright(file);

    // Counter
    if (assetFileExistsSensitive) {
      found += 1;
    } else if (!assetFileExistsSensitive && existsButWrongName) {
      wrongName += 1;
    } else if (!assetFileExistsSensitive && !existsButWrongName) {
      notFound += 1;
    }

    console.log(coloredFileName);
  }

  const existsString = chalk.bgGreen(` Exists ${found}x `);
  const wrongNameString = chalk.bgYellow(` Wrong Name ${wrongName}x `);
  const notFoundString = chalk.bgRed(` Not Found ${notFound}x `);

  console.log(`\nResult: ${existsString} ${wrongNameString} ${notFoundString}\n`);
};

export default checkFiles;
