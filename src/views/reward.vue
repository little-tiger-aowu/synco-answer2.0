<template>
    <div class="reward-page">
        <div class="reward-content">
            <div class="score">{{$store.state.score != 99 ? $store.state.score : 100 }}</div>
            <img v-if="$store.state.score != 99" src="../assets/image/66.png" alt="">
            <img v-else src="../assets/image/100.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "reward",
        data() {
            return{
                pageHeight:0
            }
        },
        mounted() {
            this.pageHeight = document.body.scrollHeight
        }
    }
</script>

<style lang="scss" scoped>
    .reward-page{
        width: 100%;
        height: 100vh;
        background-image: url("../assets/image/jiangpin-bg.png");
        background-size: 100% 100%;
        .reward-content{
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            top: 22vh;
            font-weight: 900;
            color: white;
            font-style: italic;
            -webkit-text-stroke: 3px #000000;
            font-size: 4.5em;
            .score{
                margin-right: 47px;
            }
            img{
                position: absolute;
                top: 18vh;
                width: 80%;
            }
        }
    }
    @media screen and (min-height:700px) {
        .reward-content{
            top: 25vh !important;
            img{
                top: 15.5vh !important;
            }
        }
    }
</style>