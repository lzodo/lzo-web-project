运行时：

程序运行时执行的语法

```scss
// 运行时语法，项目打包编译完scss文件后，生成的css文件中，这些语法不会改变，浏览器是会认识的
@import url('./xxx.scss')
    
```



编译时：

程序编译时执行的语法

```scss
// 编译时语法，项目打包编译完scss文件后，生成的css文件中，@import './xxx.scss' 会被替换成scss下的文件，浏览器不能直接执行的这些
@import './xxx.scss' ==> 后面优化成 @use './xxx.scss' 会有命名空间解决污染问题
    
```

