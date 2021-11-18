$(document).ready(function () {
    
    // -------------------
    // Songs filtered by user languages
    // -------------------
    $.get("http://localhost:3000/songs", function (data) {

       let songs = [];
       let cardHtml = "";
       // user has selected lanugages in the previous page
       // we fetch user selected languages from sessionStorage
       let languages = sessionStorage.getItem("languages").toString();
       languages = languages.split(",");

        // Iterates over each song in db.json
       for (let i = 0; i < data.length; i++) {
    
            // Iterates over the languages selected by user
            for (let j = 0; j < languages.length; j++) {
                // converting from lower to Capitalize
                // eg "english" to "English"
                let lang = languages[j];
                lang = lang.charAt(0).toUpperCase() + lang.slice(1)

                if (data[i]['language'] === lang) {
                    let songID = data[i]['id'];
                    let songName = data[i]['songName'];
                    songs.push(data[i]['songName']); // appends songname to array    
                    // cardHtml is appednded to create new card per song
                    cardHtml += '<div class="card bg-warning"> ' +
                        '<div class="row no-gutters">' +
                            '<div class="col">' +
                            '<p class="card-text text-center mt-1">' +
                                songName + //edit this line for fetching proper song name
                            '</p>' +
                            '</div>' +  
                            '<div class="col-2">' +
                            // --- Use this when trying to link to audio player -start
                            // `<button id="currentPlayId" onclick='(function(){console.log(${songID});
                            // var currentSongObject = {"id": ${songID}, "userProfileFlag": true}
                            // console.log(currentSongObject);
                            // sessionStorage.setItem("currentSongId", currentSongObject);
                            // location.href ="AudioPanel.html";
                            // })();return false;' class="btn btn-primary">Play</button>`
                            // --- Use this when trying to link to audio player -end

                            '<a href=' + 

                            // Various options for where the play takes the user - start
                            // '"#"' +                 // switch to this for a blank link
                            // `"${data[i]['path']}"` +  //have to give link acc to searched song 
                            '"../HTML/AudioPanel.html" ' +
                            // Various options for where the play takes the user - end

                            'onclick="return storeSongID(' + songID + ')" ' +
                            'class="btn btn-primary w-100">' + 
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg></a>' +
                            '</div>' +  
                        '</div>' +
                    '</div>';
                }
            }
       }
       $('.song-display-list').html(cardHtml);
    });

   
    // onclick="return ()=> { 
    //     sessionStorage.setItem("currentSongId", 2); 
    // };" 

    // ------------------- 
    // Search funtionality 
    // -------------------
    $('nav form button').click( function (e) {
        e.preventDefault(); // So that submit doesn't refersh the page
        
        // getting input value and resetting the input element
        const songName = $('nav form input').val(); 
        let songID = -1;
        $('nav form input').val("") ;

        // displays song that was searched for, if not found throws alert
        $.get("http://localhost:3000/songs", function (data) {

            // checking is song in database
            flag = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i]['songName'] === songName) {
                    flag = true;
                    songID = data[i]['id'];
                }
            }

            if (flag) {
                const oneCard = '<div class="card bg-warning"> ' +
                    '<div class="row no-gutters">' +
                        '<div class="col">' +
                        '<p class="card-text text-center mt-1">' +
                            songName + //edit this line for fetching proper song name
                        '</p>' +
                        '</div>' +  
                        '<div class="col-2">' +
                        '<a href=' + 

                        // Various options for where the play takes the user - start
                        // '"#"' +                 // switch to this for a blank link
                        // `"${data[i]['path']}"` +  //have to give link acc to searched song 
                        '"../HTML/AudioPanel.html"' +
                        // Various options for where the play takes the user - end

                        'onclick="return storeSongID(' + songID + ')" ' +
                        'class="btn btn-primary w-100">' + 
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg></a>' +
                        '</div>' +  
                    '</div>' +
                '</div>';

            // Display the song card
            $('.song-display-list').html(oneCard);
            }
            else {
                window.alert("Please enter valid song name");
            }
        });
    });
});

// this function directs to audio player at specific song
let storeSongID = function (songID) {
    sessionStorage.setItem("currentSongId", songID);
    return true;
}