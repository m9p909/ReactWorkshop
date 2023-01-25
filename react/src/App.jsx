import { useState } from 'react'
import './App.css'

async function fetchPokemonSprite(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${name}`);
  const data = await response.json();
  const frontDefaultSprite = data.sprites.front_default;
  return frontDefaultSprite
}

function App() {
  const [pokemon, setPokemon] = useState('')
  const [sprite, setSprite] = useState('')

  const onSubmit = async () => {
    const sprite = await fetchPokemonSprite(pokemon)
    setSprite(sprite)
  }


  return (
    <>
      <div>Pokemon App</div>
      <input onChange={(e) => setPokemon(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
      {sprite.length > 0 &&
        <div>
          <img src={sprite} />
        </div>
      }
    </>

  )
}

export default App
