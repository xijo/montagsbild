const tailwindcss = require('tailwindcss')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
    // postcssPresetEnv({ features: { customProperties: { preserve: true } } })
  ],
};
