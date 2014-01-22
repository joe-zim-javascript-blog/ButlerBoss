module.exports = function(grunt) {

	grunt.initConfig({
		less: {
			dev: {
				options: {
					sourceMap: true,
					sourceMapFilename: "public/css/main.map"
				},
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
				files: ["public/*", "public/**/*.js", "public/**/*.tpl", "public/**/*.less"],
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

	grunt.registerTask("build", ["build:prod"]);
	grunt.registerTask("build:prod", ["less:prod"]);
	grunt.registerTask("build:dev", ["less:dev"]);
	grunt.registerTask("default", ["less:dev", "watch:dev"]);

};