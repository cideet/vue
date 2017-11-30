<template>
    <transition name="slide">
        <div class="singer-detail">singer-detail</div>
    </transition>
    <!--<transition name="slide">-->
    <!--<v-music-list :songs="songs" :title="title" :bg-image="bgImage"></v-music-list>-->
    <!--</transition>-->
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created() {
            console.log('----');
            console.log(this.singer);
        }
    };
</script>

<style rel="stylesheet/less" lang="less">
    @import url("../../common/less/variable.less");

    .singer-detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: @color-background;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all .3s;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>
