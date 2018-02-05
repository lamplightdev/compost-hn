const _cache = {
  items: {},
  lists: {
    news: {},
    newest: {},
    show: {},
    ask: {},
    jobs: {},
  },
  lastUpdate: null,
};

class API {
  constructor() {
    this._apiRoot = 'http://node-hnapi.herokuapp.com';
  }

  async getItem(id) {
    if (_cache.items[id]) {
      return _cache.items[id];
    }

    const item = await fetch(`${this._apiRoot}/item/${id}`)
      .then(response => response.json());

    _cache.items[item.id] = item;
    return _cache.items[item.id];
  }

  async getList(type, page) {
    if (_cache.lists[type][page]) {
      return _cache.lists[type][page];
    }

    const list = await fetch(`${this._apiRoot}/${type}?page=${page}`)
      .then(response => response.json());

    _cache.lists[type][page] = list;
    return _cache.lists[type][page];
  }
}

export default API;
