module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mycustomtheme: {
          // --- লাইট থিম (Premium Ice-Cream Look) ---
          primary: "#0F4C81", // ক্লাসিক রয়্যাল ব্লু (ট্রাস্ট এবং কোয়ালিটি)
          "primary-focus": "#0A365C",
          "primary-content": "#FFFFFF",

          secondary: "#38BDF8", // ফ্রেশ স্কাই ব্লু (শীতলতার প্রতীক)
          "secondary-focus": "#0EA5E9",
          "secondary-content": "#FFFFFF",

          accent: "#FDE047", // কাস্টার্ড ইয়েলো বা ভ্যানিলা কালার
          "accent-focus": "#EAB308",
          "accent-content": "#1F2937",

          neutral: "#3D4451",
          "neutral-focus": "#2A2E37",
          "neutral-content": "#FFFFFF",

          "base-100": "#FFFFFF", // একদম সাদা
          "base-200": "#F1F5F9", // হালকা আইসি গ্রে
          "base-300": "#E2E8F0",
          "base-content": "#0F172A", // টেক্সট কালার (গভীর নীল)

          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
        mycustomdark: {
          // --- ডার্ক থিম (Midnight Premium Look) ---
          primary: "#38BDF8", // ডার্কে উজ্জ্বল নীল ব্যবহার করা হয়েছে
          "primary-focus": "#0EA5E9",
          "primary-content": "#0F172A",

          secondary: "#0F4C81",
          "secondary-focus": "#0A365C",
          "secondary-content": "#FFFFFF",

          accent: "#FDE047",
          "accent-focus": "#EAB308",
          "accent-content": "#000000",

          neutral: "#1E293B",
          "neutral-focus": "#111827",
          "neutral-content": "#F8FAFC",

          "base-100": "#020617", // ডিপ মিডনাইট ব্লু ব্যাকগ্রাউন্ড
          "base-200": "#0F172A",
          "base-300": "#1E293B",
          "base-content": "#F8FAFC", // হালকা টেক্সট

          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
    darkTheme: "mycustomdark",
  },
};
