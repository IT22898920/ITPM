import React, { useState } from 'react';
import axios from 'axios';
import './key.css'

function Keyword_extractor() {
    const [text, setText] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [error, setError] = useState('');
  
    const handleTextChange = (e) => {
      setText(e.target.value);
    };
  
    const handleExtractKeywords = async () => {
      try {
        const response = await axios.post('/extract_keywords', { text });
        setKeywords(response.data.keywords);
        setError('');
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred');
        setKeywords([]); // Clear any previously extracted keywords
      }
    };

  return (
    <div>
       <h1 className="top1-heading">
          Keyword &nbsp;
          <span style={{ color: "#368728", borderBottom: "2px solid #368728" }}>
            Extractor
          </span>
        </h1>
      <div className="textarea-container">
        <textarea
          className="textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here..."
        />
      </div>
      <div className="button-container">
        <button className="extract-button" onClick={handleExtractKeywords}>Extract Keywords</button>
      </div>
      {keywords.length > 0 && (
        <div>
          <h2>Keywords:</h2>
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Keyword_extractor;
