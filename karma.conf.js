// karma.conf.js
module.exports = function (config) {
  config.set({
    // Frameworks que usaremos
    frameworks: ['jasmine'], // Karma necesita karma-jasmine para esto

    // Archivos de prueba
    files: [
      'src/**/*.test.js', // Incluye todos los archivos .test.js en src y subcarpetas
      // Quitamos la línea de .jsx ya que no tienes archivos .test.jsx
      // 'src/**/*.test.jsx' 
    ],

    // Preprocesadores
    preprocessors: {
      // Los archivos de prueba (.test.js) se procesan con webpack y sourcemap
      'src/**/*.test.js': ['webpack', 'sourcemap'], 
      // Los archivos fuente (.js que NO son de prueba) se procesan con webpack, sourcemap y coverage
      'src/**/!(*.test).js': ['webpack', 'sourcemap', 'coverage'] 
    },

    // Configuración de Webpack (simplificada para Karma)
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map', // Esencial para depuración
      module: {
        rules: [
          {
            test: /\.jsx?$/, // Aplica a archivos .js y .jsx
            exclude: /node_modules/, // No transpilar dependencias
            use: {
              loader: 'babel-loader', // Usar Babel
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'], // Para ES6+ y React
                plugins: ['babel-plugin-istanbul'] // Necesario para la cobertura de código
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'] // Para poder importar sin extensión
      }
    },

    // *** ¡CORRECCIÓN CLAVE! Añadimos esta sección para cargar los plugins ***
    plugins: [
      require('karma-jasmine'),          // Framework de pruebas
      require('karma-chrome-launcher'), // Lanzador para Chrome
      require('karma-webpack'),          // Para usar Webpack con Karma
      require('karma-sourcemap-loader'), // Para manejar sourcemaps
      require('karma-coverage'),         // Para generar el reporte de cobertura
      require('karma-spec-reporter')     // Un reporter más legible en consola (opcional)
    ],

    // Reporters: 'spec' para detalles en consola, 'coverage' para el informe
    reporters: ['spec', 'coverage'],

    // Configuración detallada del reporte de cobertura
    coverageReporter: {
      dir: 'coverage/', // Carpeta de salida
      reporters: [
        { type: 'html', subdir: 'html-report' }, // Genera el reporte HTML
        { type: 'text-summary' }                 // Muestra un resumen en la consola
      ],
       instrumenterOptions: { // Asegura que el código fuente se incluya correctamente
         istanbul: { noCompact: true }
       }
    },

    // Navegador a usar (Chrome sin interfaz gráfica es más rápido)
    browsers: ['ChromeHeadless'],

    // Otras configuraciones
    singleRun: true, // Ejecuta las pruebas una vez y termina (ideal para CI o verificación)
    // singleRun: false, // Cambia a false si quieres que Karma siga corriendo y re-ejecute al guardar
    // autoWatch: true,  // Activa esto junto con singleRun: false
    logLevel: config.LOG_INFO, // Nivel de detalle de los mensajes de Karma
  });
};