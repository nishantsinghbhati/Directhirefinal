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
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Creative and detail-oriented Frontend Developer with 4+ years of experience building responsive, accessible, and user-centric web applications using React and modern JavaScript frameworks.",
    linkedin: "https://linkedin.com/in/alexjohnson",
    photo: "https://randomuser.me/api/portraits/men/75.jpg", // realistic sample profile photo
  },
  experience: [
    {
      position: "Frontend Developer",
      company: "Innovate Labs",
      startDate: "2021-05",
      endDate: "Present",
      description: `- Developed and maintained scalable React applications.\n- Optimized page load speed by 35%.\n- Collaborated closely with design teams to implement modern UI/UX patterns.`,
    },
    {
      position: "Junior Frontend Developer",
      company: "Web Creators",
      startDate: "2019-08",
      endDate: "2021-04",
      description: `- Assisted in building responsive websites for clients.\n- Integrated REST APIs with frontend components.\n- Ensured cross-browser compatibility and accessibility.`,
    },
  ],
  projects: [
    {
      name: "Portfolio Website",
      startDate: "2023-01",
      endDate: "2023-03",
      technologies: "Next.js, Tailwind CSS, Framer Motion",
      description: "Developed a personal portfolio website showcasing projects, blogs, and resume downloads with SEO optimization and animation-rich user interface.",
    },
    {
      name: "E-commerce Platform",
      startDate: "2022-06",
      endDate: "2022-11",
      technologies: "React, Redux, Node.js, Stripe",
      description: "Built a full-stack e-commerce platform with secure payment integration, admin dashboard, and dynamic product listings.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science",
      field: "Computer Science",
      school: "University of California, Berkeley",
      startDate: "2015-09",
      endDate: "2019-06",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "TypeScript",
    "Next.js",
    "HTML & CSS",
    "Redux",
    "Git",
    "Responsive Design",
    "API Integration",
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Intermediate" },
  ],
};


const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  return (
    <Box sx={{ py: 5 }} >
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