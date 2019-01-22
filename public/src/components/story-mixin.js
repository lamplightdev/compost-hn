import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import globalStyles from '../utility/styles.js';
/**
 * Base class for story summaries
*/
const StoryMixin = parent => (
  class extends CompostMixin(parent) {
    static get properties() {
      return {
        // story day
        data: {
          type: Object,
          value: {},
          observer: 'observeData',
        },

        // type of story
        type: {
          type: String,
          value: null,
          reflectToAttribute: true,
        },

        // which story number this is
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
          contain: content;
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
          margin-right: 0.5rem;
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
      `;
    }

    observeIndex(oldValue, newValue) {
      this.$id.number.textContent = newValue;
    }

    navigate(event) {
      event.preventDefault();

      if (event.target.href.indexOf('https://compost-35844.firebaseapp.com') !== 0) {
        window.open(event.target.href, '_blank').opener = null;
      } else {
        // load story
        this.fire('x-update-path', {
          page: 'story',
          subPage: this.data.id
        });
      }
    }
  }
);

export default StoryMixin;
