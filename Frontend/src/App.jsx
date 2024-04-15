import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory,setChatHistory]=useState([]);
  const [error,setError]=useState(false)
  const surpriseHandler = () => {
    const arr = [
      "What does the fileToGenerativePart function do?",
      "How does the fileToGenerativePart function handle file reading and encoding?",
      "Can you explain the structure of the object returned by the fileToGenerativePart function?",
    ];

    const random=Math.floor(Math.random() * arr.length)
    setInputValue(arr[random])
  };

  const inputHandler=(e)=>{
    setInputValue(e.target.value)
  }
  const resultGenerator = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: inputValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:4000/gemini", options);
      const data = await response.text();
      console.log(data)
      setChatHistory((prevState) => [
        ...prevState,
        { role: "user", parts: inputValue },
        { role: "modal", parts: data },
      ]);
      setInputValue("")
    } catch (error) {
      console.error("Error:", error);
      setError(true); 
    }
  };
  return (
    <>
      <div className="container">
        <div className="suprise">
          <p>What do you want to know?</p>
          <button onClick={surpriseHandler}> Suprise Me</button>
        </div>
        <div className="input-container">
          <textarea type="text" value={inputValue} onChange={inputHandler}/>
          <button onClick={resultGenerator}>Ask Me</button>
        </div>
        <div className="output-container">
            {!error && chatHistory.map((item,_index)=>
              <p className="answer" key ={_index}>{item.role}:{item.parts}</p>
            )}
        </div>
      </div>
    </>
  );
}

export default App;
