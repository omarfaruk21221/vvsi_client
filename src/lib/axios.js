import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// রিকোয়েস্ট ইন্টারসেপ্টর
axiosInstance.interceptors.request.use(
  (config) => {
    // --- টোকেন হ্যান্ডেলিং (নতুন যুক্ত করা হয়েছে) ---
    const token = localStorage.getItem("token"); // লগইন করার সময় যে নামে সেভ করেছিলেন
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // যদি ডাটা FormData হয় (যেমন ইমেজ আপলোড), তবে Content-Type ব্রাউজার নিজেই হ্যান্ডেল করবে
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// এরর ও রেসপন্স ইন্টারসেপ্টর
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি টোকেন এক্সপায়ার হয়ে যায় (৪০১ এরর), তবে ইউজারকে লগআউট করানো ভালো
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("সেশন শেষ অথবা অনুমতি নেই।");
      // localStorage.removeItem("token"); // চাইলে লগআউট করিয়ে দিতে পারেন
      // window.location.href = "/login";
    }

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
