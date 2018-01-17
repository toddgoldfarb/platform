const visualizers = [
  {
    _id: 'none',
    type: 'none',
    data: { },
    title: 'None',
    thumb: '/images/visualizers/blank.jpg',
  },
  {
    _id: 'map1',
    type: 'image', // XXX change this to map
    data: {
      url: '/images/visualizers/2d-map.jpg',
    },
    title: 'Map',
    thumb: '/images/visualizers/2d-map.jpg',
  },
  {
    _id: 'candle',
    type: 'image',
    data: {
      url: '/images/visualizers/candle-01.png',
    },
    title: 'Candle',
    thumb: '/images/visualizers/candle-01.png',
  },
  {
    _id: 'monks',
    type: 'image',
    data: {
      url: '/images/visualizers/Thai-Monks.jpg',
    },
    title: 'Sangha Hall',
    thumb: '/images/visualizers/Thai-Monks.jpg',
  },
  {
    _id: '000048685784',
    type: 'image',
    data: {
      url: '/images/visualizers/&Flow/000048685784.jpg',
    },
    title: 'Blue Portal',
    thumb: '/images/visualizers/&Flow/000048685784-thumb.jpg',
  },

  {
    _id: '000058627656',
    type: 'image',
    data: {
      url: '/images/visualizers/&Flow/000058627656.jpg',
    },
    title: 'Fire Flow',
    thumb: '/images/visualizers/&Flow/000058627656-thumb.jpg',
  },

  {
    _id: '000069336583',
    type: 'image',
    data: {
      url: '/images/visualizers/&Flow/000069336583.jpg',
    },
    title: 'Mountain Streams',
    thumb: '/images/visualizers/&Flow/000069336583-thumb.jpg',
  },

  {
    _id: '000070812459',
    type: 'image',
    data: {
      url: '/images/visualizers/&Flow/000070812459.jpg',
    },
    title: 'Sunset Waves',
    thumb: '/images/visualizers/&Flow/000070812459-thumb.jpg',
  },

  {
    _id: '000072681553',
    type: 'image',
    data: {
      url: '/images/visualizers/&Flow/000072681553.jpg',
    },
    title: 'Forest Portal',
    thumb: '/images/visualizers/&Flow/000072681553-thumb.jpg',
  },

  {
    _id: '000013884526',
    type: 'image',
    data: {
      url: '/images/visualizers/&Mantra/000013884526.jpg',
    },
    title: 'Om',
    thumb: '/images/visualizers/&Mantra/000013884526-thumb.jpg',
  },

  {
    _id: '000072663977',
    type: 'image',
    data: {
      url: '/images/visualizers/&Mantra/000072663977.jpg',
    },
    title: 'Blue Microcosm',
    thumb: '/images/visualizers/&Mantra/000072663977-thumb.jpg',
  },

  {
    _id: '000078452377',
    type: 'image',
    data: {
      url: '/images/visualizers/&Mantra/000078452377.jpg',
    },
    title: 'Blue Flower',
    thumb: '/images/visualizers/&Mantra/000078452377-thumb.jpg',
  },

  {
    _id: '000078463461',
    type: 'image',
    data: {
      url: '/images/visualizers/&Mantra/000078463461.jpg',
    },
    title: 'Fractal Fire',
    thumb: '/images/visualizers/&Mantra/000078463461-thumb.jpg',
  },

  {
    _id: '000083130303',
    type: 'image',
    data: {
      url: '/images/visualizers/&Mantra/000083130303.jpg',
    },
    title: 'Flower of Life',
    thumb: '/images/visualizers/&Mantra/000083130303-thumb.jpg',
  },

  {
    _id: '000066516009',
    type: 'image',
    data: {
      url: '/images/visualizers/&Music/000066516009.jpg',
    },
    title: 'Clouds',
    thumb: '/images/visualizers/&Music/000066516009-thumb.jpg',
  },

  {
    _id: '000067918177',
    type: 'image',
    data: {
      url: '/images/visualizers/&Music/000067918177.jpg',
    },
    title: 'Autumn Range',
    thumb: '/images/visualizers/&Music/000067918177-thumb.jpg',
  },

  {
    _id: '000070813009',
    type: 'image',
    data: {
      url: '/images/visualizers/&Music/000070813009.jpg',
    },
    title: 'Ocean Wave',
    thumb: '/images/visualizers/&Music/000070813009-thumb.jpg',
  },

  {
    _id: '000085317591',
    type: 'image',
    data: {
      url: '/images/visualizers/&Music/000085317591.jpg',
    },
    title: 'Foliage',
    thumb: '/images/visualizers/&Music/000085317591-thumb.jpg',
  },

  {
    _id: '000086403753',
    type: 'image',
    data: {
      url: '/images/visualizers/&Music/000086403753.jpg',
    },
    title: 'Beach Shore',
    thumb: '/images/visualizers/&Music/000086403753-thumb.jpg',
  },

  {
    _id: '000009094909',
    type: 'image',
    data: {
      url: '/images/visualizers/&Temple/000009094909.jpg',
    },
    title: 'All Together',
    thumb: '/images/visualizers/&Temple/000009094909-thumb.jpg',
  },

  {
    _id: '000019720863',
    type: 'image',
    data: {
      url: '/images/visualizers/&Temple/000019720863.jpg',
    },
    title: 'Young Monks',
    thumb: '/images/visualizers/&Temple/000019720863-thumb.jpg',
  },

  {
    _id: '000077841575',
    type: 'image',
    data: {
      url: '/images/visualizers/&Temple/000077841575.jpg',
    },
    title: 'Candle Offerings',
    thumb: '/images/visualizers/&Temple/000077841575-thumb.jpg',
  },

  {
    _id: '000085000249',
    type: 'image',
    data: {
      url: '/images/visualizers/&Temple/000085000249.jpg',
    },
    title: 'Crowd',
    thumb: '/images/visualizers/&Temple/000085000249-thumb.jpg',
  },

  {
    _id: '000055640554',
    type: 'image',
    data: {
      url: '/images/visualizers/&Wisdom/000055640554.jpg',
    },
    title: 'Upper Atmosphere',
    thumb: '/images/visualizers/&Wisdom/000055640554-thumb.jpg',
  },

  {
    _id: '000057565582',
    type: 'image',
    data: {
      url: '/images/visualizers/&Wisdom/000057565582.jpg',
    },
    title: 'Forest Trail',
    thumb: '/images/visualizers/&Wisdom/000057565582-thumb.jpg',
  },

  {
    _id: '000058623970',
    type: 'image',
    data: {
      url: '/images/visualizers/&Wisdom/000058623970.jpg',
    },
    title: 'Blue Light',
    thumb: '/images/visualizers/&Wisdom/000058623970-thumb.jpg',
  },

  {
    _id: '000060879860',
    type: 'image',
    data: {
      url: '/images/visualizers/&Wisdom/000060879860.jpg',
    },
    title: 'Heart',
    thumb: '/images/visualizers/&Wisdom/000060879860-thumb.jpg',
  },
  {
    _id: '000084843549',
    type: 'image',
    data: {
      url: '/images/visualizers/&Wisdom/000084843549.jpg',
    },
    title: 'Lotus Candle',
    thumb: '/images/visualizers/&Wisdom/000084843549-thumb.jpg',
  },
];

export { visualizers };
