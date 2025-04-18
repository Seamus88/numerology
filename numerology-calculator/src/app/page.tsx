"use client";
import React, { useState } from "react";

export default function Home() {
  interface NumerologyData {
    birthName: string;
    dob: string;
    ll: string;
    op: string;
    sn: string;
    pod: string;
  }

  interface nameOutput {
    show: boolean;
    letterWithValue: Array<{ letter: string; value: number; }>;
  }

  const [nameOutput, setNameOutput] = useState<nameOutput>({show: false, letterWithValue: []});
  const [numerologyData, setNumerologyData] = useState<NumerologyData>({birthName: "", dob: "", ll: '', op: '', sn: '', pod: '',});
  const lettersValue = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8, "i": 9, "j": 1, "k": 2, "l": 3, "m": 4, "n": 5, "o": 6, "p": 7, "q": 8, "r": 9, "s": 1, "t": 2, "u": 3, "v": 4, "w": 5, "x": 6, "y": 7, "z": 8};
  
  function clearNumerologyData() {
    setNameOutput({show: false, letterWithValue: []});
    setNumerologyData({birthName: "", dob: "", ll: '', op: '', sn: '', pod: '',});
  }

  function handleNumerology() {
    const birthName = document.getElementById("birthName") as HTMLInputElement;
    clearNumerologyData();
    calculateNameValue(birthName.value, setNameOutput); 
  }

  function baseNumber(num: number) {
    let newNum = num;
    if (newNum == 11 || newNum == 22 || newNum == 33) {
      return newNum;
    }
    while (newNum > 9) {
      newNum = newNum.toString().split("").reduce((acc, num) => acc + parseInt(num), 0);
    }
    return newNum;
  }

  function calculateNameValue(birthName: string, setNameOutput) {
    let outerPersonality = 0;
    let soulNumber = 0;
    let pod = 0;

    const nName = birthName.toLowerCase();
    
    for (let i = 0; i < nName.length; i++) {
      const letter = nName[i];
      if (letter == "a" || letter == "e" || letter == "i" || letter == "o" || letter == "u") {
        soulNumber += lettersValue[letter];
        setNameOutput((prevState) => ({
          show: prevState.show, 
          letterWithValue: [...prevState.letterWithValue, { letter: letter, value: lettersValue[letter]}]
        }))
      } else if (letter == "b" || letter == "c" || letter == "d" || letter == "f" || letter == "g" || letter == "h" || letter == "j" || letter == "k" || letter == "l" || letter == "m" || letter == "n" || letter == "p" || letter == "q" || letter == "r" || letter == "s" || letter == "t" || letter == "v" || letter == "w" || letter == "x" || letter == "y" || letter == "z") {
        outerPersonality += lettersValue[letter];
        setNameOutput((prevState) => ({
          show: prevState.show, 
          letterWithValue: [...prevState.letterWithValue, { letter: letter, value: lettersValue[letter]}]
        }))
      }
    }
    
    pod = outerPersonality + soulNumber;
    setNameOutput((prevState) => ({
      show: true,
      letterWithValue: [...prevState.letterWithValue]
    }));

    setNumerologyData((prevState) => ({
      birthName: prevState.birthName, 
      dob: prevState.dob,
      ll: prevState.ll,
      op: outerPersonality.toString() + "/" + baseNumber(outerPersonality).toString(),
      sn: soulNumber.toString() + "/" + baseNumber(soulNumber).toString(),
      pod: pod.toString() + "/" + baseNumber(pod).toString()
    }));
  }
  return (
    <div id="home" className="flex flex-col justify-center gap-8 p-8 w-full h-full">
      <div id="header" className="text-2xl font-bold text-center">
        <h1 className="text-4xl font-bold text-center">Numerology Calculator</h1>
      </div>
      <div id="panels" className="flex flex-row flex-wrap justify-center gap-8 items-center">
        <div id="left-panel" className="flex flex-col  gap-8 p-8">
          <Directions/>
          <div className="flex flex-col items-center gap-4">
            <BirthdayInput numerologyData={numerologyData} setNumerologyData={setNumerologyData}/>
            <NameInput numerologyData={numerologyData} />
            <button onClick={() => handleNumerology()}>Calculate</button>
          </div>
        </div>
        <div id="right-panel" className="flex flex-col justify-center items-start gap-8">
          <RightColumnOutput numerologyData={numerologyData} />
        </div>
      </div>
      <div id="main-output" className="flex flex-row justify-center items-center gap-8">
        <div> 
          {nameOutput.show == true? <Output numerologyData={numerologyData} nameOutput={nameOutput} setNameOutput={setNameOutput} /> : <div className="hidden"></div>}
        </div>
      </div>
    </div>
    
  );
}

function Output({numerologyData, nameOutput, setNameOutput}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-2xl font-bold">Numerology Output</h2>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-row gap-4'>
            {nameOutput.letterWithValue.map((item, index) => (
              <div key={index}>
                <OutputColumn index={index} letter={item.letter} value={item.value} />
              </div>))}
              <div className="flex flex-col justify-evenly gap-4">
                <div className="text-blue-500">Soul Number={numerologyData.sn}</div>
                <div>----------</div>
                <div className="text-red-500">Outer Personality={numerologyData.op}</div>
              </div>
          </div>
      </div>
    </div>
  )
}

function OutputColumn({index, letter, value}) {

  return (
    <div key={index} className="flex flex-col justify-evenly gap-4">
        {letter =="a" || letter == "e" || letter == "i" || letter == "o" || letter == "u" ? <div className="text-blue-500">+ {value}</div> : <div className="text-black">+ 0</div>}
        <div><p className="text-end">{letter}</p></div>
        {letter =="a" || letter == "e" || letter == "i" || letter == "o" || letter == "u" ? <div className="text-black">+ 0</div> : <div className="text-red-500">+ {value}</div>}
    </div>
  )
}

function Directions() {
  return (
    <div className="flex flex-col items-center gap-8 ">
      <p>Please Input your Birthday and full name.</p>
      <p>For your name you have two options when finding your numerologyData numbers:</p>
      <ul>
        <li>1. Use the full name you were given at birth.</li>
        <li>2. Use the full name you prefer to go by (nicknames etc).</li>
      </ul>
      <p>#TODO# Reasons for full name at birth vs. preferential name.</p>
    </div>
  )
}

function BirthdayInput({numerologyData, setNumerologyData} ) {

  function calculateLifeLesson(bday: string) {
    const bdayArray = bday.split("-");
    const year = bdayArray[0].split("");
    let yearSum = 0;
    year.forEach((num) => yearSum += parseInt(num));
    console.log(yearSum);
    const month = parseInt(bdayArray[1]);
    const day = parseInt(bdayArray[2]);
    setNumerologyData((numerologyData) => ({
      ll: yearSum + month + day, op: numerologyData.op, sn: numerologyData.sn, pod: numerologyData.pod
    }))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <label htmlFor="birthday">Birthday</label>
      <input
        type="date"
        id="birthday"
        name="birthday"
        className="p-2 border border-gray-300 rounded-md"
        onChange={(e) => setNumerologyData((prevState) => ({
          birthName: prevState.birthName, 
          dob: e.target.value,
          ll: calculateLifeLesson(e.target.value),
          op: prevState.op,
          sn: prevState.sn,
          pod: prevState.pod
        }))}
      />     
    </div>
  );
}

function NameInput({numerologyData} ) {
  
  return (
    <div className="flex flex-col items-center gap-4">
      <label htmlFor="birthName">Full Name</label>
      <input 
        type="text" 
        id="birthName" 
        name="birthName"
        className="p-2 border border-gray-300"
        placeholder="Full Name"
        defaultValue={numerologyData.birthName}
      />
    </div>
  );
}

function RightColumnOutput({numerologyData}) {
  function baseNumber(num: number) {
    let newNum = num;
    if (newNum == 11 || newNum == 22 || newNum == 33) {
      return newNum;
    }
    while (newNum > 9) {
      newNum = newNum.toString().split("").reduce((acc, num) => acc + parseInt(num), 0);
    }
    return newNum;
  }

    return (
      <div className="flex flex-col items-center gap-8">
        {numerologyData.ll !== 0 ? <h2>Life Lesson: {numerologyData.ll} {numerologyData.ll > 9 ? <>/ {baseNumber(numerologyData.ll)}</> : <div></div>}</h2> : <h2>Life Lesson: </h2>}
        {numerologyData.op !== 0 ? <h2>OuterPersonality: {numerologyData.op}</h2> : <h2>OuterPersonality: </h2>}
        {numerologyData.sn !== 0 ? <h2>Soul Number: {numerologyData.sn}</h2> : <h2>Soul Number: </h2>}
        {numerologyData.pod !== 0 ? <h2>Path Of Destiny: {numerologyData.pod}</h2> : <h2>Path Of Destiny: </h2>}
      </div>
    );
}

