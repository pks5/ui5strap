module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		
		pathToLibRoot : "../../www/lib/",
		libraryName : "pks/ui5strap",
		suffixDev : "_dev",
		folderDev : "<%= pathToLibRoot %><%= libraryName %><%= suffixDev %>/",
		
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
				    cwd: '<%= folderDev %>core/',
				    src: 'themes/*/library.source.less',
				    dest: '<%= folderDev %>core/'
				},
		        
		        {
		          expand: true,
		          cwd: '<%= folderDev %>viewer/',
		          src: 'themes/*/library.source.less',
		          dest: '<%= folderDev %>viewer/'
		        },
		        
		        {
		          expand: true,
		          cwd: '<%= folderDev %>task/',
		          src: 'themes/*/library.source.less',
		          dest: '<%= folderDev %>task/'
		        },
				
		        {
				    expand: true,
				    cwd: '<%= folderDev %>bs3/',
				    src: 'themes/*/library.source.less',
				    dest: '<%= folderDev %>bs3/'
				},
		        
		        {
		          expand: true,
		          cwd: '<%= folderDev %>ex/',
		          src: 'themes/*/library.source.less',
		          dest: '<%= folderDev %>ex/'
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