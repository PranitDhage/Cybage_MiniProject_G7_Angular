$(function(){
    var $loginForm=$('#login');
    $.validator.addMethod("noSpace", function(value, element){
        return value == '' || value.trim().length != 0
    }, "Spaces are not allowed!");
    
    if($loginForm.length){
        $loginForm.validate({
            rules:{
                
                email:{
                    required:true,
                    email:true
                    },
                   
                password:{
                        required:true,
                        noSpace:true
                          }
                   
            },
            messages:{
               
                email:{
                    required:'Email is mandatory!',
                    required:'Please enter valid email!'
                },
                
                password:{
                    required:'Password  is mandatory!'
                },
                
            }
        })
    }
})

