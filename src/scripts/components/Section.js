export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовать каждый отдельный элемент
  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  // добавить DOM-элемент в контейнер
  addItem(item) {
    this._container.prepend(item);
  }
}