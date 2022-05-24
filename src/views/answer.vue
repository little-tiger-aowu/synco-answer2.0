<template>
    <div class="answer-page">
       <div class="topic-box" :style="{'backgroundImage':index == 1? 'url('+require('../assets/image/answer-box2.png')+')': 'url('+require('../assets/image/answer-box1.3.png')+')'}">
            <div class="topic">
                <div class="answer-title">
                    <div :class="titleiIcon" class="iconSty"></div>
                    <div class="title">{{answerList[index].answerName}}<span style="font-weight: 300">（不定项选择）</span></div>
                </div>
                <div class="optiones-box">
                    <el-checkbox-group v-model="checkboxGroup1">
                        <el-checkbox-button v-for="(value,key1) in answerList[index].optiones" :label="key1" :key="key1" :disabled="isSubmit"><span class="optiones_key">{{key1}}</span>{{value}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <v-touch @swipedown="swipedown()" id="touch-box" @swipeup="swipedown()" class="touch-box"  v-show="isSubmit">
                    <div v-if="!isShowSolution" class="bottom-Solution">
                        <span>下拉查看答案和解析</span>
                        <span class="el-icon-arrow-down"></span>
                        <span class="el-icon-arrow-down"></span>
                    </div>
                    <div v-if="isShowSolution" class="solution">
                        <div>正确答案：{{answerList[index].correct}}</div>
                        <span>解析：{{answerList[index].parsing}}</span><br>
<!--                        <span v-if="answerList[index].coupe">小知识科普：{{answerList[index].coupe}}</span>-->
<!--                        <img v-if="answerList[index].coupe" style="width: 100%" src="../assets/image/aaa.png" alt="">-->
                    </div>
                </v-touch>
            </div>
       </div>
        <div v-show="!isSubmit" @click="submitKey()" class="nextOptiones">
            <span>提交</span>
            <span>SUBMIT</span>
        </div>
        <div v-show="isSubmit" @click="nextOpt()" class="nextOptiones">
            <span>下一题</span>
            <span>NEXT PAGE</span>
        </div>
    </div>
</template>

<script>
    import { referTopic } from '../api/path'
    export default {
        name: "answer",
        data(){
            return{
                index:0,
                isSubmit:false,
                checkboxGroups:'',
                checkboxGroup1:[],
                isShowSolution:false,
                titleiIcon:`icon-1_square_solid`,
                answerList:[
                    {
                        answerName:"全新Thermo Scientific ™ 1500系列生物安全柜的外观升级包含以下哪些：",
                        optiones:{
                            A:"外部涂层",
                            B:"动画显示及触摸操作界面",
                            C:"可选配的密封背板",
                            D:"可选配的脚轮支架",
                        },
                        correct:['B','C','D'],
                        parsing:"全新上市的Thermo Scientific ™ 1500系列生物安全柜延用高端2030i系列设计，搭载GUI动画显示触摸屏。该系列支持选配密封背板，" +
                            "旨在满足企业对于防污染和易清洁的要求；支持选配脚轮支架，帮助满足部分客户对安全柜移动便捷性的要求。"
                    },
                    {
                        answerName:"全新Thermo Scientific ™ 1500系列生物安全柜的安全性能升级包含以下哪些选项：",
                        optiones:{
                            A:"硅胶条密封，防止紫外照射光外泄",
                            B:"升级的玻璃窗限位设计",
                            C:"升级的紫外灯，保证安全照射强度",
                            D:"升级过滤器，采用U15等级HEPA过滤膜",
                        },
                        correct:['A','B','C'],
                        parsing:"全新上市的 Thermo Scientific ™  1500系列生物安全柜在前窗玻璃和柜体间增加了硅胶密封条，且配有升级的紫外线灯，" +
                            "可保证安全照射强度。其升级的玻璃窗限位器，在推拉到位时会有“咔嗒”确认提示音。该系列采用的是过滤效率99.995%@MPPS符合EN1822 H14等级的HEPA滤膜。",
                        coupe:'HEPA过滤作为目前最有效的去除气溶胶的方法。其过滤效率99.995%@MPPS符合EN1822 的H14等级滤膜已经具有几十年的使用历史，有效性通过了验证。下图为不同等级的HEPA过滤膜的过滤效果及等级区分说明：'
                    },
                    {
                        answerName:"全新Thermo Scientific ™ 1500系列生物安全柜的性能升级包含以下几项：",
                        optiones:{
                            A:"定时紫外灯开闭",
                            B:"升级为LED照明",
                            C:"升级的SmartPort",
                            D:"升级的SmartClean",
                        },
                        correct:['A','B'],
                        parsing:`全新的Thermo Scientific ™ 1500系列生物安全柜具备紫外灯的定时开关功能且配备升级的LED照明，旨在提升安全性和便捷性的同时，帮助客户持续降低运行成本。
                                 SmartPort™可提供标准接入口用于接入废液收集管，探头等。SmartClean™ 可帮助在安全保护状态下清洁前窗内表面。这两项技术在赛默飞多款型号生物安全柜中均已采用。`
                    }
                ],
                // score:this.$store.state.score
            }
        },
        methods:{
            swipedown(){
                this.isShowSolution = true
                // 当隐藏内容显示时给v-touch组件添加touch-action样式，因为此样式不能一开始存在所以在此时添加，以保证页面可以正常上下滚动
                let touch = window.document.getElementById('touch-box')
                touch.style.setProperty('touch-action', 'pan-y', 'important');
            },
            swipeup(){
                this.isShowSolution = true
                // 当隐藏内容显示时给v-touch组件添加touch-action样式，因为此样式不能一开始存在所以在此时添加，以保证页面可以正常上下滚动
                let touch = window.document.getElementById('touch-box')
                touch.style.setProperty('touch-action', 'pan-y', 'important');
            },
            submitKey(){
                this.isSubmit = true
                let correct = this.answerList[this.index].correct
                let rightSum = 0
                this.checkboxGroup1.forEach((item)=>{
                    if(correct.indexOf(item) != -1){
                        rightSum++
                    }
                })
                console.log(this.answerList[this.index].correct,this.answerList[this.index].correct.length)
                if(rightSum == this.answerList[this.index].correct.length){
                    this.$store.state.score += 33
                }
            },
            nextOpt(){
                let touch = window.document.getElementById('touch-box')
                touch.style.setProperty('touch-action', 'none', 'important');
                this.checkboxGroups += this.checkboxGroup1.toString() + '|'
                if(this.index >= this.answerList.length - 1){
                    let data = {
                        content:this.checkboxGroups,
                        openId:this.$cookies.get('openId'),
                        score:this.$store.state.score
                    }
                    referTopic(data).then((result)=>{
                        this.$toast({
                            message:'太棒了! 已完成所有题目',
                            type:'success',
                            duration: 1500,
                        })
                    })
                    setTimeout(()=>{
                        this.$router.replace('/reward')
                    },1500)
                }else{
                    this.index++
                    this.checkboxGroup1 = []
                    this.isSubmit = false
                    this.isShowSolution = false
                    this.titleiIcon = `icon-${this.index + 1}_square_solid`
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .answer-page{
        width: 100%;
        height: 100vh;
        background-image: url("../assets/image/answer-bg.png");
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .topic-box{
            width: 90%;
            height: 70%;
            overflow: hidden;
            position: relative;
            /*background-image: url("../assets/image/answer-box.png");*/
            background-size: 100% 100%;
            margin-top: 95px;
            .topic{
                position: absolute;
                top: 11.5%;
                height: 89%;
                overflow: scroll;
                .answer-title{
                    width: 90%;
                    margin: 0 5% 0 5%;
                    padding: 5% 0;
                    border-bottom: 1px solid;
                    display: flex;
                    .iconSty{
                        font-size: 48px;
                        color: red;
                        margin-right: 5px;
                    }
                    .title{
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 22px;
                    }
                }
                .optiones-box{
                    margin: 0 5%;
                    padding: 10% 0;
                    border-bottom: 1px solid;
                    .optiones_key{
                        padding: 2px 6px;
                        border-radius: 50%;
                        margin-right: 8px;
                        background-color: #faccce;
                        font-weight: bold;
                    }
                }
                .bottom-Solution{
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 15px;
                    bottom: 0;
                    width: 91%;
                    color: white;
                    border-radius: 0 0 10px 10px;
                    background-color: #000000;
                    :nth-child(2){
                        margin-bottom: -10px;
                    }
                }
            }

        }
        .nextOptiones{
            width: 60%;
            height: 10%;
            margin-top: 30px;
            background-image: url("../assets/image/button-bg.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-style: italic;
            font-weight: bold;
            letter-spacing: 2px;
            :nth-child(1){
                font-size: 2em;
            }
            :nth-child(2){
                font-size:0.8em;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .touch-box{
        line-height: 20px;
        .solution{
            margin: 10px 5%;
            font-size: .8em;
            line-height: 20px;
            span{
                white-space: pre-line;
            }
        }
    }
    /deep/.el-checkbox-button{
        width: 100%;
        line-height: 45px;
        .el-checkbox-button__inner{
            width: 100%;
            text-align: start;
            border: 0;
            background-color: transparent;
        }
    }
    /deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner{
        color: #e94f54;
        box-shadow:0 0 0;
    }
    /deep/ .el-checkbox-button__inner:hover{
        color: #606266;
    }
</style>