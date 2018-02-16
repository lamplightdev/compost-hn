import StoryMixin from './story-mixin.js';

/**
 * Element to story summary for 'link' type
*/
class StoryLink extends StoryMixin(HTMLElement) {
  render() {
    return `${super.render()}
      <div>
        <h4><a id="title" href=""></a></h4>
        <span id="score"></span> by <a id="by" href=""></a>
        <span id="time"></span>
        | <a href="" id="comments" on-click="navigate"></a>
        | <span id="domain"></span>
      </div>
    `;
  }

  observeData(oldValue, newValue) {
    if (!newValue.id) return;

    const title = this.$id.title;
    title.href = newValue.url;
    title.textContent = newValue.title;

    this.$id.score.textContent = `${newValue.points} points`;

    this.$id.by.href = `https://news.ycombinator.com/user?id=${newValue.user}`;
    this.$id.by.textContent = newValue.user;

    this.$id.time.textContent = newValue.time_ago;
    this.$id.comments.textContent = `${newValue.comments_count} comment${newValue.comments_count === 1 ? '' : 's'}`;
    this.$id.comments.href = `/story/${newValue.id}`;

    this.$id.domain.textContent = newValue.domain;
  }
}

customElements.define('x-story-link', StoryLink);
