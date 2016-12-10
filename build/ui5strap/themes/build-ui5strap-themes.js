module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		
		openui5_theme: {
			options : {
				compiler : {
					compress : true
				}
			},
		    
			ui5strapLibraries: {
		      files: [
				{
				    expand: true,
				    cwd: '../../../www/lib/pks/ui5strap/core/',
				    src: 'themes/*/library.source.less',
				    dest: '../../../www/lib/pks/ui5strap/core/'
				  },
				{
				    expand: true,
				    cwd: '../../../www/lib/ui5strap/',
				    src: 'themes/*/library.source.less',
				    dest: '../../../www/lib/ui5strap/'
				},
		        {
		          expand: true,
		          cwd: '../../../www/lib/pks/ui5strap/action/',
		          src: 'themes/*/library.source.less',
		          dest: '../../../www/lib/pks/ui5strap/action/'
		        },
		        
		        
		        
		        {
		          expand: true,
		          cwd: '../../../www/lib/pks/ui5strap/ex/',
		          src: 'themes/*/library.source.less',
		          dest: '../../../www/lib/pks/ui5strap/ex/'
		        },
		        
		        {
		          expand: true,
		          cwd: '../../../www/lib/pks/ui5strap/viewer/',
		          src: 'themes/*/library.source.less',
		          dest: '../../../www/lib/pks/ui5strap/viewer/'
		        }
		      ]
		    }
		  }
		  

		});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-openui5');

	  // Default task(s).
	  grunt.registerTask('default', ['openui5_theme:ui5strapLibraries']);
};