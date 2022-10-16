// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

const shopItemsContainer = document.querySelector('.items');
const cartContainer = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */

const removeFromCart = (event) => {
  cartContainer.removeChild(event.target);
  const cartChildren = [...cartContainer.children];
  const newStorage = cartChildren.map((child) => child.id);
  localStorage.setItem('cartItems', JSON.stringify(newStorage));
};

const clearCart = () => {
  const cartChildren = [...cartContainer.children];
  localStorage.clear();
  for (let i = cartChildren.length - 1; i >= 0; i -= 1) {
    cartContainer.removeChild(cartContainer.lastChild);
  }
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = `${id}`;
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', removeFromCart);
  return li;
};

const ifDoSave = (id) => {
  const test = JSON.parse(localStorage.getItem('cartItems'));
  const storage = [];
  if (test) {
    test.forEach((el) => storage.push(el));
    storage.push(id);
    saveCartItems(storage);
  } else {
    storage.push(id);
    saveCartItems(storage);
  }
};

const addToCart = async (event) => {
  const itemId = event.target.parentElement.firstChild.innerText;
  cartContainer.appendChild(createCartItemElement(await fetchItem(itemId)));
  ifDoSave(itemId);
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', addToCart);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */

// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const createCatalog = async () => {
  const { results } = await fetchProducts('computador');
  const loading = document.querySelector('.loading');
  loading.parentElement.removeChild(loading);
  results.forEach((el) => {
    shopItemsContainer.appendChild(createProductItemElement(el));
  });
};

const fetchShoppingCart = (storage) => {
  if (storage) {
    storage.forEach(async (el) => {
      cartContainer.appendChild(createCartItemElement(await fetchItem(el)));
    });
  }
};

emptyCart.addEventListener('click', clearCart);

window.onload = () => {
  createCatalog();
  fetchShoppingCart(JSON.parse(getSavedCartItems('cartItems')));
};
