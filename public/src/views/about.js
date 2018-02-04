import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import globalStyles from '../utility/styles.js';

class About extends CompostMixin(HTMLElement) {
  render() {
    return `
      <style>
        a {
          color: #86AB83;
        }
      </style>
      <p>
        Built using <a href="https://github.com/lamplightdev/compost">compost</a> - a collection
        of small Web Component mixins.
      </p>
    `
  }
}

customElements.define('x-view-about', About);
