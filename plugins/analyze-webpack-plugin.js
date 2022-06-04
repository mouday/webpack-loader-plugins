// plugins/analyze-webpack-plugin.js

class AnalyzeWebpackPlugin {
  apply(compiler) {
    // emit是异步串行钩子
    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
      // Object.entries将对象变成二维数组。二维数组中第一项值是key，第二项值是value

      let list = ["# 分析打包资源大小", "", "| 名称 | 大小 |", "| --- | --- |"];

      for (let [filename, file] of Object.entries(compilation.assets)) {
        list.push(`| ${filename} | ${Math.ceil(file.size() / 1024)}KB |`);
      }

      let source = list.join("\n");

      // 生成一个md文件
      compilation.assets["analyze.md"] = {
        source() {
          return source;
        },
        size() {
          return source.length;
        },
      };
    });
  }
}

module.exports = AnalyzeWebpackPlugin;
