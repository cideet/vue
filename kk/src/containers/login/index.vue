<template>
    <div class="login-container">
        <p><input type="text" name="" placeholder="phoneNumber" v-model="phoneNumber"/></p>
        <p><input type="password" name="" placeholder="password" v-model="password"/></p>
        <p><input type="text" name="" v-model="authCode"/></p>
        <div class="remeber-me" v-on:click="remeberMe = !remeberMe">
				<span class="remeber-checkbox" v-bind:class="remeberMe ? 'remeber-checkbox-checked' : ''">
					<i class="icon-selected"></i>
				</span>
            <span>记住密码</span>
        </div>
        <p>
            <button @click="login">登录</button>
        </p>


    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                phoneNumber: '',
                password: '',
                authCode: '',
                remeberMe: true,
            }
        },
        methods: {
            login(){
                console.log(this.remeberMe);
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .logo-tip {
        font-size: 24px;
        margin-top: 22px;
        margin-bottom: 22px;
    }
    .icon-lock, .icon-phone, .icon-safe{
        position: absolute;
        left: 20px;
        top: 15px;
    }
    .icon-refresh {
        position: absolute;
        right: 10px;
        top: 13px;
        cursor: pointer;
    }
    .auth-code-img {
        width: 85px;
        height: 30px;
        border: 1px solid #ddd;
        position: absolute;
        top: 6px;
        right: 43px;
    }
    .other-entry {
        margin-bottom: 24px;
        color: #b0de02;
        overflow: hidden;
        clear: both;
    }
    .remeber-me {
        float: left;
        user-select: none;
    }
    .signup-entry {
        float: right;
    }
    .signup-entry a {
        text-decoration: none;
        color: #b0de02;
    }
    .signup-entry>span:first-child, .signup-entry>span:last-child {
        cursor: pointer;
    }
    .remeber-me {
        cursor: pointer;
    }
    .remeber-checkbox {
        width: 20px;
        height: 20px;
        display: inline-block;
        border-radius: 3px;
        background: #fff;
        border: 1px solid #fff;
        vertical-align: middle;
        position: relative;
        top: -2px;
    }
    .remeber-checkbox-checked {
        border: 1px solid #2bd16f;
    }
    .icon-selected {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        display: none;
    }
    .remeber-checkbox-checked>.icon-selected {
        display: block;
    }

    .sf-download{
        text-align: left;
    }
    .sf-download a{
        color: #a5e22b;
    }
</style>
