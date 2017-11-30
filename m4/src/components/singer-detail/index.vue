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
    import {getSingerDetail} from 'api/singer.js';
    import {ERR_OK} from 'api/config.js';
    import {createSong} from 'common/js/song.js';

    export default {
        data(){
            return {
                songs: []
            }
        },
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created() {
            console.log(this.singer);
            this._getDetail();
        },
        methods: {
            _getDetail(){
                if (!this.singer.id) {  //比如刷新页面时，便没有Id了
                    this.$router.push('/singer');
                    return;
                }
                getSingerDetail(this.singer.id).then((res)=> {
                    if (res.code == ERR_OK) {
                        // console.log('该歌手所有的歌曲');
                        // console.log(res.data.list);
                        this.songs = this._normalizeSongs(res.data.list);
                        console.log(this.songs);
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    let musicData = item.musicData;
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData));
                    }
                });
                return ret;
            }
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
