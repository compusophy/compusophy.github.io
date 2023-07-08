// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function() {
  // Select the dynamic-content div
  const dynamicContentDiv = document.getElementById('title-subtitle');

  // Create the h3 element for the title
  const title = document.createElement('h3');
  title.style.width = '100%';
  title.style.textAlign = 'center';

  // Create the anchor element for the title link
  const titleLink = document.createElement('a');
  titleLink.href = '/';
  titleLink.appendChild(title);
  titleLink.addEventListener('click', function(event) {
    // Handle the click event if needed
  });

  // Set the text content of the title
  title.textContent = 'ensentries';

  // Create the p element for the subtitle
  const subtitle = document.createElement('p');
  subtitle.style.width = '100%';
  subtitle.style.textAlign = 'center';
  subtitle.style.marginBottom = '10px';

  // Create the anchor element for the subtitle link
  const subtitleLink = document.createElement('a');
  subtitleLink.href = 'https://twitter.com/ensentries/';
  subtitleLink.target = '_blank';
  subtitleLink.appendChild(subtitle);
  subtitleLink.addEventListener('click', function(event) {
    // Handle the click event if needed
  });

  // Set the text content of the subtitle
  subtitle.textContent = 'a collection of collectors';

  // Append the title and subtitle links to the dynamic-content div
  dynamicContentDiv.appendChild(titleLink);
  dynamicContentDiv.appendChild(subtitleLink);
});
