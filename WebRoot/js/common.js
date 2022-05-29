/**
 * Created by YANG on 14-7-30.
 */
$(function(){


//  显示菜品下拉
    var nav_product = $('#nav_products');
    //nav_product.find('a').attr('href','#');
    var nav_ptimer = null;
    $('a.nav_product').hover(function(){
        clearTimeout(nav_ptimer);
        nav_product.slideDown(300);
    },function(){
        nav_ptimer = setTimeout(function(){
            nav_product.slideUp(300);
        },300)

    });
    nav_product.hover(function(){
        clearTimeout(nav_ptimer);
    },function(){
        clearTimeout(nav_ptimer);
        nav_ptimer = setTimeout(function(){
            nav_product.slideUp(300);
        },300)
    });

//  招聘列表

    var job_list = $("div.job_list");
    var job_ul = $("div.job_list ul")
    var job_items = $("div.job_list li");
    var job_list_nav = $("div.job_list_nav");
    if(job_list.length>0 && job_items.length>0){
        var itemsLen = job_items.length;
        var pageNum = Math.ceil(itemsLen/5);

        var str='';
        for(var i=0;i<pageNum;i++){
            str+='<span></span>'
        }

        job_list_nav.empty().append(str);

        var job_list_navItem = $('div.job_list_nav span');
        job_list_navItem.eq(0).addClass('current');
        job_list_navItem.hover(function(){

            var index = $(this).index();

            $(this).addClass('current').siblings().removeClass('current');
            job_ul.stop(false,true).animate({left:-1200*index+'px'},500);

        },function(){})
    }

//

    $("div.prodata2_item").click(function(){
        if($(this).hasClass('current')){
            $(this).removeClass('current')
        }else{
            $(this).addClass('current').siblings().removeClass('current')
        }
    });

//  .plist3 li hover

//    $('.plist3 li').hover(function(){
//        $(this).find('.pic').stop(false,true).animate({
//           top:'50px'
//        },200);
//        $(this).find('.tit').stop(false,true).animate({
//            top:'0px'
//        },200);
//    },function(){
//        $(this).find('.pic').stop(false,true).animate({
//            top:'0px'
//        },200);
//        $(this).find('.tit').stop(false,true).animate({
//            top:'-25px'
//        },200);
//    })

//  菜品概览 点击现实更多图片

    if($('a.pro_gl_morepic').length>0){
        $('a.pro_gl_morepic').click(function(){

            var ul = $(this).parents('div.tuku').find('ul').eq(1);
            ul.slideDown(300);

            $('html,body').stop().animate({
                scrollTop : ul.offset().top-130+'px'
            },500);

        });
    }
//  视频分享

    if($('div.shareVcont').length>0){
        $('#bt_showVideoshare').click(function(){
            $('div.shareVcont').slideDown(300)
        })
    }

});

$(function(){
    (function(){

        var scrollAnchor = $('.iscrollAnchor'),
            scrollAnchorNum = scrollAnchor.length,
            scrollPageCount = 0,
            scrollAnchorCount = 0,
            scrolling = false,
            mouseDelta = 0,
            scrollAnchorTop = [],
            duration = 500,
            autoScroll = false,
            scrollNavIndex = -1

            ;


        if(scrollAnchorNum<1) return;


        var scrollPage = $('.scrollpage'),
            scrollNavbox = $(".scrollNavbox"),
            scrollNavboxLi = $(".scrollNavbox li");

        var headerC = $('div.headerC'),
            subNavbox = $('div.subNavbox'),
            headerCTop = headerC.offset().top;

        if(subNavbox.length>0){
            var subNavboxTop = subNavbox.offset().top-71;
        }else{
            var subNavboxTop = 0;
        }


        function scrollFixed(winsTop){

            if(winsTop>=headerCTop){
                headerC.addClass('fixed');
            }else{
                headerC.removeClass('fixed');
            }

            if(!!subNavboxTop){
                if(winsTop>=subNavboxTop){
                    subNavbox.addClass('fixed');
                }else{
                    subNavbox.removeClass('fixed');
                }
            }


        }
        

        if(!!subNavboxTop){
            scrollPage.height($(window).height()-108);
        }else{
            scrollPage.height($(window).height()-71);
        }


        scrollNavboxLi.each(function(i){

            $(this).click(function(){

                if(!!subNavboxTop){
                    var top = scrollPage.eq(i).offset().top-108;
                }else{
                    var top = scrollPage.eq(i).offset().top-71;
                }

                $('html,body').animate({
                    scrollTop : top+'px'
                },500);              
            })


        });

        function scrollNavindex(nav){
            if (nav.hasClass('scrollpage')) {

                if (scrollNavIndex === -1) {
                    scrollNavIndex = 0;
                } else {
                    scrollNavIndex++;
                }

                nav.attr('index', scrollNavIndex);
            }
        }

        function scrollNavChange(index){

//            console.log(index)

            if(!index && index!==0){
                scrollNavbox.hide();
                return;
            }

            // console.log("index:"+index)
            if (scrollAnchor.eq(index).hasClass('scrollpage')) {
                var index = scrollAnchor.eq(index).attr('index') - 0;
                scrollNavbox.show();
                scrollNavboxLi.removeClass('current').eq(index).addClass('current');

            } else {
                scrollNavbox.hide();
            }

        }




        scrollAnchor.each(function(i){

            // if($(this).hasClass('scrollpage')){

            //     if(!!subNavboxTop){
            //         var top = $(this).offset().top-108;
            //     }else{
            //         var top = $(this).offset().top-71;
            //     }

            // }else if($(this).hasClass('subNav')){
            //     var top = $(this).offset().top-71;
            // }else{
            //     if(!!subNavboxTop){
            //         var top = $(this).offset().top-108;
            //     }else{
            //         var top = $(this).offset().top-71;
            //     }
            // }


            if (!!subNavboxTop) {
                var top = $(this).offset().top - 108;
            } else {
                var top = $(this).offset().top-71;
            }

            if ($(this).hasClass('subNav')) {
                var top = $(this).offset().top - 71;
            }
            if ($(this).hasClass('headerCont')) {
                var top = $(this).offset().top;
            }


            scrollAnchorTop.push(top);

            scrollNavindex($(this));

        });

        var winsTop = $(window).scrollTop();
        var winHeight = $(window).height();

        if(scrollAnchorTop[0]<winsTop+winHeight/3){
            autoScroll = true;
        }

        $(window).bind('mousewheel',function(e,delta){
            var winsTop = $(window).scrollTop();
            // console.log(autoScroll)
            mouseDelta = delta;
            if(autoScroll){

            
                


                // console.log(scrollAnchorCount)
                if(scrolling) return false;
                scrolling = true;
                // console.log(scrollAnchorCount)
                if(delta<0){

                    // scroll down
                    // console.log("down::::"+scrollAnchorCount)
                    if(scrollAnchorCount>=scrollAnchorNum){
                        scrollAnchorCount = scrollAnchorNum-1;
                        autoScroll = false;
                        scrolling = false;
                        return false;
                    }

                    var scrolltop = scrollAnchorTop[scrollAnchorCount];

                    // scrollNavChange(scrollAnchorCount)
                    var time = parseInt(( Math.abs(scrolltop-$(window).scrollTop())/800 )*duration)
                    time = time<300 ? 300 : time;
                    if(  Math.abs(scrolltop-$(window).scrollTop())<10  ){
                        time = 0;
                    }


                    $('html,body').stop(false,true).animate({
                        scrollTop : scrolltop+'px'
                    },time,function(){
                        scrolling = false;
                    });


                    scrollAnchorCount++;



                }else{

                    // console.log('up')

                    // scroll up

                    scrollAnchorCount--;

                    if(scrollAnchorCount<0){
                        scrollAnchorCount = 0;
                        autoScroll = false;
                        scrolling = false;
                        return false;
                    }
                    var scrolltop = scrollAnchorTop[scrollAnchorCount];

                    // scrollNavChange(scrollAnchorCount)
                    var time = parseInt(( Math.abs(scrolltop-$(window).scrollTop())/800 )*duration)
                    time = time<300 ? 300 : time;
                    if(  Math.abs(scrolltop-$(window).scrollTop())<10  ){
                        time = 0;
                    }

                    $('html,body').stop(false,true).animate({
                        scrollTop : scrolltop+'px'
                    },time,function(){
                        scrolling = false;
                    });

                }


                return false;
            }else{

                if(delta<0){
                    // console.log(delta)
                    scrollNavChange()
                }


                if(winsTop<scrollAnchorTop[0]){
                    autoScroll = true;
                    scrollAnchorCount = 0;
                }

            }




        });
        var stimers = null;
        $(window).scroll(function(){

            // return;

            clearTimeout(stimers);
            stimers = setTimeout(function(){
                // console.log('scroll')
                var winsTop = $(window).scrollTop();
                var winHeight = $(window).height();
                // console.log(scrollAnchorCount)
                // console.log(autoScroll)

                scrollFixed(winsTop);

                var scrollIndex = 0;

                for(var i=0,len=scrollAnchorTop.length;i<len;i++){

                    if(winsTop>=scrollAnchorTop[i] && winsTop<scrollAnchorTop[i]+scrollAnchor.eq(i).height()){

                        // console.log(scrollAnchorCount+"::::"+i)

                        if(mouseDelta<0){
                            scrollAnchorCount = scrollIndex = i+1;
// console.log('>>>>>>>>>>>'+i)
                            scrollNavChange(i)
                        }else{
                            scrollAnchorCount = scrollIndex = (i===scrollAnchorNum-1 ? i+1 : i);

                            var index = (i===scrollAnchorNum-1 ? i : scrollAnchorCount)
// console.log('<<<<<<<<<<<'+scrollAnchorCount)
                            scrollNavChange(scrollAnchorCount)
                        }

                        if(i<len){
                            autoScroll = true;
                        }else{
                            autoScroll = false;
                        }

                        break;
                    }


                }

            },100)



        });

        
    })();

});

$(function(){

    /* 弹出框 */

    var pop = $('#pop');
    var popbg = $('#popbg');
    var popbox = $('div.popbox');
    var popclose = $('a.popclose');

    popbg.height($(document).height())

    // 显示弹出框，传入弹出框id
    function showPop(id){
        pop.show();
        popbox.hide();

        var _this = $(id);

        var top = (+$(window).height()-_this.height())/2;

        top = top<0 ? 0 : top;

        _this.css({
            top: $(document).scrollTop()+top+'px'
        });

        _this.fadeIn(300);
    }

    popbg.click(function(){
        popbox.hide();
        pop.hide();
        
    });

    popclose.click(function(){
        popbox.hide();
        pop.hide();
        
    });


    // 显示招聘弹出

    $('div.job_list li').click(function(){

        var cont = $(this).find('.job_intro').html();

        $('#showJoinus').find('div.joinusCont').html(cont)

        showPop('#showJoinus');
    });

});

window.onload = function(){

    $('.scrollpage_img img').each(function() {
        $(this).css({
            'float':'left',
            'left':'50%',
            'margin-left':-$(this).width()/2+'px'
        })
    })    
}