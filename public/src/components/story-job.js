import StoryMixin from './story-mixin.js';

class StoryJob extends StoryMixin(HTMLElement) {
  render() {
    return `${super.render()}
      <div>
        <h4><a id="title" href=""></a></h4>
        <span id="time"></span>
        | <span id="domain"></span>
      </div>
    `;
  }

  observeData(oldValue, newValue) {
    if (!newValue.id) return;

    const title = this.$id.title;

    title.href = newValue.url;
    title.textContent = newValue.title;

    this.$id.time.textContent = newValue.time_ago;
    this.$id.domain.textContent = newValue.domain;
  }
}

customElements.define('x-story-job', StoryJob);
