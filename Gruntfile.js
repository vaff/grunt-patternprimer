module.exports = function (grunt) {
  // time grunt for measuring
  require('time-grunt')(grunt);

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // project config
  grunt.initConfig({

    // clean
    clean: {
      test: ['test/fixtures/output'],
      css:['src/css']
    },

    // hinting
    jshint: {
      files: ['tasks/*.js', 'test/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // unit tests
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    compass: {                 
      dist: {                   
        options: {              
          sassDir: 'src/scss',
          cssDir: 'src/css',
          outputStyle: 'expanded'          
        }
      },
    dev: {                   
      options: {
          sassDir: 'src/scss',
          cssDir: 'src/css',
          javascriptsDir: 'src/js',
          outputStyle: 'expanded', 
          dryRun : false,
          trace: true
      }
    }
  },

  copy: {
    css: {
      files: [{
        expand: true,
        cwd: 'src/css/',
        src: ['**'],
        dest: 'test/fixtures/output/',
      },
    ]},
  }

});


  // default - does everything
grunt.registerTask('default', ['clean:test', 'jshint', 'nodeunit','clean:css','compass:dist','copy:css']);
grunt.registerTask('test', ['clean:test', 'jshint', 'nodeunit']); 
grunt.registerTask('comp', ['clean:css','compass:dev', 'copy:css']);

}