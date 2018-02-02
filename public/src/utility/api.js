// import fetch from 'unfetch';

const _cache = [];
const _fetching = {};
const _ids = {
  top: [],
  new: [],
  show: [],
  ask: [],
  job: [],
};

class API {
  constructor() {
    this._apiRoot = 'https://hacker-news.firebaseio.com/v0';
  }

  async getItem(id) {
    if (_cache[id]) {
      return _cache[id];
    }

    if (_fetching[id]) {
      return {
        id,
      };
    }

    _fetching[id] = true;
    const item = await fetch(`${this._apiRoot}/item/${id}.json`)
      .then(response => response.json());

    _fetching[id] = false;
    _cache[item.id] = item;
    return _cache[item.id];
  }

  async getStoryIds(type) {
    if (_ids[type].length) {
      return _ids[type];
    }

    const ids = await fetch(`${this._apiRoot}/${type}stories.json`)
      .then(response => response.json());

    _ids[type] = ids;
    return _ids[type];
  }

  async getStories(type, start = 0, limit = 5) {
    const ids = await this.getStoryIds(type);

    return Promise.all(ids.slice(start, start + limit).map((id) => {
      return this.getItem(id);
    }))
      .then((items) => {
        return {
          items,
          total: ids.length,
        }
      });
  }

  async getComments(ids) {
    return Promise.all(ids.map((id) => {
      return this.getItem(id);
    }));
  }
}

export default API;
