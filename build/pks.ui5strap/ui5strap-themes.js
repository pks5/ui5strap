module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		
		pathToLibRoot : "../../www/lib/",
		
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
				    cwd: '<%= pathToLibRoot %>pks/ui5strap/core/',
				    src: 'themes/*/library.source.less',
				    dest: '<%= pathToLibRoot %>pks/ui5strap/core/'
				},
		        
		        {
		          expand: true,
		          cwd: '<%= pathToLibRoot %>pks/ui5strap/viewer/',
		          src: 'themes/*/library.source.less',
		          dest: '<%= pathToLibRoot %>pks/ui5strap/viewer/'
		        },
		        
		        {
		          expand: true,
		          cwd: '<%= pathToLibRoot %>pks/ui5strap/task/',
		          src: 'themes/*/library.source.less',
		          dest: '<%= pathToLibRoot %>pks/ui5strap/task/'
		        },
				
		        {
				    expand: true,
				    cwd: '<%= pathToLibRoot %>pks/ui5strap/bs3/',
				    src: 'themes/*/library.source.less',
				    dest: '<%= pathToLibRoot %>pks/ui5strap/bs3/'
				},
		        
		        {
		          expand: true,
		          cwd: '<%= pathToLibRoot %>pks/ui5strap/ex/',
		          src: 'themes/*/library.source.less',
		          dest: '<%= pathToLibRoot %>pks/ui5strap/ex/'
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