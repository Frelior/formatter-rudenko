import { useState } from "react"
import "./App.css"

function App() {
  const [inputText, setInputText] = useState("")
  const [copied, setCopied] = useState(false)
  const [technologiesToggled, setTechnologiesToggled] = useState(false)

  const formatText = (text) => {
    return text.split("\n").join(", ")
  }

  const formatTextTech = (text) => {
    return text
      .split("\n")
      .filter((_, i) => i % 2 === 0)
      .join(", ")
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

  const handleOutputClickTech = () => {
    navigator.clipboard
      .writeText(formatTextTech(inputText))
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

  const toggleTechnologies = () => {
    setTechnologiesToggled(!technologiesToggled)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Formatter</h1>
        <div className="toggle-box">
          <p
            className={`name kw-name ${!technologiesToggled ? "active" : ""}`}
            title="Changes hyphens/paragraphs to commas"
            onClick={toggleTechnologies}
          >
            Keywords
          </p>
          <div
            className={`toggler  ${technologiesToggled ? "toggler-on" : ""}`}
            onClick={toggleTechnologies}
          >
            <div className="toggler-point"></div>
          </div>
          <p
            className={`name tech-name ${technologiesToggled ? "active" : ""}`}
            title="Deletes every second line and replaces paragraphs with commas"
            onClick={toggleTechnologies}
          >
            Technologies
          </p>
        </div>

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
          value={
            technologiesToggled
              ? formatTextTech(inputText)
              : formatText(inputText)
          }
          readOnly
          onClick={
            technologiesToggled ? handleOutputClickTech : handleOutputClick
          }
        />
        {copied && <p id="copied">Copied!</p>}
        <p className="github">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Frelior/formatter-rudenko"
          >
            github
          </a>
        </p>
        <p>Just click on the output area to copy the formatted text</p>
      </header>
    </div>
  )
}

export default App
