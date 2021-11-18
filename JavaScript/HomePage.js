$(document).ready(function(){
  $('#title').click(function() {
    location.reload();
});
})

$(document).ready(function() {
  $("[href]").each(function() {
      if (this.href == window.location.href) {
          $(this).addClass("active");
          $(this).css("color","lightgreen");
      }
  });
});
