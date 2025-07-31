/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",  // very important for React
    ],
    theme: {
        extend: {
            animation: {
                blob: "blob 8s infinite",
                fadeInUp: "fadeInUp 0.5s ease both",
            },
            keyframes: {
                blob: {
                    "0%": {transform: "translate(0px, 0px) scale(1)"},
                    "33%": {transform: "translate(30px, -50px) scale(1.1)"},
                    "66%": {transform: "translate(-20px, 20px) scale(0.9)"},
                    "100%": {transform: "translate(0px, 0px) scale(1)"},
                },
                fadeInUp: {
                    "0%": {opacity: 0, transform: "translateY(20px)"},
                    "100%": {opacity: 1, transform: "translateY(0)"},
                },
            },
        },
    },
    plugins: [],
}
