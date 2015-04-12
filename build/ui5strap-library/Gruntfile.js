module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'lib/ui5strap/library.js',
          'lib/ui5strap/ActionFunctions.js',
          'lib/ui5strap/ActionContext.js',
          'lib/ui5strap/ActionModule.js',
          'lib/ui5strap/Action.js',
          'lib/ui5strap/ViewerBase.js',
          'lib/ui5strap/Viewer.js',
          'lib/ui5strap/AppConfig.js',
          'lib/ui5strap/AppComponent.js',
          'lib/ui5strap/AppFrame.js',
          'lib/ui5strap/AppBase.js',
          'lib/ui5strap/App.js',
          'lib/ui5strap/Button.js',
          'lib/ui5strap/ButtonRenderer.js',
          'lib/ui5strap/Icon.js',
          'lib/ui5strap/IconRenderer.js', 
          'lib/ui5strap/Link.js',
          'lib/ui5strap/LinkRenderer.js',
          'lib/ui5strap/Text.js',
          'lib/ui5strap/TextRenderer.js',
          'lib/ui5strap/TextInput.js',
          'lib/ui5strap/TextInputRenderer.js',
          'lib/ui5strap/RadioButton.js',
          'lib/ui5strap/RadioButtonRenderer.js',
          'lib/ui5strap/SelectBox.js',
          'lib/ui5strap/SelectBoxRenderer.js',
          'lib/ui5strap/ListItem.js',
          'lib/ui5strap/ListItemRenderer.js',
          'lib/ui5strap/ListBase.js',
          'lib/ui5strap/ListBaseRenderer.js',
          'lib/ui5strap/ListLinkItem.js',
          'lib/ui5strap/ListLinkItemRenderer.js',
          'lib/ui5strap/ListGroupItem.js',
          'lib/ui5strap/ListGroupItemRenderer.js',
          'lib/ui5strap/ListMediaItem.js',
          'lib/ui5strap/ListMediaItemRenderer.js',
          'lib/ui5strap/RowContent.js',
          'lib/ui5strap/Tooltip.js',
          'lib/ui5strap/TooltipRenderer.js',
          'lib/ui5strap/*.js',
          '!lib/ui5strap/ui5strap-all.js',
          '!lib/ui5strap/ui5strap-all-dbg.js'],
        dest: '../../lib/ui5strap/ui5strap-all-dbg.js'
      }
    },
    uglify: {
      options: {
        banner: '/*!\n * Ui5Strap App Deleopment Toolkit \n * http://ui5strap.com\n * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt \n */\n'
      },
      dist: {
        files: {
          '../../lib/ui5strap/ui5strap-all.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);

};