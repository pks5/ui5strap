module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({

		  openui5_preload: {
		    library: {
		      options: {
		        resources: '../www/lib/',
		        dest: '../www/lib/',
		        compress: true
		      },
		      libraries: 'ui5strap'
		    }
		  }

		});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-openui5');

	  // Default task(s).
	  grunt.registerTask('default', ['openui5_preload']);
};