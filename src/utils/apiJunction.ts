import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import searchGoogleUsingSerpapi from "../APIs/serpapi";

// types and interfaces
interface globalApiRequestCounterInterface {
  globalApiRequestCounter: number;
}

// TODO: standard result interface which all serpapi should follow while parsing data
interface results {}

var writeFile = promisify(fs.writeFile);
var readFile = promisify(fs.readFile);
var counterFilePath = path.resolve("./globalCounter.json");

var globalApiRequestCounter: number = 0;

initializeTheCounter().then(function (res) {
  if (res !== undefined) {
    globalApiRequestCounter = res;
  }
});

export async function initializeTheCounter() {
  try {
    var data: string | globalApiRequestCounterInterface = await readFile(counterFilePath, {
      encoding: "utf-8",
    });
    data = JSON.parse(data) as globalApiRequestCounterInterface;
    return data.globalApiRequestCounter;
  } catch (error) {
    console.error(error);
    await writeFile(counterFilePath, JSON.stringify({ globalApiRequestCounter: 0 }, null, 2));
  }
  return undefined;
}

async function search(term: string) {
  try {
    globalApiRequestCounter += 1;
    writeFile(counterFilePath, JSON.stringify({ globalApiRequestCounter }, null, 2));
  } catch (e) {
    console.error(e);
  }

  try {
    // TODO: assign the standard results interface
    // var results:;
    if (globalApiRequestCounter < 100) {
      var results = await searchGoogleUsingSerpapi(term);
    }
  } catch (error) {
    console.error(error);
  }
}

// async function axios_get() {
//   var getInstance = axios.create({
//     baseURL: "https://api.stackexchange.com/2.3",
//     method: "GET",
//   });

//   var answers = await getInstance.get("/questions", {
//     params: {
//       site: "stackoverflow",
//       sort: "activity",
//       order: "desc",
//     },
//   });
//   var data = answers.data as JSON;
//   var stringData = JSON.stringify(data, null, 2);

// }

// export default { axios_get };
