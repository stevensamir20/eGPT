import { createContext, useState } from "react";
import "./main.scss";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Header } from "./components/Header";
import { Body } from "./components/Body";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Header />
        <Body />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
