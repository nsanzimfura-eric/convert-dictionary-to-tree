import express, { Request, Response } from "express";
import testCreatingTreeImages from "./helpers/testData";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use("/trees", express.static(path.join(__dirname, "trees")));

const port = 8000;

//home page is just the html to view the images
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//get images
app.get("/images", (req: Request, res: Response) => {
  const treesDir = path.join(__dirname, "trees");

  fs.readdir(treesDir, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading images directory.");
      return;
    }

    const images = files.map((file) => ({
      name: file,
      url: `/trees/${file}`,
    }));

    res.status(200).json({ data: images });
  });
});

app.listen(port, () => {
  console.log(`App server listening on port ${port}`);
  try {
    //create Images
    testCreatingTreeImages();
  } catch (error) {
    console.log(error);
    console.log("Couldn't create images");
  }
});
