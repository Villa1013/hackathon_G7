const path = require("path");
const secure = require("ssl-express-www");
const compression = require("compression");
const express = require("express");

const port = process.env.PORT || 3000;
const app = express();

app.use(secure);
app.use(compression());
app.use(express.static(`${__dirname}/build`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Application is running...`);
});
