const express = require('express');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 4000;
const fs = require('fs');

dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
  const rawdata = fs.readFileSync('memory.json');
  const memory = JSON.parse(rawdata);
  res.json(memory.number);
 });

router.put("/:number", (req, res) => {
  const number = parseFloat(req.params.number);
  if (Number.isNaN(number)) {
    res.status(400).end();
  }
  const memory = {
    number,
  };
  fs.writeFileSync('memory.json', JSON.stringify(memory));
  res.status(201).end();
 })

app.use('/memory', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
 });
