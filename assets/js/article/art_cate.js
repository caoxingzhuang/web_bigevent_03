$(function () {
    // 文章列表
    initCateList();
    function initCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                var htmlStr = template('tpl-cate', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    // 添加分类弹出框
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '250px'],
        });
    })

    // 提交文章分类

    var indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('添加文章成功');
                initCateList();
                layui.layer.close(indexAdd);
            }
        })
    });

    // 编辑分类
    // var form = layui.form;
    var indexEdit = null;
    $('tbody').on('click', '#btnedit', function () {
        var Id = $(this).attr('data-id');
        var form = layui.form;
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html(),
        });
        // 获取id值
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data);
            }
        })
        // 发起修改请求
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function (res) {

                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('文章类别更新成功');
                    initCateList();
                    layer.close(indexEdit);
                }
            });
        });
    });

    // 删除
    $('tbody').on('click', '#btndelete', function () {
        var Id = $(this).attr('data-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message);
                    }
                    layui.layer.msg('删除成功');
                    initCateList();
                }
            })

            layer.close(index);
        });

    })
})