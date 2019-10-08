var NewsContainer = {
    template: "#showCnt",
    data() {
        return { data: dataRequest('data/coldplay.json') }
    }
}
var NewsContainerHot = {
    template: "#showCnt",
    data() {
        return { data: dataRequest('data/coldplayHot.json') }
    }
}
var CategoryContainer = {
    template: "#categoryCnt",
    data() {
        return { dat: dataRequest('data/coldplayCategory.json') }
    }
}
var arr = [
    { path: "/new", component: NewsContainer },
    { path: "/hot", component: NewsContainerHot },
    { path: "/category", component: CategoryContainer }
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
            },
            {
                name: 'category',
                title: "品类"
            }
        ]
    },
    beforeCreate() { this.$router.push("/new") },
    router
})

//事件
$("#app>.contener .nav").on("click", "li", function () {
    $(this).find("a").addClass("active").end().siblings().find("a").removeClass("active");
})

$("#app").on("click","#mostNew .more", function () {
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
        case 0:window.location.href='index.html';break;
        case 1:break;
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