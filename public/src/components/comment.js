import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import globalStyles from '../utility/styles.js';
import './comments.js';

class Comment extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      // comment data
      data: {
        type: Object,
        value: null,
        observer: 'observeData',
      },

      // are sub comments currently
      showComments: {
        type: Boolean,
        value: false,
        observer: 'observeShowComments',
      },

      // how deeply nested this comment is
      depth: {
        type: Number,
        value: 0,
        observer: 'observeDepth',
      },
    };
  }

  render() {
    return `
      <style>
        ${globalStyles}
        :host {
          contain: content;
          display: block;
          color: #333;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #ddd;
        }

        #info {
          color: #666;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .hide {
          display: none;
        }

        button {
          margin-bottom: 0.5rem;
          font-size: 1rem;
          border: 0;
          box-shadow: none;
          background: transparent;
          color: #333;
          padding: 0;
          cursor: pointer;
        }
      </style>

      <div id="top">
        <div id="info">
          <a id="by" href=""></a> <span id="time"></span>
        </div>
        <div id="text"></div>
        <button id="commentstoggle" on-click="toggleComments" hidden>[+]</button>
      </div>

      <x-comments id="comments" class="hide"></x-comments>
    `;
  }

  // update comment data
  observeData(oldValue, newValue) {
    if (!newValue) return;

    this.$id.by.href = `https://news.ycombinator.com/user?id=${newValue.user}`;
    this.$id.by.textContent = newValue.user;
    this.$id.time.textContent = newValue.time_ago;

    this.$id.text.innerHTML = newValue.content;
    if (newValue.comments.length) {
      this.$id.commentstoggle.hidden = false;
    } else {
      this.$id.commentstoggle.hidden = true;
    }

    this.$id.comments.items = newValue.comments;
    this.$id.comments.depth = this.depth;
  }

  observeDepth(oldValue, newValue) {
    this.$id.comments.depth = newValue;
  }

  // update hide/show comments
  observeShowComments(oldValue, newValue) {
    if (newValue) {
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
}

customElements.define('x-comment', Comment);
