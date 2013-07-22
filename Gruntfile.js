module.exports = function(grunt) {

	grunt.initConfig({
		less: {
			dev: {
				files: {
					"public/css/main.css" : "public/less/main.less"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('build', ['less']);

	grunt.registerTask('default', ['less']);

};