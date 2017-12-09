<template>
    <div class="player" v-show="playList.length>0">
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image"/>
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle"
                     @touchstart.prevent="middleTouchStart"
                     @touchmove.prevent="middleTouchMove"
                     @touchend="middleTouchEnd">
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdClass">
                                <img class="image" :src="currentSong.image"/>
                            </div>
                        </div>
                    </div>
                    <v-scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p ref="lyricLine" class="text"
                                   v-for="(line,index) in currentLyric.lines"
                                   :class="{'current':currentLineNum==index}">{{line.txt}}</p>
                            </div>
                        </div>
                    </v-scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{'active':currentShow=='cd'}"></span>
                        <span class="dot" :class="{'active':currentShow=='lyric'}"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <v-progressbar :percent="percent" @percentChange="onProgressChange"></v-progressbar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left" @click="changeMode">
                            <i :class="iconMode"></i>
                        </div>
                        <div class="icon i-left" :class="disableClass">
                            <i @click="prev" class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableClass">
                            <i @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disableClass">
                            <i @click="next" class="icon-next"></i>
                        </div>
                        <div class="icon i-right"><i class="icon icon-not-favorite"></i></div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img width="40" height="40" :src="currentSong.image" :class="cdClass"/>
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <v-progresscircle :percent="percent" :radius="32">
                        <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                    </v-progresscircle>
                </div>
                <div class="control"><i class="icon-playlist"></i></div>
            </div>
        </transition>
        <audio ref="audio" :src="currentSong.url"
               @timeupdate="updateTime"
               @canplay="ready"
               @error="error"
               @ended="end"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import Lyric from 'lyric-parser';
    import Scroll from 'base/scroll/index.vue';
    import {mapGetters, mapMutations} from 'vuex';
    import animations from 'create-keyframe-animation';
    import ProgressBar from 'base/progress-bar/index.vue';
    import ProgressCircle from 'base/progress-circle/index.vue';
    import {playMode} from 'common/js/config.js';
    import {shuffle} from 'common/js/util.js';
    import {prefixStyle} from 'common/js/dom.js';

    const transform = prefixStyle('transform');
    const transitionDuration = prefixStyle('transitionDuration');

    export default {
        data(){
            return {
                songReady: false,
                currentTime: 0,  //歌曲播放到的时间
                radius: 32,
                currentLyric: null,  //当前歌曲的歌词
                currentLineNum: 0,  //当前歌词所在行
                currentShow: 'cd'  //显示播放器还是歌词
            };
        },
        computed: {
            iconMode(){
                return this.mode == playMode.sequence ? 'icon-sequence' : this.mode == playMode.loop ? 'icon-loop' : 'icon-random';
            },
            percent(){
                return this.currentTime / this.currentSong.duration;
            },
            cdClass(){
                return this.playing ? 'play' : 'play pause';
            },
            playIcon(){
                return this.playing ? 'icon-pause' : 'icon-play';
            },
            miniIcon(){
                return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
            },
            disableClass(){
                return this.songReady ? '' : 'disable';
            },
            ...mapGetters([
                'fullScreen',
                'playList',
                'currentSong',
                'playing',
                'currentIndex',
                'mode',
                'sequenceList'
            ])
        },
        created(){
            this.touch = {}
        },
        methods: {
            middleTouchStart(e) {
                this.touch.initiated = true;
                this.touch.startX = e.touches[0].pageX;
                this.touch.startY = e.touches[0].pageY;
            },
            middleTouchMove(e) {
                if (!this.touch.initiated) {
                    return;
                }

                const touch = e.touches[0];
                const deltaX = touch.pageX - this.touch.startX;
                const deltaY = touch.pageY - this.touch.startY;
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    return;
                }
                const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
                const width = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
                this.touch.percent = Math.abs(width / window.innerWidth);
                this.$refs.lyricList.$el.style[transform] = `translate3d(${width}px, 0, 0)`;
                this.$refs.lyricList.$el.style[transitionDuration] = '0';
                this.$refs.middleL.style.opacity = 1 - this.touch.percent;
                this.$refs.middleL.style[transitionDuration] = 0;
            },
            middleTouchEnd(){
                let width;
                let opacity;

                if (this.currentShow === 'cd') {
                    if (this.touch.percent > 0.1) {
                        width = -window.innerWidth;
                        this.currentShow = 'lyric';
                        opacity = 0;
                    } else {
                        width = 0;
                        opacity = 1;
                    }
                } else {
                    if (this.touch.percent < 0.9) {
                        width = 1;
                        opacity = 1;
                        this.currentShow = 'cd';
                    } else {
                        width = -window.innerWidth;
                        opacity = 0;
                    }
                }

                this.$refs.lyricList.$el.style[transform] = `translate3d(${width}px, 0, 0)`;
                this.$refs.lyricList.$el.style[transitionDuration] = '300ms';
                this.$refs.middleL.style.opacity = opacity;
                this.$refs.middleL.style[transitionDuration] = '300ms';
            },
            end(){
                if (this.mode == playMode.loop) {
                    this.loop();
                } else {
                    this.next();
                }
            },
            loop(){
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
                if (this.currentLyric) {
                    // 歌词偏移到开始
                    this.currentLyric.seek(0);
                }
            },
            changeMode(){
                const mode = (this.mode + 1) % 3;
                this.setPlayMode(mode);
                let list = null;
                if (mode == playMode.random) {
                    list = shuffle(this.sequenceList);
                } else {
                    list = this.sequenceList;
                }
                this.resetCurrentIndex(list);
                this.setPlayList(list);
            },
            resetCurrentIndex(list) {
                let index = list.findIndex((item) => {
                    return item.id === this.currentSong.id;
                });
                this.setCurrentIndex(index);
            },
            onProgressChange(percent){
                //拖动进度条，改变播放时间
                const currentTime = this.currentSong.duration * percent;
                this.$refs.audio.currentTime = currentTime;
                if (!this.playing) {
                    this.setPlayingState(true);
                }
                this.$refs.audio.play();
                if (this.currentLyric) {
                    // 拖动进度，改变歌词滚动的位置
                    this.currentLyric.seek(currentTime * 1000);
                }
            },
            updateTime(e){
                //console.log('audio在播放的时候，会派发一个timeupdate的事件');
                //e.target.currentTime: 获取当前播放到的时间，audio提供
                this.currentTime = e.target.currentTime;
            },
            next(){
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex + 1;
                if (index == this.playList.length) {
                    index = 0;
                }
                this.setCurrentIndex(index);
                if (!this.playing) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            prev(){
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex - 1;
                if (index == -1) {
                    index = this.playList.length;
                }
                this.setCurrentIndex(index);
                if (!this.playing) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            ready(){
                this.songReady = true;
            },
            error(){
                this.songReady = true;  //比如断网
            },
            togglePlaying(){
                if (!this.songReady) {
                    return;
                }
                this.setPlayingState(!this.playing);
                if (this.currentLyric) {
                    //当歌曲暂停或播放的时候，切换歌词的滚动状态
                    this.currentLyric.togglePlay();
                }
            },
            back(){
                this.setFullScreen(false);
            },
            open(){
                this.setFullScreen(true);
            },
            enter(el, done){
                const {x, y, scale} = this._getPosAndScale();
                let animation = {
                    0: {transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`},
                    60: {transform: 'translate3d(0, 0, 0) scale(1.1)'},
                    100: {transform: 'translate3d(0, 0, 0) scale(1)'}
                };
                animations.registerAnimation({
                    name: 'move',
                    animation: animation,
                    presets: {
                        duration: 400,
                        easing: 'Linear'
                    }
                });
                animations.runAnimation(this.$refs.cdWrapper, 'move', done);
            },
            afterEnter() {
                animations.unregisterAnimation('move');
                this.$refs.cdWrapper.style.animation = '';
            },
            leave(el, done) {
                this.$refs.cdWrapper.style.transition = 'all .4s';
                const {x, y, scale} = this._getPosAndScale();
                this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
                this.$refs.cdWrapper.addEventListener('transitionend', done);
            },
            afterLeave() {
                this.$refs.cdWrapper.style.transition = '';
                this.$refs.cdWrapper.style[transform] = '';
            },
            _getPosAndScale(){
                const targetWidth = 40;
                const paddingLeft = 40;
                const paddingBottom = 30;
                const paddingTop = 80;
                const width = window.innerWidth * 0.8;
                const scale = targetWidth / width;
                const x = -(window.innerWidth / 2 - paddingLeft);
                const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
                return {x: x, y: y, scale: scale}
            },
            format(interval){
                interval = interval | 0; //向下取整
                const minute = interval / 60 | 0;
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            _pad(num, n = 2){  //补0
                let len = num.toString().length;
                while (len < n) {
                    num = '0' + num;
                    len++;
                }
                return num;
            },
            getLyric() {
                //this.currentSong.getLyrics().then((lyric)=> {
                //    this.currentLyric = new Lyric(lyric);
                //    console.log(this.currentLyric);
                //});
                this.currentSong.getLyrics().then((lyric) => {
                    if (this.currentSong.lyric !== lyric) {
                        return;
                    }
                    this.currentLyric = new Lyric(lyric, this.handleLyric);
                    console.log(this.currentLyric);
                    if (this.playing) {
                        this.currentLyric.play();
                    }
                }).catch(() => {
                    this.currentLyric = null;
                    this.palyingLyric = '';
                    this.currentLineNum = '';
                });
            },
            handleLyric({lineNum, txt}) {
                if (!this.$refs.lyricList) {
                    return;
                }
                this.currentLineNum = lineNum;
                if (lineNum > 5) {
                    let lineEl = this.$refs.lyricLine[lineNum - 5];
                    this.$refs.lyricList.scrollToElement(lineEl, 1000);
                } else {
                    this.$refs.lyricList.scrollTo(0, 0, 1000);
                }

                this.playingLyric = txt;
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayMode: 'SET_PLAY_MODE',
                setPlayList: 'SET_PLAY_LIST'
            })
        },
        watch: {
            currentSong(newSong, oldSong){
                if (newSong.id === oldSong.id) {
                    return;
                }
                if (this.currentLyric) {  //如果有正在播放的歌曲
                    this.currentLyric.stop();  //删除定时器
                }
                this.$nextTick(()=> {
                    this.$refs.audio.play();
                    this.getLyric();
                });
            },
            playing(newPlaying){
                const audio = this.$refs.audio;
                this.$nextTick(()=> {
                    newPlaying ? audio.play() : audio.pause();
                });
            }
        },
        components: {
            'v-progressbar': ProgressBar,
            'v-progresscircle': ProgressCircle,
            'v-scroll': Scroll
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import url('../../common/less/variable');
    @import url('../../common/less/mixin');

    .player {
        .normal-player {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 150;
            background: @color-background;
            .background {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: 0.6;
                filter: blur(20px);
            }
            .top {
                position: relative;
                margin-bottom: 25px;
                .back {
                    position: absolute;
                    top: 0;
                    left: 6px;
                    z-index: 50;
                    .icon-back {
                        display: block;
                        padding: 9px;
                        font-size: @font-size-large-x;
                        color: @color-theme;
                        transform: rotate(-90deg);
                    }
                }
                .title {
                    width: 70%;
                    margin: 0 auto;
                    line-height: 40px;
                    text-align: center;
                    .no-wrap();
                    font-size: @font-size-large;
                    color: @color-text;
                }
                .subtitle {
                    line-height: 20px;
                    text-align: center;
                    font-size: @font-size-medium;
                    color: @color-text;
                }
            }
            .middle {
                position: fixed;
                width: 100%;
                top: 80px;
                bottom: 170px;
                white-space: nowrap;
                font-size: 0;
                .middle-l {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 80%;
                    .cd-wrapper {
                        position: absolute;
                        left: 10%;
                        top: 0;
                        width: 80%;
                        height: 100%;
                        .cd {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border: 10px solid rgba(255, 255, 255, 0.1);
                            border-radius: 50%;
                            &.play {
                                animation: rotate 20s linear infinite;
                            }
                            &.pause {
                                animation-play-state: paused;
                            }

                            .image {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                    }
                    .playing-lyric-wrapper {
                        width: 80%;
                        margin: 30px auto 0 auto;
                        overflow: hidden;
                        text-align: center;
                        .playing-lyric {
                            height: 20px;
                            line-height: 20px;
                            font-size: @font-size-medium;
                            color: @color-text-l;
                        }
                    }
                }
                .middle-r {
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    .lyric-wrapper {
                        width: 80%;
                        margin: 0 auto;
                        overflow: hidden;
                        text-align: center;
                        .text {
                            line-height: 32px;
                            color: @color-text-l;
                            font-size: @font-size-medium;
                            &.current {
                                color: @color-text;
                            }
                        }
                    }
                }
            }
            .bottom {
                position: absolute;
                bottom: 50px;
                width: 100%;
                .dot-wrapper {
                    text-align: center;
                    font-size: 0;
                    .dot {
                        display: inline-block;
                        vertical-align: middle;
                        margin: 0 4px;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: @color-text-l;
                        &.active {
                            width: 20px;
                            border-radius: 5px;
                            background: @color-text-ll;
                        }
                    }
                }
                .progress-wrapper {
                    display: flex;
                    align-items: center;
                    width: 80%;
                    margin: 0 auto;
                    padding: 10px 0;
                    .time {
                        color: @color-text;
                        font-size: @font-size-small;
                        flex: 0 0 30px;
                        line-height: 30px;
                        width: 30px;
                        &.time-l {
                            text-align: left;
                        }
                        &.time-r {
                            text-align: right;
                        }
                    }
                    .progress-bar-wrapper {
                        flex: 1;
                    }
                }
                .operators {
                    display: flex;
                    align-items: center;
                    .icon {
                        flex: 1;
                        color: @color-theme;
                        &.disable {
                            color: @color-theme-d;
                        }
                        i {
                            font-size: 30px;
                        }
                    }
                    .i-left {
                        text-align: right;
                    }
                    .i-center {
                        padding: 0 20px;
                        text-align: center;
                        i {
                            font-size: 40px;
                        }
                    }
                    .i-right {
                        text-align: left;
                    }
                    .icon-favorite {
                        color: @color-sub-theme;
                    }
                }
            }
            &.normal-enter-active, &.normal-leave-active {
                transition: all 0.4s;
                .top, .bottom {
                    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
                }
            }
            &.normal-enter, &.normal-leave-to {
                opacity: 0;
                .top {
                    transform: translate3d(0, -100px, 0);
                }
                .bottom {
                    transform: translate3d(0, 100px, 0);
                }
            }
        }
        .mini-player {
            display: flex;
            align-items: center;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 180;
            width: 100%;
            height: 60px;
            background: @color-highlight-background;
            &.mini-enter-active, &.mini-leave-active {
                transition: all 0.4s;
            }
            &.mini-enter, &.mini-leave-to {
                opacity: 0;
            }
            .icon {
                flex: 0 0 40px;
                width: 40px;
                padding: 0 10px 0 20px;
                img {
                    border-radius: 50%;
                    &.play {
                        animation: rotate 10s linear infinite;
                    }
                    &.pause {
                        animation-play-state: paused;
                    }
                }
            }
            .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                .name {
                    margin-bottom: 2px;
                    .no-wrap();
                    font-size: @font-size-medium;
                    color: @color-text;
                }
                .desc {
                    .no-wrap();
                    font-size: @font-size-small;
                    color: @color-text-d;
                }
            }
            .control {
                flex: 0 0 30px;
                width: 30px;
                padding: 0 10px;
                .icon-play-mini, .icon-pause-mini, .icon-playlist {
                    font-size: 30px;
                    color: @color-theme-d;
                }
                .icon-mini {
                    font-size: 32px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
