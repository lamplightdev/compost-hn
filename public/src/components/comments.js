import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import CompostRepeatMixin from '../../../node_modules/@lamplightdev/compost/src/repeat-mixin.js';
import './comment.js';

class Comments extends CompostRepeatMixin(CompostMixin(HTMLElement)) {
  static get properties() {
    return Object.assign(super.properties, {
      // how deep these comments are nested
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

  getTemplateString() {
    return `
      <x-comment></x-comment>
    `;
  }

  getKey(value) {
    return value.id;
  }

  updateItem(el, value) {
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
