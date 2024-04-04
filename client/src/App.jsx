import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
      <div>
       <h1 className="text-purple-500 text-3xl font-bold text-center mt-5">A-Z Rental Platform</h1>
       <p className="text-xl text-center my-6">Rent any thing ∙ Any where ∙ Any time</p>
      </div>
     
    </>
  )
}

export default App
