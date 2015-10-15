// ���� tpack ����
var tpack = require("tpack");

// ����ȫ�ֺ��Ե�·����
tpack.ignore(".*", "_*", "$*", "*.psd", "*.ai", "*.log", "*.exe", "*.tmp", "*.db", "Desktop.ini", "tpack*", "node_modules", "dest");

// ȫ��ͳһ���á�
tpack.src("*.scss").pipe(require("tpack-sass")).dest("$1.css");
tpack.src("*.less").pipe(require("tpack-less")).dest("$1.css");
tpack.src("*.es").pipe(require("tpack-es6")).dest("$1.js");
tpack.src("*.coffee").pipe(require("tpack-coffee-script")).dest("$1.js");

// ��������
tpack.task('build', function (options) {
	
	// ����ִ��֮ǰ�Ĺ���
	tpack.build();
	
	// �� 2 �����ɡ�
	tpack.destPath = options.dest || "_dest/";
	
	// ѹ�� CSS �� JS
	tpack.src("*.css").pipe(require('tpack-assets').css).pipe(require('tpack-clean-css'));
	tpack.src("*.js").pipe(require('tpack-assets').js).pipe(require('tpack-uglify-js'));
	
	// ���� HTML ����ļ����á�
	tpack.src("*.html", "*.htm").pipe(require("tpack-assets").html, {urlPostfix:"_=<md5>"});
	
	// ��ʼ����֮ǰ���Ƶ����й���ʼ���ɲ�����
	tpack.build();

});

// ��������
tpack.task('watch', function (options) {
	tpack.watch();
});

// ����������
tpack.task('server', function (options) {
	tpack.startServer();
});

// ֧����ִ�� node tpack.js ʱֱ��ִ�� default ����
if (process.mainModule === module) {
	tpack.task('default');
}
