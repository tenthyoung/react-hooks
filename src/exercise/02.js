// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useEffect, useRef, useState} from 'react'

const getLocalStorageName = () => {
  try {
    return localStorage.getItem('storedName')
  } catch (err) {
    console.error(err)
  }
}
function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(initialName)

function Greeting() {
  const [name, setName] = useState(() => getLocalStorageName() || '')
  const nameInputRef = useRef()
  const [cart, setCart] = useState({bagels: 0})

  function handleChange(event) {
    setName(event.target.value)
  }

  useEffect(() => {
    nameInputRef.current.value = localStorage.getItem('storedName')
  }, [])

  useEffect(() => {
    if (name.length > 0) {
      localStorage.setItem('storedName', name)
    } else {
      localStorage.removeItem('storedName')
    }
  }, [name])

  const handleClick = () => {
    setCart(prevState => {
      return {bagels: prevState.bagels + 1}
    })
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" ref={nameInputRef} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}

      <br />
      <br />

      <button onClick={handleClick}>Add a bagel to the cart</button>
      <p>Bagels in cart: {cart.bagels}</p>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
