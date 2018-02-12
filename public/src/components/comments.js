import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import CompostRepeatMixin from '../../build/libs/compost/repeat-mixin.js';
import './comment.js';

class Comments extends CompostRepeatMixin(CompostMixin(HTMLElement)) {
  static get properties() {
    return Object.assign(super.properties, {
      depth: {
        type: Number,
        value: 0,
        observer: 'observeDepth',
      },
    });
  }

  render() {
    return super.render(`
    <style>
      :host {
        contain: content;
        display: flex;
        flex-direction: column;
      }

      :host(.indent) {
        margin-left: 1.5rem;
      }
    </style>
    `);
  }

  getTemplateString(value, index) {
    return `
      <x-comment></x-comment>
    `;
  }

  getKey(value, index) {
    return value.id;
  }

  updateItem(el, value, index) {
    el.data = value;
    el.depth = this.depth + 1;
  }

  observeDepth(oldValue, newValue) {
    if (newValue > 0) {
      this.classList.add('indent');
    }
  }
}

customElements.define('x-comments', Comments);
