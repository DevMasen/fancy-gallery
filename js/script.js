/*
Fancy Gallery
code written by : Masen on July 2024
GitHub : https://github.com/DevMasen
*/

'use strict';

//! DOM Elements
const images = document.querySelectorAll('.photo');
const imageView = document.querySelector('.image-view');
const previousBnt = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const displayedImage = document.querySelector('.displayed-img');
const closeBtn = document.querySelector('.close');

//! Variables
const imageDirectoryName = 'img';
const imageSources = new Map();

//! Functions

//* get <img> tag src attribute in specific format
function getPath(element) {
  const rawSrc = element.src;
  const [, imgPath] = rawSrc.split(imageDirectoryName);
  return `../${imageDirectoryName}` + imgPath;
}

//* swiching photos by pressing next and previous button
//* call-back function
function changePhoto() {
  const currentPath = getPath(displayedImage);
  let currentIndex;

  for (const [i, path] of imageSources.entries()) {
    if (path === currentPath) {
      currentIndex = i;
      break;
    }
  }

  if (this.classList[0] === 'previous') {
    if (currentIndex > 0) {
      currentIndex--;
      displayedImage.src = imageSources.get(currentIndex);
    }
  } else if (this.classList[0] === 'next') {
    if (currentIndex < imageSources.size - 1) {
      currentIndex++;
      displayedImage.src = imageSources.get(currentIndex);
    }
  }
}

//! Main

//* loop over images and add event listener to each of them
for (const [i, element] of images.entries()) {
  //* save image sources in Map
  imageSources.set(i, getPath(element));

  element.addEventListener('click', function () {
    imageView.classList.remove('hidden');
    displayedImage.src = getPath(element);
    window.scrollTo(0, 0);
    document.body.classList.add('no-scroll');
  });
}

//* close button functionality
closeBtn.addEventListener('click', function () {
  imageView.classList.add('hidden');
  document.body.classList.remove('no-scroll');
});

//* add call back function to previous and next button
previousBnt.addEventListener('click', changePhoto);
nextBtn.addEventListener('click', changePhoto);