module.exports = {
  plugins: [
    require('autoprefixer')({
      grid: true
    }),
    require('postcss-preset-env')({
      stage: 0,
    }),
    require('postcss-flexbugs-fixes'),
    require('postcss-nested'),
    require('lost')
  ],
};
