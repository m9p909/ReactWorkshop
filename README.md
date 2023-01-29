# React Workshop

This react workshop will cover: 
- Data fetching
- React state management
- display
- Project Setup
- React Components


## Setup

First intall node and npm, preferably the LTS (18).

For this tutorial we are using Vite, for reasons why we are using vite instead of CRA see:https://github.com/reactjs/reactjs.org/pull/5487

to setup the app with vite, run 
`npm create vite@latest pokeapp`


 
 select the react, and javascript options from the tui menu

## Open in VSCode

If you don't have vscode, I recommend installing it. It's the main web IDE used today. 

To open the folder in VSCode, go to file > open folder and selet your folder

To run the app, use `npm run dev` in the root folder of the app

## Find App.jsx

To get started, find the file  src/App.jsx. The file should look this:
```js
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
```

To start, we're going to delete the contents of the component, so we can write our own component. Remove everything from the app, so it looks like this:

```js
import './App.css'

function App() {

  return (
    <div>Hello World</div>

  )
}

export default App
```


## Start Building

Next we're going to add the input box. We will use React `useState` to bind the value of the input box, to a variable. onSubmit, we will set the `pokemon` variable to whatever is in the textbox
```js
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
      {pokemon}
    </>

  )
}
```


## Fetch Sprite Link

Now we need a javascipt function that will fetch data from the poke Api, first we will fetch the sprite
```js
async function fetchPokemonSprite(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  const frontDefaultSprite = data.sprites.front_default;
  return frontDefaultSprite
}
```


frontDefaultSprite is a url to the sprite of the pokemon with name `name`

## Display Sprite Link

Next we will integrate the sprite link into the react function. We can accomplish this using useEffect(). So whenever the pokemon variable changes, the useEffect function will trigger and update the sprite


```js
function App() {
  const [textbox, setTextBox] = useState('')
  const [pokemon, setPokemon] = useState('')
  const [sprite, setSprite] = useState('')

  const onSubmit = () => {
    setPokemon(textbox)
  }


  useEffect(() => {
    async function updateSprite() {
      if (name.length > 0) {
        const sprite = await fetchPokemonSprite(name)
        setSprite(() => sprite)
      }
    }
    updateSprite()
  }, [pokemon])


  return (
    <>
      <div>Pokemon App</div>
      <input onChange={(e) => setTextBox(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
      <div>
      {sprite.length > 0 &&
          <div>
            <img src={sprite} />
          </div>
      }
      </div >
    </>

  )
}
```


## Refactor

Our component looks good, but it's gotten a little big. We have around 40-50 lines of code in our component, lets try breaking our large component into smaller components.


```jsx
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
    </>

  )
}

export default App

```


## Challenge: Can you write a component that displays pokemon Data?

using this function, can you display the types, abilities and weight of the pokemon underneath its sprite?
```js

/**
 * returns the types, abilites, and weight of a pokemon. types and abilities are a string, weight is in kg
 * 
 * @param {string} name 
 * @returns { types: string, abilities: string, weight: number}
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
```





