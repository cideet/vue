<template>
    <div id="App">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        components: {
        }

    }
</script>

<style lang="less" rel="stylesheet/less">
    body {
        display: flex;
    }
</style>
