const Clarifai = require("clarifai");

const clarifai = new Clarifai.App({
  apiKey: "c5409be24c6841cb863194e39d635346",
});

const handleApiCall = (req, res) => {
  clarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handleImageGet = (req, res, db) => {
  const { id } = req.body;
  return db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleApiCall,
  handleImageGet,
};
