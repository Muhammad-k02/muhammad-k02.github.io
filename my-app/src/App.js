import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './styles.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

// Import background images
import ProjectsBg from './assets/backgrounds/Fletschhorn v2 TimeShifted.jpg';
import PublicationsBg from './assets/backgrounds/Fletschhorn v2 TimeShifted-3 (dragged).jpg';
import LoadingFallback from './components/LoadingFallback';
import theme from './theme';
import { preloadResources } from './utils/performanceUtils';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const AboutMe = React.lazy(() => import('./pages/AboutMe'));
const CeramicsPage = React.lazy(() => import('./pages/AboutPages/CeramicsPage'));
const ProfessionPage = React.lazy(() => import('./pages/AboutPages/ProfessionPage'));
const MissionStatementPage = React.lazy(() => import('./pages/MissionStatementPage'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Publications = React.lazy(() => import('./pages/Publications'));
const Education = React.lazy(() => import('./pages/Education'));
const Resume = React.lazy(() => import('./pages/Resume'));

const backgroundImages = {
  projects: ProjectsBg,
  publications: PublicationsBg,
  education: ProjectsBg,
};

// Preload critical resources
const criticalResources = [
  ProjectsBg,
  PublicationsBg,
  '/assets/about/ceramics-preview.png',
  '/assets/about/profession-preview.png',
  '/assets/about/mission-preview.jpeg'
];

function App() {
  useEffect(() => {
    preloadResources(criticalResources);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/about/ceramics" element={<CeramicsPage />} />
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
            </Suspense>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
