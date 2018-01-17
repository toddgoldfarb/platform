// deprecated

const Hooks = {
  table: {},
};

Hooks.add = function (name, fn) {
  if (!Hooks.table[name]) {
    Hooks.table[name] = [];
  }
  Hooks.table[name].push(fn);
};

Hooks.run = function (name, context, options) {
  if (Hooks.table[name]) {
    Hooks.table[name].forEach(fn => {
      fn.bind(context)(options);
    });
  }
};

export { Hooks };
