import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TemplateSelector from '../components/TemplateSelector';

const DEFAULT_TEMPLATE = 'modern';

function Templates() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);

  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    localStorage.setItem('selectedTemplate', templateId);
    navigate('/resume-maker/resume-builder');
  };

  return (
    <>
      <Helmet>
        <title>Choose Template | Professional Resume Builder</title>
        <meta name="description" content="Select from our professional resume templates to create your perfect resume." />
      </Helmet>

      <IconButton
        onClick={() => navigate("/resume-maker")}
        color="primary"
        size="large"
        sx={{
          position: 'fixed',
          top: '6rem',
          left: '2rem',
          zIndex: 1000,
          background: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(-2px)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="lg">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={handleTemplateSelect}
        />
      </Container>
    </>
  );
}

export default Templates; 