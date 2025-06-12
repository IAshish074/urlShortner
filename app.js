import { readFile, writeFile } from "fs/promises";
import path from "path";
import { createServer } from "http";
import crypto from "crypto";

// const PORT = 3000;
const DATA_FILE = path.join("data", "links.json");

const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - File Not Found");
  }
};

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return data.trim() ? JSON.parse(data) : {};
  } catch (err) {
    if (err.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw err;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, path.join("public", "index.html"), "text/html");
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join("public", "style.css"), "text/css");
    } else if (req.url === "/script.js") {
      return serveFile(
        res,
        path.join("public", "script.js"),
        "application/javascript"
      );
    } else if (req.url === "/links") {
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    } else if (req.url.startsWith("/") && req.url.length > 1) {
      const code = req.url.slice(1);
      const links = await loadLinks();
      if (links[code]) {
        res.writeHead(302, { Location: links[code].original });
        return res.end();
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("Shortcode not found");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 - Not Found");
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const parsed = JSON.parse(body);
        const url = parsed.url.trim();
        let shortCode = parsed.shortCode.trim();

        if (!url) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("URL is required");
        }

        const links = await loadLinks();

      
        if (!shortCode) {
          do {
            shortCode = crypto.randomBytes(3).toString("hex");
          } while (links[shortCode]);
        } else if (links[shortCode]) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("Shortcode already exists. Please choose another");
        }

        links[shortCode] = {
          original: url,
          short: `http://localhost:${PORT}/${shortCode}`,
        };

        await saveLinks(links);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            shortCode,
            shortUrl: links[shortCode].short,
          })
        );
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Invalid JSON or internal error");
      }
    });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});

