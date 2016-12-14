module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		pathToMinLib : "../../www/lib/pks/ui5strap_min/",
		pathToDocs : "../../www/docs/",
		
		pathToDocsRelease : "../../../ui5strap-docs/www/ui5strap_api_docs/",
		pathToMinLibRelease : "../../../ui5strap-docs/www/lib/pks/ui5strap_min_release/",
		
		/*
		 * Deletes all generated libraries.
		 */
		clean : {
			options : {
				force : true
			},
			
			cleanRelease : {
				src : ["<%= pathToMinLibRelease %>", "<%= pathToDocsRelease %>"]
			}
		},
		
		/*
		 * File copy.
		 */
		copy : {
			copyMinLibRelease: {
				expand : true,
				cwd : "<%= pathToMinLib %>",
				src : ['**'],
				dest : "<%= pathToMinLibRelease %>"
			},
			
			copyDocsRelease: {
				expand : true,
				cwd : "<%= pathToDocs %>",
				src : ['**'],
				dest : "<%= pathToDocsRelease %>"
			}
		}

	});

	//Load the plugins.
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	
	/*
	 * START Define Tasks
	 */
	
	//Clean releases in docs.
	grunt.registerTask("cleanup", [ "clean:cleanRelease" ]);
	
	//Creates a complete release.
	grunt.registerTask("default", [ "clean:cleanRelease", "copy:copyMinLibRelease", "copy:copyDocsRelease" ]);
	
	/*
	 * END Define Tasks
	 */
};