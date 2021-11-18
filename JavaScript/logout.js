$('document').ready(function(){
    
    $('#logoutButton').click(function(){
        sessionStorage.clear()
    })
    
        let loggedUserId = JSON.parse(sessionStorage.getItem("currentLoggedUser"));

        $('#loginButton').hide();
        $('#logoutButton').hide();
        
        if(loggedUserId == null || loggedUserId == ''){
            $('#loginButton').show();
            $('#logoutButton').hide();
        }else{
            $('#loginButton').hide();
            $('#logoutButton').show();
        }
     
})