const express = require("express");
const router = express.Router();
const services = require("./services");
const schemas  = require("./schemas");
//const db = require("../db/mongodb"); 
const { ObjectId } = require("mongodb");
const { auth } = require("../middleware");    //acrescentar em todas a router com post 

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

//#4 Existe um mecanismo de autenticação implementado. 
//Este funciona com um login tradicional, que gera um token JWT. Com esta tarefa pretendemos limitar o acesso nas rotas "/polls" que não são GET, apenas a users autenticados.
router.use(auth); 

//#2 Implementar um endpoint que permita criar uma poll. 
//Uma poll é constituida por uma pergunta e uma lista de opções.
router.post("/", async (req, res) => {
  const { error, value } = schemas.createPollSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({erro: "Poll not create!" }); 
  }

  value.options = value.options.map((option) => ({ option, votes: 0}))

  try{
    const createPoll = await services.createPoll(value, options); 
    res.status(201).json("created", createPoll);
  }
  catch (error) {
    res.status(500).json({ message: "poll not created!"}); 
  }
}); 

//#3 Implementar um endpoint que permita votar numa opção de uma poll.
router.post("/:id/vote", async (req, res) => {
  const pollId  = req.params.id; 
  const option  = req.body.option; 

  // Validação do schema
  const { error } = schemas.voteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }

//Buscar a poll pelo ID
  const poll = await services.getPollById(pollId);
  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  const updateResult = await services.votePoll(pollId, option);
  if(!updateResult) {
    return res.status(500).json({ error: "Failed vote!"})
  }
  res.status(200).json({ message: "Vote ok!" });
});

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
