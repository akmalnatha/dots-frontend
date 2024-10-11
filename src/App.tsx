import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuestionNumber from './components/question_number'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <QuestionNumber number={1} currentNumber={1} answered={false}/>
        <QuestionNumber number={2} currentNumber={1} answered={false}/>
        <QuestionNumber number={3} currentNumber={1} answered={true}/>
      </div>
      
    </>
  )
}

export default App
