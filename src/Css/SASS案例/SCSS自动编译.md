vscode 安装 Live Sass Compiler
![官方文档](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)

配置
1、当前项目 .vscode 下 settings.json

```json
{
	"liveSassCompile.settings.formats": [
		{
			"format": "expanded", // compressed压缩
			"extensionName": ".css",
			"savePath": "~/css" //当前scss文件css文件夹下生成css文件
		}
	],
	"liveSassCompile.settings.excludeList": [
		"**/node_modules/**",
		".vscode/**",
		"/**/var.scss" // 排除当前文件同级的var.scss
	],
	"liveSassCompile.settings.generateMap": true,
	"liveSassCompile.settings.autoprefix": ["> 1%", "last 3 versions"]
}
```

2、新建 scss 文件，点击下方状态栏 Watch Sass 进行监听编译
