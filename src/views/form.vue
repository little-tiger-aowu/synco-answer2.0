<template>
    <div class="form-page" :style="{height:bgHeight}">
         <div class="form-item">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="userInfo">
                 <el-form-item prop="name" >
                     <el-input v-model="ruleForm.name" placeholder="您的姓名："></el-input>
                 </el-form-item>
                 <el-form-item prop="phone">
                     <el-input v-model="ruleForm.phone" placeholder="您的电话："></el-input>
                 </el-form-item>
                 <el-form-item prop="workUnit">
                     <el-input v-model="ruleForm.workUnit" placeholder="您的工作单位："></el-input>
                 </el-form-item>
                 <el-form-item prop="email">
                     <el-input v-model="ruleForm.email" placeholder="您的电子邮箱："></el-input>
                 </el-form-item>
                 <el-form-item prop="address">
                     <el-input v-model="ruleForm.address" placeholder="您的邮寄地址："></el-input>
                 </el-form-item>
                 <el-form-item class="check-box">
                     <van-checkbox v-model="isAccredit" label-disabled icon-size="14px" shape="square">我已完整阅读并同意赛默飞《个人信息保护政策》，并同意赛默飞按照该政策处理我的个人信息。* <span style="color: #3967FF" @click="toReading()">阅读《个人信息保护政策》</span></van-checkbox>
                     <van-checkbox v-model="isReceive" label-disabled icon-size="14px" shape="square">我同意赛默飞通过电子邮件、电话、短信或其他方式向我发送有关赛默飞产品或服务信息或与我取得联系。</van-checkbox>
                 </el-form-item>
                 <el-form-item class="button-box">
                     <img @click="submitForm('ruleForm')" src="../assets/image/start-button.png" alt="">
                 </el-form-item>
             </el-form>
         </div>
    </div>
</template>

<script>
    import { fromUserInfo } from '../api/path'
    export default {
        name: "formpage",
        data(){
            // 手机号码验证
            var checkPhone = (rule, value, callback)=> {
                let reg = /^1[3|4|5|7|8][0-9]{9}$/
                if (value === '' || value === undefined || value == null) {
                    callback()
                } else {
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确的手机号'))
                    } else {
                        callback()
                    }
                }
            }
                return{
                ruleForm: this.$cookies.get('ruleForm') || {
                    name:'',
                    phone:'',
                    workUnit:'',
                    email:'',
                    address:'',
                },
                rules:{
                    name: [
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { validator: checkPhone, message:'请输入正确的手机号码', trigger: 'blur' }
                    ],
                    workUnit: [
                        { required: true, message: '请输入您的工作单位', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入您的电子邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入您的邮寄地址', trigger: 'blur' },
                    ],
                },
                isAccredit:false,
                isReceive:false,
                bgHeight:""
            }
        },  
        mounted() {
            this.bgHeight = document.documentElement.clientHeight + "px";
            console.log(this.bgHeight)
        },
        methods:{
            // 提交及验证表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.isAccredit) {
                        this.$dialog.confirm({
                            title:'提交',
                            message:'请确认信息填写无误'
                        }).then(()=>{
                            let data = {
                                address:this.ruleForm.address,// 地址
                                company:this.ruleForm.workUnit, // 单位
                                email:this.ruleForm.email,// 邮箱
                                name:this.ruleForm.name, // 姓名
                                openId:this.$cookies.get('openId'), // openId
                                phone:this.ruleForm.phone, // 电话
                                isConsent:this.isReceive // 是否同意与我取得联系
                            }
                            fromUserInfo(JSON.stringify(data)).then((result)=>{
                                if(result.code == 200){
                                    this.$toast({
                                        message:'信息已保存',
                                        type:"success",
                                        duration:1500
                                    })
                                    setTimeout(()=>{
                                        this.$router.replace('/answer')
                                    },1500)
                                }
                            })
                        })
                    } else {
                        if(valid && !this.isAccredit){
                            this.$toast({
                                message:'请先阅读并同意《个人信息保护政策》',
                                type:"fail"
                            })
                        }
                        return false;
                    }
                });
            },
            // 阅读保护政策
            toReading(){
                this.$cookies.set('ruleForm',this.ruleForm)
                window.open('https://www.thermofisher.cn/cn/zh/home/global/privacy-policy.html','_blank')
            },

        }
    }
</script>

<style scoped lang="scss">
    .form-page{
        width: 100%;
        height: 100%;
        background-image: url("../assets/image/form-bg.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        /*align-items: center;*/
        .form-item{
            width: 95%;
            position: absolute;
            top: 10%;
            background-image: url("../assets/image/from.png");
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
        }
        .userInfo{
            width: 82%;
            margin-top: 10vh;
            margin-bottom: 10vh;
            position: relative;
            .check-box{
                margin-top: -5px !important;
                font-size: 10px !important;
                .isAccredit{
                    width: 102%;
                }
                .isReceive{
                    margin-top: 10px;
                }
                .van-checkbox{
                    font-size: 0.7em;
                }
            }
            /deep/ .el-form-item{
                margin-bottom: 10px;
            }
            .button-box{
                position: absolute;
                top: 115%;
                left: 12%;
                width: 77%;
                height: 16%;
                /deep/ .el-form-item__content{
                    line-height: 0px;
                }
                img{
                    width: 100%;
                    height: 10%;
                }
            }
        }
    }
    @media screen and (min-height:700px){
        .form-page{
            height: 100vh !important;
        }
        /deep/ .el-form-item{
            margin-bottom: 22px !important;
        }
        /deep/ .el-form-item__content{
            line-height: 42px !important;
        }
        .button-box{
            top: 120% !important;
        }
    }

    /deep/ .el-form-item__content{
        margin-left: 0 !important;
        line-height: 45px;
        .el-input__inner{
            border: 1px solid #1d1818;
        }
        .el-checkbox__inner{
            border: 1px solid #000000;
        }
    }
</style>