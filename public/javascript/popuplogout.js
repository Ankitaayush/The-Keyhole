
        function togglePopup() {
  let text = "Are you sure you wanna Logout ?";
  if (confirm(text) == true) {
    text = "You pressed OK!";
    window.location.href="homepage.ejs";
  } else {
    text = "You canceled!";
  }
  document.getElementById("demo").innerHTML = text;
}
