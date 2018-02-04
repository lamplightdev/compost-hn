import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import DateUtils from '../utility/date.js';
import API from '../utility/api.js';
import globalStyles from '../utility/styles.js';
import './comments.js';

class Comment extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      data: {
        type: Object,
        value: {},
        observer: 'observeData'
      },

      showComments: {
        type: Boolean,
        value: false,
        observer: 'observeShowComments',
      },

      depth: {
        type: Number,
        value: 0,
        observer: 'observeDepth',
      },
    };
  }

  constructor() {
    super();

    this._api = new API();
    this._batchSize = 1;
  }

  render() {
    return `
      <style>
        ${globalStyles}
        #text {
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid steelblue;
        }

        .hide {
          display: none;
        }
      </style>

      <div id="top">
        <div id="info">
          by <a id="by" href=""></a> <span id="time"></span>
        </div>
        <div id="text"></div>
        <button id="commentstoggle" on-click="toggleComments" hidden>[+]</button>
      </div>

      <x-comments id="comments" class="hide"></x-comments>
    `;
  }

  observeData(oldValue, newValue) {
    if (newValue.text) {
      this.$id.top.classList.remove('hide');

      this.$id.by.href = `https://news.ycombinator.com/user?id=${newValue.by}`;
      this.$id.by.textContent = newValue.by;
      this.$id.time.textContent = DateUtils.toRelative(newValue.time * 1000);
    } else {
      this.$id.top.classList.add('hide');
    }

    this.$id.text.innerHTML = newValue.text;
    if (newValue.kids && newValue.kids.length) {
      this.$id.commentstoggle.hidden = false;
    } else {
      this.$id.commentstoggle.hidden = true;
    }

    this.$id.comments.depth = this.depth;
  }

  observeDepth(oldValue, newValue) {
    this.$id.comments.depth = newValue;
  }

  observeShowComments(oldValue, newValue) {
    if (newValue) {
      this._loadComments();
      this.$id.comments.classList.remove('hide');
      this.$id.commentstoggle.textContent = '[-]';
    } else {
      this.$id.comments.classList.add('hide');
      this.$id.commentstoggle.textContent = '[+]';
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  _loadComments() {
    this.$id.comments.items = [];

    this._loadCommentBatches(0, this._batchSize);
  }

  _loadCommentBatches(start, limit) {
    const kids = this.data.kids || [];

    return this._api.getComments(kids.slice(start, limit))
      .then((items) => {
        this.$id.comments.items = items;

        if (limit < kids.length) {
          const newLimit = Math.min(limit + this._batchSize, kids.length);
          return this._loadCommentBatches(start, newLimit);
        }
      });
  }
}

customElements.define('x-comment', Comment);
