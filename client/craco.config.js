module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  // webpack: {
  //   headers: {
  //     "X-Frame-Options": "Allow",
  //   },
  // },
};
