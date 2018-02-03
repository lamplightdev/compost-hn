import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import API from '../utility/api.js';
import '../components/stories.js';

const ListMixin = (parent) => {
  return class extends CompostMixin(parent) {
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
          value: 0,
          observer: 'observeStartIndex',
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
      this._limit = 30;
      this._batchSize = 1;
      this._totalItems = 0;

      this._type = 'new';
    }

    render() {
      return `
        <style>
          .show-if-loading {
            display: none;
          }

          .show-if-loading.loading {
            display: block;
          }

          .hide-if-loading.loading {
            display: none;
          }

          .buttons {
            display: flex;
            justify-content: center;
          }

          .buttons a {
            padding: 0.5rem;
            margin: 0 0.5rem;
          }

          #buttons-top {
            margin-bottom: 1rem;
          }

          #buttons-bottom {
            margin-top: 1rem;
          }
        </style>

        <div id="loading" class="show-if-loading">
          Loading...
        </div>

        <div class="hide-if-loading">
          <div class="buttons" id="buttons-top">
            <a class="loadprevious" href="" on-click="loadPrevious" hidden>prev</a>
            <a class="loadnext" href="" on-click="loadNext">next</a>
          </div>

          <x-stories id="stories"></x-stories>

          <div class="buttons" id="buttons-bottom">
            <a class="loadprevious" href="" on-click="loadPrevious" hidden>prev</a>
            <a class="loadnext" href="" on-click="loadNext">next</a>
          </div>
        </div>
      `;
    }

    observeLoading(oldValue, newValue) {
      const els = this.$$('.show-if-loading, .hide-if-loading');

      if (newValue) {
        els.forEach(el => el.classList.add('loading'));
      } else {
        els.forEach(el => el.classList.remove('loading'));
      }
    }

    observeItems(oldValue, newValue) {
      this.$id.stories.items = newValue;

      if (this._totalItems <= (this.startIndex * this._limit) + this._limit) {
        this.$$('.loadnext').forEach(el => el.hidden = true);
      } else {
        this.$$('.loadnext').forEach(el => el.hidden = false);
      }
    }

    observeStartIndex(oldValue, newValue) {
      this.$id.stories.startIndex = newValue * this._limit;

      if (this.active) {
        this._updateLinks();

        if (newValue === 0) {
          this.$$('.loadprevious').forEach(el => el.hidden = true);
        } else {
          this.$$('.loadprevious').forEach(el => el.hidden = false);
        }

        this._loadStories();
      }
    }

    observeActive(oldValue, newValue) {
      if (newValue) {
        this._updateLinks();
        this._loadStories();
      }
    }

    _updateLinks() {
      this.$$('.loadprevious').forEach(el => {
        el.href = `${this._type}/${this.startIndex - 1}`;
      });

      this.$$('.loadnext').forEach(el => {
        el.href = `${this._type}/${this.startIndex + 1}`;
      });
    }

    loadPrevious(event) {
      event.preventDefault();

      this.fire('x-update-path', {
        page: this._type,
        subPage: this.startIndex - 1,
      });
    }

    loadNext(event) {
      event.preventDefault();

      this.fire('x-update-path', {
        page: this._type,
        subPage: this.startIndex + 1,
      });
    }

    _loadStories() {
      this._loadStoryBatches(this.startIndex * this._limit, this._batchSize);
    }

    _loadStoryBatches(start, limit) {
      return this._api.getStories(this._type, start, limit)
        .then((result) => {
          this._totalItems = result.total;
          // check we are on the same page as when the request was started
          // else we'll clobber the current page with a previous page's results
          if (this.active && start === this.startIndex * this._limit) {
            requestAnimationFrame(() => {
              this.items = result.items;

              if (limit < this._limit) {
                const newLimit = Math.min(limit + this._batchSize, this._limit);
                return this._loadStoryBatches(start, newLimit);
              }
            });
          }
        });
    }
  };
}

export default ListMixin;
