// Convert file to base64
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Initial form data structure
export const initialFormData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    photo: null
  },
  experience: [],
  education: [],
  skills: []
};

// Save data to localStorage
export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem('resumeData', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Load data from localStorage
export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('resumeData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// Clear data from localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem('resumeData');
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}; 