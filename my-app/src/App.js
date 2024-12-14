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
import Home from './pages/Home';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Resume from './pages/Resume';
import AboutMe from './pages/AboutMe';

// Import background images
import ProjectsBg from './assets/backgrounds/Fletschhorn v2 TimeShifted.jpg';
import PublicationsBg from './assets/backgrounds/Fletschhorn v2 TimeShifted-3 (dragged).jpg';
import EducationBg from './assets/backgrounds/Fletschhorn v2 TimeShifted.jpg';

const backgroundImages = {
  projects: ProjectsBg,
  publications: PublicationsBg,
  education: EducationBg
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutMe />} />
              <Route 
                path="/publications" 
                element={<Publications backgroundImage={backgroundImages.publications} />} 
              />
              <Route 
                path="/projects" 
                element={<Projects backgroundImage={backgroundImages.projects} />} 
              />
              <Route 
                path="/education" 
                element={<Education backgroundImage={backgroundImages.education} />} 
              />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
