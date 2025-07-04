import { useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { getBase64 } from '../src/utils/helpers';

const proficiencyLevels = [
  'Beginner',
  'Elementary',
  'Intermediate',
  'Upper Intermediate',
  'Advanced',
  'Fluent',
  'Native'
];

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

function ResumeForm({ formData, onFormDataChange }) {
  const navigate = useNavigate();

  // Initialize formData with default values if needed
  useEffect(() => {
    if (!formData || !formData.personalInfo) {
      onFormDataChange(defaultFormData);
      return;
    }

    const initializedData = {
      ...defaultFormData,
      ...formData,
      personalInfo: {
        ...defaultFormData.personalInfo,
        ...(formData.personalInfo || {})
      },
      experience: formData.experience || [],
      education: formData.education || [],
      skills: formData.skills || [],
      languages: formData.languages || [],
      projects: formData.projects || []
    };

    if (JSON.stringify(initializedData) !== JSON.stringify(formData)) {
      onFormDataChange(initializedData);
    }
  }, [formData, onFormDataChange]);

  const handlePersonalInfoChange = useCallback((field, value) => {
    const newData = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: value
      }
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const handleExperienceChange = useCallback((index, field, value) => {
    const newExperience = [...formData.experience];
    let formattedValue = value;
    if (field === 'startDate' || field === 'endDate') {
      formattedValue = value ? dayjs(value).format('YYYY-MM') : '';
    }
    newExperience[index] = {
      ...newExperience[index],
      [field]: formattedValue
    };
    const newData = {
      ...formData,
      experience: newExperience
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const addExperience = useCallback(() => {
    const newData = {
      ...formData,
      experience: [...formData.experience, { 
        company: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        description: '' 
      }]
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const removeExperience = useCallback((index) => {
    const newData = {
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index)
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const handleEducationChange = useCallback((index, field, value) => {
    const newEducation = [...formData.education];
    let formattedValue = value;
    if (field === 'startDate' || field === 'endDate') {
      formattedValue = value ? dayjs(value).format('YYYY-MM') : '';
    }
    newEducation[index] = {
      ...newEducation[index],
      [field]: formattedValue
    };
    const newData = {
      ...formData,
      education: newEducation
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const addEducation = useCallback(() => {
    const newData = {
      ...formData,
      education: [...formData.education, { 
        school: '', 
        degree: '', 
        startDate: '', 
        endDate: '', 
        description: '' 
      }]
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const removeEducation = useCallback((index) => {
    const newData = {
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const handleSkillsChange = useCallback((index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    const newData = {
      ...formData,
      skills: newSkills
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const addSkill = useCallback(() => {
    const newData = {
      ...formData,
      skills: [...formData.skills, '']
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const removeSkill = useCallback((index) => {
    const newData = {
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const handleLanguageChange = useCallback((index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value
    };
    const newData = {
      ...formData,
      languages: newLanguages
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const addLanguage = useCallback(() => {
    const newData = {
      ...formData,
      languages: [...formData.languages, { language: '', proficiency: '' }]
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const removeLanguage = useCallback((index) => {
    const newData = {
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index)
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const handleProjectChange = useCallback((index, field, value) => {
    const newProjects = [...formData.projects];
    let formattedValue = value;
    if (field === 'startDate' || field === 'endDate') {
      formattedValue = value ? dayjs(value).format('YYYY-MM') : '';
    }
    newProjects[index] = {
      ...newProjects[index],
      [field]: formattedValue
    };
    const newData = {
      ...formData,
      projects: newProjects
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const addProject = useCallback(() => {
    const newData = {
      ...formData,
      projects: [...formData.projects, { 
        name: '', 
        startDate: '', 
        endDate: '', 
        technologies: '',
        description: '' 
      }]
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const removeProject = useCallback((index) => {
    const newData = {
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index)
    };
    onFormDataChange(newData);
  }, [formData, onFormDataChange]);

  const handleRemovePhoto = useCallback(() => {
    const newData = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        photo: null
      }
    };
    onFormDataChange(newData);
    toast.info('Profile photo removed');
  }, [formData, onFormDataChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
    onDrop: useCallback(async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        try {
          const base64Image = await getBase64(file);
          const newData = {
            ...formData,
            personalInfo: {
              ...formData.personalInfo,
              photo: base64Image
            }
          };
          onFormDataChange(newData);
          toast.success('Profile photo uploaded');
        } catch (error) {
          console.error('Error converting image:', error);
          toast.error('Error processing image');
        }
      } else {
         toast.error('Please upload a valid image file (max 5MB)');
      }
    }, [formData, onFormDataChange]),
    onDropRejected: useCallback((fileRejections) => {
      const rejectionMessage = fileRejections[0].errors[0].message;
      toast.error(`File rejected: ${rejectionMessage}`);
    }, []),
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Add form validation here before saving/navigating
    const form = e.target;
    if (form.checkValidity()) {
      const existingData = localStorage.getItem('resumeData');
      let finalData = formData;

      if (existingData) {
        try {
          const parsedData = JSON.parse(existingData);
          finalData = {
            ...formData,
            selectedTemplate: parsedData.selectedTemplate
          };
        } catch (error) {
          console.error('Error parsing existing data:', error);
        }
      }

      localStorage.setItem('resumeData', JSON.stringify(finalData));
      navigate('templates');
    } else {
      // If form is not valid, browser will show validation messages
      toast.error('Please fill out all required fields.');
    }
  }, [formData, navigate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Build Your Resume
        </Typography>

        <form onSubmit={handleSubmit} id="resume-form" name="resume-form" aria-label="Resume Builder Form" noValidate>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                 <div {...getRootProps()} style={{
                   border: isDragActive ? '2px dashed #1976d2' : '2px dashed #eeeeee',
                   borderRadius: '4px',
                   padding: '20px',
                   textAlign: 'center',
                   cursor: 'pointer',
                   width: '100%',
                   maxWidth: '300px',
                   backgroundColor: isDragActive ? '#e3f2fd' : '#fafafa',
                   transition: 'all 0.3s ease-in-out'
                 }}>
                   <input {...getInputProps()} />
                   {formData.personalInfo.photo ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar src={formData.personalInfo.photo} sx={{ width: 80, height: 80, mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">Photo uploaded. Drag and drop or click to replace.</Typography>
                      </Box>
                   ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <CloudUploadIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                         <Typography variant="body2" color="text.secondary">Drag 'n' drop a profile photo here, or click to select one</Typography>
                      </Box>
                   )}
                 </div>
                  {formData.personalInfo.photo && (
                    <Button
                      onClick={handleRemovePhoto}
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      sx={{ mt: 1 }}
                    >
                      Remove Photo
                    </Button>
                  )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.personalInfo.fullName || ''}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.personalInfo.email || ''}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.personalInfo.phone || ''}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  required
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.personalInfo.location || ''}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="LinkedIn Profile"
                  value={formData.personalInfo.linkedin || ''}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  type="url"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Professional Summary"
                  value={formData.personalInfo.summary || ''}
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Work Experience</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addExperience}
                variant="outlined"
                type="button"
                aria-label="Add Work Experience"
              >
                Add Experience
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {(formData.experience || []).map((exp, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={exp.company || ''}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={exp.position || ''}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      views={['year', 'month']}
                      openTo="month"
                      value={exp.startDate ? dayjs(exp.startDate) : null}
                      onChange={(date) => handleExperienceChange(index, 'startDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      views={['year', 'month']}
                      openTo="month"
                      value={exp.endDate ? dayjs(exp.endDate) : null}
                      onChange={(date) => handleExperienceChange(index, 'endDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={exp.description || ''}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => removeExperience(index)}
                      color="error"
                      type="button"
                      aria-label={`Remove Experience ${index + 1}`}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Education</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addEducation}
                variant="outlined"
                type="button"
                aria-label="Add Education"
              >
                Add Education
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {(formData.education || []).map((edu, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="School"
                      value={edu.school || ''}
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      value={edu.degree || ''}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      views={['year', 'month']}
                      openTo="month"
                      value={edu.startDate ? dayjs(edu.startDate) : null}
                      onChange={(date) => handleEducationChange(index, 'startDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      views={['year', 'month']}
                      openTo="month"
                      value={edu.endDate ? dayjs(edu.endDate) : null}
                      onChange={(date) => handleEducationChange(index, 'endDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={edu.description || ''}
                      onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => removeEducation(index)}
                      color="error"
                      type="button"
                      aria-label={`Remove Education ${index + 1}`}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Skills</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addSkill}
                variant="outlined"
                type="button"
                aria-label="Add Skill"
              >
                Add Skill
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2} rowSpacing={2}>
              {(formData.skills || []).map((skill, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      label="Skill"
                      value={skill || ''}
                      onChange={(e) => handleSkillsChange(index, e.target.value)}
                      required
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      onClick={() => removeSkill(index)}
                      color="error"
                      aria-label={`Remove Skill ${index + 1}`}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Languages</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addLanguage}
                variant="outlined"
                type="button"
                aria-label="Add Language"
              >
                Add Language
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {(formData.languages || []).map((lang, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Language"
                      value={lang.language || ''}
                      onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth required>
                      <InputLabel>Proficiency Level</InputLabel>
                      <Select
                        value={lang.proficiency || ''}
                        label="Proficiency Level"
                        onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                        required
                      >
                        {proficiencyLevels.map((level) => (
                          <MenuItem key={level} value={level}>
                            {level}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <IconButton
                      onClick={() => removeLanguage(index)}
                      color="error"
                      aria-label="Remove language"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Projects</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addProject}
                variant="outlined"
                type="button"
                aria-label="Add Project"
              >
                Add Project
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {(formData.projects || []).map((project, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Name"
                      value={project.name || ''}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      views={['year', 'month']}
                      openTo="month"
                      value={project.startDate ? dayjs(project.startDate) : null}
                      onChange={(date) => handleProjectChange(index, 'startDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      views={['year', 'month']}
                      openTo="month"
                      value={project.endDate ? dayjs(project.endDate) : null}
                      onChange={(date) => handleProjectChange(index, 'endDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Technologies Used"
                      value={project.technologies || ''}
                      onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                      placeholder="e.g., React, Node.js, MongoDB"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Description"
                      value={project.description || ''}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => removeProject(index)}
                      color="error"
                      type="button"
                      aria-label={`Remove Project ${index + 1}`}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                onFormDataChange({
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
                });
                localStorage.removeItem('resumeData');
                toast.success('Form has been reset');
              }}
              type="button"
              aria-label="Reset Form"
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              aria-label="Save and Continue"
            >
              Save & Continue
            </Button>
          </Box>
        </form>
      </Paper>
    </LocalizationProvider>
  );
}

export default memo(ResumeForm); 