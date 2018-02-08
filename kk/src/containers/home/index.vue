<template>
    <div class="home">
        <h2>Home</h2>
        <router-link to="/login">注册</router-link>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import Footer from '../../components/footer/index.vue';

    export default{
        components: {
            'v-footer': Footer
        }
    }

</script>

<style lang="less" rel="stylesheet/less">

</style>
