import fs, { constants } from "fs/promises";

export const fileExists = (path) => {
  return new Promise((resolve) => {
    fs.access(path, constants.F_OK).then((error) => {
      resolve(true);
    }).catch(() => {
      resolve(false);
    });
  });
};
