// style-loader.js

module.exports = function () {};

module.exports.pitch = function (remainingRequest) {
  // remainingRequest 剩余的还要处理的loader

  //   console.log(remainingRequest);
  //   _modules/css-loader/dist/cjs.js!/root/webpack-loader/src/style.css

  // 将绝对路径转换为相对路径
  const relativePath = remainingRequest
    .split("!")
    .map((absolutePath) => {
      return this.utils.contextify(this.context, absolutePath);
    })
    .join("!");

  console.log(relativePath);

  // 引入css-loader处理后的资源
  // 创建style标签，将内容插入到页面中
  const script = `
        import style from '!!${relativePath}';

        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        document.head.appendChild(styleElement); 
    `;

  // 终止后面的loader执行
  return script;
};
