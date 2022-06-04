// plugins/test-plugin.js
class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor");
  }

  apply(compiler) {
    debugger;
    console.log("TestPlugin apply");

    // 从文档可知, environment hook 是 SyncHook,
    // 也就是同步钩子, 只能用tap注册
    compiler.hooks.environment.tap("TestPlugin", (compilationParams) => {
      console.log("compiler.environment()");
    });

    // 从文档可知, emit 是 AsyncSeriesHook,
    // 也就是异步串行钩子，特点就是异步任务顺序执行
    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      console.log("compiler.emit() 111");
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 222");
        callback();
      }, 2000);
    });

    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("compiler.emit() 333");
          resolve();
        }, 1000);
      });
    });

    // 从文档可知, make 是 AsyncParallelHook,
    // 也就是异步并行钩子, 特点就是异步任务同时执行
    // 可以使用 tap、tapAsync、tapPromise 注册。
    // 如果使用tap注册的话，进行异步操作是不会等待异步操作执行完成的。
    compiler.hooks.make.tap("TestPlugin", (compilation) => {
      setTimeout(() => {
        console.log("compiler.make() 111");
      }, 2000);
    });

    // 使用tapAsync、tapPromise注册，进行异步操作会等异步操作做完再继续往下执行
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.make() 222");
        // 必须调用
        callback();
      }, 1000);
    });

    compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
      // 必须返回promise
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("compiler.make() 333");
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = TestPlugin;
