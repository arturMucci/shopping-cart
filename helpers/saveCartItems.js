const saveCartItems = (storage) => {
  localStorage.setItem('cartItems', JSON.stringify(storage));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
