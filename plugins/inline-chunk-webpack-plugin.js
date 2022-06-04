// plugins/inline-chunk-webpack-plugin.js
const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");

class InlineChunkWebpackPlugin {
  constructor(tests) {
    this.tests = tests;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "InlineChunkWebpackPlugin",
      (compilation) => {
        // 获取html-webpack-plugin插件实例
        const hooks = HtmlWebpackPlugin.getHooks(compilation);

        // 注册一个钩子，在html-webpack-plugin插件生成html文件时调用
        hooks.alterAssetTagGroups.tap("InlineChunkWebpackPlugin", (assets) => {
          assets.headTags = this.getInlineTag(
            assets.headTags,
            compilation.assets
          );
          assets.bodyTags = this.getInlineTag(
            assets.bodyTags,
            compilation.assets
          );
        });

        // 删除runtime文件
        hooks.afterEmit.tap("InlineChunkHtmlPlugin", () => {
          Object.keys(compilation.assets).forEach((assetName) => {
            if (this.tests.some((test) => assetName.match(test))) {
              delete compilation.assets[assetName];
            }
          });
        });
      }
    );
  }

  // 将html-webpack-plugin生成的html文件中的link和script标签提取出来
  getInlineTag(tags, assets) {
    /**
     * 
     * 输入
     * [
        {
            tagName: 'script',
            voidTag: false,
            meta: { plugin: 'html-webpack-plugin' },
            attributes: { defer: true, type: undefined, src: 'runtime-main.js' }
        }
      ]

      输出：
      [
        {
            tagName: 'script',
            innerHTML: 'runtime的文件内容',
            closeTag: true,
        }
      ]
     */
    return tags.map((tag) => {
      if (tag.tagName !== "script") return tag;

      // 文件路径
      const scriptName = tag.attributes.src;

      if (!this.tests.some((test) => scriptName.match(test))) return tag;

      return {
        tagName: "script",
        innerHTML: assets[scriptName].source(),
        closeTag: true,
      };
    });
  }
}

module.exports = InlineChunkWebpackPlugin;
