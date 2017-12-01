<template>
    <div id="App">
        <v-m-header></v-m-header>
        <v-tab></v-tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <v-player></v-player>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/index.vue';
    import Tab from 'components/tab/index.vue';
    import Player from 'components/player/index.vue';
    export default{
        components: {
            'v-m-header': MHeader,
            'v-tab': Tab,
            'v-player': Player
        }

    }
</script>

<style lang="less" rel="stylesheet/less">
    @import url("common/less/variable.less");
</style>
