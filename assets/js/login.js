$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value != pwd) {
                return "两次输入密码不一致";
            }
        }
    });
    // 注册功能
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！', { icon: 6 });
                $('#link-login').click();
            }
        })
    });
    // 登陆
    $('#form-login').submit(function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登陆成功', { icon: 6 });
                localStorage.setItem('token', res.token);
                location.href = 'index.html';
            }
        })
    });
})