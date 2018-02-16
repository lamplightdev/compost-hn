import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import API from '../utility/api.js'
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

  render() {
    return `
      <style>
        ${globalStyles}

        :host {
          contain: content;
          display: block;
        }

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

        #content {
          margin-bottom: 2rem;
        }
      </style>

      <x-loading></x-loading>

      <div id="detail">
        <h1><a id="title" href=""></a></h1>
        <div id="summary">
          <span id="score"></span> <a id="by" href=""></a>
          <span id="time"></span>
          | <span id="commentscount"></span>
          <span id="domain"></span>
        </div>

        <div id="content"></div>

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

  observeActive(oldValue, newValue) {
    if (!newValue) {
      this.storyId = null;
    } else {
      this.loading = true;

      this._api.getItem(this.storyId, this.cache).then((story) => {
        this.$id.title.textContent = story.title;
        if (story.url.indexOf('http') === 0) {
          this.$id.title.href = story.url;
        } else {
          this.$id.title.href = `/story/${story.id}`;
        }

        if (story.points !== null) {
          this.$id.score.textContent = `${story.points} points`;
        } else {
          this.$id.score.textContent = '';
        }

        if (story.user !== null) {
          this.$id.by.href = `https://news.ycombinator.com/user?id=${story.user}`;
          this.$id.by.textContent = `by ${story.user}`;
        } else {
          this.$id.by.href = '';
          this.$id.by.textContent = '';
        }

        this.$id.time.textContent = story.time_ago;

        this.$id.commentscount.textContent = `${story.comments_count} comment${story.comments_count === 1 ? '' : 's'}`;

        this.$id.comments.items = story.comments;

        if (story.content) {
          this.$id.domain.textContent = '';
          this.$id.content.innerHTML = story.content;
        } else {
        this.$id.domain.textContent = `| ${story.domain}`;
          this.$id.content.innerHTML = '';
        }

        this.loading = false;
      });
    }
  }

  goToStory(event) {
    event.preventDefault();

    this.fire('x-update-path', {
      page: 'story',
      subPage: this.storyId,
    });
  }
}

customElements.define('x-view-story', Story);
