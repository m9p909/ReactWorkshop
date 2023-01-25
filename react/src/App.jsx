import { useEffect, useState } from 'react'
import './App.css'

async function fetchPokemonSprite(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  const frontDefaultSprite = data.sprites.front_default;
  return frontDefaultSprite
}


function PokemonSprite({ name }) {
  const [sprite, setSprite] = useState('')

  useEffect(() => {
    async function updateSprite() {
      if (name.length > 0) {
        const sprite = await fetchPokemonSprite(name)
        setSprite(() => sprite)
      }
    }
    updateSprite()

  }, [name])


  return <div>
    {sprite.length > 0 &&
      <div>
        <img src={sprite} />
      </div>
    }
  </div >
}
/**
 * returns the types, abilites, and weight of a pokemon. types and abilities are a string, weight is in kg
 * 
 * @param {string} name 
 * @returns 
 */
async function fetchPokemonData(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const types = data.types.map(p => p.type.name).join(', ');
    const abilities = data.abilities.map(a => a.ability.name).join(', ');
    const weight = data.weight / 10; // in kg
    return { types, abilities, weight };
  } catch (error) {
    console.log(error);
  }
}

function PokemonDetails({ name }) {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    async function updateData() {
      if (name.length > 0) {
        const data = await fetchPokemonData(name)
        setDetails(data)
      }
    }
    updateData()
  }, [name])

  return <> {details != null && <div>
    Name: {name} <br />
    types: {details.types}<br />
    abilities: {details.abilities}<br />
    weight: {details.weight} kg<br />
  </div>}

  </>
}

function App() {
  const [textbox, setTextBox] = useState('')
  const [pokemon, setPokemon] = useState('')

  const onSubmit = () => {
    setPokemon(textbox)
  }


  return (
    <>
      <div>Pokemon App</div>
      <input onChange={(e) => setTextBox(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
      <PokemonSprite name={pokemon} />
      <PokemonDetails name={pokemon} />
    </>

  )
}

export default App
