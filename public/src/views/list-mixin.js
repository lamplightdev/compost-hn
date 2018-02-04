import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import '../components/loading.js';
import API from '../utility/api.js';
import '../components/stories.js';
import globalStyles from '../utility/styles.js';

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

        totalItems: {
          type: Number,
          value: 0,
          observer: 'observeTotalItems',
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

      this._type = 'new';
    }

    render() {
      return `
        <style>
          ${globalStyles}

          :host {
            display: block;
            position: relative;
          }

          :host(.hide) {
            display: none;
          }

          .pages {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .pages.hide {
            display: none;
          }

          .pages a {
            padding: 0.5rem;
            margin: 0 0.5rem;
            text-decoration: none;
          }

          .pages a.loadnext {
            transform: rotate(180deg);
          }

          .pages > span {
            display: flex;
            align-items: center;
            padding: 0 0.5rem;
          }

          #pages-top {
            margin-bottom: 1rem;
          }

          #pages-bottom {
            margin-top: 1rem;
          }

          x-loading {
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
          }
        </style>

        <x-loading></x-loading>

        <div>
          <div class="pages" id="pages-top">
            <a class="loadprevious" href="" on-click="loadPrevious" hidden>◀</a>
            <span><span class="currentpage"></span> / <span class="totalpages"></span></span>
            <a class="loadnext" href="" on-click="loadNext">◀</a>
          </div>

          <x-stories id="stories"></x-stories>

          <div class="pages" id="pages-bottom">
            <a class="loadprevious" href="" on-click="loadPrevious" hidden>◀</a>
            <span><span class="currentpage"></span> / <span class="totalpages"></span></span>
            <a class="loadnext" href="" on-click="loadNext">◀</a>
          </div>
        </div>
      `;
    }

    observeLoading(oldValue, newValue) {
      this.$$('x-loading').forEach(el => el.show = newValue);
    }

    observeItems(oldValue, newValue) {
      this.$id.stories.items = newValue;

      if (this.totalItems <= (this.startIndex * this._limit) + this._limit) {
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

    observeTotalItems(oldValue, newValue) {
      if (newValue) {
        this.$$('.pages').forEach(el => el.classList.remove('hide'));
        this.$$('.totalpages').forEach((el) => {
          el.textContent = Math.ceil(newValue / this._limit);
        });
      } else {
        this.$$('.pages').forEach(el => el.classList.add('hide'));
      }
    }

    observeActive(oldValue, newValue) {
      if (newValue) {
        this.classList.remove('hide');
        this._updateLinks();
        this._loadStories();
      } else {
        this.classList.add('hide');
      }
    }

    _updateLinks() {
      this.$$('.currentpage').forEach(el => el.textContent = this.startIndex + 1);
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
      this.loading = true;
      this._loadStoryBatches(this.startIndex * this._limit, this._batchSize);
    }

    _loadStoryBatches(start, limit) {
      return this._api.getStories(this._type, start, limit)
        .then((result) => {
          this.totalItems = result.total;
          // check we are on the same page as when the request was started
          // else we'll clobber the current page with a previous page's results
          if (this.active && start === this.startIndex * this._limit) {
            requestAnimationFrame(() => {
              this.items = result.items;

              if (limit < this._limit) {
                const newLimit = Math.min(limit + this._batchSize, this._limit);
                return this._loadStoryBatches(start, newLimit);
              } else {
                this.loading = false;
              }
            });
          }
        });
    }
  };
}

export default ListMixin;
