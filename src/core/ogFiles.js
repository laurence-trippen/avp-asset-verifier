import chalk from "chalk";

import { AVP_INPUT_DIRECTORY } from "./constants.js";
import { fileExistsCaseSensitive } from "../utils/fileUtil.js";

export const checkOgFiles = async () => {
  const workdir = process.cwd();

  const avpPath = chalk.yellow(chalk.underline(`${workdir}/${AVP_INPUT_DIRECTORY}`));

  const [
    ogFilesExists,
    avpHudsExists,
    avpRifsExists,
    fastfileExists,
  ] = await Promise.all([
    fileExistsCaseSensitive(AVP_INPUT_DIRECTORY),
    fileExistsCaseSensitive(`${AVP_INPUT_DIRECTORY}/avp_huds`),
    fileExistsCaseSensitive(`${AVP_INPUT_DIRECTORY}/avp_rifs`),
    fileExistsCaseSensitive(`${AVP_INPUT_DIRECTORY}/fastfile`),
  ]);

  const printExists = (existsFlag) => existsFlag === true
    ? chalk.green('[FOLDER FOUND]')
    : chalk.red('[FOLDER NOT FOUND]');

  console.log(`Place assets inside ${avpPath} like this:`);
  console.log(`
  ${AVP_INPUT_DIRECTORY}\t  ${printExists(ogFilesExists)}
    ├── avp_huds/ ${printExists(avpHudsExists)}
    ├── avp_rifs/ ${printExists(avpRifsExists)}
    └── fastfile/ ${printExists(fastfileExists)}
  `);
};