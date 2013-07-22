module.exports = function(grunt) {

	grunt.initConfig({
		less: {
			dev: {
				files: {
					"public/css/main.css" : "public/less/main.less"
				}
			},
			prod: {
				options: {
					yuicompress: true,
					dumpLineNumbers: 'comments'
				},
				files: {
					"public/css/main.css" : "public/less/main.less"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('build', ['less:prod']);

	grunt.registerTask('default', ['less:dev']);

};