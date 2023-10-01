// gulpfile.js
const { src, dest } = require("gulp");
const terser = require("gulp-terser"); // 压缩

const getJquery = () => {
	return src("./node_modules/jquery/dist/jquery.min.js")
		.pipe(terser())
		.pipe(dest("src/static/js"));
};

const getLodash = () => {
	return src("./node_modules/lodash/lodash.js")
		.pipe(terser())
		.pipe(dest("src/static/js"));
};

const getDayjs = () => {
	return src("./node_modules/dayjs/dayjs.min.js")
		.pipe(terser())
		.pipe(dest("src/static/js"));
};

const Tools = () => {
	return [getJquery, getLodash, getDayjs];
};

module.exports = {
	Tools,
};
