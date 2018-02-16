import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import '../components/loading.js';
import API from '../utility/api.js';
import '../components/stories.js';
import globalStyles from '../utility/styles.js';

const ListMixin = parent => (
  class extends CompostMixin(parent) {
    static get properties() {
      return {
        loading: {
          type: Boolean,
          value: false,
          observer: 'observeLoading',
        },

        items: {
          type: Array,
          value: [],
          observer: 'observeItems',
        },

        startIndex: {
          type: Number,
          observer: 'observeStartIndex',
        },

        active: {
          type: Boolean,
          value: false,
          observer: 'observeActive',
        },

        cache: {
          type: Object,
          value: {},
        },
      };
    }

    constructor() {
      super();

      this._api = new API();
      this._limit = 30;
      this._type = 'news';
    }

    render() {
      return `
        <style>
          ${globalStyles}

          :host {
            contain: content;
            display: block;
            position: relative;
          }

          x-loading {
            margin: 1rem 0;
          }

          x-stories.hide {
            display: none;
          }

          #paging {
            text-align: center;
          }

          #paging a {
            padding: 0.5rem 0;
            margin: 0 0.5rem;
          }
        </style>

        <x-loading></x-loading>

        <x-stories id="stories"></x-stories>

        <div id="paging" hidden>
          <a id="previous" href="" on-click="goPrevious" hidden>previous page</a>
          <a id="more" href="" on-click="goMore">next page</a>
        </div>
      `;
    }

    observeLoading(oldValue, newValue) {
      this.$('x-loading').show = newValue;
      this.$id.paging.hidden = newValue;

      if (newValue) {
        this.$id.stories.classList.add('hide');
      } else {
        this.$id.stories.classList.remove('hide');
      }
    }

    observeItems(oldValue, newValue) {
      this.$id.stories.items = newValue;

      if (newValue.length < this._limit) {
        this.$id.more.hidden = true;
      } else {
        this.$id.more.hidden = false;
      }
    }

    observeStartIndex(oldValue, newValue) {
      this.$id.stories.start = newValue * this._limit;

      this.$id.previous.href = `/${this.id}/${newValue - 1}`;
      this.$id.more.href = `/${this.id}/${newValue + 1}`;

      if (newValue === 0) {
        this.$id.previous.hidden = true;
      } else {
        this.$id.previous.hidden = false;
      }

      if (this.active) {
        this._loadStories();
      }
    }

    observeActive(oldValue, newValue) {
      if (!newValue) {
        this.startIndex = null;
      }
    }

    goPrevious(event) {
      event.preventDefault();

      this.fire('x-update-path', {
        page: this.id,
        subPage: this.startIndex - 1,
      });
    }

    goMore(event) {
      event.preventDefault();

      this.fire('x-update-path', {
        page: this.id,
        subPage: this.startIndex + 1,
      });
    }

    _loadStories() {
      this.loading = true;

      this._api.getList(this._type, this.startIndex + 1, this.cache).then((items) => {
        this.items = items;
        this.loading = false;
      });
    }
  }
);

export default ListMixin;
