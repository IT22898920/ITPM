import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TranslationApp from "./translator/Translator";
import TTS from "./components/TTS/TTS";
import STT from "./components/STT/STT";
import Header from './Header/Navbar';

import Phasebook from "./components/Phasebook/Phasebook";
import AddPhase from "./components/Phasebook/AddPhase";
import ViewPhase from "./components/Phasebook/ViewPhase";
import EditPhase from "./components/Phasebook/EditPhase";
import Login from "./components/UserLogin/Login";
import Signup from "./components/UserLogin/Signup";
import AddSynonyms from "./similar&opposite/AddSynonyms/AddSynonyms";
import UpdateSynonyms from "./similar&opposite/UpdateSynonyms/UpdateSynonyms";
import AddAntonyms from "./similar&opposite/AddAntonyms/AddAntonyms";
import UpdateAntonyms from "./similar&opposite/UpdateAntonyms/UpdateAntonyms";
import Synonyms from "./similar&opposite/Synonyms";
import Antonyms from "./similar&opposite/Antonyms";
import Keyword_extractor from "./components/Keyword/Keyword_extractor";


function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<TranslationApp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="tts" element={<TTS />} />
          <Route path="stt" element={<STT />} />
          <Route path="/viewphasebook" element={<ViewPhase />} />
          <Route path="/phasebook" element={<Phasebook />} />
          <Route path="/addphase" element={<AddPhase />} />
          <Route path="/editphase/:id" element={<EditPhase />} />
          <Route path="/synonym" exact element={<Synonyms />} />
          <Route path="/antonym" exact element={<Antonyms />} />
          <Route path="/addSynonyms" exact element={<AddSynonyms />} />
          <Route path="/updateSynonyms" exact element={<UpdateSynonyms />} />
          <Route path="/addAntonyms" exact element={<AddAntonyms />} />
          <Route path="/updateAntonyms" exact element={<UpdateAntonyms />} />
          {/* <Route path="/key" exact element={<Keyword_extractor />} /> */}
          <Route path="/key" exact element={<Keyword_extractor />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
