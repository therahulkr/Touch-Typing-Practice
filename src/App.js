import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [text,setText] = useState({
    displayText : "",
    writenText : ""
  })

 
  const [cmin,setMin] = useState(0);
  const [csec,setSec] = useState(5);

  const [wordIndex,setWordindex] = useState(0)
  const [time,setTime] = useState(false)


  const [mistakes,setMistakes] = useState(0)
  const [correct,setCorrect]  = useState(0)

  var timer
  useEffect(()=>{
    timer = setInterval(() => {
      if(csec == 0){
        if(cmin == 0){
          return clearInterval(time)
        }
        setSec(59);
        setMin(cmin - 1);
      }
      else{
        setSec(csec - 1);
      }
    }, 1000)
    return ()=> clearInterval(timer)
  })


  const practiceString = [
    "la sa da fa",
    "jk lj ku fr",
    "hi jf la ks",
    "ln lv ke jz",
    "ao me oz sq",
    "jl la ls js",
    "mn ab gh ij",
    "ab cd ef gh",
    "ij kl mn op",
    "qr st uv wx",
    "yz ab cd ef"
  ];

  const handleChange = (e)=>{
    const len = e.target.value.length;

    if(practiceString[wordIndex][len-1] === e.target.value[len-1]){
        setCorrect(correct+1)
        if(document.getElementById('enterText').style.backgroundColor == "red")
          document.getElementById('enterText').style.backgroundColor = "white"
        if(len === practiceString[wordIndex].length){
          setWordindex((wordIndex+1)%practiceString.length)
          document.getElementById('enterText').value = "";
        }
    }
    else{
      document.getElementById('enterText').style.backgroundColor = "red";
      setMistakes(mistakes+1)
    }

    
    console.log(correct," ",mistakes)
  }

  const updateTime = ()=> {
    setSec(csec-1);
  }

  // setInterval(updateTime, 1000);
  const reset = ()=>{
    setMin(1);
    setSec(5);
  }
  const stop = ()=>{
    clearInterval(timer)
  }

  return (
    
      <>

      {cmin==0&&csec==0?
      <div className='App'>
        <h1>Result</h1>
        <h2>Mistakes : {mistakes} alphabets</h2>
        <h2>Correct : {correct} alphabets</h2>
        <h2>Accuracy : {(Math.round(correct/(correct+mistakes)*100))} %</h2>
        <button id='resultRest' onClick={reset}>Reset</button>
      </div>:
      <div className="App">
        <h1>Touch Typing Practice</h1>
      <div id='timer'>
        <h3>Timer : {cmin<10?"0"+cmin:cmin} : {csec<10?"0"+csec:csec}</h3>
        <button onClick={reset}>Reset</button>
        <button id='btn' onClick={stop}>Stop</button>
      </div>
      <textarea name='displayText' id='typingText' value={practiceString[wordIndex]}  required></textarea>
      <textarea name='writenText' id='enterText' onChange={handleChange} placeholder = "type here..." required></textarea>
      </div>
      }
    </>
  );
};


export default App;
