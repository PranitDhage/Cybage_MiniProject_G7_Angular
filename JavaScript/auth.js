$(document).ready(function() {
    $("#submit").click((e) => {
        e.preventDefault();
       // alert("get request");
        var email = $("#email").val();
        var password = $("#password").val();
       
        

        $.ajax({
            url: "http://localhost:3000/credentials",
            method:"GET",
            success:(response) => {
                // alert("Hello");
                // alert(response);
                let flag=false;
                for(var i=0;i<response.length;i++){
                    if(email===response[i].email && password === response[i].password){
                        flag=true;
                        sessionStorage.setItem('currentLoggedUser',JSON.stringify(response[i]['id']));
                        // sessionStorage.setItem('credentials',JSON.stringify(response[i]));
                    }
                }
                if(!flag){
                    alert("Invalid user or password");
                }
                else {
                    // Following lines of code execute only when Successful login
                    // location.reload(false);
                    window.location.href="/HTML/selectLanguage.html"
                    alert('Logged in successfully!');
                }
            },
        });
    });
})