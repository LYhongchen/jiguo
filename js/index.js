var vm = new Vue({
    el: "#box",
    data: {
        data: dataRequest('data/index.json')
    }
})

//事件
//方法封装
function ScrollPic(option) {
    //创建配置项目
    var defaultOption = {
        time:1000,
        num:4
    }
    //合并对象，true表示深度合并
    $.extend(true, defaultOption, option);
    //创建执行变量
    var isrun = true;
    //通过innerWidth()；方法获取元素的宽高（包含内外边距边框和元素本身）
    var li_wid = $(defaultOption.child).innerWidth();
    //右点击
    //实现思路，通过改变ul的左边距，并将元素放在最后的方式，实现持续切换
    $(defaultOption.right).on("click", function () {
        //通过判定isrun变量来控制，执行的频率，解决一直点击出现的bug
        if (isrun) {
            isrun = false;
            $(defaultOption.parent).animate({
                //设置ul的左外边距
                // "margin-left": -li_wid * defaultOption.num+90
                "margin-left": -li_wid-41
            }, 1000, function () {
                $(defaultOption.parent).css("marginLeft", "0px");
                //截取前几个li元素并添加到后面
                // $(defaultOption.child).slice(0, defaultOption.num).appendTo($(defaultOption.parent));
                $(defaultOption.child).slice(0, 1).appendTo($(defaultOption.parent));
                isrun = true;
            })
        }
    })
    //左点击
    $(defaultOption.left).on("click", function () {
        //判断执行参数为真的时候才能进入切换
        if (isrun) {
            isrun = false;
            //先将后面的元素截取到前面来
            // $(defaultOption.child).slice(-defaultOption.num).prependTo($(defaultOption.parent));
            $(defaultOption.child).slice(-1).prependTo($(defaultOption.parent));
            //调整左外边
            // $(defaultOption.parent).css("marginLeft", -li_wid * defaultOption.num);
            $(defaultOption.parent).css("marginLeft", -li_wid-41);
            $(defaultOption.parent).animate({
                //将左外边距拉回，实现动画
                "marginLeft": "0px"
                //marginLeft:0    等价写法
                //在函数执行完成后，再将执行再修改执行参数
            }, 1000, function () { isrun = true; })
        }
    })
}
//方法调用
ScrollPic({ parent: "#bottom>.hotProbation .cont>div", child: "#bottom>.hotProbation .cont>div>div", left: "#bottom>.hotProbation  .btnLeft", right: "#bottom>.hotProbation .btnRight" });
/* 热门试用 */
$(".hotProbationAnimt").on("click",function(){
    window.open('./FreeTrial.html');
})
/* 报告精选 */
$("#bottom .presentationSelected .contener .title p").on("click",function(){
    window.open("./Presentation.html");
})
/* 导购精选 */
$("#bottom .ShoppingSelected .contener .title p").on("click",function(){
    window.open("./Shopping.html");
})
$("#bottom .ShoppingSelected .contener .cont div .ShoppingSelectedAnimat").on("click",function(){
    window.open("./shoppingDetails.html");
})
/* 发现酷玩 */
$("#bottom .findColdplay .contener .title p").on("click",function(){
    window.open("./coldplay.html");
})
/* 发现更多 */
$("#bottom .more").on("click", function () {
    $(this).find("a").css("background-image", "url(../img/img/loading-icon.gif)");
    setTimeout(() => {
        $(this).siblings(":hidden").show();
        $(this).find("a").css("background-image", "url(../img/img/more.png)").text("没有更多内容了！");
    }, 300);
})
//页面导航
$(".clkNav").hover(function(){
    $(this).find("li").css("display","block")
},function(){
    $(this).find("li").css("display","none")
})
$(".clkNav").on("click","li",function(){
    switch($(this).index()){
        case 0:break;
        case 1:window.location.href='coldplay.html';break;
        case 2:window.location.href='shopping.html';break;
        case 3:window.location.href='FreeTrial.html';break;
        case 4:window.location.href='Presentation.html';break;    
    }
})

//滚动事件
$(window).scroll(function(e){
    var ph=document.documentElement.clientHeight;
    var scltop=document.documentElement.scrollTop||document.body.scrollTop;
    // console.log(document.documentElement.scrollTop||document.body.scrollTop,ph);
    scltop>150?$("#goTop").css("display","block"):$("#goTop").css("display","none");
    $("#goTop").css("top",ph-100+scltop);
    $("#share").css("top",scltop+20)
})

$("#goTop").on("click",function(){
    document.documentElement.scrollTop=document.body.scrollTop=0;
})

//跳转登录页面
$("#box header iframe").on("click",function(e){
    var e=e||window.Event;
    console.log(1,e.offsetX)
})

//验证登录关闭
$("header .clkLogin").on("click",function(e){
    var e=e||window.Event;
    if((e.target.className).indexOf("loginret")!=-1){
        window.location.href="login.html";
    }else{
        window.localStorage.setItem('loginStatus',true);
        $("header .clkLogin").removeClass("logingray").addClass("loginret").text('登录');
    }
})
status();
window.addEventListener("storage",function(){status();},false)

function status(){
    if(window.localStorage.getItem("loginStatus")=="true"){
        $("header .clkLogin").removeClass("logingray").addClass("loginret").text('登录');
    }else{
        $("header .clkLogin").removeClass("loginret").addClass("logingray").text('退出');
    } 
}

// $ ("footer .clkgratis").on('click',function(){window.location.href="gratis.html"})