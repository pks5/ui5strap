module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		releaseNameFull : 'ui5charts-<%= pkg.version %>',
		releaseNameNonCommercial : 'ui5charts-<%= pkg.version %>-non-commercial',
		
		/*
		 * Deletes all generated libraries.
		 */
		clean : {
			options : {
				force : true
			},
			
			generatedRelease : {
				src : ['../../../release/*']
			},
			
			/*
			 * TODO major version dynamic
			 */
			docsReleases : {
				src : ['../../../../ui5strap-docs/apps/pks_store/releases/ui5charts/1/<%= pkg.version %>/',
				       '../../../../ui5strap-docs/www/apps/pks_store/releases/ui5charts/1/<%= pkg.version %>/',
				       '../../../../ui5strap-docs/www/lib/ui5charts-non-commercial-LATEST']
			}
		},
		
		/*
		 * File copy.
		 */
		copy : {
			/*
			 * Copies all files needed for FULL Release to the release folder.
			 */
			releaseFull : {
				expand : true,
				cwd : '../../../',
				src : [
				       'bin/**',
				       'build/**',
				       'docs/**', 
				       'server/**',
				       'www/apps/ui5charts-demo/**',
				       'www/lib/pks/ui5chart_dev/**', 
				       'www/lib/pks/ui5chart_all/**',
				       'www/lib/pks/ui5chart_min/**',
				       'www/lib/pks/ui5chart_pre/**',
				       '!**/node_modules/**',
				       '!*.log',
				       '!bin/release-ui5chart-library.sh',
				       '!bin/clean-ui5chart-release.sh',
				       '!build/ui5chart/release'],
				dest : '../../../release/<%= releaseNameFull %>/'
			},
			
			/*
			 * Copies all files needed for DEMO Release to the release folder.
			 */
			releaseNonCommercial : {
				expand : true,
				cwd : '../../../',
				src : [
				       'bin/package.json',
				       'bin/install.sh',
				       'bin/update.sh',
				       'bin/run-web.sh',
				       'docs/**', 
				       'server/**',
				       'www/apps/ui5charts-demo/**',
				       'www/lib/pks/ui5chart_min/**',
				       'www/lib/pks/ui5chart_pre/**',
				       '!**/node_modules/**',
				       '!*.log'],
				dest : '../../../release/<%= releaseNameNonCommercial %>/'
			},
			
			docsReleaseFull : {
				src : '../../../release/<%= releaseNameFull %>.zip',
				dest : '../../../../ui5strap-docs/apps/pks_store/releases/ui5charts/1/<%= pkg.version %>/<%= releaseNameFull %>.zip'
			},
			
			docsReleaseNonCommercial : {
				src : '../../../release/<%= releaseNameNonCommercial %>.zip',
				dest : '../../../../ui5strap-docs/www/apps/pks_store/releases/ui5charts/1/<%= pkg.version %>/<%= releaseNameNonCommercial %>.zip'
			},
			  
			docsNonCommercialLib: {
				expand : true,
				cwd : '../../../release/<%= releaseNameNonCommercial %>/',
				src : ['**'],
				dest : '../../../../ui5strap-docs/www/lib/ui5charts-non-commercial-LATEST/'
			}
		},
		
		/*
		 * Compresses the release folders
		 */
		
		compress: {
			  releaseFull: {
			    options: {
			    	archive: '../../../release/<%= releaseNameFull %>.zip'
			    },
			    expand: true,
			    cwd: '../../../release/<%= releaseNameFull %>/',
			    src: ['**/*'],
			    dest: '/'
			  },
			  
			  releaseNonCommercial: {
			    options: {
			    	archive: '../../../release/<%= releaseNameNonCommercial %>.zip'
			    },
			    expand: true,
			    cwd: '../../../release/<%= releaseNameNonCommercial %>/',
			    src: ['**/*'],
			    dest: '/'
			  }
		}

	});

	//Load the plugins.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	
	/*
	 * START Define Tasks
	 */
	
	//Clean release folder.
	grunt.registerTask('cleanLocalRelease', [ 'clean:generatedRelease' ]);
	
	//Creates a release
	grunt.registerTask('localRelease', ['clean:generatedRelease', 'copy:releaseFull', 'copy:releaseNonCommercial', 'compress:releaseFull', 'compress:releaseNonCommercial' ]);
	
	//Clean releases in docs.
	grunt.registerTask('cleanDocsReleases', [ 'clean:docsReleases' ]);
	
	//Creates the releases in docs.
	grunt.registerTask('docsReleases', [ 'clean:docsReleases', 'copy:docsReleaseFull', 'copy:docsReleaseNonCommercial', 'copy:docsNonCommercialLib' ]);
	
	//Creates a complete release.
	grunt.registerTask('release', ['clean:generatedRelease', 'copy:releaseFull', 'copy:releaseNonCommercial', 'compress:releaseFull', 'compress:releaseNonCommercial', 'clean:docsReleases', 'copy:docsReleaseFull', 'copy:docsReleaseNonCommercial', 'copy:docsNonCommercialLib' ]);
	
	/*
	 * END Define Tasks
	 */
};