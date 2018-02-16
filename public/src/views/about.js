import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import globalStyles from '../utility/styles.js';

class About extends CompostMixin(HTMLElement) {
  render() {
    return `
      <style>
        ${globalStyles}
        :host {
          contain: content;
          display: block;
        }

        a {
          color: #86AB83;
        }
      </style>
      <p>
        Built using Web Components and <a href="https://github.com/lamplightdev/compost">compost</a> - a collection
        of small Web Component mixins.
      </p>
    `;
  }
}

customElements.define('x-view-about', About);
