import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import CompostRepeatMixin from '../../build/libs/compost/repeat-mixin.js';
import './story.js';

class Stories extends CompostRepeatMixin(CompostMixin(HTMLElement)) {
  static get properties() {
    return Object.assign(super.properties, {
      start: {
        type: Number,
        value: 0,
      },
    });
  }

  render() {
    return super.render(`
    `, `
      <x-story></x-story>
    `);
  }

  getKey(value, index) {
    return value.id;
  }

  updateItem(el, value, index) {
    el.data = value;
    el.index = this.start + index + 1;
  }
}

customElements.define('x-stories', Stories);
