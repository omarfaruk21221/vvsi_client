import { useState } from "react";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToImgBB = async (fileList) => {
    // যদি ফাইল না থাকে বা খালি থাকে তবে ফাঁকা স্ট্রিং রিটার্ন করবে
    if (!fileList || !fileList[0]) return "";

    setIsUploading(true);
    try {
      const imgFormData = new FormData();
      imgFormData.append("image", fileList[0]);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) throw new Error("ImgBB API Key পাওয়া যায়নি");

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imgFormData,
        },
      );

      const result = await response.json();
      if (result.success) return result.data.url;
      throw new Error(result.error?.message || "ইমেজ আপলোড ব্যর্থ হয়েছে");
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadToImgBB, isUploading };
};
