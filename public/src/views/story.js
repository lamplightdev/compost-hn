import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import API from '../utility/api.js';
import DateUtils from '../utility/date.js';
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
      <div>
        <span id="score"></span> points by <a id="by" href=""></a>
        <span id="time"></span>
      </div>
      <h2 id="commentscount"></h2>

      <x-comment id="comment"></x-comment>
    `;
  }

  observeLoading(oldValue, newValue) {

  }

  observeStoryId(oldValue, newValue) {
    if (this.active) {
      this._api.getItem(newValue).then((story) => {
        this.$id.title.textContent = story.title;
        this.$id.title.href = story.url;

        this.$id.score.textContent = story.score;
        this.$id.by.href = `https://news.ycombinator.com/user?id=${story.by}`;
        this.$id.by.textContent = story.by;
        this.$id.time.textContent = DateUtils.toRelative(story.time * 1000);

        this.$id.commentscount.textContent = story.kids ? (`${story.kids.length || 0} comment${story.kids.length === 1 ? '' : 's'}`) : '0 comments';

        this.$id.comment.data = story;
        this.$id.comment.showComments = true;
      });
    } else {
      this.$id.comment.showComments = false;
    }
  }

  observeActive(oldValue, newValue) {
    if (!newValue) {
      this.storyId = null;
    }
  }
}

customElements.define('x-view-story', Story);
