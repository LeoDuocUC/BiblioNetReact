// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.test.js', 
    ],
    preprocessors: {
      'src/**/*.test.js': ['webpack', 'sourcemap'],
      // Instrumentamos TODOS los .js de src, EXCEPTO los .test.js
      'src/**/!(*.test).js': ['webpack', 'sourcemap', 'coverage'] 
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          // Regla existente para JavaScript/JSX
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['babel-plugin-istanbul'] 
              }
            }
          },
          // *** NUEVA REGLA para CSS ***
          {
            test: /\.css$/i, // Aplica a archivos que terminan en .css
            // Usamos style-loader y css-loader
            // style-loader inyecta el CSS en el <head> del navegador de Karma
            // css-loader resuelve los @import y url() dentro del CSS
            use: ['style-loader', 'css-loader'], 
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-coverage'),
      require('karma-spec-reporter')
    ],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html-report' },
        { type: 'text-summary' }
      ],
       instrumenterOptions: {
         istanbul: { noCompact: true }
       }
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
  });
};