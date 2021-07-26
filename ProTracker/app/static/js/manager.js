document.addEventListener('DOMContentLoaded', function () {
    var refresher = setInterval(checkStatus, 2000);
})

let name = "name";

function submitTasks(obj) {
    var value = document.getElementById('task').value;
    var obj = name
    var ajaxRequest = new XMLHttpRequest();

    ajaxRequest.open("GET", "assigntask/" + obj + "/" + value, true);
    ajaxRequest.send()
}

function empname(obj) {

    name = obj


}

function alltask() {
    var ajaxRequest = new XMLHttpRequest();

    ajaxRequest.open("GET", "activetask/" + name, true);
    ajaxRequest.send()


}


function viewTasks(username) {
    $('#modal-' + username).modal();
    $('#myModal').modal('handleUpdate')
}

function checkStatus() {

    $.get(
        window.location.href + "/activetask",
        function (data) {
            data_list = Object.entries(data);
            for (let user = 0; user < data_list.length; user++) {
                console.log(data_list[user]);
                console.log();
                var username = data_list[user][0];
                var task_array = data_list[user][1]

                document.querySelector("#active-tasks-" + username).innerHTML = "";
                document.querySelector("#completed-tasks-" + username).innerHTML = "";

                for (let tasks = 0; tasks < task_array.length; tasks++) {

                    var newTask = document.createElement("div");
                    newTask.setAttribute("class", "todo-item");
                    var currentTask = document.createElement("span");
                    currentTask.innerHTML = task_array[tasks][0];
                    newTask.appendChild(currentTask);
                    if (task_array[tasks][1]) {
                        document.querySelector("#completed-tasks-" + data_list[user][0]).appendChild(newTask);

                    } else {
                        document.querySelector("#active-tasks-" + data_list[user][0]).appendChild(newTask);
                    }

                }
            }

        }
    )

}




$(document).ready(function () {

    "use strict";

    var todo = function () {
        $('.todo-list .todo-item input').click(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().parent().toggleClass('complete');
            } else {
                $(this).parent().parent().parent().toggleClass('complete');
            }
        });

        $('.todo-nav .all-task').click(function () {
            $('.todo-list').removeClass('only-active');
            $('.todo-list').removeClass('only-complete');
            $('.todo-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('.todo-nav .active-task').click(function () {
            $('.todo-list').removeClass('only-complete');
            $('.todo-list').addClass('only-active');
            $('.todo-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('.todo-nav .completed-task').click(function () {
            $('.todo-list').removeClass('only-active');
            $('.todo-list').addClass('only-complete');
            $('.todo-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('#uniform-all-complete input').click(function () {
            if ($(this).is(':checked')) {
                $('.todo-item .checker span:not(.checked) input').click();
            } else {
                $('.todo-item .checker span.checked input').click();
            }
        });

        $('.remove-todo-item').click(function () {
            $(this).parent().remove();
        });
    };

    todo();

    $(".add-task").keypress(function (e) {
        if ((e.which == 13) && (!$(this).val().length == 0)) {
            $('<div class="todo-item"><div class="checker"><span class=""><input type="checkbox"></span></div> <span>' + $(this).val() + '</span> <a href="javascript:void(0);" class="float-right remove-todo-item"><i class="icon-close"></i></a></div>').insertAfter('.todo-list .todo-item:last-child');
            $(this).val('');
        } else if (e.which == 13) {
            alert('Please enter new task');
        }
        $(document).on('.todo-list .todo-item.added input').click(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().parent().toggleClass('complete');
            } else {
                $(this).parent().parent().parent().toggleClass('complete');
            }
        });
        $('.todo-list .todo-item.added .remove-todo-item').click(function () {
            $(this).parent().remove();
        });
    });
});