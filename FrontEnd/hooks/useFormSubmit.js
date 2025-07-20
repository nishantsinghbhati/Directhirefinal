// src/hooks/useFormSubmit.js
import axios from "../src/lib/api.js";
import { toast } from "react-hot-toast";

export const useFormSubmit = (endpoint) => {
  const handleSubmit = async (data, reset) => {
    const toastId = toast.loading("Sending...");

    try {
      let payload = data;
      let config = {};

      // Determine if it's a job form (which includes file upload)
      const isJobForm = endpoint.includes("/job");

      if (isJobForm) {
        const formData = new FormData();

        for (const key in data) {
          if (key === "resume" && data.resume?.length > 0) {
            formData.append("resume", data.resume[0]);
          } else {
            formData.append(key, data[key]);
          }
        }

        payload = formData;
       
      }

      await axios.post(endpoint, payload, config);
      toast.success("Submitted successfully!", { id: toastId });
      reset();
    } catch (error) {
      toast.error("Submission failed. Try again.", { id: toastId });
    }
  };

  return handleSubmit;
};