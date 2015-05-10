module.exports = function(grunt) {

  grunt.initConfig({
	  
	  ui5strapLib : "../../www/lib/ui5strap/",
	  
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          '<%= ui5strapLib %>library.js',
          
          '<%= ui5strapLib %>ActionFunctions.js',
          '<%= ui5strapLib %>ActionContext.js',
          '<%= ui5strapLib %>ActionModule.js',
          '<%= ui5strapLib %>Action.js',
          
          '<%= ui5strapLib %>AppConfig.js',
          
          '<%= ui5strapLib %>AppComponent.js',
          
          '<%= ui5strapLib %>AppFrame.js',
          
          '<%= ui5strapLib %>AppBase.js',
          '<%= ui5strapLib %>App.js',
          
          '<%= ui5strapLib %>NavContainer.js',
          
          '<%= ui5strapLib %>ViewerBase.js',
          '<%= ui5strapLib %>Viewer.js',
          
          '<%= ui5strapLib %>RestClient.js',
          
          '<%= ui5strapLib %>Button.js',
          '<%= ui5strapLib %>ButtonRenderer.js',
          '<%= ui5strapLib %>Console.js',
          '<%= ui5strapLib %>ConsoleRenderer.js',
          '<%= ui5strapLib %>Sandbox.js',
          '<%= ui5strapLib %>SandboxRenderer.js',
          '<%= ui5strapLib %>Icon.js',
          '<%= ui5strapLib %>IconRenderer.js', 
          '<%= ui5strapLib %>Link.js',
          '<%= ui5strapLib %>LinkRenderer.js',
          '<%= ui5strapLib %>Text.js',
          '<%= ui5strapLib %>TextRenderer.js',
          '<%= ui5strapLib %>TextInput.js',
          '<%= ui5strapLib %>TextInputRenderer.js',
          '<%= ui5strapLib %>RadioButton.js',
          '<%= ui5strapLib %>RadioButtonRenderer.js',
          '<%= ui5strapLib %>SelectBox.js',
          '<%= ui5strapLib %>SelectBoxRenderer.js',
          '<%= ui5strapLib %>ListItem.js',
          '<%= ui5strapLib %>ListItemRenderer.js',
          '<%= ui5strapLib %>ListBase.js',
          '<%= ui5strapLib %>ListBaseRenderer.js',
          '<%= ui5strapLib %>ListLinkItem.js',
          '<%= ui5strapLib %>ListLinkItemRenderer.js',
          '<%= ui5strapLib %>ListGroupItem.js',
          '<%= ui5strapLib %>ListGroupItemRenderer.js',
          '<%= ui5strapLib %>ListMediaItem.js',
          '<%= ui5strapLib %>ListMediaItemRenderer.js',
          '<%= ui5strapLib %>RowContent.js',
          '<%= ui5strapLib %>Tooltip.js',
          '<%= ui5strapLib %>TooltipRenderer.js',
          
          '<%= ui5strapLib %>*.js',
          
          '!<%= ui5strapLib %>ui5strap-all.js',
          '!<%= ui5strapLib %>ui5strap-all-dbg.js'
          
          ],
          
          dest: '<%= ui5strapLib %>ui5strap-all-dbg.js'
      }
    },
    uglify: {
      options: {
        banner: '/*!\n * Ui5Strap App Deleopment Toolkit \n * http://ui5strap.com\n * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt \n */\n'
      },
      dist: {
        files: {
          '<%= ui5strapLib %>ui5strap-all.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);

};