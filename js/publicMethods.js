
function dataRequest(u) {
    var a=null;
    $.ajax({
        url: u,
        async:false,  
        success(res) {
            a=res;
        },
        error(err){
            a=-1;
        }
    })
    return a;
}