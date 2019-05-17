$(function () {
    // 账号密码登陆和邮箱登陆的切换
    $('#tel').on('click', function () {
        $('.ferrorhead').html(' '); //错误提示内容清空
        $('.login-id').css('display', 'block');
        $('.login-email').css('display', 'none');
    });
    $('#email').on('click', function () {
        $('.ferrorhead').html(' ');
        $('.login-id').css('display', 'none');
        $('.login-email').css({
            'display': 'block',
            'margin-top': '20px'
        });
    });
    //密码登陆和手机验证码登陆切换
    $('.change').on('click', function () {
        $('.ferrorhead').html(' ');
        if ($('.login-id > .getnumber').css('display') == 'block') {
            $('.login-id > .getnumber').css('display', 'none');
            $('.login-id > .password').css('display', 'block');
            $('.change-tab').html('使用短信验证登录');
            $('.change-tab').css('background-position', '0px -15px')
        } else {
            $('.login-id > .getnumber').css('display', 'block');
            $('.login-id > .password').css('display', 'none');
            $('.change-tab').html('使用密码验证登录');
            $('.change-tab').css('background-position', '0px 0px')
        }

    });
    //点击快捷注册调到注册框
    $('.gotoreg').click(function () {
        $('.ferrorhead').html('');
        $('.login').css('display', 'none');
        $('.regiter').css('display', 'block');
    });
    //点击去登陆回到登陆框
    $('.gotoreg').click(function () {
        $('.ferrorhead').html('');
        $('.login').css('display', 'none');
        $('.regiter').css('display', 'block');
    });
    $('.gotologin').click(function () {
        $('.login').css('display', 'block');
        $('.regiter').css('display', 'none');
    });
    //点击获取验证码开始倒计时
    $('.getsmscode').click(function (event) {
        var timer;
        var n = 30;
        var reg = /^1[3456789]\d{9}$/;
        event.preventDefault();//阻止buttom按钮提交刷新
        $('.getsmscode').prop('disabled',true);
        $('.getsmscode').css({
            'background-color': '#ccc',
            'cursor': 'not-allowed',
            'color':'#fff'
        });
        $('.ferrorhead').html(' ');
        if ($('.login-id > .getnumber').css('display') == 'block') {
            if (!reg.test($('#number').val())) {
                $('.getsmscode').prop('disabled',false);
                $('.getsmscode').css({
                    'background-color': '#eee',
                    'cursor': 'pointer',
                    'color':'#333'
                });
                $('.ferrorhead').html('手机号格式错误');
            } else {
                timer = setInterval(count, 1000);
                function count() {
                    if (n >= 0) {
                        $('.getsmscode').html(`${n}秒后重发`);
                        n--;
                    } else {
                        $('.getsmscode').html('获取验证码');
                        clearInterval(timer);
                        $('.getsmscode').prop('disabled', false);
                        $('.getsmscode').css({
                            'background-color': '#eee',
                            'cursor': 'pointer',
                            'color':'#333'
                        });
                    }
                }
            }
        }


    });


    //验证码登陆点击登陆按钮
    $('#submitBtn').on('click', function (event) {
        event.preventDefault();
        //手机号正则
        var num = /^1[3456789]\d{9}$/;
        //6位数字验证码正则
        var code = /^\d{6}$/;
        //邮箱正则
        var ema = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$ /;
        //密码正则，最少6位，最大16位
        var pass = /^\w.{5,15}$/;
        //获取账号框的值和密码框的值
        var username = $('#number').val();
        var password = $('#password').val();
        $('.ferrorhead').html("");
        //判断验证码登陆
        if ($('.login-id > .getnumber').css('display') == 'block') {
            if ($('#number').val() == '') {
                $('.ferrorhead').html('请输入手机号');
                return false;
            }
            if (!num.test($('#number').val())) {
                $('.ferrorhead').html('手机号格式错误');
                return false;
            }
            if ($('#phonecode').val() == '') {
                $('.ferrorhead').html('验证码不能为空');
                return false;
            }
            if (!code.test($('#phonecode').val())) {
                $('.ferrorhead').html('请输入正确的验证码');
                return false;
            }
        }

        //账号密码登陆。主要就是实现这个和下面注册
        if ($('login-email').css('display') != 'block' && $('.login-id > .password').css('display') == 'block') {
            if ($.trim(username) == "" || $.trim(password) == "") { //trim是jQuery中清除两端空白的方法
                $('.ferrorhead').html("手机号和密码不能为空");
                $('#password').val('');
                $('#username').val('');
                $('#submitBtn').prop('disabled', false);
                return false;
            }
            $('.ferrorhead').html(''); //以上条件全部满足则清空错误提示
            //用ajax去数据库匹配账号密码
            $('#submitBtn').prop('disabled', true); //点击之后禁止点击，避免一直请求造成服务器崩溃
            $('#submitBtn').html('登录中');
            $('#submitBtn').css('background-color', '#ddd');
            $.post('./login.php', {
                'username': username,
                'password': password
            }, function (res) {
                if (res.code == 200) {
                    layer.msg(res.message);
                    $('#submitBtn').html('登 录');
                    $('#submitBtn').css('background-color', '#e31436');
                    location.href='../index/index.html';
                } else {
                    layer.msg(res.message);
                    $('.ferrorhead').html(res.message);
                    $('#submitBtn').html('登 录');
                    $('#submitBtn').css('background-color', '#e31436');
                }
                $('#submitBtn').prop('disabled', false);
            }, 'json');
        }

        //判断邮箱登陆
        // if( $('.login-email').css('display')=='block'){
        //     if($('#email').val()==''){
        //         $('.ferrorhead').html('请输入邮箱账号');
        //         return false;
        //     }
        //     if(!ema.test($('#email').val())){
        //         $('.ferrorhead').html('账号格式错误');
        //         return false;
        //     }
        //     if($('#password').val()==''){
        //         $('.ferrorhead').html('请输入密码');
        //         return false;
        //     }
        //     if(!pass.test($('#password').val())){
        //         $('.ferrorhead').html('账号或密码错误');
        //         return false;
        //     }
        // }

    });
    // 注册
    //如果没同意条款，注册按钮就是不可点击的
    $('.consent').click(function(){
        if($('.consent').prop('checked')==false){
            $('#regiterBtn').prop('disabled',true);
            $('#regiterBtn').css('background-color', '#ddd');
        }
        if($('.consent').prop('checked')==true){
            $('#regiterBtn').prop('disabled',false);
            $('#regiterBtn').css('background-color', '#e31436');
        }
    });
    //同意了条款之后才能注册
    $('#regiterBtn').on('click',function(event){
        event.preventDefault();//阻止表单的默认提交，提交了就不会获取数据库了
        var num=/^1[3456789]\d{9}$/;
        var pass=/^\w.{5,15}$/;
        //获取账号框的值和密码框的值
        var username=$('#r-number').val();
        var password=$('#r-password').val();
        var rePassword=$('#re-password').val();
        if(username==''){
            $('.ferrorhead').html('请输入手机号');
            return false;
        }
        if(!num.test(username)){
            $('.ferrorhead').html('手机号格式错误');
            return false;
        }
        if(password==''){
            $('.ferrorhead').html('请输入密码');
            return false;
        }
        if(!pass.test(password)){
            $('.ferrorhead').html('密码格式错误错误');
            return false;
        }
        if(rePassword!=password){
            $('.ferrorhead').html('两次输入的密码不一致');
            return false;
        }
        // console.log($('.consent').prop('checked'));
        // $('.ferrorhead').html('');
        // $('#regiter-from').validate({
        //     rules:{
        //         number:{
        //             required:true,//必填
        //             rangelength:[11,11]
        //         },
        //         password:{
        //             required:true,//必填
        //             rangelength:[6,16]
        //         },
        //         repassword:{
        //             equalTo:'#r-password'
        //         }
        //     },
        //     messages:{
        //         number:{
        //             required:'必填',//必填
        //             rangelength:"11位手机号"
        //         },
        //         password:{
        //             required:"必填",//必填
        //             rangelength:"至少6位"
        //         },
        //         repassword:{
        //             equalTo:"密码不一致"
        //         }
        //     }
        // });
        
        // 以上都满足条件后，通过ajax添加到数据库
        if(rePassword==password){
            $('.ferrorhead').html('');
            $('#regiterBtn').html('注册中');
            $('#regiterBtn').prop('disabled', true);
            $('#regiterBtn').css('background-color','#ccc');
            $.post('./regiter.php',{'username':username,'password':password},function(res){
                if (res.code == 200) {
                    layer.msg(res.message);
                    $('#regiterBtn').html('注 册');
                    location.reload();
                } else if(res.code == 0){
                    layer.msg(res.message);
                    $('#regiterBtn').html('注 册');
                }else {
                    layer.msg(res.message);
                    $('.ferrorhead').html(res.message);
                    $('#regiterBtn').html('注 册');
                }
                $('#regiterBtn').css('background-color', '#e31436');
                $('#regiterBtn').prop('disabled', false);
            },'json');
        }

    });
    
})