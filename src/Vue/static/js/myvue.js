var Vue = (function (exports) {
	"use strict";
	const createApp = (...args) => {
		// const app = ensureRenderer().createApp(...args);
		console.log(ensureRenderer());
	};

	const rendererOptions = extend({ patchProp }, nodeOps);
	const extend = Object.assign;
	let renderer;
	function ensureRenderer() {
		return renderer || (renderer = createRenderer(rendererOptions));
	}

	function createRenderer(options) {
		return baseCreateRenderer(options);
	}
	function baseCreateRenderer(options, createHydrationFns) {
		console.log(options, createHydrationFns);
	}

	exports.createApp = createApp;
})({}); //{} 就是内部的 exports
