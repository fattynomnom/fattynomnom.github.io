/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [
        // extracts tailwind colors as css variables
        // snippet from https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574
        ({ addBase, theme }) => {
            function extractColorVars(colorObj, colorGroup = '') {
                return Object.keys(colorObj).reduce((vars, colorKey) => {
                    const value = colorObj[colorKey]

                    const newVars =
                        typeof value === 'string'
                            ? { [`--color${colorGroup}-${colorKey}`]: value }
                            : extractColorVars(value, `-${colorKey}`)

                    return { ...vars, ...newVars }
                }, {})
            }

            addBase({
                ':root': extractColorVars(theme('colors'))
            })
        }
    ]
}
