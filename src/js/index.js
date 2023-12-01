import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
// import '../css/style.css';

const ref = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { selector, catInfo, loader, error } = ref;

// При загрузке страницы - лоадер есть , а селект и инфо скрытые
classListHidden();
error.classList.add('is-hidden');

// Для скрытия функция loader, selector, catInfo
function classListHidden() {
  loader.classList.remove('is-hidden');
  selector.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');
}

// Для скрытия функция loader
function classHiddenLoader() {
  loader.classList.add('is-hidden');
}

//Загрузилась страница, селект виден
fetchBreeds()
  .then(function (data) {
    const arrBreedsId = data.map(element => {
      return { text: element.name, value: element.id };
    });
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
    selector.classList.remove('is-hidden');
    selector.addEventListener('change', onSelectBreed);
  })
  .catch(onFetchError)
  .finally(classHiddenLoader);

// При выборе породы - лоадер, скрывается селект и информацию о коте
function onSelectBreed(event) {
  classListHidden();

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('is-hidden');
      selector.classList.remove('is-hidden');

      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="img">
                          <img src="${url}" alt="${breeds[0].name}" 
                          width="400"/></div><div class="box">
                          <h1>${breeds[0].name}</h1>
                          <p>${breeds[0].description}</p>
                          <p><b>Temperament:</b> 
                          ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError)
    .finally(classHiddenLoader);
}

function onFetchError(_error) {
  selector.classList.add('is-hidden');
  loader.classList.add('is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
