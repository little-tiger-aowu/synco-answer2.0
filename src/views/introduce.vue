<template>
    <div class="introduce-page">
        <img @click="goNextPage()" src="../assets/image/start-button.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "introduce",
        data(){
            return{

            }
        },
        methods:{
            goNextPage(){
                this.$router.replace('/answer')
            }
        }
    }
</script>

<style scoped lang="scss">
    .introduce-page{
        width: 100%;
        height: 100vh;
        background-image: url("../assets/image/introduce.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        img{
            width: 60%;
            height: 10%;
            margin-bottom: 30px;
        }
    }
</style>