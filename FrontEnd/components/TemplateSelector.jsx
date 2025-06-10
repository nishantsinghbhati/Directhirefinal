import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ModernTemplate from '../src/templates/ModernTemplate';

import CreativeTemplate from '../src/templates/CreativeTemplate';

const TemplateCard = styled(Paper)(({ theme, selected }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: selected ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
  backgroundColor: '#1976d2',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const TemplatePreview = styled(Box)(({ theme }) => ({
  transformOrigin: 'top center',
  height: '297mm',
  width: '210mm',
  pointerEvents: 'none',
  border: '1px solid #e0e0e0',
  boxShadow: theme.shadows[2],
  backgroundColor: ' #1976d2',
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%) scale(0.4)',
}));

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with balanced spacing',
    component: ModernTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern Asymmetrical Design with Dynamic Header ',
    component: CreativeTemplate,
  },
];

const sampleData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    location: 'New York, NY',
    summary: 'Experienced professional with a strong background in technology and innovation.',
    photo: null,
  },
  experience: [
    {
      title: 'Senior Developer',
      company: 'Tech Corp',
      startDate: '2020',
      endDate: 'Present',
      description: 'Led development of key projects and mentored junior developers.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      school: 'University of Technology',
      startDate: '2016',
      endDate: '2020',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
};

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  return (
    <Box sx={{ py: 20 }} >
      <Typography variant="h4" component="h1"  gutterBottom align="center">
        Choose Your Resume Template
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Select a template that best represents your professional style
      </Typography>

    <Grid className='sm:flex items-center block  justify-center gap-6'  spacing={4}>
        {templates.map((template) => (
          <Grid className='pt-2.5 sm:pt-0' item xs={12} md={4} key={template.id}>
            <TemplateCard
              selected={selectedTemplate === template.id}
              onClick={() => onSelect(template.id)}
              elevation={selectedTemplate === template.id ? 4 : 1}
            >
              <Box sx={{ p: 2, bgcolor: ' #1976d2' }}>
                <Typography variant="h6" color="white" gutterBottom>
                  {template.name}
                </Typography>
                <Typography variant="body2" color="white" paragraph>
                  {template.description}
                </Typography>
                <Box 
                  sx={{ 
                    height: '500px', 
                    overflow: 'hidden', 
                    position: 'relative',
                    bgcolor: '#1976d2',
                    borderRadius: 1,
                    '&:hover': {
                      '& .template-preview': {
                        transform: 'translateX(-50%) scale(0.42)',
                        transition: 'transform 0.3s ease',
                      }
                    }
                  }}
                >
                  <TemplatePreview className="template-preview">
                    <template.component data={sampleData} />
                  </TemplatePreview>
                </Box>
              </Box>
            </TemplateCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TemplateSelector; 