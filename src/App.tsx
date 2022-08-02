
import {Navigate, Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";

import {Character} from "./components/Character";
import {PageBrowser} from "./components/PageBrowser";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/characters"/>}/>
            <Route path="/characters" element={<PageBrowser/>}/>
            <Route path="/character" element={<Character/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
