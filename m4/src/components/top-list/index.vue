<template>
    <transition name="slide">
        <v-musiclist :title="title" :bg-image="bgImage"></v-musiclist>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import Musiclist from '../music-list/index.vue';

    export default {
        computed: {
            title(){
                return this.topList.topTitle;
            },
            bgImage(){
                return this.topList.picUrl;
            },
            ...mapGetters(['topList'])
        },
        components: {
            'v-musiclist': Musiclist
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
    .slide-enter-active,
    .slide-leave-active {
        transition: all .3s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>
