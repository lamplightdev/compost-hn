import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import DateUtils from '../utility/date.js';
import globalStyles from '../utility/styles.js';

class Story extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      data: {
        type: Object,
        value: {},
        observer: 'observeData'
      },

      index: {
        type: Number,
        value: 0,
        observer: 'observeIndex',
      },
    };
  }

  render() {
    return `
      <style>
        ${globalStyles}
        :host {
          display: block;
          margin: 0 0 2rem 0;
        }

        h4 {
          margin: 0 0 0.5rem 0;
          font-weight: 500;
        }

        h4 a {
          text-decoration: none;
        }

        div {
          color: #666;
          font-size: 14px;
        }
      </style>

      <h4><span id="number"></span>. <a id="title" href=""></a></h4>
      <div>
        <span id="score"></span> points by <a id="by" href=""></a>
        <span id="time"></span>
        | <a href="" id="comments" on-click="navigate"><span id="kids"></span> comments</a>
      </div>
    `;
  }

  observeData(oldValue, newValue) {
    const title = this.$id.title;
    title.href = newValue.url;
    title.textContent = newValue.title;

    this.$id.score.textContent = newValue.score;
    this.$id.by.href = `https://news.ycombinator.com/user?id=${newValue.by}`;
    this.$id.by.textContent = newValue.by;
    this.$id.time.textContent = DateUtils.toRelative(newValue.time * 1000);
    this.$id.comments.href = `/story/${newValue.id}`;
    this.$id.kids.textContent = newValue.descendants || 0;
  }

  observeIndex(oldValue, newValue) {
    this.$id.number.textContent = newValue;
  }

  navigate(event) {
    event.preventDefault();

    this.fire('x-update-path', {
      page: 'story',
      subPage: this.data.id,
    });
  }
}

customElements.define('x-story', Story);
