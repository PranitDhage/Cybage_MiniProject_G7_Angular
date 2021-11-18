$(document).ready(function(){

    $('#userCheck').hide();
    $('#emailCheck').hide();
    $('#numberCheck').hide();
    $('#passCheck').hide();
    $('#conpassCheck').hide();

    var user_err=true;
     var email_error=true;
     var num_error=true;
    var pass_error=true;
    var conpass_error=true;

    //Username validation
    $('#name').keyup(function(){
        username_check();
    });

    function username_check(){
        var user_val=$('#name').val();
        //alert(user_val);
        
        if(user_val.length == ''){
            $('#userCheck').show();
            $('#userCheck').html("**Please Fill the username");
            $('#userCheck').focus();
            $('#userCheck').css("color","red");
            user_err=false;
            return false;
        }else if((user_val.length < 3 ) || (user_val.length > 13)){
            $('#userCheck').show();
            $('#userCheck').html("**username length must be between 3 and 10");
            $('#userCheck').focus();
            $('#userCheck').css("color","red");
            user_err=false;
            return false;
        }else{
            $('#userCheck').hide();
        }
        
 }

//Phone Number validation
    $('#number').keyup(function(){
        number_check();
    });

    function number_check(){
        var num_val=$('#number').val();
        //alert(user_val);
        
        if(num_val.length == ''){
            $('#numberCheck').show();
            $('#numberCheck').html("**Please enter Phone number");
            $('#numberCheck').focus();
            $('#numberCheck').css("color","red");
            num_error=false;
            return false;
        }else if((num_val.length != 10)){
            $('#numberCheck').show();
            $('#numberCheck').html("**Phone number not allowed!");
            $('#numberCheck').focus();
            $('#numberCheck').css("color","red");
            num_error=false;
            return false;
        }else{
            $('#numberCheck').hide();
        }
    }

        

//email validation
     $('#email').keyup(function(){
        email_check();
    });

    function email_check(){
        var email_val=$('#email').val();
        var email_filter=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       // alert(email_val);
        
        if(email_val.length == ''){
            $('#emailCheck').show();
            $('#emailCheck').html("**Please Fill the email");
            $('#emailCheck').focus();
            $('#emailCheck').css("color","red");
            email_error=false;
            return false;
        }else if(email_val.indexOf('@') <= 0 ){
            $('#emailCheck').show();
            $('#emailCheck').html("**Invalid @ position!");
            $('#emailCheck').focus();
            $('#emailCheck').css("color","red");
            email_error=false;
            return false;
        }else if(!(email_filter.test(email_val))){
            $('#emailCheck').show();
            $('#emailCheck').html("**Please enter valid email!");
            $('#emailCheck').focus();
            $('#emailCheck').css("color","red");
            email_error=false;
            return false;
        }else if((email_val.charAt(email_val.length-4) !=  '.' ) && (email_val.charAt(email_val.length-3) !=  '.' ) ){
            $('#emailCheck').show();
            $('#emailCheck').html("**Invalid @ position!");
            $('#emailCheck').focus();
            $('#emailCheck').css("color","red");
            email_error=false;
            return false;
        }else{
            $('#emailCheck').hide();
        }

}

//password validation
 $('#password').keyup(function(){
        password_check();
    });

    function password_check(){
        var pass_val=$('#password').val();
       // alert(pass_val);
        
        if(pass_val.length == ''){
            $('#passCheck').show();
            $('#passCheck').html("**Please Fill the password");
            $('#passCheck').focus();
            $('#passCheck').css("color","red");
            pass_error=false;
            return false;
        }else if((pass_val.length < 3 ) || (pass_val.length > 13)){
            $('#passCheck').show();
            $('#passCheck').html("**password length must be between 3 and 10");
            $('#passCheck').focus();
            $('#passCheck').css("color","red");
            pass_error=false;
            return false;
        }else{
            $('#passCheck').hide();
        }
    }
        
//confirm password validation

    $('#password1').keyup(function(){
        conpassword_check();
    });

    function conpassword_check(){
        var conpass_val=$('#password1').val();
        //alert(conpass_val);
        
        if(conpass_val.length == ''){
            $('#conpassCheck').show();
            $('#conpassCheck').html("**Please Fill the password");
            $('#conpassCheck').focus();
            $('#conpassCheck').css("color","red");
            conpass_error=false;
            return false;
        }else if($("#password").val() != $("#password1").val()){
            $('#conpassCheck').show();
            $('#conpassCheck').html("**Password is not matched!");
            $('#conpassCheck').focus();
            $('#conpassCheck').css("color","red");
            conpass_error=false;
            return false;
        }else{
            $('#conpassCheck').hide();
        }
    }

});