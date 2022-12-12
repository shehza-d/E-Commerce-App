import express from "express";
import { join } from "path";

const app = express();
const PORT = 3000;

const testFolder = "./static/gifs";

// Without middleware
fs.readdir(testFolder, (err, files) => {
  res.sendFile(
    "./static/gifs/" + files[Math.floor(Math.random() * files.length)],
    { root: __dirname }
  );
});
app.get("/", (req, res) => {
  let options = { root: join(__dirname) };
  fs.readdir(testFolder, (err, files) => {
    let fileName = files[Math.floor(Math.random() * files.length)];
  });

  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
