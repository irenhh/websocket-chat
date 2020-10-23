export {};
const { uniqueNamesGenerator, Config, adjectives, animals } = require('unique-names-generator');
const express = require('express');

const router = express.Router();

const config: typeof Config = {
  dictionaries: [adjectives, animals],
};

router.get('/public/login', (req, res) => {
  const characterName = uniqueNamesGenerator(config);

  res.send({ characterName }).status(200);
});

router.get('/', (req, res) => {
  res.send({ response: 'Server is alive!' }).status(200);
});

module.exports = router;
