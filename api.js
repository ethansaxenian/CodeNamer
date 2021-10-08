const express = require("express");
const cors = require("cors");
const { PythonShell } = require("python-shell");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({message: "api"});
});

app.post("/gensim", async (req, res) => {
  // https://github.com/extrabacon/python-shell
  const options = {
    mode: "text",
    pythonPath: process.env.PYTHON_PATH || "python3",
    scriptPath: "src/python/",
    args: [req.body.arg]
  };

  PythonShell.run("script.py", options, (err, result) => {
    if (err) throw err;
    // result is an array consisting of messages collected
    // during execution of script.
    res.status(200).json(result);
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
