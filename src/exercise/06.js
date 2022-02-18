// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

const STATUS = {
  UNSUBMITTED: 'UNSUBMITTED',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

class CustomErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: undefined}
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    const {error} = this.state

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          There was an error:
          <pre>{error.message}</pre>
        </>
      )
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState(null)
  const status = state?.status
  const pokemonData = state?.pokemonData

  useEffect(() => {
    if (!pokemonName) {
      setState({status: STATUS.UNSUBMITTED})
      return
    }
    setState({status: STATUS.LOADING})

    if (pokemonName.length > 0) {
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState({status: STATUS.SUCCESS, pokemonData})
        })
        .catch(err => {
          setState({status: STATUS.ERROR})
          console.error(err)
        })
    }
  }, [pokemonName])

  if (status === STATUS.ERROR) throw Error

  if (status === STATUS.UNSUBMITTED) {
    return 'Submit a Pokemon'
  } else if (status === STATUS.LOADING) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === STATUS.SUCCESS) {
    return <PokemonDataView pokemon={pokemonData} />
  }

  return 'This is impossible'
}

const ErrorFallback = ({error, resetErrorBoundary}) => {
  console.log('error fallback: ', error)
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre>{JSON.stringify(error)}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  return 'TODO'
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
    console.log('new pokemonname')
  }

  const handleReset = () => {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetkeys={[pokemonName]}
        >
          {pokemonName && <PokemonInfo pokemonName={pokemonName} />}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
