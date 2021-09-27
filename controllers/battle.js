const { response } = require("express");
const axios = require("axios");

const pokemonBattle = async (req, res = response) => {
  const { firstPokemon, secondPokemon } = req.body;

  //Data
  const { data: FPokemonData } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${firstPokemon.toLowerCase()}`
  );

  const { data: SPokemonData } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${secondPokemon.toLowerCase()}`
  );

  //Types
  const { data: FPokemonTypeData } = await axios.get(
    `https://pokeapi.co/api/v2/type/${FPokemonData.types[0].type.name}`
  );
  const { damage_relations: DamageRelationsFPK } = FPokemonTypeData;

  const { data: SPokemonTypeData } = await axios.get(
    `https://pokeapi.co/api/v2/type/${SPokemonData.types[0].type.name}`
  );
  const { damage_relations: DamageRelationsSPK } = SPokemonTypeData;

  //Puntos primer pokemon:
  const fPokemon = {
    double_damage_from: DamageRelationsFPK.double_damage_from.find(
      (damage) => damage.name == SPokemonData.types[0].type.name
    ),
    half_damage_from: DamageRelationsFPK.half_damage_from.find(
      (damage) => damage.name == SPokemonData.types[0].type.name
    ),
    double_damage_to: DamageRelationsFPK.double_damage_to.find(
      (damage) => damage.name == SPokemonData.types[0].type.name
    ),
    half_damage_to: DamageRelationsFPK.half_damage_to.find(
      (damage) => damage.name == SPokemonData.types[0].type.name
    ),
  };

  //Puntos segundo pokemon:
  const sPokemon = {
    double_damage_from: DamageRelationsSPK.double_damage_from.find(
      (damage) => damage.name == FPokemonData.types[0].type.name
    ),
    half_damage_from: DamageRelationsSPK.half_damage_from.find(
      (damage) => damage.name == FPokemonData.types[0].type.name
    ),
    double_damage_to: DamageRelationsSPK.double_damage_to.find(
      (damage) => damage.name == FPokemonData.types[0].type.name
    ),
    half_damage_to: DamageRelationsSPK.half_damage_to.find(
      (damage) => damage.name == FPokemonData.types[0].type.name
    ),
  };

  let puntosPrimero = 0;
  if (fPokemon.double_damage_from) {
    puntosPrimero = puntosPrimero - 70;
  }
  if (fPokemon.half_damage_from) {
    puntosPrimero = puntosPrimero - 30;
  }
  if (fPokemon.double_damage_to) {
    puntosPrimero = puntosPrimero + 70;
  }
  if (fPokemon.half_damage_to) {
    puntosPrimero = puntosPrimero + 30;
  }

  let puntosSegundo = 0;
  if (sPokemon.double_damage_from) {
    puntosSegundo = puntosSegundo - 70;
  }
  if (sPokemon.half_damage_from) {
    puntosSegundo = puntosSegundo - 30;
  }
  if (sPokemon.double_damage_to) {
    puntosSegundo = puntosSegundo + 70;
  }
  if (sPokemon.half_damage_to) {
    puntosSegundo = puntosSegundo + 30;
  }

  return res.json({
    ok: true,
    ganador: puntosPrimero > puntosSegundo ? firstPokemon : secondPokemon,
  });
};

module.exports = {
  pokemonBattle,
};
