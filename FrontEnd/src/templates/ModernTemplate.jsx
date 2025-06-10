import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResumeContainer = styled(Paper)`
  padding: 2rem;
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Photo = styled('img')`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const ContactInfo = styled(Box)`
  flex: 1;
`;

const Section = styled(Box)`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 0.25rem;
`;

const ExperienceItem = styled(Box)`
  margin-bottom: 1rem;
`;

const SkillsList = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillChip = styled(Box)`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
`;

const ModernTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = [], languages = [] } = data || {};

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Assuming dateString is in 'YYYY-MM' format
    const [year, month] = dateString.split('-');
    const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
     // Add null checks for month and year
    if (month && year) {
        const monthName = monthNames[parseInt(month, 10) - 1];
        return `${monthName} ${year}`;
    }
    return dateString; // Return original string if format is unexpected
  };

  return (
    <ResumeContainer>
      <Header>
        {personalInfo.photo && (
          <Photo src={personalInfo.photo} alt={personalInfo.fullName} />
        )}
        <ContactInfo>
          <Typography variant="h4" gutterBottom>
            {personalInfo.fullName || ''}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {personalInfo.email || ''} • {personalInfo.phone || ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             {personalInfo.location}
          </Typography>
          {personalInfo.linkedin && (
            <Typography variant="body2" color="text.secondary">
              🔗 <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {personalInfo.linkedin}
              </a>
            </Typography>
          )}
        </ContactInfo>
      </Header>

      {personalInfo.summary && (
        <Section>
          <Typography variant="h6" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1976d2', marginBottom: '0.5rem', borderBottom: '2px solid #1976d2', paddingBottom: '0.25rem' }}>Professional Summary</Typography>
          <Typography variant="body1">{personalInfo.summary}</Typography>
        </Section>
      )}

      {experience.length > 0 && (
        <Section>
          <Typography variant="h6" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1976d2', marginBottom: '0.5rem', borderBottom: '2px solid #1976d2', paddingBottom: '0.25rem' }}>Work Experience</Typography>
          {experience.map((exp, index) => (
            <ExperienceItem key={index}>
              <Typography variant="h6">{exp.position}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {exp.company} • {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
              </Typography>
              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                {exp.description}
              </Typography>
            </ExperienceItem>
          ))}
        </Section>
      )}

      {data.projects && data.projects.length > 0 && (
        <Section>
          <Typography variant="h6" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1976d2', marginBottom: '0.5rem', borderBottom: '2px solid #1976d2', paddingBottom: '0.25rem' }}>Projects</Typography>
          {data.projects.map((project, index) => (
            <ExperienceItem key={index}>
              <Typography variant="h6">{project.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Technologies: {project.technologies}
              </Typography>
              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                {project.description}
              </Typography>
            </ExperienceItem>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section>
          <Typography variant="h6" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1976d2', marginBottom: '0.5rem', borderBottom: '2px solid #1976d2', paddingBottom: '0.25rem' }}>Education</Typography>
          {education.map((edu, index) => (
            <ExperienceItem key={index}>
              <Typography variant="h6">{edu.degree}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {edu.school} • {edu.field}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </Typography>
            </ExperienceItem>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section>
          <Typography variant="h6" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1976d2', marginBottom: '0.5rem', borderBottom: '2px solid #1976d2', paddingBottom: '0.25rem' }}>Skills</Typography>
          <SkillsList>
            {skills.map((skill, index) => (
              <SkillChip key={index}>{skill}</SkillChip>
            ))}
          </SkillsList>
        </Section>
      )}

      {languages.length > 0 && (
        <Section>
          <Typography variant="h6" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1976d2', marginBottom: '0.5rem', borderBottom: '2px solid #1976d2', paddingBottom: '0.25rem' }}>Languages</Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {languages.map((lang, index) => (
              <Box key={index}>
                <Typography variant="body1">
                  {lang.language} - {lang.proficiency}
                </Typography>
              </Box>
            ))}
          </Box>
        </Section>
      )}
    </ResumeContainer>
  );
};

export default ModernTemplate; 