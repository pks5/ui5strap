module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		pathToMinLib : "../../www/lib/pks/ui5strap_min/",
		pathToDocsRelease : "../../../ui5strap-docs/www/lib/pks/ui5strap_min_release/",
		
		/*
		 * Deletes all generated libraries.
		 */
		clean : {
			options : {
				force : true
			},
			
			cleanDocsRelease : {
				src : ["<%= pathToDocsRelease %>"]
			}
		},
		
		/*
		 * File copy.
		 */
		copy : {
			copyMinLibToDocs: {
				expand : true,
				cwd : "<%= pathToMinLib %>",
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
	grunt.registerTask("cleanup", [ "clean:cleanDocsRelease" ]);
	
	//Creates a complete release.
	grunt.registerTask("default", [ "clean:cleanDocsRelease", "copy:copyMinLibToDocs" ]);
	
	/*
	 * END Define Tasks
	 */
};