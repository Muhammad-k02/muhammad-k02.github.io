import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';

import DropdownMenu from '../components/DropdownMenu';
import { projects } from '../config/projectData';
import logger from '../utils/logger';
import { backgroundImagePropType } from '../utils/propValidation';

const MotionDialog = motion(Dialog);
const MotionCard = motion(Card);

const Projects = ({ backgroundImage }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDialogOpen = useCallback((project) => {
    logger.info('Opening project dialog:', project.title);
    setSelectedProject(project);
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    logger.info('Closing project dialog');
    setDialogOpen(false);
    setSelectedProject(null);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      {backgroundImage && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 0,
            filter: 'brightness(0.5) blur(2px)',
          }}
        />
      )}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: 4,
        }}
      >
        <DropdownMenu />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 300,
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Projects
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: project.id * 0.2 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => handleDialogOpen(project)}
              >
                <CardContent>
                  <Typography variant="h5">{project.title}</Typography>
                  <Typography variant="body2">{project.shortDescription}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        <AnimatePresence>
          {dialogOpen && selectedProject && (
            <MotionDialog
              open={dialogOpen}
              onClose={handleDialogClose}
              maxWidth="md"
              fullWidth
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogTitle>
                {selectedProject.title}
                <IconButton
                  onClick={handleDialogClose}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1">{selectedProject.fullDescription}</Typography>
                <Button
                  variant="outlined"
                  href={selectedProject.github}
                  target="_blank"
                  sx={{ mt: 2 }}
                >
                  View on GitHub
                </Button>
              </DialogContent>
            </MotionDialog>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

Projects.propTypes = {
  backgroundImage: backgroundImagePropType,
};

export default Projects;
