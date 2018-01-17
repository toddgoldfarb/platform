const adminEventQueries = {
  draft: {
    query: {
      deleted: false,
      published: false,
    },
    sort: {
      createdAt: 1,
    },
  },
  live: {
    query: {
      deleted: false,
      live: true,
      library: false,
    },
    sort: {
      startAt: 1,
    },
  },
  future: {
    query: {
      live: false,
      deleted: false,
      past: false,
      library: false,
    },
    sort: {
      startAt: 1,
    },
  },
  past: {
    query: {
      live: false,
      deleted: false,
      past: true,
      rebroadcast: false,
      library: false,
    },
    sort: {
      endAt: -1,
    },
  },
  rebroadcast: {
    query: {
      deleted: false,
      rebroadcast: true,
    },
    sort: {
      endAt: -1,
    },
  },
  baseline: {
    query: {
      baseline: true,
    },
    sort: {
      startAt: 1,
    },
  },
  library: {
    query: {
      library: true,
    },
    sort: {
      createdAt: 1,
    },
  },
  deleted: {
    query: {
      deleted: true,
    },
    sort: {
      createdAt: -1,
    },
  },
};

export { adminEventQueries };
