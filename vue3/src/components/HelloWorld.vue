<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank">Core Docs</a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank">Forum</a>
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
            </li>
            <br>
            <li>
                <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
            </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li>
                <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
            </li>
            <li>
                <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
            </li>
            <li>
                <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
            </li>
            <li>
                <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
            </li>
        </ul>
        <img src="./python.png"/>
        <br/>
        <img src="./big.jpg" style="width:700px;"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';
    export default {
        name: 'HelloWorld',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },

        computed: {
            ...mapGetters(['username', 'userimg', 'token'])
        },

        created(){
            console.log('username->' + this.username);
            console.log('userimg->' + this.userimg);
            console.log('token->' + this.token);
            this.setToken('34f34efsdf');
            this.setUsername('张三丰');
            this.setUserimg('png.png');
            console.log('username->' + this.username);
            console.log('userimg->' + this.userimg);
            console.log('token->' + this.token);
        },

        methods: {
            ...mapMutations({
                setToken: 'SET_TOKEN',
                setUsername: 'SET_USERNAME',
                setUserimg: 'SET_USERIMG'
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
        li {
            display: inline-block;
            margin: 0 10px;
        }
    }

    a {
        color: #42b983;
    }
</style>
