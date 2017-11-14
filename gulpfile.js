// Gulp.js configuration
var
// modules
gulp = require('gulp'),
browserSync = require('browser-sync');
newer = require('gulp-newer'),
imagemin = require('gulp-imagemin'),
htmlclean = require('gulp-htmlclean'),
concat = require('gulp-concat'),
deporder = require('gulp-deporder'),
stripdebug = require('gulp-strip-debug'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
postcss = require('gulp-postcss'),
assets = require('postcss-assets'),
autoprefixer = require('autoprefixer'),
mqpacker = require('css-mqpacker'),
cssnano = require('cssnano'),

// development mode?
devBuild = (process.env.NODE_ENV !== 'production'),

// folders
folder = {
  src: 'src/',
  build: 'build/'
};

gulp.task('browser-sync', function () {
  var files = [
     folder.src+'*.html',
     folder.src+'scss/*.scss',
     folder.src+'images/*.{png,jpg,gif, jpeg}',
     folder.src+'js/*.js'
  ];

  browserSync.init(files, {
     server: {
        baseDir: folder.src
     }
  });

});

// image processing
gulp.task('images', function() {
    var out = folder.build + 'images/';
    return gulp.src(folder.src + 'images/**/*')
      .pipe(newer(out))
      .pipe(imagemin({ optimizationLevel: 5 }))
      .pipe(gulp.dest(out));
  });

  // HTML processing
gulp.task('html', function() {
    var
      out = folder.build ,
      page = gulp.src(folder.src + '/*.html')
        .pipe(newer(out));
  
    // minify production code
    if (!devBuild) {
      page = page.pipe(htmlclean());
    }
  
    return page.pipe(gulp.dest(out));
  });

  // JavaScript processing
gulp.task('js', function() {
    
      var jsbuild = gulp.src(folder.src + 'js/**/*')
        .pipe(deporder())
        .pipe(concat('main.js'));
    
      if (!devBuild) {
        jsbuild = jsbuild
          .pipe(stripdebug())
          .pipe(uglify());
      }
    
      return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
    
    });

    // CSS processing
gulp.task('css', function() {
    
      var postCssOpts = [
      assets({ loadPaths: ['images/'] }),
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
      mqpacker
      ];
    
      if (!devBuild) {
        postCssOpts.push(cssnano);
      }
    
      return gulp.src(folder.src + 'scss/main.scss')
        .pipe(sass({
          outputStyle: 'nested',
          imagePath: 'images/',
          precision: 3,
          errLogToConsole: true
        }))
        .pipe(postcss(postCssOpts))
        .pipe(gulp.dest(folder.build + 'css/'));
    
    });

    // watch for changes
gulp.task('watch', function() {
        
      // html changes
      gulp.watch(folder.src + '*.html', gulp.series('html'));
    
      // javascript changes
      gulp.watch(folder.src + 'js/**/*', gulp.series('js'));
    
      // css changes
      gulp.watch(folder.src + 'scss/**/*', gulp.series('css'));
    
    });

    gulp.task('run', gulp.series('html', 'css', 'js', 'browser-sync'));

    gulp.task('default', gulp.series('run', 'watch'));