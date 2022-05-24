<template>
    <div class="login-page">
        <img @click="viewPrize()" v-if="isOverAnswer" class="lookPrize" src="../assets/image/lookPrize.png" alt="">
        <img @click="loginBtn()" class="startBtn" src="../assets/image/start-button.png" alt="">
    </div>
</template>

<script>
    import { userLogin, checkUserInfo,getUserInfo } from "../api/path";
    export default {
        name: "login",
        data(){
            return{
                openId: this.$route.query.openId || "", //获取openid
                avatar: this.$route.query.avatar || "",
                nickName: this.$route.query.nickname || "",
                isOverAnswer:false
            }
        },
        created() {
            // this.getOpenId()
        },
        methods:{
            // 获取openId
            getOpenId() {
                if (this.openId) {
                    this.$cookies.set("openId", this.openId);
                    this.$cookies.set("avatar", this.avatar);
                    this.$cookies.set("nickName", this.nickName);
                    this.userLogin();
                } else {
                    // window.location.href =
                    //     "http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=http://192.168.0.112:8080/";
                    window.location.href =
                      "http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=http://tf-research.front.synconize.com/";
                }
            },
            // 微信授权登录
            userLogin() {
                let data = {
                    openId: this.openId,
                    avatar: this.avatar,
                    nickName: this.nickName,
                };
                userLogin(JSON.stringify(data))
                    .then((result) => {
                        if (result.code === 200) {
                            this.$toast({
                                type: "success",
                                message: "登录成功",
                                duration: 1500,
                            });
                            let data = {
                                openId: this.openId,
                            };
                            checkUserInfo(data).then((result) => {
                                if (result.data === 1) {
                                    this.isOverAnswer = true
                                    this.$toast({
                                        icon: "like-o",
                                        message: "您已参与过此次活动",
                                        duration: 2000,
                                    });
                                    this.getUserInfo()
                                } else if (result.data === 2) {
                                    setTimeout(() => {
                                        this.$router.replace("/form");
                                    }, 1500);
                                } else if (result.data === 4) {
                                    this.$toast({
                                        icon: "records",
                                        message: "您已完成表单填写，请继续答题",
                                        duration: 2000,
                                    });
                                    setTimeout(() => {
                                        this.$router.replace("/answer");
                                    }, 1500);
                                }
                            });
                        }
                    })
                    .catch((err) => {});
            },
            // 获取用户信息
            getUserInfo(){
                getUserInfo(this.openId).then((result)=>{
                    this.$store.state.score = result.data.score
                })
            },
            // 查看我的奖品
            viewPrize(){
                this.$router.replace('/reward')
            },
            // 开始答题
            loginBtn(){
                this.getOpenId()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-page{
        height: 100vh;
        background-image: url("../assets/image/login.png");
        background-size: 100% 100%;
        .lookPrize{
            position: absolute;
            top: 6%;
            left: 3%;
            width: 28%;
            height: 4%;
        }
        .startBtn{
            position: absolute;
            left: 20%;
            bottom: 2%;
            width: 60%;
            height: 10%;
        }
    }
</style>