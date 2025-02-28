"use client";
import { useState } from "react";


export default function Home() {
  const [fullName, setfullName] = useState("");
  const [birthday, setBirthday] = useState("");

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

function NameInput({ fullName, setfullName}) {

  function handleClick(fullNameElement: HTMLInputElement) {
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
        className="border border-black-300 rounded-md" onClick={() => handleClick(document.getElementById("fullname"))}>Change Name</button>
    </div>
  );
}