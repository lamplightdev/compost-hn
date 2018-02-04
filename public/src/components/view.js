import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import '../views/top.js';
import '../views/new.js';
import '../views/show.js';
import '../views/ask.js';
import '../views/job.js';
import '../views/story.js';

class View extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      current: {
        type: Object,
        value: {
          id: null,
          subId: null,
        },
        observer: 'observeCurrent',
      },
    };
  }

  constructor() {
    super();

    this._loadedViews = {};
  }

  render() {
    return `
      <style>
        :host {
          display: block;
          padding: 1rem;
        }
      </style>

      <x-view-top class="view" id="top" hidden></x-view-top>
      <x-view-new class="view" id="new" hidden></x-view-new>
      <x-view-show class="view" id="show" hidden></x-view-show>
      <x-view-ask class="view" id="ask" hidden></x-view-ask>
      <x-view-job class="view" id="job" hidden></x-view-job>
      <x-view-story class="view" id="story" hidden></x-view-story>
    `;
  }

  observeCurrent(oldValue, newValue) {
    [...this.$$('.view')].forEach((view) => {
      if (view.id === newValue.id) {
        view.hidden = false;
        view.active = true;

        if (view.id === 'story') {
          this.$id[newValue.id].storyId = newValue.subId;
        } else {
          this.$id[newValue.id].startIndex = newValue.subId;
        }

      } else {
        view.hidden = true;
        view.active = false;
      }
    });
  }
}

customElements.define('x-view', View);
