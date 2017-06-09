//Add task
function addTask(trigger, event) {
    event.preventDefault();
    var Form = $(trigger);
    var task_title = Form.find('input[name=task_title]');
    var schedule_date = Form.find('input[name=task_date]');
    var formData = {
        'task_title': task_title.val(),
        'schedule_date': schedule_date.val()
    };
    if (task_title.val() == null || task_title.val() == "") {
        console.log("task title nedded");
    } else if (schedule_date.val() == null || schedule_date.val() == "") {
        console.log("schedule date nedded");
    } else {
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: 'actions/add_task.php', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function (res) {
                var data = res.status;
                if (data == 2000) {
                    $('.task_list').html("");
                    all_tasks(event);
                    console.log('true');
                    task_title.val("");
                    schedule_date.val("");
                    $('.welcome_area').removeClass('active');
                    $('.add_task_area').removeClass('active');
                    $('.task_list_area').addClass('active');

                } else {
                    console.log('false');
                }
            }
        });
    }

}
//Calling task list
function all_tasks(event) {
    event.preventDefault();
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'actions/full_ task_list.php', // the url where we want to POST
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (res) {
            $.each(res, function (i, v) {
                console.log(v);
                $('.welcome_area').removeClass('active');
                $('.task_list_area').addClass('active');
                if (v.status == 0) {
                    var task = '<div class="task"> ' +
                        '<div class="task_info"> ' +
                        '<div class="task_title">' + v.task_title + '</div> ' +
                        '<div class="task_date">' + v.schedule_date + '</div> ' +
                        '<a href="" data-id="' + v.id + '" onclick="openEditor(this, event)" class="task_edit_btn"><i ' +
                        'class="fa fa-pencil" aria-hidden="true"></i></a> ' +
                        '<a href="" data-id="' + v.id + '" onclick="deleteTask(this, event)" class="task_delete_btn"><i ' +
                        'class="fa fa-trash" aria-hidden="true"></i></a> ' +
                        '</div> ' +
                        '<div class="task_status"> ' +
                        '<a href="" data-id="' + v.id + '" onclick="updateStatus(this, event)" class="task_status_btn"><i ' +
                        'class="fa fa-circle-o" aria-hidden="true"></i></a> ' +
                        '</div> ' +
                        '</div>';
                    $('.task_list').append(task);
                } else {
                    var task = '<div class="task"> ' +
                        '<div class="task_info"> ' +
                        '<div class="task_title">' + v.task_title + '</div> ' +
                        '<div class="task_date">' + v.schedule_date + '</div> ' +
                        '</div> ' +
                        '<div class="task_status"> ' +
                        '<a href="" data-id="' + v.id + '" onclick="updateStatus(this, event)" class="complated task_status_btn"><i class="fa fa-check-circle" aria-hidden="true"></i></a> ' +
                        '</div> ' +
                        '</div>';
                    $('.task_list').append(task);
                }
            });
        }
    });
}
//Count Task
function count_task() {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'actions/count_task.php', // the url where we want to POST
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (res) {
            console.log(res);
            $('.completed_num').html(res.Completed_task);
            $('.total_num').html(res.total_task);
        }
    });
}
$(document).ready(function () {
    count_task();
});
//Delete Task
function deleteTask(trigger, event) {
    event.preventDefault();
    var trigger = $(trigger);
    var task_id = trigger.attr("data-id");
    var formData = {
        'task_id': task_id
    };
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'actions/deleteTask.php', // the url where we want to POST
        data: formData, // our data object
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (res) {
            var data = res.status;
            if (data == 2000) {
                console.log('true');
                trigger.parents('.task').remove();
            } else {
                console.log('false');
            }
        }
    });

}
//Edit Task
function editTask(trigger, event) {
    event.preventDefault();
    var Form = $(trigger);
    var task_title = Form.find('input[name=task_title]');
    var schedule_date = Form.find('input[name=task_date]');
    var task_id = Form.find('input[name=task_id]');
    var formData = {
        'task_title': task_title.val(),
        'schedule_date': schedule_date.val(),
        'task_id': task_id.val()
    };
    console.log(formData);
    if (task_title.val() == null || task_title.val() == "") {
        console.log("task title nedded");
    } else if (schedule_date.val() == null || schedule_date.val() == "") {
        console.log("schedule date nedded");
    } else {
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: 'actions/edit_task.php', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function (res) {
                var data = res.status;
                if (data == 2000) {
                    $('.task_list').html("");
                    all_tasks(event);
                    console.log('true');
                    task_title.val("");
                    schedule_date.val("");
                    $('.welcome_area').removeClass('active');
                    $('.add_task_area').removeClass('active');
                    $('.edit_task_area').removeClass('active');
                    $('.task_list_area').addClass('active');

                } else {
                    console.log('false');
                }
            }
        });
    }

}
//Logout
function logout(event) {
    event.preventDefault();
    var logout = 'logout';
    $.ajax({
        type: 'POST',
        url: 'actions/logout.php',
        data: logout,
        dataType: 'JSON',
        encode: true,
        success: function (res) {
            window.location.href = 'auth.html';
        }
    });
}
//Open sector
function open_task_creator(event) {
    event.preventDefault();
    $('.welcome_area').removeClass('active');
    $('.task_list_area').removeClass('active');
    $('.add_task_area').addClass('active');
}

function openEditor(trigger, event) {
    event.preventDefault();
    var trigger = $(trigger);
    var task_id = trigger.attr("data-id");
    var task_title = trigger.parents('.task_info').find('.task_title').html();
    var task_date = trigger.parents('.task_info').find('.task_date').html();
    var editor = $('.edit_task_area');
    var formData = {
        'task_id': task_id,
        'task_title': task_title,
        'task_date': task_date
    };
    $('.welcome_area').removeClass('active');
    $('.add_task_area').removeClass('active');
    $('.task_list_area').removeClass('active');
    editor.addClass('active');
    editor.find('.edit_task_form').find('input[name=task_title]').focus();
    editor.find('.edit_task_form').find('input[name=task_title]').val(task_title);
    editor.find('.edit_task_form').find('input[name=task_date]').val(task_date);
    editor.find('.edit_task_form').find('input[name=task_id]').val(task_id);

}

function return_home(event) {
    event.preventDefault();
    $('.task_list').html("");
    count_task();
    $('.add_task_area').removeClass('active');
    $('.task_list_area').removeClass('active');
    $('.edit_task_area').removeClass('active');
    $('.welcome_area').addClass('active');
}
//Search
function search(trigger, event) {
    event.preventDefault();
    var form = $(trigger);
    var task_date = form.find('input[name=task_date]');
    var formData = {
        'task_date': task_date.val()
    };
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'actions/search.php', // the url where we want to POST
        data: formData, // our data object
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (res) {
            $('.task_list').html("");
            $.each(res, function (i, v) {
                console.log(v);
                $('.welcome_area').removeClass('active');
                $('.task_list_area').addClass('active');
                if (v.status == 0) {
                    var task = '<div class="task"> ' +
                        '<div class="task_info"> ' +
                        '<div class="task_title">' + v.task_title + '</div> ' +
                        '<div class="task_date">' + v.schedule_date + '</div> ' +
                        '<a href="" data-id="' + v.id + '" onclick="openEditor(this, event)" class="task_edit_btn"><i class="fa fa-pencil" aria-hidden="true"></i></a> ' +
                        '</div> ' +
                        '<div class="task_status"> ' +
                        '<a href="" data-id="' + v.id + '" onclick="updateStatus(this, event)" class="task_status_btn"><i class="fa fa-circle-o" aria-hidden="true"></i></a> ' +
                        '</div> ' +
                        '</div>';
                    $('.task_list').append(task);
                } else {
                    var task = '<div class="task"> ' +
                        '<div class="task_info"> ' +
                        '<div class="task_title">' + v.task_title + '</div> ' +
                        '<div class="task_date">' + v.schedule_date + '</div> ' +
                        '</div> ' +
                        '<div class="task_status"> ' +
                        '<a href="" data-id="' + v.id + '" onclick="updateStatus(this, event)" class="complated task_status_btn"><i class="fa fa-check-circle" aria-hidden="true"></i></a> ' +
                        '</div> ' +
                        '</div>';
                    $('.task_list').append(task);
                }
            });
        }
    });
}

//Update Status
function updateStatus(trigger, event) {
    event.preventDefault();
    var trigger = $(trigger);
    var task_id = trigger.attr("data-id");
    var formData = {
        'task_id': task_id
    };
    console.log(task_id);
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'actions/update_status.php', // the url where we want to POST
        data: formData, // our data object
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (res) {
            console.log(res);
            var data = res.status;
            if (data == 2000) {
                trigger.find('i').removeClass('fa-circle-o');
                trigger.find('i').addClass('fa-check-circle');
                trigger.parents('.task').find('.task_info').find('a').remove();
                trigger.css({'pointer-events': 'none', 'cursor': 'default'});
            } else {
                console.log('false');
            }
        }
    });

}

function updated(event) {
    event.preventDefault();
}

//Update welcome status
function update() {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'actions/update_welcome.php', // the url where we want to POST
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (res) {
            console.log(res);
            $('#current_username').html(res.username);
            $('#current_date').html(res.current_date);
        }
    });
}
$(document).ready(function () {
    update();
});





