import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './styles.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import background images
import ProjectsBg from './assets/backgrounds/Fletschhorn v2 TimeShifted.jpg';
import PublicationsBg from './assets/backgrounds/Fletschhorn v2 TimeShifted-3 (dragged).jpg';
import AboutMe from './pages/AboutMe';
import CeramicsPage from './pages/AboutPages/CeramicsPage';
import MissionStatementPage from './pages/AboutPages/MissionStatementPage';
import PhilosophyPage from './pages/AboutPages/PhilosophyPage';
import ProfessionPage from './pages/AboutPages/ProfessionPage';
import Education from './pages/Education';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Resume from './pages/Resume';
import theme from './theme';

const backgroundImages = {
  projects: ProjectsBg,
  publications: PublicationsBg,
  education: ProjectsBg,
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
              <Route path="/about/ceramics" element={<CeramicsPage />} />
              <Route path="/about/philosophy" element={<PhilosophyPage />} />
              <Route path="/about/mission" element={<MissionStatementPage />} />
              <Route path="/about/profession" element={<ProfessionPage />} />
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
