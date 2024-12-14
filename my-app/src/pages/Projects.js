import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownMenu from '../components/DropdownMenu';
import RainBackground from '../components/RainBackground';

const MotionDialog = motion(Dialog);
const MotionCard = motion(Card);

const Projects = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Sensitive Media Analysis",
      shortDescription: "Creating a Machine Leaning Model Capable of Understanding Violence in Media",
      fullDescription: "This study aims to develop AI models capable of detecting violence in digital media. Currently, there is a lack of effective automated tools for identifying sensitive content like graphic violence, hate speech, and misinformation online. This poses serious risks, especially to vulnerable groups like children and marginalized communities. Current moderation methods rely heavily on human reviewers, which can be subjective, biased, and prone to errors. This study aims to create AI algorithms that mimic human behavior in detecting violence, improving content moderation on social media platforms. By leveraging advanced algorithms, we aim to enhance the accuracy and efficiency of detecting harmful content, making online spaces safer for everyone.",
      github: "https://github.com/Muhammad-k02/Sensitive-Media-Analysis",
      technologies: ["Pyton", "TensorFlow", "OpenCV", "MMLabs"],
    },
    {
      title: "Minijs Parser and Interpreter",
      shortDescription: "Calculator that can parse natural language",
      fullDescription: "For our team project, we developed a front end for a Scala-based interpreter/REPL for MiniJS, a simple imperative programming language. Our work focused on the compilation toolchain, implementing lexical analysis (tokenization) and syntax analysis (parsing) using Extended Backus-Naur Form (EBNF) and Scala parser combinators. We extended the MiniJS grammar to support imperative constructs, including variable assignments, blocks, conditionals, loops, and field-based data structures. The project involved creating an abstract syntax tree (AST) to represent these constructs, implementing a JSON converter to serialize ASTs, and building an unparser to convert ASTs back to human-readable code. Additionally, we wrote extensive tests to ensure the accuracy of our parser, unparser, and REPL, adhering to proper formatting and handling both correct and incorrect syntax. Through this, we gained proficiency in domain modeling with algebraic data types, structural recursion, and leveraging Scala’s APIs for parsing and functional programming.",
      github: "https://github.com/Muhammad-k02/minijs-parser-and-interpreter",
      technologies: ["Scala", "MiniJS", "Scala Parser Combinators", "Scala Test"],
    },
    {
      title: "Software Engineering Project: Health Club System",
      shortDescription: "For COMP 330: Software Engineering, we had to create a member registration system for a Health Club. This project was built from the ground up, from requirement engineering, to use case modeling to actual implementation.",
      fullDescription: "A SoftEng health club that is in the process of clarifying the requirements for a new management system aimed at ensuring a seamless experience for both members and staff. The system will encompass various key components, including membership registration, member check-in, class registration, class cancellation, membership renewal, membership cancellation/application, manager's inactivity report and usage report. Membership registration will involve members providing their personal information, signing a waiver, and receiving a unique membership ID. The health club offers three membership options (Green, Purple, and Blue), each differing in terms of costs and duration. Upon entering the club, members will scan their ID cards, allowing staff and club managers to access their information and generate a membership transcript. The system will also verify the status of a member's credit card, subscription, and ID. In the event of expiration, the system can automatically charge the credit card on file, or members can renew their subscription on the spot. Once granted access, a screen will display the available gym classes for the member's selection. If a member decides to cancel their subscription or class, they can do so either in person or through the app. Access to the gym facilities will be permitted until the subscription's expiration date. The system will update the member's profile to confirm the cancellation and trigger a survey to collect feedback regarding the cancellation process.",
      github: "https://github.com/Muhammad-k02/minijs-parser-and-interpreter",
      technologies: ["Java", "JavaFX", "MySQL", "JavaFX"],
    }
  ];

  const handleDialogOpen = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh', 
      width: '100%', 
      overflow: 'hidden', 
      backgroundColor: 'transparent' 
    }}>
      <RainBackground />
      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        py: 4 
      }}>
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
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Projects
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#E6E6E1',
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                      mb: 2,
                      textShadow: '0 0 5px rgba(144, 202, 249, 0.3), 0 0 10px rgba(144, 202, 249, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#90caf9',
                        textShadow: '0 0 10px rgba(144, 202, 249, 0.6), 0 0 20px rgba(144, 202, 249, 0.4), 0 0 30px rgba(144, 202, 249, 0.3)'
                      }
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Box sx={{ position: 'relative', mt: 2 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        display: 'inline',
                        mr: 1
                      }}
                    >
                      {project.shortDescription.substring(0, 150)}...
                    </Typography>
                    <Button
                      onClick={() => handleDialogOpen(project)}
                      sx={{
                        color: '#90caf9',
                        textTransform: 'none',
                        fontWeight: 600,
                        display: 'inline',
                        padding: '0 4px',
                        minWidth: 'auto',
                        verticalAlign: 'baseline',
                        '&:hover': {
                          background: 'rgba(144, 202, 249, 0.08)',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Read More →
                    </Button>
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Technologies: {project.technologies.join(', ')}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

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
                {selectedProject && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <DialogTitle sx={{ pr: 6 }}>
                      <Typography 
                        component="a"
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: '#E6E6E1',
                          textDecoration: 'none',
                          textShadow: '0 0 5px rgba(144, 202, 249, 0.3), 0 0 10px rgba(144, 202, 249, 0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#90caf9',
                            textShadow: '0 0 10px rgba(144, 202, 249, 0.6), 0 0 20px rgba(144, 202, 249, 0.4), 0 0 30px rgba(144, 202, 249, 0.3)'
                          }
                        }}
                      >
                        {selectedProject.title}
                      </Typography>
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
                        <Typography variant="body1" sx={{ mb: 3 }}>
                          {selectedProject.fullDescription}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Technologies: {selectedProject.technologies.join(', ')}
                        </Typography>
                      </motion.div>
                    </DialogContent>
                  </motion.div>
                )}
              </MotionDialog>
            </>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Projects;
