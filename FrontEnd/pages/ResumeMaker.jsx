import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages and Theme
import theme from '../src/theme';
import Home from './HomeResume';
import ResumeBuilder from './ResumeBuilder';
import Templates from './Templates';
import Footer from "../section/Footer";
import Navbar from "../section/NavBar";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};

function ResumeMaker() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="templates" element={<Templates />} />
        <Route path="resume-builder" element={<ResumeBuilder />} />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="templates" replace />} />
      </Routes>
      <ToastContainer {...toastConfig} />
      <Footer/>
    </ThemeProvider>
  );
}

export default ResumeMaker;
