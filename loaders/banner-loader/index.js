// banner-loader.js
const schema = require("./schema.json");

module.exports = function (content, map, meta) {
  // schema对options进行规则校验
  const options = this.getOptions(schema);
  
  const prefix = `
       /**
       * Author: ${options.author}
       **/
    `;
  return prefix + content;
};
