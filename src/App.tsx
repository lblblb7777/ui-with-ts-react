import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Hello from './Components/Hello';
import MouseTracker from "./Components/MouseTracker";
import useMousePosition from './hooks/useMousePosition'

interface IThemeProps {
  [key: string]: {color: string, background: string;}
}
const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}
export const ThemeContext = React.createContext(themes.light)

function App() {
  const positions = useMousePosition()
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.light} >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>X: {positions.x}, Y:{positions.y}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <MouseTracker />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
