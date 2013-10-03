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
					dumpLineNumbers: "comments"
				},
				files: {
					"public/css/main.css" : "public/less/main.less"
				}
			}
		},

		watch: {
			dev: {
				files: "public/**/*.less",
				tasks: ["less:dev"],
				options: {
					livereload: true
				}
			},
			prod: {
				files: "public/**/*.less",
				tasks: ["less:prod"],
				options: {
					livereload: true
				}
			},
		}
	});

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("build", ["less:prod"]);
	grunt.registerTask("default", ["less:dev", "watch:dev"]);

};