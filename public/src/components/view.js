import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import '../views/top.js';
import '../views/new.js';
import '../views/show.js';
import '../views/ask.js';
import '../views/job.js';
import '../views/story.js';
import '../views/about.js';

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

  observeCurrent(oldValue, newValue) {
    [...this.$$('.view')].forEach((view) => {
      if (view.id === newValue.id) {
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
