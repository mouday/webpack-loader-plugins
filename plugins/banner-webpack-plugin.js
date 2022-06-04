// plugins/banner-webpack-plugin.js
class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // 需要处理文件
    const extensions = ["js", "css"];

    // 前缀注释
    const prefix = `/*
* Author: ${this.options.author}
*/\n`;

    // emit是异步串行钩子
    compiler.hooks.emit.tapAsync(
      "BannerWebpackPlugin",
      (compilation, callback) => {
        // compilation.assets包含所有即将输出的资源
        // 通过过滤只保留需要处理的文件
        const assetPaths = Object.keys(compilation.assets).filter((assetPath) => {
          const splitted = assetPath.split(".");
          return extensions.includes(splitted[splitted.length - 1]);
        });

        // 遍历需要处理的资源，添加注释
        assetPaths.forEach((assetPath) => {
          // 获取文件内容
          const source = compilation.assets[assetPath].source();

          // 添加注释
          const content = prefix + source;

          // 覆盖资源
          compilation.assets[assetPath] = {
            // 资源内容
            source() {
              return content;
            },
            // 资源大小
            size() {
              return content.length;
            },
          };
        });

        callback();
      }
    );
  }
}

module.exports = BannerWebpackPlugin;
