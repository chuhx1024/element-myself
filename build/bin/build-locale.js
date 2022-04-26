// 将 /src/locale/lang 下 ESM 风格的文件 转换成 lib/umd/locale 文件夹下的 UMD 风格
// UMD的全称为Universal Module Definition，就是一种javascript通用模块定义规范，
// 让你的模块能在javascript所有运行环境中发挥作用。它就是将AMD和Commonjs整合起来,
// 使得代码在不同环境都可以正常运行.
/**
 * (function(window, factory){
 *    if (typeof exports === 'object') {
 *      module.exports = factory()
 *    } else if (typeof define === 'function' && define.amd) {
 *      define(factory)
 *    } else {
 *      window.eventUtil = factory()
 *  }
 *  })(this,function () {
 *    //    do something
 *  })
 */

var fs = require('fs');
var save = require('file-save');
var resolve = require('path').resolve;
var basename = require('path').basename;
var localePath = resolve(__dirname, '../../src/locale/lang');
var fileList = fs.readdirSync(localePath);

var transform = function(filename, name, cb) {
  require('babel-core').transformFile(resolve(localePath, filename), {
    plugins: [
      'add-module-exports',
      ['transform-es2015-modules-umd', {loose: true}]
    ],
    moduleId: name
  }, cb);
};

fileList
  .filter(function(file) {
    return /\.js$/.test(file);
  })
  .forEach(function(file) {
    var name = basename(file, '.js');

    transform(file, name, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        var code = result.code;

        code = code
          .replace('define(\'', 'define(\'element/locale/')
          .replace('global.', 'global.ELEMENT.lang = global.ELEMENT.lang || {}; \n    global.ELEMENT.lang.');
        save(resolve(__dirname, '../../lib/umd/locale', file)).write(code);

        console.log(file);
      }
    });
  });
