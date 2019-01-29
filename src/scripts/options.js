var textarea = document.getElementById("profile");
textarea.addEventListener('blur', function (event) {
    var value = event.target.value;
    localStorage.setItem("profiles", value);
});