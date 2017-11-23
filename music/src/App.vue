<template>
    <div id="App">
        <m-header></m-header>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/index.vue';
    export default{
        components: {
            MHeader: MHeader
        }

    }
</script>

<style lang="less" rel="stylesheet/less">
    body {
        background: red;
        display: flex;
    }
</style>
