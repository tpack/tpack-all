// 载入 tpack 包。
var tpack = require("tpack");

// 设置全局忽略的路径。
tpack.ignore(".*", "_*", "$*", "*.psd", "*.ai", "*.log", "*.exe", "*.tmp", "*.db", "Desktop.ini", "tpack*", "node_modules", "dest");

// 全局统一配置。
tpack.src("*.scss").pipe(require("tpack-sass")).dest("$1.css");
tpack.src("*.less").pipe(require("tpack-less")).dest("$1.css");
tpack.src("*.es").pipe(require("tpack-es6")).dest("$1.js");
tpack.src("*.coffee").pipe(require("tpack-coffee-script")).dest("$1.js");

// 生成任务。
tpack.task('build', function (options) {
	
	// 首先执行之前的规则。
	tpack.build();
	
	// 第 2 次生成。
	tpack.destPath = options.dest || "_dest/";
	
	// 压缩 CSS 和 JS
	tpack.src("*.css").pipe(require('tpack-assets').css).pipe(require('tpack-clean-css'));
	tpack.src("*.js").pipe(require('tpack-assets').js).pipe(require('tpack-uglify-js'));
	
	// 处理 HTML 里的文件引用。
	tpack.src("*.html", "*.htm").pipe(require("tpack-assets").html, {urlPostfix:"_=<md5>"});
	
	// 开始根据之前定制的所有规则开始生成操作。
	tpack.build();

});

// 监听任务。
tpack.task('watch', function (options) {
	tpack.watch();
});

// 服务器任务。
tpack.task('server', function (options) {
	tpack.startServer();
});

// 支持在执行 node tpack.js 时直接执行 default 任务。
if (process.mainModule === module) {
	tpack.task('default');
}
