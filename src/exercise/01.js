// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting() {
  const [name, setName] = React.useState(localStorage.getItem('storedName'))

  function handleChange(event) {
    setName(event.target.value)
  }

  React.useEffect(() => {
    localStorage.setItem('storedName', name)
  }, [name])

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
