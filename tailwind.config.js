/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                tertiary: "var(--color-tertiary)",
            },
        },
        screens: {
            lg: { max: "2023px" },

            sm: { max: "1000px" },
        },
        darkMode: "class"
    },
    plugins: [],
};