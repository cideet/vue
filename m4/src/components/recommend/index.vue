<template>
    <div class="recommend" ref="recommend">
        <v-scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <v-slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img @load="loadImage" :src="item.picUrl" class="needsclick"/>
                            </a>
                        </div>
                    </v-slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li @click="selectItem(item)" class="item" v-for="item in discList">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl"/>
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <v-loading></v-loading>
            </div>
        </v-scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from 'base/slider/index.vue';
    import Scroll from 'base/scroll/index.vue';
    import Loading from 'base/loading/index.vue';

    import {getRecommend, getDiscList} from 'api/recommend';
    import {ERR_OK} from 'api/config';
    import {playlistMixin} from 'common/js/mixin';

    export default{
        mixins: [playlistMixin],
        data(){
            return {
                recommends: [],
                discList: []
            };
        },
        created(){
            this._getRecommend();
            this._getDiscList();
        },
        methods: {
            selectItem(item){
                this.$router.push({
                    path: `/recommend/${item.dissid}`
                });
            },
            handlePlayList(playlist){
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.recommend.style.bottom = bottom;
                this.$refs.scroll.refresh();
            },
            _getRecommend(){
                getRecommend().then((res)=> {
                    if (res.code === ERR_OK) {
                        console.log(res.data.slider);
                        this.recommends = res.data.slider;
                    }
                });
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    console.log(res);
                    if (res.code === ERR_OK) {
                        this.discList = res.data.list;
                    }
                });
            },
            loadImage(){
                // 单张图片撑开即OK，
                // 设置标志位，确保逻辑执行
                if (!this.checkLoaded) {
                    this.checkloaded = true;
                    this.$refs.scroll.refresh();
                }
            }
        },
        components: {
            'v-slider': Slider,
            'v-scroll': Scroll,
            'v-loading': Loading
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import url('../../common/less/variable.less');

    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        .recommend-content {
            height: 100%;
            overflow: hidden;
            .slider-wrapper {
                position: relative;
                width: 100%;
                overflow: hidden;
            }
            .recommend-list {
                .list-title {
                    height: 65px;
                    line-height: 65px;
                    text-align: center;
                    font-size: @font-size-medium;
                    color: @color-theme;
                }
                .item {
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    padding: 0 20px 20px 20px;
                    .icon {
                        flex: 0 0 60px;
                        width: 60px;
                        padding-right: 20px;
                    }
                    .text {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        flex: 1;
                        line-height: 20px;
                        overflow: hidden;
                        font-size: @font-size-medium;
                        .name {
                            margin-bottom: 10px;
                            color: @color-text;
                        }
                        .desc {
                            color: @color-text-d;
                        }
                    }
                }
            }
            .loading-container {
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
