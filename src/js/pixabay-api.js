import axios from 'axios';

export const API_KEY = '57632627-1deee9d118fde0cb5a37cdfe4';
export const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
