import path from "path";

export default class AVPAssetFile {

  /**
   * 
   * @param {string} path 
   * @param {string} md5 
   */
  constructor(path, md5) {
    this.path = path;
    this.md5 = md5;
  }

  /**
   * @returns {string} File name of path.
   */
  get fileName() {
    return path.basename(this.path);
  }
}
