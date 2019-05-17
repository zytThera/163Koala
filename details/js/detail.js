$(function () {
    //二级菜单的实现
    $(".mixboxone").mouseover(function () {
        var index = $(this).index();
        console.log($(".hidden-layer").eq(index).css("display:block"));


        // $(".hidden-layer").css({ "display": "none", "display": "block" });
        // $(".mixboxone").css("border-bottom:none");

        // $(".mixboxone").mouseout(function () {
        //     $(".hidden-layer").css({ "display": "block", "display": "none" });
        //     $(".mixboxone").css("border-bottom:1px");
        // })
        //    if(($(".mixboxone").mouseout(function(){}))
    });
    $(".mixboxone").mouseout(function () {
        var index = $(this).index();
        $(".hidden-layer").eq(index).css("display:none");
    });


    $(".mixboxtwo").on("mouseover", function () {

        $(".hidden-layer").css({
            "display": "none",
            "display": "block"
        });
        $(".mixboxtwo").css("border-bottom:none");

        $(".mixboxone").mouseout(function () {
            $(".hidden-layer").css({
                "display": "block",
                "display": "none"
            });
            $(".mixboxtwo").css("border-bottom:1px");
        })
        //    if(($(".mixboxone").mouseout(function(){}))


    });

    // 放大镜
    $(".maskimg").on("mouseover", function (e) {
        $(".mask").show();
        $(".maxbox").show();

    });
    $(".maskimg").on("mouseout", function () {
        $(".mask").hide();
        $(".maxbox").hide();
    })
    $(".maskimg").mousemove(function (e) {
        //鼠标移动的时候遮罩层跟着鼠标一起移动，鼠标在遮罩层的中间位置


        // $(".maskimg").hover(function(){
        //     $(".mask").show();
        //     $(".maxbox").show();
        // }, function () {
        //     $(".mask").hide();
        //     $(".maxbox").hide();


        var mouseX = e.pageX //记录鼠标所在的位置X坐标        
        var mouseY = e.pageY; //记录鼠标所在的Y坐标



        //鼠标的位置减去遮罩层的相对位置，再减去遮罩层的宽度或者高度除以2


        var imgLeft = $(".maskimg").offset().left; //左边容器的相对宽度位置 

        var imgTop = $(".maskimg").offset().top; //左边容器的相对高度 


        // var clientWidth = document.body.clientWidth;
        // var marginLeft = (clientWidth - 1090) / 2;
        // var marginTop = $(".left-box").offset().top;


        var imgWidth = $(".maskimg").width(); //左边容器的宽度

        var imgHeight = $(".maskimg").height(); //左边容器的高度

        var maskWidth = $(".mask").width(); // 获取遮罩层的宽度；  
        var maskHeight = $(".mask").height(); //获取遮罩层的高度；

        //鼠标移动的位置
        var x = mouseX - imgLeft - maskWidth / 2;
        // // console.log(x);
        var y = mouseY - imgTop - maskHeight / 2;
        if (x < 0) { //
            x = 0;
        } else if (x > imgWidth - maskWidth) {
            x = imgWidth - maskWidth;
        }

        if (y < 0) {
            y = 0;
        } else if (y > imgHeight - maskHeight) {
            y = imgHeight - maskHeight;
        }




        var maxboxImgwidth = $(".maxbox img").width(); //获取大图的宽度 

        var maxboxImgheight = $(".maxbox img").height(); //获取大图的高度


        // $(".mask").offset({  //获取遮罩层的位置，x和Y；
        //     top: mouseY - maskHeight / 2,
        //     left: mouseX - maskWidth / 2
        // })
        $(".mask").css({
            left: x + "px",
            top: y + "px"
        })

        // 大图按照一定的比例来移动
        //比例
        var l = x / ($(".maskimg").width() - $(".mask").width());
        var t = y / ($(".maskimg").height() - $(".mask").height());
        // console.log(l,t);
        // console.log(($(".maxbox>img").width() - $(".maxbox").width()));

        // 大图片移动。放大镜向左移动，大图片整体向右移动，所以是反的
        $(".maxbox>img").css({
            // (mouseY - maskHeight / 2) * 2,
            left: -l * ($(".maxbox>img").width() - $(".maxbox").width()) + "px",
            top: -t * ($(".maxbox>img").height() - $(".maxbox").height()) + "px" // (mouseX - maskWidth / 2) * 2
        })

        // })




    })
    //实现鼠标滑上去的时候图片出现边框。
    $(".listUl li").mouseover(function () {
        var index = $(this).index();
        $(".listUl li").eq(index).css({
            "border": "3px solid red"
        }).parents().filter($(".maskimg img")).css({
            "width": "400px",
            "height": "400px"
        });

    })
    $(".listUl li").mouseout(function () {
        var index = $(this).index();
        $(".listUl li").eq(index).css({
            "border": "none"
        });
    })


    //点击按钮切换图片,实现图片左切换的思路：
    //获取ul的宽，左箭头绑定事件实现向左减去一个图片的宽，右箭头实现向右加一个图片的宽度
    $(".scrollright").click(function () {

        console.log($(".listUl li").css());

    })


    //鼠标滑过去的时候显示大图，鼠标离开仍然显示，直到鼠标滑过另一个图片

    //鼠标划入显示边框
    // $(".imgBox").mouseover(function () {
    //     var index = $(this).index();
    //     $(" .imgBox").eq(index).css({ "border": "2px solid red" });
    // });


    // //鼠标离开的时候边框消失
    // $(" .imgBox").mouseout(function () {
    //     var index = $(this).index();
    //     $(".imgBox").eq(index).css({ "border": "none" });
    // })



    //产品数量加减实现
    var t = $("#text_box");
    //初始化数量为1，并且失效减法
    $('#min').attr('disabled', true);
    //数量的增加操作
    $("#max").click(function () {
        //给获取的val值加上绝对值。避免出现负数；
        t.val(Math.abs(parseInt(t.val())) + 1);
        if (parseInt(t.val()) != 1) {
            $("#min").attr('disabled', false);
        };
        //做数量减少的操作
    });
    $("#min").click(function () {
        var value = t.val();
        // value-1;
        t.val(value - 1);
        console.log();

        if (parseInt(t.val()) <= 1) {
            t.val(1);

            $(this).prop('disabled', true);
        }

    })
    // $("#addCart").click(function () {
    //     var _this = $(this);//

    // var tit = $("#tit").html();   //title  
    // var num = $("#text_box").val();//数量
    //var url = $(".maskimg img").html();
    //var price = console.log($(".rem").html());


    // $.get("./goods.json", {}, function (res) {
    //     str = `
    //     `
    // }, 'text')
    function loadImg() {
        var promise = promiseAjax({
            "url": "./js/goods.json",
            "method": "get"
        });
        promise.then(function (res) {
            // console.log(res);
            var result = JSON.parse(res);
            for (var i = 0; i < result.length; i++) {

                var img = document.createElement("img");
                img.src = result[i].url;

                // document.getElementsByClassName("maskimg").appendChild(img);
                // console.log(result[i].url);
                $($(".imgBox")[i]).attr('data-id', result[i].id);
                $($(".imgBox")[i]).children().children().attr('src', result[i].url);
            }


        })
    }

    // })
    loadImg();

    var imgBox_index;
    $("#addCart").click(function () {
        // console.log($(".imgBox").children().children());

        var promise = promiseAjax({
            "url": "./js/goods.json",
            "method": "get"
        });
        promise.then(function (res) {
            var result = JSON.parse(res);
            var value = $("#text_box").val();
            var index = $(this).index();
            var good = result[imgBox_index];
            good.number =parseInt(value);
            console.log(good.id);
            var car = new Car();
            car.addCar(good); //加入购物车
        })
    })




    // })
    loadImg();

    $(".imgBox").hover(function () {
        var span = $(this).children()[0];
        $(span).fadeIn(0);
    }, function () {
        var span = $(this).children()[0];
        $(span).fadeOut(0);
    });


    $(".imgBox").click(function (e) {
        var e = e || window.e;
        imgBox_index = $(this).index();
        console.log(imgBox_index);

        if ($(this).css('border-color') == 'rgb(255, 0, 0)') {
            $(this).css('border', '2px solid white');
            return;
        }
        $(".imgBox").css('border', '2px solid white');
        $(this).css('border', '2px solid red');
    })

});