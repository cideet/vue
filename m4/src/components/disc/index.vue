<template>
    <transition name="slide">
        123
        <!--<v-musiclist></v-musiclist>-->
    </transition>
</template>

<script type="text/ecmascript-6">
    import Musiclist from 'components/music-list/index.vue';

    export default {
        components: {
            'v-musiclist': Musiclist
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .slide-enter-active,
    .slide-leave-active {
        transition: all .3s;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>
