module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            backdropBlur: {
                md: "12px",
            },
            colors: {
                indigo: {
                    300: "#a5b4fc",
                    400: "#818cf8",
                    500: "#6366f1",
                    700: "#4338ca",
                },
            },
        },
    },
    plugins: [],
}