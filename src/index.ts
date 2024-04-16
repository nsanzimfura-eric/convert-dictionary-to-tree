import express from "express";
import testCreatingTreeImages from "./helpers/testData";

const app = express();
app.use(express.static("public"));

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
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
