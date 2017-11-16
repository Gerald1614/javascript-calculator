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
cleanCSS = require('gulp-clean-css');


// development mode?
devBuild = (process.env.NODE_ENV !== 'production'),

// folders
folder = {
  src: 'src/',
  dist: 'dist/'
};

gulp.task('browser-sync', function () {
  var files = [
     folder.src+'*.html',
     folder.src+'css/*.css',
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
    var out = folder.dist + 'images/';
    return gulp.src(folder.src + 'images/**/*')
      .pipe(newer(out))
      .pipe(imagemin({ optimizationLevel: 5 }))
      .pipe(gulp.dest(out));
  });

  // HTML processing
gulp.task('html', function() {
 
    var
      out = folder.dist,
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
    
      return jsbuild.pipe(gulp.dest(folder.dist + 'js/'));
    
    });

    gulp.task('minify-css', () => {
      return gulp.src(folder.src +'css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(folder.dist+ 'css'));
    });

   

    // watch for changes
gulp.task('watch', function() {
        
      // html changes
      gulp.watch( '*.html', gulp.series('html'));
    
      // javascript changes
      gulp.watch( 'js/**/*.js', gulp.series('js'));
    
      // css changes
      gulp.watch( 'css/**/*.css', gulp.series('minify-css'));
    
    });

    gulp.task('build', gulp.series('html','minify-css', 'js', 'images', 'browser-sync'));

    gulp.task('default', gulp.series('build', 'watch'));