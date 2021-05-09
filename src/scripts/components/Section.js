export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCard() {
    this._renderer(this._renderedItems)
  }

  // отрисовать каждый отдельный элемент
  renderItems() {
    this._renderedItems.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  // добавить DOM-элемент в контейнер
  addItem(item) {
    this._container.prepend(item);
  }
}