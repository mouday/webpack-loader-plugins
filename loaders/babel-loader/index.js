// babel-loader.js
const babel = require("@babel/core");

const schema = require("./schema.json");

// https://www.babeljs.cn/docs/babel-core

module.exports = function (content, map, meta) {
  // 异步loader
  const callback = this.async();

  // schema对options进行规则校验
  const options = this.getOptions(schema);

  // 使用babel 对代码进行编译
  babel.transform(content, options, function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
};
