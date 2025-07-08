import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResumeContainer = styled(Paper)`
  display: flex;
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
`;

const LeftColumn = styled(Box)`
  width: 35%;
  background: #2f3b4c;
  color: white;
  padding: 2rem 1rem;
`;

const RightColumn = styled(Box)`
  width: 65%;
  padding: 2rem;
`;

const ProfilePhoto = styled('img')`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Section = styled(Box)`
  margin-bottom: 2rem;
`;

const BulletList = styled('ul')`
  padding-left: 1rem;
  margin: 0;
`;

const ResumeTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    projects = []
  } = data || {};

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    if (month && year) {
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${monthName} ${year}`;
    }
    return dateString;
  };

  return (
    <ResumeContainer>
      <LeftColumn>
        <Box display="flex" flexDirection="column" alignItems="center">
          {personalInfo.photo && (
            <ProfilePhoto src={personalInfo.photo} alt={personalInfo.fullName} />
          )}
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
            {personalInfo.fullName}
          </Typography>
          <Typography variant="body2" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            {personalInfo.title}
          </Typography>
        </Box>

        <Section className=' mt-'>
          <Typography className=' mb-3' variant="subtitle1" gutterBottom>Contact</Typography>
          <hr />
          <Typography className=' mb-3' variant="body2">Phone <br />{personalInfo.phone}</Typography>
          <Typography className=' mb-3' variant="body2">Email <br /> {personalInfo.email}</Typography>
          <Typography className=' mb-3' variant="body2">Location <br /> {personalInfo.location}</Typography>
        </Section>

        <Section>
          <Typography className=' mb-3' variant="subtitle1" gutterBottom>Education</Typography>
          <hr />
          {education.map((edu, i) => (
            <Box key={i} mb={1}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>{edu.startDate}</Typography>
              <Typography variant="body2">{edu.degree}</Typography>
              <Typography variant="body2">{edu.school}</Typography>
            </Box>
          ))}
        </Section>

        <Section>
          <Typography className=' mb-3' variant="subtitle1" gutterBottom>Expertise</Typography>
          <hr />
          <BulletList>
            {skills.map((skill, i) => (
              <li key={i}><Typography variant="body2">{skill}</Typography></li>
            ))}
          </BulletList>
        </Section>

        <Section>
          <Typography className=' mb-3' variant="subtitle1" gutterBottom>Language</Typography>
          <hr />
          <BulletList>
            {languages.map((lang, i) => (
              <li key={i}><Typography variant="body2">{lang.language}</Typography></li>
            ))}
          </BulletList>
        </Section>
      </LeftColumn>

      <RightColumn>
        {personalInfo.summary && (
          <Section>
            <Typography variant="body1" gutterBottom>{personalInfo.summary}</Typography>
          </Section>
        )}

        {experience.length > 0 && (
          <Section>
            <Typography variant="h6" gutterBottom>Experience</Typography>
            <hr className='bg-black mt-6' />
            {experience.map((exp, i) => (
              <Box key={i} mb={2}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>{exp.position}</Typography>
                <Typography variant="body2">{exp.company}</Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{exp.description}</Typography>
              </Box>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section>
            <Typography variant="h6" gutterBottom>Projects</Typography>
            <hr className='bg-black mt-6' />
            {projects.map((project, i) => (
              <Box key={i} mb={2}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{project.name}</Typography>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Technologies: {project.technologies}
                </Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                  {project.description}
                </Typography>
              </Box>
            ))}
          </Section>
        )}

        {references.length > 0 && (
          <Section>
            <Typography variant="h6" gutterBottom>Reference</Typography>
            <Box display="flex" gap={4}>
              {references.map((ref, i) => (
                <Box key={i}>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>{ref.name}</Typography>
                  <Typography variant="body2">{ref.position}</Typography>
                  <Typography variant="body2">📞 {ref.phone}</Typography>
                  <Typography variant="body2">✉️ {ref.email}</Typography>
                </Box>
              ))}
            </Box>
          </Section>
        )}
      </RightColumn>
    </ResumeContainer>
  );
};

export default ResumeTemplate;
