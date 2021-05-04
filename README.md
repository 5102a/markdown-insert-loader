# markdown-insert-loader

在 markdown 文件头部和尾部添加自定义内容

基于 [file-loader](https://www.npmjs.com/package/file-loader) 二次开发的 markdown loader

## 安装

安装 loader

```js
 npm i markdown-insert-loader -D 
```

### 配置

在webpack.config.js中配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-insert-loader',
            options: {
              header: '[^_^]:这是头部注释',
              footer: '[^_^]:这是尾部注释',
              generate: true, // 独立生成markdown文件，不参与其他loader转换
            },
          },
        ],
      },
    ],
  },
};
```

#### options

##### header

Type: `String|Function` Default: `''`

markdown文档头部位置插入内容，可以为markdown任意语法内容，并支持函数形式，将返回值做为插入内容，函数参数content为markdown源文档内容字符串

```js
{
  test: /\.md$/,
  loader: 'markdown-insert-loader',
  options: {
    header: `头部内容`,
    // or
    header(content){
      // 处理并生成头部内容返回
      return `头部内容`
    }
  },
},
```

##### footer

Type: `String|Function` Default: `''`

markdown文档尾部位置插入内容，可以为markdown任意语法内容，并支持函数形式，将返回值做为插入内容，函数参数content为markdown源文档内容字符串

```js
{
  test: /\.md$/,
  loader: 'markdown-insert-loader',
  options: {
    footer: `尾部内容`,
    // or
    footer(content){
      // 处理并生成尾部内容返回
      return `尾部内容`
    }
  },
},
```

##### generate

Type: `Boolean` Default: `false`

是否直接生成markdown文档，如需直接处理并生成新的markdown文档则设为true，如果参与其他loader预处理，则设为false

```js
{
  test: /\.md$/,
  loader: 'markdown-insert-loader',
  options: {
    generate:true,// 重新生成markdown文件
  },
},
```

##### other

由于此 loader 基于 [file-loader](https://www.npmjs.com/package/file-loader) 开发，所以支持 file-loader 的所有配置选项

相关配置项可查看 https://github.com/webpack-contrib/file-loader

### 做为中间loader

做为markdown文档中间处理loader，并将处理后的文档传递到下一个loader

这里可以使用 [markdown-loader](https://www.npmjs.com/package/markdown-loader) 转换成html文档

再用 [html-loader](https://www.npmjs.com/package/html-loader) 处理html文档

webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
          {
            loader: 'markdown-insert-loader',
            options: {
              header: '[^_^]:这是头部注释',
              footer: '[^_^]:这是尾部注释',
              generate: false,
            },
          },
        ],
      },
    ],
  },
};
```

### 做为base loader

做为最终处理的loader，则需设置generate为true，这样才会单独生成markdown文件

webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'markdown-insert-loader',
        options: {
          header: '[^_^]:这是头部注释',
          footer: '[^_^]:这是尾部注释',
          generate: true, // 独立生成文件
        },
      },
    ],
  },
};
```
