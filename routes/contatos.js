const express = require('express');
const router = express.Router();
const clientPromise = require("../banco-de-dados/config");
const { ObjectId } = require("mongodb");
 
router.get('/', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("jplima_db");
    const contatos = await db.collection("pokemon").find({}).toArray();
    res.json(contatos);
  } catch (err) {
    console.error("Erro ao buscar contatos:", err);
    res.status(500).json({ error: "Erro ao buscar contatos" });
  }
});
 
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const client = await clientPromise;
    const db = client.db("jplima_db");
 
    const pokemon = await db
      .collection("pokemon")
      .findOne({ _id: new ObjectId(id) });
 
    if (!pokemon) {
      return res.status(404).json({ error: "pokemon não encontrado." });
    }
 
    res.json(pokemon);
  } catch (err) {
    console.error("Erro ao buscar pokemon:", err);
    res.status(500).json({ error: "Erro ao buscar pokemon." });
  }
});
 
router.post('/', (req, res) => {
  const { texto } = req?.body;
  res.json({ recebido: texto });
});
module.exports = router;