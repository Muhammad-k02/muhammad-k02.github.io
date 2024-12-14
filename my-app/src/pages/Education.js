import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Collapse,
  Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import DropdownMenu from '../components/DropdownMenu';
import WebGLBackground from '../components/WebGLBackground';

const MotionDialog = motion(Dialog);
const MotionCard = motion(Card);

const Education = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const education = [
    {
      school: "Loyola University Chicago",
      degree: "Bachelor of Science in Computer Science",
      year: "2020-2025",
      description: "A comprehensive study in computer science with a focus on artificial intelligence and machine learning. Key achievements include:\n\n" +
        "• Maintained a 3.9+ GPA throughout the program\n" +
        "• Completed advanced coursework in Neural Networks and Deep Learning\n" +
        "• Conducted research on spread of misinformation and violence detection\n" +
        "• First Author of a research paper on Misinformation\n" +
        "• Received the Dean's List recognition for all semesters",
      achievements: [
        "Dean's List Scholar (All Semesters)",
        "David Prasse Scholarship (2021- 2025)"
      ]
    },
    // Add more education entries here
  ];

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDialogOpen = (edu) => {
    setSelectedEducation(edu);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu />
      <WebGLBackground />
      <Box sx={{ 
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent'
      }}>
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100vh',
            padding: { xs: '20px', md: '40px' },
            color: '#E6E6E1'
          }}
        >
          <Container maxWidth="lg">
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
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Education
              </Typography>
            </motion.div>
            
            {education.map((edu, index) => (
              <MotionCard 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                sx={{
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `
                      0 4px 30px rgba(0, 0, 0, 0.4),
                      0 0 30px rgba(255, 255, 255, 0.3)
                    `,
                    background: 'rgba(255, 255, 255, 0.35)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {edu.school}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {edu.degree}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {edu.year}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" paragraph>
                      {edu.description.split('\n\n')[0]}
                    </Typography>
                    
                    <Button
                      onClick={() => handleDialogOpen(edu)}
                      sx={{
                        color: '#90caf9',
                        textTransform: 'none',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            ))}
          </Container>
        </Box>

        <AnimatePresence>
          {dialogOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleDialogClose}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  zIndex: 1299
                }}
              />
              <MotionDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="md"
                fullWidth
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                PaperProps={{
                  sx: {
                    background: 'rgba(23, 23, 23, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    boxShadow: `
                      0 4px 30px rgba(0, 0, 0, 0.3),
                      inset 0 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                    color: '#E6E6E1',
                    zIndex: 1300
                  }
                }}
              >
                {selectedEducation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <DialogTitle sx={{ pr: 6 }}>
                      {selectedEducation.school}
                      <IconButton
                        onClick={handleDialogClose}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          {selectedEducation.degree}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          {selectedEducation.year}
                        </Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
                          {selectedEducation.description}
                        </Typography>
                        {selectedEducation.achievements && (
                          <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                              Achievements
                            </Typography>
                            {selectedEducation.achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                              >
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  • {achievement}
                                </Typography>
                              </motion.div>
                            ))}
                          </Box>
                        )}
                      </motion.div>
                    </DialogContent>
                  </motion.div>
                )}
              </MotionDialog>
            </>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default Education;
