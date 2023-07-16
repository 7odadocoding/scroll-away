import generateRandomColor from './utils.js';

const pages = document.querySelectorAll('.page');
const pageWidth = document.documentElement.clientWidth;
const pageHeight = document.documentElement.clientHeight;
let previousColors = [];
let currentPage = 0;
const directions = {};

let isScrolling = false;
const scrollDelay = 1000;

function handleScroll(event) {
   if (isScrolling) {
      return;
   }

   isScrolling = true;

   if (event.deltaY > 0) {
      scrollNextPage();
   } else {
      scrollPreviousPage();
   }

   setTimeout(() => {
      isScrolling = false;
   }, scrollDelay);
}

function setRandomBackgroundColor(page, previousColors) {
   page.style.backgroundColor = generateRandomColor(previousColors);
}

function parseDirections(pages) {
   let pageNumber = 1;
   const deeps = {
      top: [],
      bottom: [],
      right: [],
      left: [],
   };
   for (const page of pages) {
      const direction = page.dataset.dir;
      directions[pageNumber] = page;
      deeps[direction].push(page);
      pageNumber++;
   }
   return deeps;
}

function positionPages(deeps) {
   const setPosition = (property, multiplier) => (page, index) => {
      page.style[property] = `${-multiplier * (index + 1)}px`;
   };

   deeps.top.forEach(setPosition('top', pageHeight));
   deeps.bottom.forEach(setPosition('bottom', pageHeight));
   deeps.right.forEach(setPosition('right', pageWidth));
   deeps.left.forEach(setPosition('left', pageWidth));
}

function scrollNextPage() {
   if (currentPage < Object.keys(directions).length) {
      currentPage++;
      const nextPage = directions[currentPage];
      nextPage.scrollIntoView({ behavior: 'smooth' });
   }
}

function scrollPreviousPage() {
   if (currentPage > 1) {
      currentPage--;
      const previousPage = directions[currentPage];
      previousPage.scrollIntoView({ behavior: 'smooth' });
   }
}

function initialize() {
   pages.forEach((page) => {
      setRandomBackgroundColor(page, previousColors);
   });

   const deeps = parseDirections(pages);
   positionPages(deeps);

   window.addEventListener('wheel', handleScroll);

   scrollNextPage();
}

initialize();
