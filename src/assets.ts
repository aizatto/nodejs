import { readFile } from "fs-extra";
import fetch from "node-fetch";

async function fetchHTMLFromDevServer(devServer: string): Promise<string | null> {
  const response = await fetch(devServer);
  if (!response.ok) {
    return null;
  }

  return response.text();
}

function scrapeHTML(html: string) {
  const scripts = html.match(/<script.*<\/script>/);
  if (process.env.NODE_ENV !== "production") {
    return {
      scripts: scripts[0],
      links: '',
    }
  }

  const links = html.match(/<link\s+href="[^"]*"\s+rel="stylesheet">/g);
  return {
    scripts: scripts[0],
    links: links[0],
  };
}

export async function fetchAssets(
  devServer: string,
  buildFile: string,
): Promise<{ links: string, scripts: string}> {
  let html = "";
  if (process.env.NODE_ENV === "production") {
    const buffer = await readFile(buildFile);
    html = buffer.toString();
  } else {
    html = await fetchHTMLFromDevServer(devServer);
  }

  const results = scrapeHTML(html);
  return results;
}
