import { useState, useRef } from "react"

function App() {
  const [inputText, setInputText] = useState("")
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)

  const formatText = (text) => {
    return text.split("\n").join(", ")
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleOutputClick = () => {
    navigator.clipboard
      .writeText(inputRef.current.textContent)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 1000)
      })
      .catch((err) => {
        alert("Failed to copy text: " + err)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Keywords Formatter</h1>
        <label htmlFor="input">Input apollo keywords:</label>
        <textarea
          className="input"
          id="input"
          rows="10"
          value={inputText}
          onChange={handleInputChange}
        />
        <label htmlFor="output">
          <p>
            Output:
            <span
              id="copied"
              className={copied ? "trigger" : ""}
            >
              Copied!
            </span>
          </p>
        </label>
        <div
          ref={inputRef}
          className="input"
          id="output"
          rows="10"
          readOnly
          onClick={handleOutputClick}
        >
          {formatText(inputText)}
        </div>

        <p className="github">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Frelior/formatter-rudenko"
          >
            github
          </a>
        </p>
        <p>
          <p>↑↑↑</p>Just click on the output area to copy the formatted text
        </p>
        <hr style={{ width: "50%" }} />
        <p>
          Set english language to translate keywords<p>↓↓↓</p>
        </p>
        <div id="google_translate_element"></div>
      </header>
    </div>
  )
}

export default App
