import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import theme from './theme';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./styles.css";
import WebGLBackground from './components/WebGLBackground';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Resume from './pages/Resume';
import AboutMe from './pages/AboutMe';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <WebGLBackground />
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <PageTransition>
                    <AboutMe />
                  </PageTransition>
                } 
              />
              <Route 
                path="/publications" 
                element={
                  <PageTransition>
                    <Publications />
                  </PageTransition>
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <PageTransition>
                    <Projects />
                  </PageTransition>
                } 
              />
              <Route 
                path="/education" 
                element={
                  <PageTransition>
                    <Education />
                  </PageTransition>
                } 
              />
              <Route 
                path="/resume" 
                element={
                  <PageTransition>
                    <Resume />
                  </PageTransition>
                } 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
