import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000, // টাইমআউট সামান্য বাড়িয়ে ১৫ সেকেন্ড করা হয়েছে
});

// রিকোয়েস্ট ইন্টারসেপ্টর
axiosInstance.interceptors.request.use(
  (config) => {
    // যদি ডাটা FormData হয়, তবে Content-Type রিমুভ করুন
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      // সাধারণ JSON ডাটার জন্য ডিফল্ট হেডার
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// এরর লগিং ইন্টারসেপ্টর
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🔴 API Error Log:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
