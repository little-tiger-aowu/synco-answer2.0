import request from '../utils/request';

// 保存用户登录信息
export function userLogin(data) {
    return request({
        Accept: 'json',
        url: '/userInteraction',
        method: 'POST',
        data
    })
}

// 用户是否已填写信息
export function checkUserInfo(params) {
    return request({
        url:'/userInteraction/isUserInfo',
        method:'GET',
        params
    })
}

// 用户表单信息填写
export function fromUserInfo(data) {
    return request({
        Accept: 'json',
        url:'/userInteraction/userInfo',
        method:'POST',
        data
    })
}

// 题目列表
export function topicList(params) {
    return request({
        url:'/topic',
        method:'GET',
        params
    })
}

// 提交题目表单
export function referTopic(data) {
    return request({
        url:'/topic',
        method:'POST',
        data
    })
}

// 查看用户信息
export function getUserInfo(openId) {
    return request({
        url:`/userInteraction/score?openId=${openId}`,
        method:'GET',
    })
}






