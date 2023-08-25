/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js,ejs}",
  './views/partials/*.{html,js,ejs}',
  "./public/javascript/*"
  ]
  ,
  // safelist: [
  //   {
  //     pattern: /./, // the "." means "everything"
  //   },
  // ],

  theme: {
    extend: {},
  },
  plugins: [],
}
