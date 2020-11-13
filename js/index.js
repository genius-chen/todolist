$(function(){
    load();
    //存储事件
    $('#title').on("keydown",function(e){
        if(e.keyCode === 13){
            if($(this).val() == "")
            {
                alert("请输入你要的操作")
            }else {
                var local = getData();
                local.push({ title: $(this).val(), done:false });
                saveData(local);
                load();
                $(this).val("");
            }
        }
    });

    //读取本地存储数据函数
    function getData(){
        var data = localStorage.getItem("todolist");
        if(data !== null) {
            return JSON.parse(data);
        }else {
            return [];
        }
    }

    //保存本地数据函数
    function saveData(data) {
        localStorage.setItem("todolist",JSON.stringify(data));
    }

    //渲染加载函数 
    function load() {
         var data = getData();
         var todoCount = 0;
         var doneCount = 0;
         $("ol,ul").empty();
         $.each(data,function(i,n){
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }
         })
         $("#todocount").text(todoCount);
         $("#donecount").text(doneCount);
    }
    //删除事件
    $("ol,ul").on("click","a",function(){
        var data = getData();
        var index = $(this).attr("id");//获取点击序号
        data.splice(index,1);
        saveData(data);
        load();
    });

    //复选框
    $("ol,ul").on("click","input",function(){
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");//修改数据
        saveData(data);
        load();
    })
})