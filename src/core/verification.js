import fs from "fs";

import AVPAssetFile from "../model/AVPAssetFile.js";


/**
 * Parses line into object.
 * 
 * @param {string} line 
 * @returns {AVPAssetFile}
 */
const parseLine = (line) => {
  const md5 = line.substring(line.indexOf("=")).replace("= ", "");
  const path = line.substring(line.indexOf("(") + 1, line.indexOf(")"));

  return new AVPAssetFile(path, md5);
};


/**
 * 
 * @returns {AVPAssetFile[]}
 */
export const parseVerificationFile = () => {
  let data = null;

  try {
    data = fs.readFileSync("verification.txt", "utf-8");
  } catch (err) {
    console.error("Reading verfication file failed!");
    console.error(err);
    process.exit(2);
  }

  if (data == null) {
    console.error("Invalid data!");
    process.exit(3);
  }

  // data must be set at this point

  const lines = data.split("\n");

  const assets = lines.map((line) => parseLine(line));
  
  return assets;
};
