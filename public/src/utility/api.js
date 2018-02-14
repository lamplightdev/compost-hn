const _cache = {
  items: {},
  lists: {
    news: {},
    newest: {},
    show: {},
    ask: {},
    jobs: {},
  },
};

if (window.compostHnPreload) {
  _cache.lists.news[1] = compostHnPreload;
}

const cacheAge = 1000 * 60;

class API {
  constructor() {
    this._apiRoot = 'https://node-hnapi.herokuapp.com';
  }

  async getItem(id) {
    if (_cache.items[id]) {
      const now = Date.now();

      if (now - _cache.items[id].time <= cacheAge) {
        return _cache.items[id].item;
      }
    }

    const item = await fetch(`${this._apiRoot}/item/${id}`)
      .then(response => response.json());

    _cache.items[item.id] = {
      item,
      time: Date.now(),
    };
    return _cache.items[item.id].item;
  }

  async getList(type, page) {
    if (_cache.lists[type][page]) {
      const now = Date.now();

      if (now - _cache.lists[type][page].time <= cacheAge) {
        return _cache.lists[type][page].list;
      }
    }

    const list = await fetch(`${this._apiRoot}/${type}?page=${page}`)
      .then(response => response.json());

    _cache.lists[type][page] = {
      list,
      time: Date.now(),
    };
    return _cache.lists[type][page].list;
  }
}

export default API;
