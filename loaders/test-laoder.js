/**
 *
// loaders/test-laoder.js 
* @param {*} content 源文件的内容
 * @param {*} map SourceMap 数据
 * @param {*} meta 数据，可以是任何内容
 * @returns
 */
module.exports = function loader1(content, map, meta) {
  console.log("hello loader");
  return content;
};
