// --------------------------------轮播图start----------------------------------
var index = 0;
var timer = setInterval(autoplay, 2000);

//自动轮播
function autoplay() {
    index++;
    $('#showing_img>li').eq(index).fadeIn(500).siblings().fadeOut(500);
    $('#dots_img>li').eq(index).addClass('current').siblings().removeClass('current');
    if (index == $('#showing_img>li').length - 1) {
        index = -1;
    }
}

//底部圆点事件
$('#dots_img>li').hover(function () {
    clearInterval(timer);
    index = $(this).index() - 1;
    autoplay();
    //timer = setInterval(autoplay, 3000);
    // var _timer=setTimeout( autoplay ,2000);
},function(){
    index = $(this).index()-1;
    autoplay();
});

//左右两边按钮事件
$('#toNext').click(function () {
    clearInterval(timer);
    autoplay();
})

$('#toPrev').click(function () {
    clearInterval(timer);
    index = $('#dots_img>li[class=current]').index() - 2;
    autoplay();
})

//鼠标进入图片事件
$('#main_img').hover(function () {
    clearInterval(timer);
    $('#btn_img span').css('display', 'block')
}, function () {
    timer = setInterval(autoplay, 2000);
    $('#btn_img span').css('display', 'none')
})
//----------------------------轮播图end-------------------------------------




//-------------------------搜索框事件start--------------------------------

//点击搜索框，placeholeder的值消失，清空搜索框；
$('#searchinput').click(function () {
    $(this).attr('placeholder', '');
})



//搜索框失去焦点事件，如果未输入，则显示原placeholeder的值，如果有输入其他值，则显示输入过的值；
$('#searchinput').blur(function () {
    var inputvalue = $('#searchinput').val();
    if (inputvalue) {
        $(this).attr('value', 'inputvalue');
    } else {
        $(this).attr('placeholder', 'ahc套装');
    }

})


//鼠标点击搜索框外的区域，ul消失。
document.onclick = function (e) {
    var e = e || window.e;
    var targetId = e.target ? e.target.id : e.srcElement.id;

    if (targetId !== 'topsearchbox') {
        $('#search_ul').empty();
    }
}


//搜索框首次输入关键字查询事件
$('#searchinput').on('keyup', function () {
    var content = $(this).val();
    var script = document.createElement('script');
    script.src = `https://category.vip.com/ajax/getSuggest.php?callback=fn&keyword=${content}&_=1557804765925`; //网易考拉不接受jsonp获取数据，数据来自唯品会；
    document.body.appendChild(script);
})

//搜索框二次输入事件
$('#searchinput').focus('keyup', function () {
    var content = $(this).val();
    var script = document.createElement('script');
    script.src = `https://category.vip.com/ajax/getSuggest.php?callback=fn&keyword=${content}&_=1557804765925`; //网易考拉不接受jsonp获取数据，数据来自唯品会；
    document.body.appendChild(script);
})
//回调函数
function fn(data) {
    var result = data.data;
    if (!result) {
        $('#search_ul').html('');
    }
    var str = ``;
    for (i = 0; i < result.length; i++) {
        str += `<li><a target='_blank' href="https://search.kaola.com/search.html?zn=top&key=${result[i].word}">${result[i].word}</a></li>`
    }
    $('#search_ul').html(str);
}


//搜索框查询按钮点击事件
$('#topSearchBtn').click(function(){
    var content = $('#searchinput').val();
   // window.location=`https://search.kaola.com/search.html?zn=top&key=${content}`;
    window.open(`https://search.kaola.com/search.html?zn=top&key=${content}`,"_blank");
})



//------------------------------------搜索框事件end--------------------------------



//--------------------------------页面滚动事件-------------------------------------
document.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //顶部菜单定位
    if (scrollTop >= 110) {
        $('#top_search').attr('style', 'position:fixed;top:0;height:50px;padding-top:5px;z-index:999;border-bottom: 1px solid #ddd;box-shadow: 0 0 10px rgba(0,0,0,.2)');
        $('#suggestlist').attr("style", "display:none");
        $('#cart').attr("style", "display:none");
        $('.logokaola').attr('style', 'height:40px;width:162px');
    } else {
        $('#top_search').removeAttr('style');
        $('.logokaola').removeAttr('style');
        $('#cart').removeAttr('style');
        $('#suggestlist').removeAttr('style');
    }

    //左右两侧菜单定位
    if (scrollTop >= 762) {
        $('#indexleft').attr('style', 'position:fixed;top:66px;');
        $('#rightBarNew').attr('style', 'position:fixed;top:66px;');
    } else {
        $('#indexleft').attr('style', 'position:absolute;top:762px;');
        $('#rightBarNew').attr('style', 'position:absolute;top:762px;');
    }
}


//--------------------------------左侧楼梯式菜单导航点击事件---------------------------------
$(function () {
    var _index = 0;
    //左侧菜单所有a标签鼠标划过事件
    $('#indexleft a').hover(function () {
        // $(this).attr('style', ' color: #ff1e32; background: #f6f6f6;');
    }, function () {
        $(this).removeAttr('style');
    });

    //今日限时购和热门品牌
    $('.channel li').click(function () {
        // $(this).attr('style', ' color: #ff1e32; background: #f6f6f6;');
        _index = $(this).index() + 1;

        var _top = $("#menumodule_" + _index).offset().top - 50;
        $('body,html').animate({
            scrollTop: _top
        }, 500)
    })

    //剩余楼梯菜单点击事件
    $('.floor li').click(function () {
        // $(this).attr('style', ' color: #ff1e32; background: #f6f6f6;');
        _index = $(this).index() + 3;

        var _top = $("#menumodule_" + _index).offset().top - 50;
        $('body,html').animate({
            scrollTop: _top
        }, 500)
    });


})

//--------------------------------今日限时购区倒计时-------------------------
function timecount() {
    //获取当前时间
    var _date = new Date();
    var _now = _date.getTime();

    //设置截取时间
    var _str = '2019-05-17 24:00:00';
    var _endDate = new Date(_str);
    var _endTime = _endDate.getTime();
    var _countTime = _endTime - _now;

    //提取倒计时剩余的时分秒
    var _h, _h1, _h2, _m, _m1, _m2, _s, _s1, _s2;
    if (_countTime > 0) {
        //时
        _h = Math.floor(_countTime / 1000 / 60 / 60 % 24);
        _h1 = Math.floor(_h / 10);
        _h2 = _h % 10;
        //分  
        _m = Math.floor(_countTime / 1000 / 60 % 60);
        _m1 = Math.floor(_m / 10);
        _m2 = _m % 10;
        //秒
        _s = Math.floor(_countTime / 1000 % 60);
        _s1 = Math.floor(_s / 10);
        _s2 = _s % 10;
        //console.log(_h, _h1, _h2, _m, _m1, _m2, _s, _s1, _s2)
    } else {
        _h1 = '0';
        _h2 = '0';
        _m1 = '0';
        _m2 = '0';
        _s1 = '0';
        _s2 = '0';
    }
    $('#j-dltimebox > i').eq(0).html(_h1);
    $('#j-dltimebox > i').eq(1).html(_h2);
    $('#j-dltimebox > i').eq(2).html(_m1);
    $('#j-dltimebox > i').eq(3).html(_m2);
    $('#j-dltimebox > i').eq(4).html(_s1);
    $('#j-dltimebox > i').eq(5).html(_s2);

var timebox=setInterval(timecount,1000);
}

timecount();

    //设置索引值为单数的i标签的margin-left
 $('#j-dltimebox>i:odd').css('margin-left','-10px');



//-----------------------------------热门品牌区广告轮播----------------------------------
var index_ads=0;
function ads_play(){
    //小图片轮播
    index_ads++;
    $('.fixedBrand li').eq(index_ads).fadeIn(500).siblings().fadeOut(500);
    //进度条展示
    $('.progress').attr('style',`width:${33.3*(index_ads+1)}%;`)
    if(index_ads==2){
        index_ads=-1;
    }

}
var ads_timer=setInterval(ads_play,2000);



//-----------------------------------美妆专区广告轮播----------------------------------
var index_prolist=0;
function prolist_play(){
    index_prolist++;
    $('.prolist>.itemgroup').eq(index_prolist).fadeIn(500).siblings().fadeOut(500);
    if(index_prolist==2){
        index_prolist=-1;
    }

}
var prolist_timer=setInterval(prolist_play,2000);



//-----------------------------------购物车数量----------------------------------
//获取本地localstorage
function get(){
    var cartlist=JSON.parse(localStorage.getItem('carlist'))||[];
    return cartlist;
}
//拿到localstorage数据后获取商品总数量
(function(){
    var cartlist=get();
    var num=0;
    if(cartlist.length==0){
        $('.num').html(0);
    }else{
        for(var i=0;i<cartlist.length;i++){
            num+=parseInt(cartlist[i].number);
        }
        num= parseInt(num);
        $('.num').html(num);        
    }
})();
