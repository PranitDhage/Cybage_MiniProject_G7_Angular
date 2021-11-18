$('document').ready(function () {

    //default password update form hidden
    $("#userPasswordUpdate").hide();

    //filling userdata into Html
    let curentLoggedUserId = JSON.parse(sessionStorage.getItem("currentLoggedUser"));
    const dataFiller = function (id) {
        $.get(`http://localhost:3000/users/${id}`, function (data) {
            currentUser = data

            //adding userName
            $('#userNameId').append(currentUser.userName);

            //adding userEmail
            $('#userEmailId').append(currentUser.email);

            //adding userPhone
            $('#userPhoneId').append(currentUser.phone);

            //adding image
            if (sessionStorage.getItem("recent-image") === null) {
                $('#userAvatar').attr("src", currentUser.image);
            }
        })
    }

    //calling datafiller function
    dataFiller(curentLoggedUserId);

    //uploaded image handling
    $("#userAvatarInput").change(function () {
        const reader = new FileReader();

        reader.addEventListener("load", (e) => {
            var image = new Image();
            image.src = e.target.result;

            image.addEventListener("load", function () {
                var height = this.height;
                var width = this.width;

                if (height > 250 || width > 250) {
                    alert("Height and Width must not exceed 250px")
                    return false;
                }

                alert("Uploaded image has valid height and width")
                sessionStorage.setItem("recent-image", reader.result);
                return true;
            })
        })
        reader.readAsDataURL(this.files[0]);
    })

    const recentImageDataUrl = sessionStorage.getItem("recent-image");

    if (recentImageDataUrl) {
        document.querySelector('#userAvatar').setAttribute("src", recentImageDataUrl);
    }

    //playlist button click event
    $("#playlistButton").click(function () {
        window.location.href="/HTML/userPlaylist.html"
    })
    
    //update password functionality
    $("#updatePwdButtonId").click(function (event) {
        event.preventDefault();

        let oldPwd = $("#inputPasswordOld").val();
        let newPwd = $("#inputPasswordNew").val();
        let newConfirmPwd = $("#inputPasswordNewVerify").val();

        if (oldPwd != '' && newPwd != '' && newConfirmPwd != '') {

            if (newPwd === newConfirmPwd) {

                $.get(`http://localhost:3000/credentials/${curentLoggedUserId}`, function (data) {
                    currentUserCredentials = data;

                    if (currentUserCredentials.password === oldPwd) {
                        currentUserCredentials.password = newPwd;

                        $.ajax({
                            type: 'PUT',
                            url: `http://localhost:3000/credentials/${curentLoggedUserId}`,
                            data: currentUserCredentials,
                            success: function (data, textStatus, jqXHR) {
                                alert('Password Updated');
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Password Updatation failed');
                            }
                        })

                    } else {
                        alert("Current Password didnt match")
                    }
                })
            } else {
                alert("New Password and confirm password doesn't match");
            }

        } else {
            alert("fiels can not be empty");
        }
    })

     //upadte password button click event
     $('#updatePasswordButton').click(function () {
        $("#userProfileContainer").hide();
        $("#userPasswordUpdate").show();
    })

})