import axios from "axios";
import * as fs from "fs";
import { promisify } from "util";
import config from "./../config";

async function searchGoogleUsingSerpapi(term: string) {
  var answers;

  var googleGetInstace = axios.create({
    baseURL: "https://serpapi.com",
    method: "GET",
  });

  term += " site: stackoverflow.com";

  try {
    answers = await googleGetInstace.get("/search", {
      params: {
        engine: "google",
        q: term,
        api_key: config.serpApiKey,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return answers;
}

function parseSearchResults(stringResult: Promise<any>): string | undefined {
  // @TODO -- create a parser to standardize results

  return undefined;
}

export default searchGoogleUsingSerpapi;
