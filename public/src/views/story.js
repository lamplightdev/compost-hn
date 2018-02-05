import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import API from '../utility/api-v2.js'
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

      storyId: {
        type: Number,
        value: null,
        observer: 'observeStoryId',
      },

      active: {
        type: Boolean,
        value: false,
        observer: 'observeActive',
      },
    };
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

        #summary {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          color: #666;
        }
      </style>

      <x-loading></x-loading>

      <div id="detail">
        <h1><a id="title" href=""></a></h1>
        <div id="summary">
          <span id="score"></span> points by <a id="by" href=""></a>
          <span id="time"></span>
          | <span id="commentscount"></span>
          | <span id="domain"></span>
        </div>

        <x-comments id="comments"></x-comments>
      </div>
    `;
  }

  constructor() {
    super();

    this._api = new API();
  }

  observeLoading(oldValue, newValue) {
    this.$('x-loading').show = newValue;
    this.$id.detail.hidden = newValue;
  }

  observeStoryId(oldValue, newValue) {
    if (this.active) {
      this.loading = true;

      this._api.getItem(newValue).then((story) => {
        this.$id.title.textContent = story.title;
        this.$id.title.href = story.url;

        this.$id.score.textContent = story.points;
        this.$id.by.href = `https://news.ycombinator.com/user?id=${story.user}`;
        this.$id.by.textContent = story.user;
        this.$id.time.textContent = story.time_ago;

        this.$id.commentscount.textContent = `${story.comments_count} comment${story.comments_count === 1 ? '' : 's'}`;
        this.$id.domain.textContent = story.domain;

        this.$id.comments.items = story.comments;

        this.loading = false;
      });
    }
  }

  observeActive(oldValue, newValue) {
    if (!newValue) {
      this.storyId = null;
    }
  }
}

customElements.define('x-view-story', Story);
