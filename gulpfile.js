// gulpfile.js
const { src, dest, parallel, series, watch } = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const scss = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync");
var postcss = require("gulp-postcss");
// const htmlreplace = require("gulp-html-replace");
const { Tools } = require("./gulpfile-tool.js");

const htmlTask = () => {
	return src("./src/**/*.html").pipe(dest("./dist"));
};
const imageTask = () => {
	return src("./src/**/*.{PNG,png,jpg}").pipe(dest("./dist"));
};

const jsTask = () => {
	return src("./src/**/*.js")
		.pipe(babel({ presets: ["@babel/preset-env"] })) // 经过插件处理
		.pipe(terser()) // 经过插件压缩
		.pipe(dest("./dist")); // 一步步处理后再输出
};

const cssTask = () => {
	return src("./src/**/*.css")
		.pipe(postcss([require("postcss-preset-env")]))
		.pipe(dest("./dist"));
};
const scssTask = () => {
	return src("./src/**/*.scss")
		.pipe(scss({ bundleExec: true }))
		.pipe(postcss([require("postcss-preset-env")]))
		.pipe(dest("./dist"));
};

// 开启本地服务
const bs = browserSync.create();
const serve = () => {
	// gulp监听变化重新执行任务 开启了服务才监听变化
	watch("./src/**/*.html", htmlTask);
	watch("./src/**/*.js", jsTask);
	watch("./src/**/*.scss", scssTask);
	watch("./src/**/*.css", cssTask);

	// browserSync 监听变化热更新
	bs.init({
		port: 8080,
		open: true,
		files: "./dist/**/*", // 监听这些文件变化自动刷新
		server: {
			baseDir: "./dist", // 去哪里打开页面
			directory: true,
		},
	});
};

// 获取常用工具

// 多个任务并行执行
const parallelTask = parallel(htmlTask, jsTask, cssTask, imageTask, scssTask);
// 启动服务服务
const serveTask = series(parallelTask, serve);
// 获取工具库
const toolTask = parallel(...Tools());

module.exports = {
	serveTask,
	toolTask,
};
