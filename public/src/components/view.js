import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import '../views/top.js';
import '../views/new.js';
import '../views/show.js';
import '../views/ask.js';
import '../views/job.js';
import '../views/story.js';
import '../views/about.js';

/**
 * Element to control which view to show
*/
class View extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      // data about current view
      current: {
        type: Object,
        value: {
          id: null,
          subId: null,
        },
        observer: 'observeCurrent',
      },

      // cache to hold stories / lists
      cache: {
        type: Object,
        value: {},
      },
    };
  }

  render() {
    return `
      <style>
        :host {
          contain: content;
          display: block;
          padding: 1rem;
        }

        .view.hide {
          display: none;
        }
      </style>

      <x-view-top class="view" id="top"></x-view-top>
      <x-view-new class="view" id="new"></x-view-new>
      <x-view-show class="view" id="show"></x-view-show>
      <x-view-ask class="view" id="ask"></x-view-ask>
      <x-view-job class="view" id="job"></x-view-job>
      <x-view-story class="view" id="story"></x-view-story>
      <x-view-about class="view" id="about"></x-view-about>
    `;
  }

  // fired when current view changes
  observeCurrent(oldValue, newValue) {
    [...this.$$('.view')].forEach((view) => {
      if (view.id === newValue.id) {
        view.cache = this.cache;

        if (view.id === 'story') {
          this.$id[newValue.id].storyId = newValue.subId;
        } else {
          this.$id[newValue.id].startIndex = newValue.subId;
        }
        view.classList.remove('hide');
        view.active = true;
      } else {
        view.classList.add('hide');
        view.active = false;
      }
    });
  }
}

customElements.define('x-view', View);
