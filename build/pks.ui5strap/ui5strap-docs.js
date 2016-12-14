module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		pathToSrc : "../../www/lib/pks/ui5strap/",
		pathToDocs : "../../www/docs/",
		
		/*
		 * Deletes all generated libraries.
		 */
		clean : {
			options : {
				force : true
			},
			
			cleanDocs : {
				src : ["<%= pathToDocs %>"]
			}
		},
		
		jsdoc : {
	        createDocs : {
	        	src: ["<%= pathToSrc %>/**/*.js"],
	            dest: "<%= pathToDocs %>"
	        }
	    }
		
	});

	//Load the plugins.
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-jsdoc');
	
	/*
	 * START Define Tasks
	 */
	
	//Clean releases in docs.
	grunt.registerTask("cleanup", [ "clean:cleanDocs" ]);
	
	grunt.registerTask("default", [ "clean:cleanDocs", "jsdoc:createDocs" ]);
	
	/*
	 * END Define Tasks
	 */
};