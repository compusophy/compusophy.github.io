// generateImage.js
document.addEventListener("DOMContentLoaded", function() {
  var imageUrl = "https://phi.chat/ensentries/icon.png";
  var imageLinkUrl = "https://opensea.io/assets/ethereum/0x46584e06c8da9f67b1b9712c4df6aa897af3a564/1";
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
