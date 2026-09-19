import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll,
} from './js/render-functions';

export const form = document.querySelector('.form');
export const input = document.querySelector('.form input');
const loadMoreBtn = document.querySelector('.load-more-btn');

hideLoader();
hideLoadMoreButton();

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchInput = input.value.trim();

  if (!searchInput) {
    iziToast.show({
      title: 'ERROR',
      message: 'Please enter a search query.',
    });
    return;
  }

  currentQuery = searchInput;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    totalHits = total;

    if (hits.length === 0) {
      iziToast.show({
        title: 'ERROR',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(hits);
    toggleLoadMoreButton();
  } catch (error) {
    iziToast.show({
      title: 'ERROR',
      message: `${error}`,
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);
    createGallery(hits);
    smoothScroll();
    toggleLoadMoreButton();
  } catch (error) {
    iziToast.show({
      title: 'ERROR',
      message: `${error}`,
    });
  } finally {
    hideLoader();
  }
});

function toggleLoadMoreButton() {
  const alreadyShown = currentPage * PER_PAGE;

  if (alreadyShown >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMoreButton();
  }
}
