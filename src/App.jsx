import { useState } from 'react'
import React from 'react';

import reactLogo from './assets/react.svg'
import './App.css'
import Calc from './Calc'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Calc />
    </>  
  )
}

export default App
