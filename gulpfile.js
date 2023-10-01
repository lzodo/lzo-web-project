// pnpm add @babel/core gulp-babel @babel/preset-env -D // 安装 babel
// pnpm add gulp-terser -D // 安装压缩插件
// pnpm add gulp-htmlmin -D // 压缩html
// pnpm add gulp-sass -D
// pnpm add browser-sync -D // npm插件用于搭建服务

// gulpfile.js
const { src, dest, parallel, series, watch } = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const htmlmin = require("gulp-htmlmin");
const scss = require("gulp-sass")(require("sass"));
// const inject = require("gulp-inject");
const browserSync = require("browser-sync");
// let connect = require("gulp-connect"); //引入gulp-connect模块 浏览器刷新
// var webserver = require("gulp-webserver");

const htmlTask = () => {
	return src("./src/**/*.html").pipe(dest("./dist"));
};

const cssTask = () => {
	return src("./src/**/*.css").pipe(dest("./dist"));
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

const scssTask = () => {
	return src("./src/**/*.scss")
		.pipe(scss({ bundleExec: true }))
		.pipe(dest("./dist"));
};

// 开启本地服务
console.log("====================");
console.log(browserSync);
console.log("====================");

const bs = browserSync.create();
const reloadTask = () => {};
const serve = () => {
	// 开启了服务才监听变化
	// watch("./src/**/*.js", buildTask);
	watch("./src/**/*", parallel(htmlTask, jsTask, cssTask, scssTask));
	bs.init({
		// serve: true,
		port: 8080,
		open: true,
		files: "./dist/**/*", // 监听这些文件变化自动刷新
		server: {
			baseDir: "./dist", // 去哪里打开页面
			directory: true,
		},
	});
};

// 多个任务并行执行
const parallelTask = parallel(htmlTask, jsTask, cssTask, imageTask, scssTask);
// 多个任务串行执行
// const buildTask = series(seriesTask, injectTask);

// 配上服务
const serveTask = series(parallelTask, serve);

module.exports = {
	// buildTask,
	serveTask,
};
