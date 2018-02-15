import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import CompostRepeatMixin from '../../../node_modules/@lamplightdev/compost/src/repeat-mixin.js';
import './story-link.js';
import './story-ask.js';
import './story-job.js';

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
      <style>
        :host {
          display: block;
          contain: content;
        }
      </style>
    `);
  }

  getTemplateString(value, index) {
    let type = value.type;

    if (type === 'link' && !value.domain) {
      type = 'ask';
    }

    return `
      <x-story-${type}></x-story-${type}>
    `;
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
