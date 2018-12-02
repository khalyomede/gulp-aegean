const gulp = require("gulp");
const typescript = require("gulp-typescript");

gulp.task("typescript", function() {
	return gulp
		.src("src/**/*.ts")
		.pipe(typescript())
		.pipe(gulp.dest("dist"));
});

gulp.task("watch:js", function() {
	return gulp.watch("src/**/*.ts", ["typescript"]);
});

// Testing
const aegean = require("./dist/main");

gulp.task("test-1", function() {
	return gulp
		.src("test/test-1.js")
		.pipe(aegean())
		.pipe(gulp.dest("test/result"));
});
