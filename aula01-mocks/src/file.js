const { readFile } = require("fs/promises");
const { join } = require("path");
const { error } = require("./constants");
const User = require('./User.js');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await this.getFileContent(filePath);
    
    const validation = this.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    
    const result = this.parseCsvToJson(content);
    return result;
  }
  
  static async getFileContent(filePath) {
    // const filename = join(__dirname, filePath);
    return (await readFile(filePath)).toString("utf-8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWhioutHeaders] = csvString.split("\n");

    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWhioutHeaders.length > 0 &&
      fileWhioutHeaders.length <= options.maxLines;
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCsvToJson(csvString) {
    const lines = csvString.split('\n');
    const firstLine = lines.shift();
    const header = firstLine.split(',');
    
    const users = lines.map(line => {
      const columns = line.split(',');
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index]
      }
      return new User(user);
    })
    
    return users;
  }
}

// File.csvToJson('./../mocks/threeItems-valid.csv')

module.exports = File;
