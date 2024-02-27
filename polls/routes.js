const express = require("express");
const router = express.Router();
const services = require("./services");
const { createPollSchema } = require("./schemas");

router.get("/", async (req, res) => {
  const polls = await services.getAllPolls();
  res.status(200).json(polls);
});

//#1 Implementar um endpoint que permita obter os detalhes de uma poll (por ID).
router.get("/:id", async (req, res) => {
  const pollId = req.params.id; 

  const poll = await services.getPollById(pollId);

  if (!poll) {
    return res.status(404).json({ error: "id not found" });
  }
  res.status(200).json(poll); 
}); 

//#2 Implementar um endpoint que permita criar uma poll. Uma poll é constituida por uma pergunta e uma lista de opções.
router.post("/", async (req, res) => {
  const { error, value } = createPollSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({erro: "Poll not create!" }); 
  }

  try {
    const insertResult = await services.getAllPolls().insertOne(value); 
    const result = await services.getPollById(insertResult.insertedId); 
    res.status(201).json({ message: "poll created successFully!", result }); 

  }
  catch(error) {
    res.status(500).json({message: "poll not created!"}); 
  }
}); 

//#3 Implementar um endpoint que permita votar numa opção de uma poll.

router.put("/:id", async (req, res) => {




router.delete("/:id", async (req, res) => {
  const pollId = req.params.id;

  const poll = await services.getPollById(pollId);
  if (!poll) {
    return res.status(404).json({ error: "poll not found" });
  }

  const deleted = await services.deletePollById(pollId);
  if (!deleted) {
    return res.status(500).json({ error: "failed to delete poll" });
  }

  res.status(200).json({ message: "poll deleted successfully" });
});

module.exports = router;
