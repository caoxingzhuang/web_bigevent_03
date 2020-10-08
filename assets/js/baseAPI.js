var baseURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;
    // 配置有权限的接口
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 拦截未登录禁止访问有权限的网页
    params.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = 'login.html';
        }
    }
})