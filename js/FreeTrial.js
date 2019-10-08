//------------------------------------2级路由-----------------------------
//大众试用
var arrPublic = [
    { path: 'all', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial.json'), fly: true } } } },
    { path: 'apply', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial1.json'), fly: false } } } },
    { path: 'trial', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial2.json'), fly: false } } } },
    { path: 'end', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial3.json'), fly: true } } } },
    { path: '', redirect: 'all' }
];
//体验师专享
var experienceSlCont = [
    { path: 'all', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial.json'), fly: true } } } },
    { path: 'apply', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial.json'), fly: true } } } },
    { path: 'trial', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial.json'), fly: true } } } },
    { path: 'end', component: { template: "#showCnt", data() { return { data: dataRequest('data/FreeTrial.json'), fly: true } } } },
    { path: '', redirect: 'all' }
]
//--------------------------------------1级路由-----------------------------
var arr = [
    { path: "/publicApply", component: { template: "#twoNav", data() { return { id: "publicApply" } } }, children: arrPublic },
    { path: "/experienceSpecial", component: { template: "#twoNav", data() { return { id: "experienceSpecial" } } }, children: experienceSlCont }
]

var router = new VueRouter({ routes: arr })

var vm = new Vue({
    el: "#box",
    data: {
        dat: [
            {
                name: 'publicApply',
                title: "大众试用"
            },
            {
                name: 'experienceSpecial',
                title: "体验师专享"
            }
        ]
    },
    beforeCreate() { this.$router.push("/publicApply") },
    router
})

    //事件
    //控制一级标签
    $("#app>.contener .nav").on("click", "li", function () {
        $(this).find("a").addClass("active").end().siblings().find("a").removeClass("active");
    })
    //控制按钮
    $("#app").on("click", function (e) {
        var e=e||window.event;
        //控制显示更多
        if ((e.target.parentNode.className).indexOf("tru") != -1) {
            $(e.target.parentNode).find("a").css("background-image", "url(../img/img/loading-icon.gif)");
            $(e.target.parentNode).removeClass("tru").addClass("fls");
            setTimeout(() => {
                $(e.target.parentNode).siblings(":hidden").show();
                $(e.target.parentNode).find("a").css("background-image", "none").text("没有更多内容了！");
            }, 300);
        //控制二级标签
        }else if((e.target.parentNode.parentNode.className).indexOf("nav")!=-1){
            $(e.target).addClass("active").siblings().removeClass("active");
        //控制跳转
        }else if((e.target.className).indexOf("Animt")!=-1){
            window.open('./FreeTrialDetails.html');
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
        case 3:break;
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