import React, { useState, useRef } from "react";
import './STT.css';
import logo from "./logo.png";

export default function STT() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleToggleListen = () => {
    setIsListening((prevState) => !prevState);
    if (!isListening) {
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new window.SpeechRecognition();
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };

      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(transcript)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  const handleRestart = () => {
    setTranscript("");
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const handleResume = () => {
    recognitionRef.current.start();
    setIsListening(true);
  };

  return (
    <div>
      <div className="heading-1">
        <h1 className="top-heading">
          Speech &nbsp;
          <span style={{ color: "#368728", borderBottom: "2px solid #368728" }}>
            To text
          </span>
        </h1>
        
        <textarea
          className="input-textarea"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Type here..."
          rows={5}
          cols={50}
        />
        <br />
        <button className="btn" onClick={handleToggleListen}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn" onClick={handleCopyText}>
          Copy Text
        </button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn" onClick={handleRestart}>
          Restart
        </button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn" onClick={handleResume}>
          Resume
        </button>
        <p>{transcript}</p>
      </div>
    </div>
  );
}
