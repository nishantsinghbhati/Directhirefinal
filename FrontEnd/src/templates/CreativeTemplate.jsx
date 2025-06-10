import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResumeContainer = styled(Paper)`
  padding: 2rem;
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
`;

const Sidebar = styled(Box)`
  background: #1a237e;
  color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const MainContent = styled(Box)`
  padding: 0 1rem;
`;

const Photo = styled('img')`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 2rem;
  display: block;
  border: 4px solid white;
`;

const Section = styled(Box)`
  margin-bottom: 2rem;
`;

const SectionTitle = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const MainSectionTitle = styled(Typography)`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a237e;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 3px solid #1a237e;
  padding-bottom: 0.5rem;
`;

const ExperienceItem = styled(Box)`
  margin-bottom: 1.5rem;
`;

const SkillsList = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillChip = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
`;

const CreativeTemplate = ({ data }) => {
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
      <Sidebar>
        {personalInfo.photo && (
          <Photo src={personalInfo.photo} alt={personalInfo.fullName} />
        )}
        <Typography variant="h5" align="center" gutterBottom>
          {personalInfo.fullName || ''}
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          {personalInfo.email || ''}
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          {personalInfo.phone || ''}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
             {data.personalInfo.location}
          </Typography>
          {data.personalInfo.linkedin && (
            <Typography variant="body2" color="text.secondary">
              🔗 <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {data.personalInfo.linkedin}
              </a>
            </Typography>
          )}
        </Box>

        {skills.length > 0 && (
          <Section>
            <SectionTitle>Skills</SectionTitle>
            <SkillsList>
              {skills.map((skill, index) => (
                <SkillChip key={index}>{skill}</SkillChip>
              ))}
            </SkillsList>
          </Section>
        )}

        {languages.length > 0 && (
          <Section>
            <SectionTitle>Languages</SectionTitle>
            {languages.map((lang, index) => (
              <Box key={index} mb={1}>
                <Typography variant="body2">
                  {lang.language} - {lang.proficiency}
                </Typography>
              </Box>
            ))}
          </Section>
        )}
      </Sidebar>

      <MainContent>
        {personalInfo.summary && (
          <Section>
            <Typography variant="h6" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: '#1a237e', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '3px solid #1a237e', paddingBottom: '0.5rem' }}>Professional Summary</Typography>
            <Typography variant="body1">{personalInfo.summary}</Typography>
          </Section>
        )}

        {experience.length > 0 && (
          <Section>
            <Typography variant="h6" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: '#1a237e', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '3px solid #1a237e', paddingBottom: '0.5rem' }}>Work Experience</Typography>
            {experience.map((exp, index) => (
              <ExperienceItem key={index}>
                <Typography variant="h6" color="primary">
                  {exp.position}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
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
            <Typography variant="h6" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: '#1a237e', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '3px solid #1a237e', paddingBottom: '0.5rem' }}>Projects</Typography>
            {data.projects.map((project, index) => (
              <ExperienceItem key={index}>
                <Typography variant="h6" color="primary">
                  {project.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
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
            <Typography variant="h6" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: '#1a237e', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '3px solid #1a237e', paddingBottom: '0.5rem' }}>Education</Typography>
            {education.map((edu, index) => (
              <ExperienceItem key={index}>
                <Typography variant="h6" color="primary">
                  {edu.degree}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {edu.school} • {edu.field}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
              </ExperienceItem>
            ))}
          </Section>
        )}
      </MainContent>
    </ResumeContainer>
  );
};

export default CreativeTemplate; 