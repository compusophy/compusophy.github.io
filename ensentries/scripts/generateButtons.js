// generateButtons.js
document.addEventListener("DOMContentLoaded", function() {
  var buttonsConfig = [
    { label: "collectors", link: "/collectors/" },
    { label: "entries", link: "/entries/" },
    { label: "claims", link: "/claims/" }
  ];

  var buttonContainer = document.querySelector('.button-container');

  buttonsConfig.forEach(function(button) {
    var link = document.createElement('a');
    link.href = button.link;

    var buttonElement = document.createElement('button');
    buttonElement.textContent = button.label;

    link.appendChild(buttonElement);
    buttonContainer.appendChild(link);
  });
});
