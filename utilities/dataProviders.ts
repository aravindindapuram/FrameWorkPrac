import fs from "fs";
import { parse } from "csv-parse/sync";

export class DataProvider {
  static getTestDataFromJson(path: string) {
    let data: any = JSON.parse(fs.readFileSync(path, "utf-8"));
    return data;
  }

  static getTestDataFromCSV(path: string) {
    let data: any = parse(fs.readFileSync(path), {
      columns: true,
      skip_empty_lines: true,
    });
    return data;
  }
}
