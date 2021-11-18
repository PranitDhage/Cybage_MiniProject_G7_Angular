$('document').ready(function () {

    //User Playlist Handling
    let curentLoggedUserId = JSON.parse(sessionStorage.getItem("currentLoggedUser"));

    

    $.get(`http://localhost:3000/songs`, function(data){
        let songs = data.slice();

        $.get(`http://localhost:3000/users/${curentLoggedUserId}`, function(data){

        const userPlaylistSongArr = data.userPlaylist.map((uId)=>{
            const song =songs.find((sObj)=>{
                return sObj["id"] == uId;
            })
            return song;
        })

         //for each iteration for data filling in table
         userPlaylistSongArr.forEach(song => {

            $("#userPlaylistTable > tbody").append("<tr>" +
                "<td>" + song.songName + "</td>" +
                "<td>" + song.language + "</td>" +
                "<td>" + song.artist + "</td>" +
                "<td>" + song.album + "</td>" +
                "<td>" + song.categories + "</td>" +
                "<td>" + song.duration + "</td>" +
                `<td><button id="currentPlayId" onclick='(function(){
                console.log(${song.id});
                sessionStorage.setItem("currentSongId",  ${song.id});
                location.href ="AudioPanel.html";
                })();return false;' class="btn-sm btn-primary">Play</button></td>` +
                +"</tr>"
            );
        });
    })

    })

})