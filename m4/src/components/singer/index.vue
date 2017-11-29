<template>
    <div class="singer">

    </div>
</template>

<script type="text/ecmascript-6">
    import {getSingerList} from 'api/singer.js';
    import {ERR_OK} from 'api/config.js';
    export default{
        data(){
            return {
                singers: []
            }
        },
        created(){
            this._getSingerList();
        },
        methods: {
            _getSingerList(){
                getSingerList().then((res)=> {
                    //console.log(res);
                    if (res.code == ERR_OK) {
                        this.singers = res.data.list;
                    }
                });
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .singer {
        position: fixed;
        top: 80px;
        bottom: 0;
        width: 100%;
    }
</style>
