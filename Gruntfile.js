'use strict';
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'assets/js/custom.js']
		},
		sass: {                              // Task
			dev: {                            // Target
				options: {                       // Target options        
					style: 'expanded',
					sourcemap: true,
					debugInfo: true
				},
				files: {                         // Dictionary of files
					'assets/css/main.css': 'assets/sass/bootstrap.scss'       // 'destination': 'source'
				}
			},
			dist: {                            // Target
				options: {                       // Target options
					banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
						'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
						'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
						' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
					style: 'compressed',
					debugInfo: false,
					trace: false
				},
				files: {                         // Dictionary of files
					'assets/css/main.css': 'assets/sass/bootstrap.scss'       // 'destination': 'source'
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
					'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
					' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
			},
			dev: {
				options: {
					beautify: true,          
				},   
				files: {'assets/js/main.js' : [
									'assets/js/bootstrap/affix',
									'assets/js/bootstrap/alert',
									'assets/js/bootstrap/button',
									'assets/js/bootstrap/carousel',
									'assets/js/bootstrap/collapse',
									'assets/js/bootstrap/dropdown',
									'assets/js/bootstrap/tab',
									'assets/js/bootstrap/transition',
									'assets/js/bootstrap/scrollspy',
									'assets/js/bootstrap/modal',
									'assets/js/bootstrap/tooltip',
									'assets/js/bootstrap/popover',
									'assets/js/plugins.js',
									'assets/js/custom.js'
					]
				}
			},
			dist: {
				options: {
					report: 'gzip',
				},    
				files: {'assets/js/main.js' : [
									'assets/js/bootstrap/affix',
									'assets/js/bootstrap/alert',
									'assets/js/bootstrap/button',
									'assets/js/bootstrap/carousel',
									'assets/js/bootstrap/collapse',
									'assets/js/bootstrap/dropdown',
									'assets/js/bootstrap/tab',
									'assets/js/bootstrap/transition',
									'assets/js/bootstrap/scrollspy',
									'assets/js/bootstrap/modal',
									'assets/js/bootstrap/tooltip',
									'assets/js/bootstrap/popover',
									'assets/js/plugins.js',
									'assets/js/custom.js'
					]
				}
			},
		},
		watch: {
			sass: {
				files: [     
					'assets/sass/*/*.scss'
				],
				tasks: ['sass:dev'],
				options: {
					// Start a live reload server on the default port 35729
					livereload: true,
				}
			},
			html: {
				files: [
					'*.php',
					'templates/*.php',
					'*.html'
				],
				options: {
					// Start a live reload server on the default port 35729
					livereload: true,
				}
			},
			js: {
				files: [
					'assets/js/*.js',
					'assets/js/*/*.js',
				],
				tasks: ['jshint', 'uglify:dev'],
				options: {
					// Start a live reload server on the default port 35729
					livereload: true,
				}
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('default', [
		'watch'
	]);
	grunt.registerTask('dist', [
		'sass:dist',
		'uglify:dist'
	]);
	grunt.registerTask('dev', [
		'watch'
	]);
};