const express = require("express");
const router = express.Router();
const services = require("./services");

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
