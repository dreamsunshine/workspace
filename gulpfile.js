var gulp=require('gulp'),
	less=require('gulp-less'),
	rename=require('gulp-rename'),
	jshint=require('gulp-jshint'),
	livereload=require('gulp-livereload'),
	minifycss=require('gulp-minify-css'),
	del=require('del'),
	concat=require('gulp-concat'),
	notify=require('gulp-notify'),
	uglify=require('gulp-uglify'),
	imagemin=require('gulp-imagemin'),
	cache=require('gulp-cache'),
	plumber=require('gulp-plumber');

var resource=['js/*.min.js'];
gulp.task('lesstocss',function(){
	return gulp.src('css/*.less')
		.pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))
		.pipe(less())
		.pipe(gulp.dest('css'))
		.pipe(notify({message:'lesstocss task complete'}))
})

gulp.task('cssmini',['lesstocss'],function(){
	return gulp.src(['css/*.css','!css/main.css'])
		.pipe(concat('main.css'))
		.pipe(gulp.dest('css'))
		.pipe(rename({suffix:'.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({message:'cssmini task complete'}))
})

gulp.task('jsmini',function(){
	return gulp.src(['js/*.js','!js/*.min.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({message:'jsmini task complete'}))
})

gulp.task('resourceto',function(){
	return gulp.src(resource)
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({message:'resourceto task complete'}))
})

gulp.task('imgmini',function(){
	return gulp.src('img/*')
//		.pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))
//		.pipe(imagemin({optimizationLevel:5,progressive:true,interlaced:true}))
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({message:'imgmini task complete'}))
})

gulp.task('clean',function(cb){
	del(['dist/css/','dist/js/','dist/img/'],cb);
})

gulp.task('default',function(){
	gulp.start('cssmini','jsmini','imgmini','resourceto','watch');
})

gulp.task('watch',function(){
	gulp.watch('css/*.less',['lesstocss']);
	gulp.watch('js/*.js',['jsmini']);
	gulp.watch('img/*',['imgmini']);
	gulp.watch('css/*.css',['cssmini']);
	gulp.watch('js/*.min.js',['resourceto']);
	livereload.listen();
	gulp.watch(['css/*','js/*','img/*']).on('change',livereload.changed);
	gulp.watch('dist/**').on('change',livereload.changed);
	gulp.watch('*.html').on('change',livereload.changed);
})