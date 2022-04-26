# 打造自己的组件库
## 熟悉 element-ui 项目
### 工程化
- 装包 因为 node-sass 是 4.6  所以要用 nodejsV11.15.0
- 封装了 make (详见项目根目录 Makefile)
- 添加新组件 时  只用使用 make new ccc 就可以添加 13个文件 专注于开发组件本身
- 可以 make paly 起一个小项目  在 examples/play 中引入 新组件  方便 新组件 开发调试

### 官网
- examples文件夹就是官网的项目
- 执行 make dev 可以本地启动官网
```sh
make dev 
```
- 开发新组件 是会自动引入到官网的(make new ccc 时的 13个文件 就有官网相关的)
- 新组件的使用方法说明 可以在 13个文件 的 .md 中编写(默认4种语言)

### 组件库

### 类型声明
