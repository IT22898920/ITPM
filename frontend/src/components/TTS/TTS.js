import React, { useState, useRef, useEffect } from "react";
import "./TTS.css"; // Importing the CSS file
import logo from "./logo.png";

function TTS() {
  const [inputText, setInputText] = useState("");
  const synthesisRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      setVoices(synth.getVoices());
    };
    updateVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = updateVoices;
    }
  }, []);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      synthesisRef.current = new SpeechSynthesisUtterance(inputText);
      const selectedVoice = voices.find((voice) => voice.name === "Google UK English Male");
      if (selectedVoice) {
        synthesisRef.current.voice = selectedVoice;
      }
      window.speechSynthesis.speak(synthesisRef.current);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  const handleStop = () => {
    if (synthesisRef.current && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleDownload = () => {
    if ("speechSynthesis" in window) {
      const audioBlob = new Blob([inputText], { type: "audio/mp4" });
      const url = URL.createObjectURL(audioBlob);
      console.log("Download URL:", url); // Log the URL to check if it's correct
      setAudioUrl(url); // Set the audio URL for playing
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "speech.mp4");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <div>
      <div className="heading-1">
        <h1 className="top-heading">
          Text &nbsp;
          <span style={{ color: "#368728", borderBottom: "2px solid #368728" }}>To Speech</span>
        </h1>
        <br />
        <textarea
          placeholder="Type here..."
          className="input-textarea"
          value={inputText}
          onChange={handleInputChange}
          rows={5}
          cols={50}
        />
        <br />
        <button className="btn" onClick={handleSpeak}>
          Speak
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="stop-btn" onClick={handleStop}>
          Stop
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn" onClick={handleDownload}>
          Download
        </button>
      </div>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
}

export default TTS;
