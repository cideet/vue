<template>
    <v-scroll class="listview"
              :data="data"
              :listenScroll="listenScroll"
              :probeType="3"
              @scroll="scroll"
              ref="listview">
        <ul>
            <li class="list-group" v-for="group in data" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items">
                        <img class="avatar" v-lazy="item.avatar"/>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li class="item"
                    v-for="(item,index) in shortcutList"
                    :class="{'current':currentIndex==index}"
                    :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div class="loading-container" v-show="!data.length">
            <v-loading></v-loading>
        </div>
    </v-scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/index.vue';
    import {attr} from 'common/js/dom.js';
    import Loading from 'base/loading/index.vue';

    const ANCHOR_HEIGHT = 18;  //右侧导航每个LI的高度
    const TITLE_HEIGHT = 30;

    export default {
        created(){
            this.touch = {};
            this.listenScroll = true;
            this.listHeight = [];
        },
        data(){
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: -1
            };
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            shortcutList(){
                return this.data.map((group)=> {
                    return group.title.substr(0, 1);
                });
            },
            fixedTitle(){
                if (this.scrollY > 0) {
                    return '';
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
            }
        },
        methods: {
            onShortcutTouchStart(e){
                let anchorIndex = attr(e.target, 'index');
                this.touch.y1 = e.touches[0].pageY; //第一个手指点击的位置
                this.touch.anchorIndex = anchorIndex;
                this._scrollTo(anchorIndex);
            },
            onShortcutTouchMove(e){
                this.touch.y2 = e.touches[0].pageY;
                let delta = this.touch.y2 - this.touch.y1;
                // console.log(delta);  //每次滑动的高度
                // delta = Math.floor(delta / ANCHOR_HEIGHT);
                delta = delta / ANCHOR_HEIGHT | 0;
                // console.log(delta);  //每次滑动了几个li
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
                this._scrollTo(anchorIndex);
            },
            scroll(pos){
                this.scrollY = pos.y;
            },
            _scrollTo(index){
                if (!index && index !== 0) return;
                if (index < 0) {
                    index = 0;
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2;
                }
                this.scrollY = -this.listHeight[index];
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 10);
            },
            _calculateHeight(){  //当data发生变化的时候，我们需要重新计算高度
                this.listHeight = [];
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height);  //第一个list的高度是0
                for (let i = 0; i < list.length; i++) {
                    height += list[i].clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        watch: {
            data(){
                setTimeout(()=> {
                    this._calculateHeight();
                }, 20);
            },
            scrollY(newY){
                const listHeight = this.listHeight;
                // 当滚动到顶部，newY>0
                if (newY > 0) {
                    this.currentIndex = 0;
                    return;
                }
                // 在中间滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if (!height2 || (-newY >= height1 && -newY < height2)) {
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2;
            },
            diff(newVal){
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
                if (this.fixedTop == fixedTop) return;
                this.fixedTop = fixedTop;
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
            }
        },
        components: {
            'v-scroll': Scroll,
            'v-loading': Loading
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import url("../../common/less/variable.less");

    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: @color-background;
        .list-group {
            padding-bottom: 30px;
            .list-group-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: @font-size-small;
                color: @color-text-l;
                background: @color-highlight-background;
            }
            .list-group-item {
                display: flex;
                align-items: center;
                padding: 20px 0 0 30px;
                .avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .name {
                    margin-left: 20px;
                    color: @color-text-l;
                    font-size: @font-size-medium;
                }
            }
        }
        .list-shortcut {
            position: absolute;
            z-index: 30;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            background: @color-background-d;
            font-family: Helvetica;
            .item {
                padding: 3px;
                line-height: 1;
                color: @color-text-l;
                font-size: @font-size-small;
                &.current {
                    color: @color-theme;
                }
            }
        }
        .list-fixed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            .fixed-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: @font-size-small;
                color: @color-text-l;
                background: @color-highlight-background;
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
