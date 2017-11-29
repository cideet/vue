<template>
    <div id="App">
        <v-m-header></v-m-header>
        <v-tab></v-tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/index.vue';
    import Tab from 'components/tab/index.vue';
    export default{
        components: {
            'v-m-header': MHeader,
            'v-tab': Tab
        }

    }
</script>

<style lang="less" rel="stylesheet/less">
    @import url("common/less/variable.less");
</style>
