import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import CaptionPage from "./CaptionPage";
import HashtagPage from "./HashtagPage";
import VideoPage from "./VideoPage";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* FIRST PAGE */}
        <Route path="/" element={<Login />} />

        {/* AFTER LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />   {/* ⭐ ADD THIS */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/captions" element={<CaptionPage />} />
        <Route path="/hashtags" element={<HashtagPage />} />
        <Route path="/videos" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;