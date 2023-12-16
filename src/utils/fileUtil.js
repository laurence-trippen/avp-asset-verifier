import fs, { constants } from "fs/promises";
import path from "path";

/**
 * 
 * @param {string} path 
 * @returns 
 */
export const fileExists = (path) => {
  return new Promise((resolve) => {
    fs.access(path, constants.F_OK).then((error) => {
      resolve(true);
    }).catch(() => {
      resolve(false);
    });
  });
};

/**
 * 
 * @param {string} filePath
 * @returns {boolean} File exists
 */
export const fileExistsCaseSensitive = async (filePath) => {
  if (!filePath)
    throw new Error("File path not set!");


  if (!(typeof filePath === "string"))
    throw new Error("filePath must be a string!");

  const exists = await fileExists(filePath);

  if (!exists)
    throw new Error("File path doesn't exists!");

  // Get Parent Directory of file
  const parentDirectory = path.dirname(filePath);
  
  try {
    const caseSensitiveFileNames = await fs.readdir(parentDirectory);
    console.log(caseSensitiveFileNames);

    return caseSensitiveFileNames.includes(path.basename(filePath));
  } catch (e) {
    console.error("fs.readdir inside fileExistsCaseSensitiv() failed!");
    console.error(e);

    return false;
  }
};
