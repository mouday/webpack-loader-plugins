// file-loader.js

// https://github.com/webpack/loader-utils
const loaderUtils = require("loader-utils");

module.exports = function (content) {

  // 1、根据文件内容生成带hash的文件名
  const interpolatedName = loaderUtils.interpolateName(
    this,
    "[hash].[ext][query]",
    { content }
  );

  // 2、将文件输出
  this.emitFile(interpolatedName, content)

  // 3、返回文件名
  return `module.exports = "${interpolatedName}"`;
};

// raw loader 处理图片资源，content输入为Buffer类型
module.exports.raw = true;
