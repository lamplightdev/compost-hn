/**
 * API to fetch HN lists and stories, and update passed cache
*/
class API {
  constructor() {
    this._apiRoot = 'https://api.hnpwa.com/v0';
  }

  async getItem(id, cache) {
    if (cache.items[id]) {
      const now = Date.now();

      if (now - cache.items[id].time <= cache.maxAge) {
        return cache.items[id].item;
      }
    }

    const item = await fetch(`${this._apiRoot}/item/${id}.json`)
      .then(response => response.json());

    cache.items[item.id] = {
      item,
      time: Date.now(),
    };
    return cache.items[item.id].item;
  }

  async getList(type, page, cache) {
    if (cache.lists[type][page]) {
      const now = Date.now();

      if (now - cache.lists[type][page].time <= cache.maxAge) {
        return cache.lists[type][page].list;
      }
    }

    const list = await fetch(`${this._apiRoot}/${type}/${page}.json`)
      .then(response => response.json());

    cache.lists[type][page] = {
      list,
      time: Date.now(),
    };
    return cache.lists[type][page].list;
  }
}

export default API;
