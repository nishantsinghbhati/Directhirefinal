import { memo } from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';

function LivePreview({ formData }) {
  const { personalInfo, experience, education, skills } = formData;

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
    <Box sx={{ p: 3, maxHeight: '100%', overflow: 'auto', height: '100%', flexGrow: 1 }}>
      {/* Header with Photo and Personal Info */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        {personalInfo && personalInfo.photo && (
          <Avatar
            src={personalInfo.photo}
            alt={personalInfo.fullName}
            sx={{ width: 50, height: 50 }}
          />
        )}
        <Box>
          <Typography variant="h4" gutterBottom>
            {personalInfo && personalInfo.fullName || 'Your Name'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {personalInfo && personalInfo.email || 'your.email@example.com'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {personalInfo && personalInfo.phone || 'Your Phone'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {personalInfo && personalInfo.location || 'Your Location'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
             {personalInfo && personalInfo.linkedin ? (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {personalInfo.linkedin}
                </a>
              ) : 'Your LinkedIn Profile'}
            </Typography>
        </Box>
      </Box>

      {/* Summary */}
      {personalInfo && personalInfo.summary && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Professional Summary
          </Typography>
          <Typography variant="body1" paragraph>
            {personalInfo.summary}
          </Typography>
        </Box>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Work Experience
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {exp.position || 'Position'}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {exp.company || 'Company'} {exp.duration && `| ${exp.duration}`}
              </Typography>
              <Typography variant="body2" paragraph>
                {exp.description || 'Description'}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.degree || 'Degree'}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {edu.school || 'School'} {edu.year && `| ${edu.year}`}
              </Typography>
              <Typography variant="body2" paragraph>
                {edu.description || 'Description'}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Grid container spacing={1}>
            {skills.map((skill, index) => (
              <Grid item key={index}>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {skill || 'Skill'}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default memo(LivePreview); 
