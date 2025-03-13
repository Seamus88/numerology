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

  const [numerologyData, setNumerologyData] = useState<NumerologyData>({birthName: "", dob: "", ll: '', op: '', sn: '', pod: '',});
  
  return (
    <div id="home" className="flex flex-col justify-center gap-8 p-8 w-full h-full">
      <div id="header" className="text-2xl font-bold text-center">
        <h1 className="text-4xl font-bold text-center">Numerology Calculator</h1>
      </div>
      <div id="panels" className="flex flex-row flex-wrap justify-center gap-8 items-center">
        <div id="left-panel" className="flex flex-col  gap-8 p-8">
          <Directions/>
          <div className="flex flex-col items-center gap-4">
            <BirthdayInput setNumerologyData={setNumerologyData}/>
            <NameInput numerologyData={numerologyData} setNumerologyData={setNumerologyData}/>
          </div>
        </div>
        <div id="right-panel" className="flex flex-col justify-center items-start gap-8">
          <NumerologyOutput numerologyData={numerologyData} setNumerologyData={setNumerologyData} />
        </div>
      </div>
    </div>
    
  );
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

function BirthdayInput({setNumerologyData} ) {

  function calculateLifeLesson(bday: string) {
    const bdayArray = bday.split("-");
    const year = bdayArray[0].split("");
    let yearSum = 0;
    year.forEach((num) => yearSum += parseInt(num));
    console.log(yearSum);
    const month = parseInt(bdayArray[1]);
    const day = parseInt(bdayArray[2]);
    setNumerologyData((prevState) => ({
      ll: yearSum + month + day, op: prevState.op, sn: prevState.sn, pod: prevState.pod
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

function NameInput({numerologyData, setNumerologyData} ) {
  
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

function NumerologyOutput({numerologyData, setNumerologyData}) {
  const lettersValue = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8, "i": 9, "j": 1, "k": 2, "l": 3, "m": 4, "n": 5, "o": 6, "p": 7, "q": 8, "r": 9, "s": 1, "t": 2, "u": 3, "v": 4, "w": 5, "x": 6, "y": 7, "z": 8};
  
  function handleNumerology() {
    const birthName = document.getElementById("birthName") as HTMLInputElement;
    calculateNameValue(birthName.value); 
  }
  function numReduction(num: number) {
    let newNum = num;
    while (newNum > 9) {
      newNum = newNum.toString().split("").reduce((acc, num) => acc + parseInt(num), 0);
    }
    return newNum;
  }
  function calculateNameValue(birthName: string) {
    let outerPersonality = 0;
    let soulNumber = 0;
    let pod = 0;

    const nName = birthName.toLowerCase();
    
    for (let i = 0; i < nName.length; i++) {
      const letter = nName[i];
      if (letter == "a" || letter == "e" || letter == "i" || letter == "o" || letter == "u") {
        soulNumber += lettersValue[letter];
      } else if (letter == "b" || letter == "c" || letter == "d" || letter == "f" || letter == "g" || letter == "h" || letter == "j" || letter == "k" || letter == "l" || letter == "m" || letter == "n" || letter == "p" || letter == "q" || letter == "r" || letter == "s" || letter == "t" || letter == "v" || letter == "w" || letter == "x" || letter == "y" || letter == "z") {
        outerPersonality += lettersValue[letter];
      }
    };
    
    pod = outerPersonality + soulNumber;

    setNumerologyData((prevState) => ({
      birthName: prevState.birthName, 
      dob: prevState.dob,
      ll: prevState.ll,
      op: outerPersonality.toString() + "/" + numReduction(outerPersonality).toString(),
      sn: soulNumber.toString() + "/" + numReduction(soulNumber).toString(),
      pod: pod.toString() + "/" + numReduction(pod).toString()
    }));

  }
  

    return (
      <div className="flex flex-col items-center gap-8">
        <button onClick={() => handleNumerology()}>Calculate</button>
        {numerologyData.ll !== 0 ? <h3>Life Lesson: {numerologyData.ll}</h3> : <h3>Life Lesson: </h3>}
        {numerologyData.op !== 0 ? <h3>OuterPersonality: {numerologyData.op}</h3> : <h3>OuterPersonality: </h3>}
        {numerologyData.sn !== 0 ? <h3>Soul Number: {numerologyData.sn}</h3> : <h3>Soul Number: </h3>}
        {numerologyData.pod !== 0 ? <h3>Path Of Destiny: {numerologyData.pod}</h3> : <h3>Path Of Destiny: </h3>}
      </div>
    );
}

