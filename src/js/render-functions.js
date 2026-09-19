import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/loader.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery-link', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const fragment = document.createDocumentFragment();

  images.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery-item');

      const galleryLink = document.createElement('a');
      galleryLink.classList.add('gallery-link');
      galleryLink.href = largeImageURL;

      const galleryImage = document.createElement('img');
      galleryImage.classList.add('gallery-image');
      galleryImage.src = webformatURL;
      galleryImage.alt = tags;
      galleryImage.width = 360;
      galleryImage.height = 152;

      const galleryContainer = document.createElement('div');
      galleryContainer.classList.add('gallery-container');

      const galleryItemList = document.createElement('ul');
      galleryItemList.classList.add('gallery-item-list');

      const galleryItemListItem = document.createElement('li');
      galleryItemListItem.classList.add('gallery-item-list-item');

      const stats = [
        { label: 'Likes', value: likes, className: 'title-likes' },
        { label: 'Views', value: views, className: 'title-views' },
        { label: 'Comments', value: comments, className: 'title-comments' },
        { label: 'Downloads', value: downloads, className: 'title-downloads' },
      ];

      stats.forEach(({ label, value, className }) => {
        const title = document.createElement('h2');
        title.classList.add('gallery-item-title', className);
        title.textContent = label;

        const info = document.createElement('p');
        info.classList.add('gallery-item-info');
        info.textContent = value;

        title.appendChild(info);
        galleryItemListItem.appendChild(title);
      });

      galleryItemList.appendChild(galleryItemListItem);

      galleryLink.appendChild(galleryImage);
      galleryItem.appendChild(galleryLink);
      galleryContainer.appendChild(galleryItemList);
      galleryItem.appendChild(galleryContainer);

      fragment.appendChild(galleryItem);
    }
  );

  gallery.appendChild(fragment);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('loader');
}

export function hideLoader() {
  loader.classList.remove('loader');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('visually-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('visually-hidden');
}

export function smoothScroll() {
  const card = gallery.firstElementChild;
  if (!card) return;

  const { height: cardHeight } = card.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}
