// generateImage.js
document.addEventListener("DOMContentLoaded", function() {
  var imageUrl = "https://phi.chat/ensentries/icon.png";
  var imageLinkUrl = "https://opensea.io/assets/ethereum/0x51d84330e9b0be75ed4fef85d61ebc51fc0aa677/83";
  var imageAlt = "Image";

  var imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  var imageLink = document.createElement("a");
  imageLink.href = imageLinkUrl;
  imageLink.target = "_blank";
  imageLink.classList.add("image-link");

  var image = document.createElement("img");
  image.src = imageUrl;
  image.alt = imageAlt;

  imageLink.appendChild(image);
  imageContainer.appendChild(imageLink);

  // Append the image container to the desired location in your HTML
  var container = document.querySelector(".page-container");
  container.insertBefore(imageContainer, container.firstChild);
});
