$(function () {

    // 时间过滤器
    template.defaults.imports.fate = function (date) {
        var dt = new Date(date);

        var y = padZero(dt.getFullYear());
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;

    }

    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    };


    initTable();
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                var htmlStr = template('tpl-list', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }

    // 初始化分类
    initCate();
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }

    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();

        var state = $('[name=state]').val();
        var cate_id = $('[name=cate_id]').val();

        q.cate_id = cate_id;
        q.state = state;
        initTable();
    });

    var laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,     //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            // 分页设置
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8],
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }
            }
        });
    }

    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message);
                    }
                    layui.layer.msg('删除成功');

                    // 当前页面删除完文章后 自动回到上一页  
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    // console.log($('#btn-delete').length);
                    initTable();
                }
            })

            layer.close(index);

        });
    })

})