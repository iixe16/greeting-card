const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("مرحبًا بك في خادم بطاقات المعايدة!");
});

app.listen(5000, () => {
  console.log("الخادم يعمل على المنفذ 5000");
});
