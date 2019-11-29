const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
const router = express.Router();

router.use(cors());
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
