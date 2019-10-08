var NewsContainer = {
    template: "#showCnt",
    data() {
        return { data: dataRequest('data/shopping.json') }
    }
}
var NewsContainerHot = {
    template: "#showCnt",
    data() {
        return { data: dataRequest('data/shoppingHot.json') }
    }
}
var arr = [
    { path: "/new", component: NewsContainer },
    { path: "/hot", component: NewsContainerHot }
]

var router = new VueRouter({ routes: arr })

var vm = new Vue({
    el: "#box",
    data: {
        dat: [
            {
                name: 'new',
                title: "最新"
            },
            {
                name: 'hot',
                title: "最热"
            }
        ]
    },
    beforeCreate() { this.$router.push("/new") },
    router
})

//事件
function detailsPage(e) {
    var e = e || window.event;
    if (e.target.className == "more" || e.target.className == "more_child") {
        var thr = "#mostNew>.more";
        $(thr).find("a").css("background-image", "url(../img/img/loading-icon.gif)");
        setTimeout(() => {
            $(thr).siblings(":hidden").show();
            $(thr).find("a").css("background-image", "url(../img/img/more.png)").text("没有更多内容了！");
        }, 300);
    }else if((e.target.className).indexOf("active")!=-1){
        $(e.target.parentNode).find("a").addClass("active").end().siblings().find("a").removeClass("active");
    } else if((e.target.className).indexOf("ShoppingAnimt")!=-1){
        window.open('./shoppingDetails.html');
    }
}
$("#app").on("click", detailsPage)

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
        case 2:;break;
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