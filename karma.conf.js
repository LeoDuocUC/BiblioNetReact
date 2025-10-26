// karma.conf.js
module.exports = function (config) {
  config.set({
    // Frameworks que usaremos
    frameworks: ['jasmine'],

    // Archivos de prueba
    files: [
      'src/**/*.test.js',
      'src/**/*.test.jsx'
    ],

    // Preprocesadores para compilar React/JSX y generar cobertura
    preprocessors: {
      'src/**/*.test.js': ['webpack', 'sourcemap'],
      'src/**/*.test.jsx': ['webpack', 'sourcemap'],
      'src/**/!(*.test).js': ['webpack', 'coverage'],
      'src/**/!(*.test).jsx': ['webpack', 'coverage']
    },

    // Configuración de Webpack para Karma
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['istanbul'] // Para la cobertura
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    // Reporters: progreso y cobertura
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',        // Carpeta donde se genera el reporte
      subdir: '.', 
      reporters: [
        { type: 'html', subdir: 'html-report' },  // Reporte visual en HTML
        { type: 'text-summary' }                  // Resumen en consola
      ]
    },

    // Navegador
    browsers: ['ChromeHeadless'], // Chrome invisible, útil para CI/CD
    singleRun: true,              // Se ejecuta una sola vez y termina

    // Evita problemas con Webpack y Karma
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
