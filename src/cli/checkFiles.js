import fs from "fs/promises";
import path from "path";

import chalk from "chalk";
import md5File from "md5-file";

import { AVP_INPUT_DIRECTORY } from "../core/constants.js";
import { parseVerificationFile } from "../core/verificationTxt.js";
import { fileExists, fileExistsCaseSensitive } from "../utils/fileUtil.js";

const checkFiles = async () => {
  const assets = parseVerificationFile();
  
  for (const asset of assets) {
    const file = path.join(AVP_INPUT_DIRECTORY, asset.path);

    const assetFileExistsSensitive = await fileExistsCaseSensitive(file);

    if (assetFileExistsSensitive) {
      const hash = await md5File(file);
      const matching = hash === asset.md5;

      console.log(`${file} => ${hash} (${matching ? "Matching" : "Not Matching"})`);
    } else {
      const existsInsensitve = await fileExists(file);

      if (existsInsensitve) {
        const realPath = await fs.realpath(file);
        // console.log(realPath);
        // console.log(path.basename(realPath));
      }
    }

    const coloredFileName = assetFileExistsSensitive === true
      ? chalk.greenBright(file)
      : chalk.redBright(file);

    // console.log(coloredFileName);
  }
};

export default checkFiles;
