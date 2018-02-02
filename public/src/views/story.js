import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import API from '../utility/api.js';
import globalStyles from '../utility/styles.js';
import '../components/comments.js';

class Story extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: false,
        observer: 'observeLoading',
      },

      params: {
        type: Object,
        value: {},
        observer: 'observeParams',
      },

      active: {
        type: Boolean,
        value: false,
        observer: 'observeActive',
      },
    };
  }

  constructor() {
    super();

    this._api = new API();
  }

  render() {
    return `
      <style>
        ${globalStyles}

        h1 {
          font-size: 22px;
          line-height: 1.2;
        }

        h1 a {
          text-decoration: none;
        }

        h2 {
          font-size: 18px;
        }
      </style>
      <h1><a id="title" href=""></a></h1>
      <h2>Comments</h2>

      <x-comment id="comment"></x-comment>
    `;
  }

  observeLoading(oldValue, newValue) {

  }

  observeParams(oldValue, newValue) {
    if (this.active) {
      this.$id.title.textContent = newValue.title;
      this.$id.title.href = newValue.url;

      this.$id.comment.data = newValue;
      this.$id.comment.showComments = true;
    } else {
      this.$id.comment.showComments = false;
    }
  }

  observeActive(oldValue, newValue) {
    if (!newValue) {
      this.params = {};
    }
  }
}

customElements.define('x-view-story', Story);
