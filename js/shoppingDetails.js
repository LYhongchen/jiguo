var vm=new Vue({
    el:"#box",
    data:{
        dat:dataRequest("data/shoppingDetails.json")
    }
})

//页面导航
$(".clkNav").hover(function(){
    $(this).find("li").css("display","block")
},function(){
    $(this).find("li").css("display","none")
})
$(".clkNav").on("click","li",function(){
    switch($(this).index()){
        case 0:window.location.href='index.html';break;
        case 1:window.location.href='coldplay.html';break;
        case 2:window.location.href='shopping.html';break;
        case 3:window.location.href='FreeTrial.html';break;
        case 4:window.location.href='Presentation.html';break;    
    }
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

$("footer .clkgratis").on('click',function(){window.location.href="gratis.html"})