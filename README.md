@vue/cli <br>
npm uninstall vue-cli -g <br>
如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先卸载它。 <br>
npm install -g @vue/cli <br>
You are using Node v7.2.0, but this version of vue-cli requires Node >=8.9. <br>
npm install -g @vue/cli-service-global <br>
vue -V <br>
cube-ui是个什么鬼？ yes Partly yes no no<br>



# vue

vue init webpack vue-music <br>
npm install <br>

子路由： <br>
router/index.js -> children: [{path:':id',component:SingerDetail}] <br>


父组件派发事件给子组件 <br>
父组件：singer/index.vue <br>
< v-listview @select="selectSinger" :data="singers"></v-listview> <br>
并编写方法 -> selectSinger(singer){ ... } <br>
import ListView from 'base/listview/index.vue'; <br>

子组件：listview/index.vue <br>
< li @click="selectItem(item)" <br>
并编写方法 -> selectItem(item){this.$emit('select', item);} <br>

vue动画 <br>
具体查看 https://cn.vuejs.org/v2/guide/transitions.html <br>

vuex官方文档 https://vuex.vuejs.org/zh-cn/intro.html <br>
index.js 入口 <br>
state.js 状态 <br>
mutations.js 定义修改的操作 <br>
mutation-types.js mutation的相关名字，存储为相关的常量 <br>
getters.js 获取state给组件 <br>
actions.js 封装mutation操作的方法 <br>
给vuex定义数据的步骤： <br>
1、定义state，项目会用到的原始数据 <br>
2、对数据映射，写在getters，可以是函数 <br>
3、修改state，逻辑的函数名写在mutations.js（包括mutation-types.js） <br>
4、一个动作中，多次改变mutation，就需要actions.js <br>

... es6扩展符 <br>



