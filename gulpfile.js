
// Include gulp
var gulp = require('gulp');
 // Define base folders
 // Include plugins
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');  

var filterByExtension = function(extension){  
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};


// Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
      .pipe(order(['src/js/app.js',
                   'src/js/slick.js'
                  ], { base: './' }))
      .pipe(concat('app.js')) 
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('build/js'));
});
 // Compile CSS from Sass files
gulp.task('sass', function() {
    return sass('src/scss/', { style: 'expanded' })
        .pipe(concat('app.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});


 // Watch for changes in files
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);
   // Watch .scss files
  gulp.watch('src/scss/*.scss', ['sass']);


});
gulp.task('serveprod', function() {
  connect.server({
    root: [your_project_path],
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

 // Default Task
gulp.task('default', ['scripts','sass', 'watch'], function(){
  var mainFiles = mainBowerFiles();

    if(!mainFiles.length){
        // No main files found. Skipping....
        return;
    }

    var jsFilter = filterByExtension('js');

    return gulp.src(mainFiles)
        .pipe(jsFilter)
        .pipe(concat('third-party.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(jsFilter.restore())
        .pipe(filterByExtension('css'))
        .pipe(concat('third-party.css'))
        .pipe(gulp.dest('build/css'));
});