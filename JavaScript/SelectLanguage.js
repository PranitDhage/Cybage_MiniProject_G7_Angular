$(document).ready(function () {
  $(".language").on("click", function () {
    if ($("#languages").val() == null || $("#languages").val() == "") {
      //If no lanhuage is selected
      alert("Please select atleast one language...!!");
    } else {
      //if languages are selected, store in session storage
      sessionStorage.setItem("languages", $("#languages ").val());
      window.location.href = "../HTML/MusicLibray.html";
    }
  });
});
