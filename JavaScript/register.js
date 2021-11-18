$(document).ready(function() {
    
    $("#submit").click((e)=>{
        e.preventDefault();
        var name=$("#name").val();
        var email=$("#email").val();
        var number=$("#number").val();
        var password=$("#password").val();
        var conpassword=$("#password1").val();
        console.log(name);
        console.log(email);
        console.log(number);
        console.log(password);
        console.log(conpassword);

        
        


        // gets latest id 
        // increments by 1 
        // adds new user with newID
        $.get("http://localhost:3000/users", function (data) {

                // get id of previous user and increment
                let prevID = Number(data[data.length - 1]['id']);
                prevID = prevID + 1;
                let userPlaylist = [
                    "1",
                    "3",
                    "5",
                    "8"
                ]

                // post new user to db.json in "users"
                $.ajax({
                    url: "http://localhost:3000/users",
                    method:"POST",
                    dataType: "json",
                    data: {
                        id: prevID,
                        userName: name,
                        email: email,
                        phone: number,
                        image: "",
                        userPlaylist: userPlaylist
                    },
                    success:(response)=>{
                        console.log("response : " +  response);
                        console.log(response);
                        location.reload(false);

                        // TODO: add functionality tp goto login page after successful registeration
                        window.location.href="/HTML/loginForm.html"; 
                        alert("Registeration successful! You can now log in.");
                    },
                    error: function () {
                        alert('Error in ajax post');
                    }
                });

                // post new user to db.json in "credentials"
                $.ajax({
                    url: "http://localhost:3000/credentials",
                    method:"POST",
                    dataType: "json",
                    data: {
                        id: prevID,
                        email: email,
                        password: password
                    },
                    success:(response)=>{
                        console.log("data successfully added to credentials");
                        // TODO: add functionality tp goto login page after successful registeration
                        // window.location.href="/HTML/loginForm.html"; 
                    },
                    error: function () {
                        alert('Error in ajax post');
                    }
                });
        });
    });
});

