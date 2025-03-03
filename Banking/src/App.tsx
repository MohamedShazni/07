import { useState } from 'react'
import './App.css'
import BankTransactions from './Bank'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BankTransactions/>
    </>
  )
}

export default App
