import CompostMixin from '../../build/libs/compost/compost-mixin.js';
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
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 0 0 2rem 0;
        }

        #number {
          display: flex;
          flex-shrink: 0;
          align-items: flex-start;
          justify-content: center;

          font-size: 1.7rem;
          width: 3rem;
          margin-top: -0.9rem;
        }

        h4 {
          margin: 0 0 0.5rem 0;
          color: #333;
          font-weight: 500;
          font-size: 1rem;
        }

        h4 a {
          text-decoration: none;
        }

        div {
          color: #666;
          font-size: 0.9rem;
        }
      </style>

      <div id="number"></div>
      <div>
        <h4><a id="title" href=""></a></h4>
        <span id="score"></span> points by <a id="by" href=""></a>
        <span id="time"></span>
        | <a href="" id="comments" on-click="navigate"></a>
        <span id="domain"></span>
      </div>
    `;
  }

  observeData(oldValue, newValue) {
    const title = this.$id.title;
    title.href = newValue.url;
    title.textContent = newValue.title;

    this.$id.score.textContent = newValue.points;
    this.$id.by.href = `https://news.ycombinator.com/user?id=${newValue.user}`;
    this.$id.by.textContent = newValue.user;
    this.$id.time.textContent = newValue.time_ago;
    this.$id.comments.textContent = `${newValue.comments_count} comment${newValue.comments_count === 1 ? '' : 's'}`;
    this.$id.comments.href = `/story/${newValue.id}`;

    if (newValue.type !== 'ask') {
      this.$id.domain.textContent = `| ${newValue.domain}`;
    } else {
      this.$id.domain.textContent = '';
    }
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
