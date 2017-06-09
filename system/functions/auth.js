// Register function

function register(trigger,event){
    event.preventDefault();
    var Form = $(trigger);
    var username = Form.find('input[name=username]');
    var email =    Form.find('input[name=email]');
    var password = Form.find('input[name=password]');
    var formData = {
        'username':         username.val(),
        'email':            email.val(),
        'password':         password.val()
    };
    if(username.val() == null || username.val() == ""){
        console.log("username nedded")
    }else if(email.val() == null || email.val() == ""){
        console.log("email nedded")
    }else if(password.val() == null || password.val() == ""){
        console.log("password nedded")
    }else{
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: 'actions/register.php', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function(res){
                var data = res.status;
                if(data==2000){
                    console.log('true');
                    username.val("");email.val("");password.val("");
                    $('.register_area').removeClass('active');
                    $('.login_area').addClass('active');
                }else{
                    console.log('false');
                }
            }
        });
    }
}

// Login function

function login(trigger,event){
    event.preventDefault();
    var Form = $(trigger);
    var username = Form.find('input[name=username]');
    var password = Form.find('input[name=password]');
    var formData = {
        'username':         username.val(),
        'password':         password.val()
    };
    if(username.val() == null || username.val() == ""){
        console.log("username nedded");
    }else if(password.val() == null || password.val() == ""){
        console.log("password nedded");
    }else{
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: 'actions/login.php', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function(res){
                var data = res.status;
                if(data==2000){
                    console.log('true');
                    window.location.href = 'index.html';
                }else{
                    console.log('false');
                }
            }
        });
    }

}