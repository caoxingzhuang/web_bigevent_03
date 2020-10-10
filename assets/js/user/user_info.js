$(function () {
    var form = layui.form;
    // 判断昵称长度
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度1-6位之间';
            }
        }
    })

    initUserInfo();
    var layer = layui.layer;
    // 用户渲染
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // layer.msg('获取用户信息成功')
                form.val('formUserInfo', res.data);
            }
        })
    };
    // 表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });

    // 提交用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('修改用户信息成功');
                window.parent.getUserInfo();
            }
        })
    })

})