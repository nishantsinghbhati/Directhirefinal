import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import html2pdf from 'html2pdf.js';
import { renderToString } from 'react-dom/server';

import ResumeForm from '../components/ResumeForm';
import ModernTemplate from '../src/templates/ModernTemplate';

import CreativeTemplate from '../src/templates/CreativeTemplate';

const PageContainer = styled(Box)`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 6rem 0;
`;

const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormSection = styled(Box)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PreviewSection = styled(Box)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 2rem;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
`;

const PreviewContainer = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  position: relative;

  & > * {
    transform-origin: top center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) scale(0.6);
    width: 166.67%;
    height: 166.67%;
  }

  @media (max-width: 1200px) {
    & > * {
      transform: translateX(-50%) scale(0.5);
      width: 200%;
      height: 200%;
    }
  }

  @media (max-width: 900px) {
    & > * {
      transform: translateX(-50%) scale(0.4);
      width: 250%;
      height: 250%;
    }
  }

  @media (max-width: 600px) {
    & > * {
      transform: translateX(-50%) scale(0.35);
      width: 285.71%;
      height: 285.71%;
    }
  }

  @media (max-width: 400px) {
    & > * {
      transform: translateX(-50%) scale(0.3);
      width: 333.33%;
      height: 333.33%;
    }
  }
`;

const DownloadButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
  }
`;

const BackButton = styled(IconButton)`
  position: fixed;
  top: 6rem;
  left: 2rem;
  z-index: 2;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  }
`;

const templates = {
  modern: ModernTemplate,
  creative: CreativeTemplate,
};

const DEFAULT_TEMPLATE = 'modern';

const defaultFormData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    photo: null,
    linkedin: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: []
};

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);

  useEffect(() => {
    const savedResume = localStorage.getItem('resumeData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedResume) {
      try {
        const parsedData = JSON.parse(savedResume);
        setFormData({
          ...defaultFormData,
          ...parsedData,
          personalInfo: {
            ...defaultFormData.personalInfo,
            ...(parsedData.personalInfo || {}),
            linkedin: parsedData.personalInfo?.linkedin || ''
          },
          experience: parsedData.experience || [],
          education: parsedData.education || [],
          skills: parsedData.skills || [],
          languages: parsedData.languages || [],
          projects: parsedData.projects || []
        });
      } catch (error) {
        console.error('Error loading saved resume:', error);
        toast.error('Error loading saved resume data');
        setFormData(defaultFormData);
      }
    }
    
    if (savedTemplate && templates[savedTemplate]) {
      setSelectedTemplate(savedTemplate);
    } else {
      setSelectedTemplate(DEFAULT_TEMPLATE);
      localStorage.setItem('selectedTemplate', DEFAULT_TEMPLATE);
    }
  }, []);

  const handleFormDataChange = (newData) => {
    setFormData(newData);
    localStorage.setItem('resumeData', JSON.stringify(newData));
  };

  const handleBack = () => {
    navigate('templates');
  };

  const handleDownload = async () => {
    try {
      const TemplateComponent = templates[selectedTemplate] || templates[DEFAULT_TEMPLATE];
      
      const htmlContent = renderToString(<TemplateComponent data={formData} />);
      
      const opt = {
        margin: 0,
        filename: `${formData.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
          windowWidth: 794,
          windowHeight: 1123,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
        }
      };
      
      await html2pdf().set(opt).from(htmlContent).save();
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download resume. Please try again.');
    }
  };

  const TemplateComponent = templates[selectedTemplate] || templates[DEFAULT_TEMPLATE];

  return (
    <PageContainer>
      <BackButton onClick={handleBack} color="primary" size="large">
        <ArrowBackIcon />
      </BackButton>
      <ContentContainer maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <FormSection>
              <Typography variant="h4" gutterBottom>
                Build Your Resume
              </Typography>
              <ResumeForm
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            </FormSection>
          </Grid>
          <Grid item xs={12} md={5}>
            <PreviewSection>
              <Typography variant="h5" gutterBottom>
                Live Preview
              </Typography>
              <PreviewContainer>
                <TemplateComponent data={formData} />
              </PreviewContainer>
            </PreviewSection>
          </Grid>
        </Grid>
        <DownloadButton
          variant="contained"
          color="primary"
          onClick={handleDownload}
          startIcon={<DownloadIcon />}
        >
          Download PDF
        </DownloadButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default ResumeBuilder;
