const { Router } = require("express");
const { check } = require("express-validator");
const { pokemonBattle } = require("../controllers/battle");
const { fieldValidator } = require("../middlewares/validator");
const router = Router();

router.post(
  "/",
  [
    check("firstPokemon", "Debe selecionar dos pokemon").not().isEmpty(),
    check("secondPokemon", "Debe selecionar dos pokemon").not().isEmpty(),
    fieldValidator,
  ],
  pokemonBattle
);

module.exports = router;
