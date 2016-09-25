/*
* 课程2
* 代码如下
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
   return gulp.src('./src/index.js') //该任务的源文件
       .pipe(browserify()) //源文件需要做的处理--此处是模块化
       .pipe(uglify()) //源文件需要做的处理--此处是模块化后进行压缩
       .pipe(gulp.dest('./dest')); //将处理完成后的文件输出到哪个文件夹中
});*/
