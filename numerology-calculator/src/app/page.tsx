"use client";
import { useState } from "react";


export default function Home() {
  const [fullName, setfullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [numerology, setNumerology] = useState({ll: 0, op: 0, sn: 0, pod: 0});
  
  return (
      <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-center">Numerology Calculator</h1>
      <Directions/>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <NameInput fullName={fullName} setfullName={setfullName}/>
          {fullName && <p>Your selected name is: {fullName}</p>}
          <BirthdayInput birthday={birthday} setBirthday={setBirthday}/>
          {birthday && <p>Your selected birthday is: {birthday}</p>}
        </div>
      </div>
      <NumerologyOutput fullName={fullName} birthday={birthday} numerology={numerology} setNumerology={setNumerology} />
    </div>
  );
}

function Directions() {
  return (
    <div className="flex flex-col items-center gap-8">
      <p>Please Input your Birthday and full name.</p>
      <p>For your name you have two options when finding your numerology numbers:</p>
      <ul>
        <li>1. Use the full name you were given at birth.</li>
        <li>2. Use the full name you prefer to go by (nicknames etc).</li>
      </ul>
      <p>#TODO# Reasons for full name at birth vs. preferential name.</p>
    </div>
  )
}

function BirthdayInput({ birthday, setBirthday}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <label htmlFor="birthday">Birthday</label>
      <input
        type="date"
        id="birthday"
        name="birthday"
        className="p-2 border border-gray-300 rounded-md"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />     
    </div>
  );
}

function NameInput({setfullName}) {

  function handleClick() {
    let fullNameElement = document.getElementById("fullname") as HTMLInputElement;
    if (!fullNameElement || fullNameElement.value === "") {
        return;
    } 
    setfullName(fullNameElement.value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label htmlFor="fullName">Full Name</label>
      <input 
        type="text" 
        id="fullname" 
        name="fullname"
        className="p-2 border border-gray-300"
        defaultValue=""
      />
      <button 
        id="namebutton" 
        className="border border-black-300 rounded-md" onClick={() => handleClick()}>Change Name</button>
    </div>
  );
}

function NumerologyOutput({ fullName, birthday, numerology, setNumerology }) {
  const lettersValue = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8, "i": 9, "j": 1, "k": 2, "l": 3, "m": 4, "n": 5, "o": 6, "p": 7, "q": 8, "r": 9, "s": 1, "t": 2, "u": 3, "v": 4, "w": 5, "x": 6, "y": 7, "z": 8};
  
  function handleNumerology(fName: string, bDay: string) {
    calculateNameValue(fName);
    calculateLifeLesson(bDay); 
  }
  
  function calculateLifeLesson(bday: string) {
    let bdayArray = bday.split("-");
    let year = bdayArray[0].split("");
    let yearSum = 0;
    year.forEach((num) => yearSum += parseInt(num));
    console.log(yearSum);
    let month = parseInt(bdayArray[1]);
    let day = parseInt(bdayArray[2]);
    setNumerology((prevState) => ({
      ll: yearSum + month + day, op: prevState.op, sn: prevState.sn, pod: prevState.pod
    }))

  }

  function calculateNameValue(fName: string) {
    let outerPersonality = 0;
    let soulNumber = 0;
    let nName = fName.toLowerCase().replace(/\s/g, "");
    for (let i = 0; i < nName.length; i++) {
      let letter = nName[i];
      if (letter == "a" || letter == "e" || letter == "i" || letter == "o" || letter == "u") {
        soulNumber += lettersValue[letter];
      } else if (letter == "b" || letter == "c" || letter == "d" || letter == "f" || letter == "g" || letter == "h" || letter == "j" || letter == "k" || letter == "l" || letter == "m" || letter == "n" || letter == "p" || letter == "q" || letter == "r" || letter == "s" || letter == "t" || letter == "v" || letter == "w" || letter == "x" || letter == "y" || letter == "z") {
        outerPersonality += lettersValue[letter];
      } 
    };
    setNumerology((prevState) => ({
      ll: prevState.ll, op: outerPersonality, sn: soulNumber, pod: soulNumber + outerPersonality}));  
  }

  
  return (
    <div className="flex flex-col items-center gap-8">
      <button onClick={() => handleNumerology(fullName, birthday)}>Calculate</button>
      {numerology.ll !== 0? <h3>Life Lesson: {numerology.ll}</h3>: <h3>Life Lesson: </h3>}
      {numerology.op !== 0? <h3>OuterPersonality: {numerology.op}</h3>: <h3>OuterPersonality: </h3>}
      {numerology.sn !== 0? <h3>Soul Number: {numerology.sn}</h3>: <h3>Soul Number: </h3>}
      {numerology.pod !== 0? <h3>Path Of Destiny: {numerology.pod}</h3>: <h3>Path Of Destiny: </h3>}
    </div>
  );
}

