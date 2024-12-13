import { useState } from "react"
import logo from "./logo.svg"
import "./App.css"

function App() {
  const [inputText, setInputText] = useState("")
  const [copied, setCopied] = useState(false)

  const formatText = (text) => {
    return text.split("\n").join(", ")
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleOutputClick = () => {
    navigator.clipboard
      .writeText(formatText(inputText))
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 1000) // Скрыть сообщение через 2 секунды
      })
      .catch((err) => {
        alert("Failed to copy text: " + err)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Formatter</h1>
        <label htmlFor="input">Input:</label>
        <textarea
          className="input"
          id="input"
          rows="10"
          value={inputText}
          onChange={handleInputChange}
        />
        <label htmlFor="output">Output:</label>
        <textarea
          className="input"
          id="output"
          rows="10"
          value={formatText(inputText)}
          readOnly
          onClick={handleOutputClick}
        />
        {copied && <p id="copied">Copied!</p>}
      </header>
    </div>
  )
}

export default App
