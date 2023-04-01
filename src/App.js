import { Routes, Route } from "react-router-dom";
import "./main.scss";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { About } from "./components/About";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
