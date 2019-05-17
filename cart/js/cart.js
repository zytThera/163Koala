$(function () {

    //封装购物车的增删改查
    function Car() {

        // 增,要判断购物车种是否有该商品，有该商品就数量加一，没有就直接添加
        //需要从本地localstorage种获取数据
        Car.prototype.add = function (goods) {
            var carlist = this.get();
            //需要判断购物车种是否有该商品
            if (this.hasGoods(goods.id)) { //如果购物车种有该商品
                for (var i = 0; i < carlist.length; i++) {
                    if (carlist[i].id == goods.id) {
                        carlist[i].number += goods.number;
                        break; //已经找到该商品添加上去了，就不需要继续循环了
                    }
                }
            } else {
                carlist.push(goods);
            }
            //每次改变localstorage种的数据都要保存一下
            localStorage.setItem('carlist', JSON.stringify(carlist));

        }

        //先获取本地localstorage种的商品数据
        Car.prototype.get = function () {
            //当localstorage种没有数据时，要返回一个空数组，否则会报错
            //把localstorage种的数据转换成json格式
            var carlist = JSON.parse(localStorage.getItem('carlist')) || [];
            return carlist;
        }

        //判断购物车种是否有该商品
        Car.prototype.hasGoods = function (id) {
            //都需要现从本地获取商品数数据判断
            var carlist = this.get();
            for (var i = 0; i < carlist.length; i++) {
                if (carlist[i].id == id) {
                    return true; //返回true表示在购物车种找到了该商品
                }
            }
            return false;
        }

        //删，点击删除按钮删除该商品
        Car.prototype.del = function (id) {
            var carlist = this.get();
            for (var i = 0; i < carlist.length; i++) {
                if (carlist[i].id == id) {
                    carlist.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem('carlist', JSON.stringify(carlist));
        }

        //点击删除选中的商品，删除对应的商品
        Car.prototype.delAll = function (id) {
            var carlist = this.get();
            for (var n = 0; n < id.length; n++) {
                for (var m = 0; m < carlist.length; m++) {
                    if (id[n] == carlist[m].id) {
                        carlist.splice(m, 1);
                        // break;
                    }
                }
            }
            localStorage.setItem('carlist', JSON.stringify(carlist));
        }

        //点击加号按钮该商品数量加一   和再执行一遍add是一样的,但是传值不一样
        Car.prototype.plus = function (id) {
            var carlist = this.get();
            for (var i = 0; i < carlist.length; i++) {
                if (carlist[i].id == id && carlist[i].number < 99) {
                    carlist[i].number++;
                    break;
                }
            }
            localStorage.setItem('carlist', JSON.stringify(carlist));
        }

        //点击减号该商品数量减一
        Car.prototype.down = function (id) {
            var carlist = this.get();
            for (var i = 0; i < carlist.length; i++) {
                //当只有一件商品，则不能再减，最少是一件
                if (carlist[i].id == id && carlist[i].number > 1) {
                    carlist[i].number--;
                    break;
                }
            }
            localStorage.setItem('carlist', JSON.stringify(carlist));
        }

        //计算购物车种的总价  获取localstorage中的商品数据，商品数量乘商品单价
        Car.prototype.money = function () {
            var carlist = this.get();
            var money = 0;
            for (var i = 0; i < carlist.length; i++) {
                money += carlist[i].number * carlist[i].price;
            }
            return money.toFixed(2);
        }

        //点击文本框能直接修改数量
        Car.prototype.change = function (id, num) {
            
            var reg=/^\d+$/;
            if(!reg.test(num)){
                return;
            }
            var carlist = this.get();
            for (var i = 0; i < carlist.length; i++) {
                if (carlist[i].id == id) {
                    if(num>99){
                        carlist[i].number = 99;
                    }else{
                        carlist[i].number = num;
                    }
                }
            }
            localStorage.setItem('carlist', JSON.stringify(carlist));
        }

        //计算购物车种所所有商品数量
        Car.prototype.num = function () {
            var carlist = this.get();
            var num = 0;
            for (var i = 0; i < carlist.length; i++) {
                num += parseInt(carlist[i].number);
            }
            return num;
        }

    }




    window.car = new Car(); //挂载在window对象上




    //进入购物车页面
    var cart = new Car();
    var carlist = cart.get();
    var str = '';
    var money = 0;
    // 先循环把localstorage数据拿到，然后添加到商品列表中
    for (var i = 0; i < carlist.length; i++) {
        str += `<li class="goodsitem">
    <div class="col col1">
        <input type="checkbox" name="selectGood" class="u-chk" d="${carlist[i].id}">
    </div>
    <div class="col col2">
        <a href="javascript:void(0);" class="imgwarp">
            <img src="./images/goods${carlist[i].id}.png" alt="">
        </a>
        <div class="txtwarp">
            <h3 class="goodstlt">${carlist[i].name}</h3>
        </div>
    </div>
    <div class="col col3">
        <span>${carlist[i].price}</span>
    </div>
    <div class="col col4">
        <span class="u-setcount">
            <span class="minus z-dis" d="${carlist[i].id}">-</span>
            <input type="text" max="10" min="1" value="${carlist[i].number}"  class="ipt i${carlist[i].id}" d="${carlist[i].id}">
            <span class="plus" d="${carlist[i].id}">+</span>
        </span>
    </div>
    <div class="col col5">
        <span class="sum">${(carlist[i].price * carlist[i].number).toFixed(2)}</span>
    </div>
    <div class="col col6">
        <a class="u-opt" d="${carlist[i].id}">删除</a>
    </div>
</li>`
    }
    $('.actgoods').html(str); //将localstorage中的数据动态添加购物车商品列表中




    //点击加号商品加一
    $('.plus').on('click', function () {
        if($(this).parent().children().eq(1).val() == 99){
            return;
        }

        // console.log($(this).attr('d'));
        var id = $(this).attr('d');
        // console.log(id);
        cart.plus(id);
        location.reload();
    });




    //点击减号商品减一
    $('.minus').on('click', function () {
        // console.log($(this).parent().children().eq(1).val());
        if($(this).parent().children().eq(1).val() == 1){
            return;
        }

        var id = $(this).attr('d');
        if ($(this).parent().children().eq(1).val() == 1) {
            return;
        }
        cart.down(id);
        location.reload();
    });




    //设置所有商品数量为1和商品数量为99的，减号鼠标移上去为不可点击
    $.each($('.minus'), function (k, v) {
        if ($(v).parent().children().eq(1).val() == 1) {
            $(this).css({ // v和this都是获取当前的dom节点
                'background-color': '#ccc',
                'cursor': 'not-allowed'
            });
        }
        if ($(v).parent().children().eq(1).val() > 1) {
            $(this).css({
                'background-color': '#fff',
                'cursor': 'pointer'
            });
        }
    });

    $.each($('.plus'), function (k, v) {
        if ($(v).parent().children().eq(1).val() == 99) {
            $(this).css({ // v和this都是获取当前的dom节点
                'background-color': '#ccc',
                'cursor': 'not-allowed'
            });
        }
        if ($(v).parent().children().eq(1).val() < 99) {
            $(this).css({
                'background-color': '#fff',
                'cursor': 'pointer'
            });
        }
    });








    //点击文本框直接修改数量
    $('.ipt').blur(function () {
        var id = $(this).attr('d');
        var num = $(`.i${id}`).val();
        // console.log(id);
        // console.log(num);
        cart.change(id, num);
        location.reload();
    })




    //点击删除按钮删除该商品
    $('.u-opt').on('click', function () {
        if (!confirm("确认要删除该商品吗？")) {
            return;
        }
        var id = $(this).attr('d');
        cart.del(id);
        location.reload();
    })








    //全选选中所有商品,且下方出现总价

    //上面全选按钮
    $('#selectAll').click(function () {
        var money = cart.money();
        var num = cart.num();
        if ($('#selectAll').prop('checked') == true) {
            $('.a-chk').prop('checked', true);
            $.each($('.u-chk'), function (k, v) {
                // k是下标，v的值是dom对象,v换成this也是一样的
                // console.log(k,v);
                v.checked = true;
                // this.checked=ture;
            });
            $('.money').html(`￥${money}`); //总价
            $('.num').html(num); //数量
            //去结算按钮的样式
            $('.gobuy').css({
                'background-color': '#e31436',
                'cursor': 'pointer'
            });


            //商品列表每个商品的背景色
            $('.goodsitem').css('background-color', '#fffbf0');
        }
        if ($('#selectAll').prop('checked') == false) {
            $('.a-chk').prop('checked', false);
            $.each($('.u-chk'), function (k, v) {
                v.checked = false;
                // this.checked=false;
            });
            $('.money').html('￥0'); //总价
            $('.num').html(0); //数量
            //去结算按钮的样式
            $('.gobuy').css({
                'background-color': '#ccc',
                'cursor': 'not-allowed'
            });


            //商品列表每个商品的背景色
            $('.goodsitem').css('background-color', '#fff');
        }
    });


    //下面全选按钮
    $('#re-selectAll').click(function () {
        var money = cart.money();
        var num = cart.num();
        if ($('#re-selectAll').prop('checked') == true) {
            $('.a-chk').prop('checked', true);
            $.each($('.u-chk'), function (k, v) {
                v.checked = true;
            });
            $('.money').html(`￥${money}`);
            $('.num').html(num);
            $('.gobuy').css({
                'background-color': '#e31436',
                'cursor': 'pointer'
            }); //去结算按钮的样式


            //商品列表每个商品的背景色
            $('.goodsitem').css('background-color', '#fffbf0');

        }
        if ($('#re-selectAll').prop('checked') == false) {
            $('.a-chk').prop('checked', false);
            $.each($('.u-chk'), function (k, v) {
                v.checked = false;
                // this.checked=false;
            });
            $('.money').html('￥0');
            $('.num').html(0);
            $('.gobuy').css({
                'background-color': '#ccc',
                'cursor': 'not-allowed'
            }); //去结算按钮的样式

            //商品列表每个商品的背景色
            $('.goodsitem').css('background-color', '#fff');
        }
    });

    //点击商品列表中的checkbox按钮
    $('.u-chk').on('click', function () {
        var money = 0;
        var num = 0;
        var sum = 0; //计算商品列表有没有未选中的，如果没有，全选checked=true；
        var dum = 0; //计算商品列表有没有未选中的，如果有，全选checked=false；

        if ($(this).prop('checked') == true) {
            //当前商品选中后商品的背景色
            $(this).parent().parent().css('background-color', '#fffbf0');

            //计算商品列表中所有选中的数量和价格
            $.each($('.u-chk'), function (k, v) {
                if (v.checked == true) {
                    sum++;
                    // console.log($(v).parent().parent().children().eq(4).children().html());
                    // console.log($(v).parent().parent().children().eq(3).children().children().eq(1).val());
                    money += parseFloat($(v).parent().parent().children().eq(4).children().html());
                    num += parseInt($(v).parent().parent().children().eq(3).children().children().eq(1).val());
                }
            });
            money = money.toFixed(2); //最后价格保留两个位小数
            // console.log(money)
            // console.log($('.u-chk').length);
            if (sum == $('.u-chk').length) {
                $('.a-chk').prop('checked', true);
            } else {
                $('.a-chk').prop('checked', false);
            }
            $('.money').html(`￥${money}`);
            $('.num').html(num);

            //去结算按钮的样式
            $('.gobuy').css({
                'background-color': '#e31436',
                'cursor': 'pointer'
            });

        }


        if ($(this).prop('checked') == false) {

            //当前商品选中后商品的背景色
            $(this).parent().parent().css('background-color', '#fff');


            //计算商品列表中所有选中的数量和价格
            $.each($('.u-chk'), function (k, v) {
                if (v.checked == true) {
                    dum += 1;
                    money += parseFloat($(v).parent().parent().children().eq(4).children().html());
                    num += parseInt($(v).parent().parent().children().eq(3).children().children().eq(1).val());
                }
            });
            money = money.toFixed(2);
            // console.log(money);
            if (dum == $('.u-chk').length) {
                $('.a-chk').prop('checked', true);
            } else {
                $('.a-chk').prop('checked', false);
            }
            $('.money').html(`￥${money}`);
            $('.num').html(num);
            if (parseInt($('.num').html()) == 0) {
                $('.gobuy').css({
                    'background-color': '#ccc',
                    'cursor': 'not-allowed'
                }); //去结算按钮的样式

            }
        }
    });

    //点击删除选中商品删除已选中的商品
    $('.delAll').on('click', function () {
        var id = [];
        var sum = 0;
        $.each($('.u-chk'), function (k, v) {
            if ($(v).prop('checked') == true) {
                sum++;
                console.log($(this).attr('d'));
                id.push($(this).attr('d'));
            }
        });
        console.log(id);
        if (sum >= 1) {
            if (!confirm("确认要删除选中的商品吗？")) {
                return;
            }
            cart.delAll(id);
            location.reload();
        } else {
            confirm("请选择需要删除的商品");
        }

    })

    //判断购物车中是否有商品
    var list = document.getElementsByClassName('goodsitem').length;
    if (list < 1) {
        $('#main').css('display', 'block');
        $('#cartbox').css('display', 'none');
    } else {
        $('#main').css('display', 'none');
        $('#cartbox').css('display', 'block');
    }



});