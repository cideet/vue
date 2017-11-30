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




