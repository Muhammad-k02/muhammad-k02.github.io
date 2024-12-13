import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./styles.css";
import WebGLBackground from './components/WebGLBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Resume from './pages/Resume';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <WebGLBackground />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
