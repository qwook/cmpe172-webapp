
module.exports = function(grunt) {

  var path = require("path");
  var webpack = require("webpack");
  var fs = require("fs");

  var webpackPlugins = [];

  grunt.registerTask('recalc-plugins', 'Calculate grunt plugins', function() {
    webpackPlugins.splice(0, webpackPlugins.length);
    webpackPlugins.push(
      new webpack.DllReferencePlugin({
          context: path.join(__dirname, "client"),
          manifest: JSON.parse(fs.readFileSync("./build/vendors-manifest.json", "utf8"))
      })
    );
  });

  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: 'build/server/index.js'
        }
      }
    },

    webpack: {
      vendors: {
        entry: {
            vendors: [path.join(__dirname, "client", "vendors.js")]
        },
        output: {
          path: "build/",
          filename: "dll.vendors.js",
          library: "vendors"
        },
        plugins: [
          new webpack.DllPlugin({
              path: path.join(__dirname, "build", "[name]-manifest.json"),
              name: "[name]",
              context: path.resolve(__dirname, "client")
          })
        ],
        devtool: "#source-map",
        resolve: {
            root: path.resolve(__dirname, "client"),
            modulesDirectories: ["node_modules"]
        }
      },
      dev: {
        entry: "./build/client/index.js",
        output: {
          path: "build/",
          filename: "client.min.js",
          colors: true,
          modules: true,
          reasons: true
        },

        plugins: webpackPlugins,

        module: {
          preLoaders: [
          {
            test: /\.js$/,
            loader: "source-map-loader"
          }
          ]
        },
        
        devtool: "#source-map",
        node: {
        fs: "empty"
        }
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['react']
      },

      client: {
        options: {
          plugins: ['transform-class-properties', 'transform-es2015-modules-commonjs', 'transform-es2015-classes', 'transform-es2015-arrow-functions', 'transform-es2015-block-scoping']
        },
        files: [{
          expand: true,
          src: ['client/**/*.jsx', 'client/**/*.js'],
          dest: 'build/',
          ext: '.js'
        }]
      },

      server: {
        options: {
          plugins: ['transform-class-properties', 'transform-es2015-modules-commonjs', 'transform-es2015-classes', 'transform-es2015-arrow-functions', 'transform-es2015-block-scoping']
        },
        files: [{
          expand: true,
          src: ['server/**/*.jsx', 'server/**/*.js'],
          dest: 'build/',
          ext: '.js'
        }]
      }
    },


    watch: {
      client: {
        options: {
          atBegin: true,
          livereload: true,
          spawn: false
        },
        files: ['public/**/*', 'client/**/*.js'],
        tasks: ['babel:client', 'webpack:dev']
      },
      server: {
        options: {
          atBegin: true,
          spawn: false
        },
        files: ['server/**/*.jsx', 'server/**/*.js'],
        tasks: ['babel:server', 'express:dev']
      },
      vendors: {
        options: {
          spawn: false
        },
        files: ['node_modules/*'],
        tasks: ['webpack:vendors', 'recalc-plugins', 'express:dev']
      }
    },

    concurrent: {
      both: {
        tasks: [['webpack:vendors', 'recalc-plugins', 'babel:client', 'watch:client'], ['babel:server', 'watch:server'], ['watch:vendors']],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-concurrent');
  
  grunt.registerTask('client', ['watch:client']);
  grunt.registerTask('server', ['watch:server']);
  grunt.registerTask('vendors', ['webpack:vendors']);

  grunt.registerTask('default', ['concurrent:both']);

}