/**
 * https://github.com/peers/peerjs-server
 */

const { PeerServer } = require("peer");

const options = {
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
  path: "/video"
}

const peerServer = PeerServer(options, (arg) => {
  console.log("peerServer");
  // console.log(arg._events.request.route);
});

/*
Server {
  maxHeaderSize: undefined,
  insecureHTTPParser: undefined,
  requestTimeout: 300000,
  headersTimeout: 60000,
  keepAliveTimeout: 5000,
  connectionsCheckingInterval: 30000,
  joinDuplicateHeaders: undefined,
  _events: [Object: null prototype] {
    request: [Function: app] {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      setMaxListeners: [Function: setMaxListeners],
      getMaxListeners: [Function: getMaxListeners],
      emit: [Function: emit],
      addListener: [Function: addListener],
      on: [Function: addListener],
      prependListener: [Function: prependListener],
      once: [Function: once],
      prependOnceListener: [Function: prependOnceListener],
      removeListener: [Function: removeListener],
      off: [Function: removeListener],
      removeAllListeners: [Function: removeAllListeners],
      listeners: [Function: listeners],
      rawListeners: [Function: rawListeners],
      listenerCount: [Function: listenerCount],
      eventNames: [Function: eventNames],
      init: [Function: init],
      defaultConfiguration: [Function: defaultConfiguration],
      lazyrouter: [Function: lazyrouter],
      handle: [Function: handle],
      use: [Function: use],
      route: [Function: route],
      engine: [Function: engine],
      param: [Function: param],
      set: [Function: set],
      path: [Function: path],
      enabled: [Function: enabled],
      disabled: [Function: disabled],
      enable: [Function: enable],
      disable: [Function: disable],
      acl: [Function (anonymous)],
      bind: [Function (anonymous)],
      checkout: [Function (anonymous)],
      connect: [Function (anonymous)],
      copy: [Function (anonymous)],
      delete: [Function (anonymous)],
      get: [Function (anonymous)],
      head: [Function (anonymous)],
      link: [Function (anonymous)],
      lock: [Function (anonymous)],
      'm-search': [Function (anonymous)],
      merge: [Function (anonymous)],
      mkactivity: [Function (anonymous)],
      mkcalendar: [Function (anonymous)],
      mkcol: [Function (anonymous)],
      move: [Function (anonymous)],
      notify: [Function (anonymous)],
      options: [Function (anonymous)],
      patch: [Function (anonymous)],
      post: [Function (anonymous)],
      propfind: [Function (anonymous)],
      proppatch: [Function (anonymous)],
      purge: [Function (anonymous)],
      put: [Function (anonymous)],
      rebind: [Function (anonymous)],
      report: [Function (anonymous)],
      search: [Function (anonymous)],
      source: [Function (anonymous)],
      subscribe: [Function (anonymous)],
      trace: [Function (anonymous)],
      unbind: [Function (anonymous)],
      unlink: [Function (anonymous)],
      unlock: [Function (anonymous)],
      unsubscribe: [Function (anonymous)],
      all: [Function: all],
      del: [Function (anonymous)],
      render: [Function: render],
      listen: [Function: listen],
      request: [IncomingMessage],
      response: [ServerResponse],
      cache: {},
      engines: {},
      settings: [Object],
      locals: [Object: null prototype],
      mountpath: '/',
      _router: [Function]
    },
    connection: [Function: connectionListener],
    listening: [Function: bound emit],
    error: [Function: bound emit],
    upgrade: [Function: upgrade]
  },
  _eventsCount: 5,
  _maxListeners: undefined,
  _connections: 0,
  _handle: TCP {
    reading: false,
    onconnection: [Function: onconnection],
    [Symbol(owner_symbol)]: [Circular *1]
  },
  _usingWorkers: false,
  _workers: [],
  _unref: false,
  allowHalfOpen: true,
  pauseOnConnect: false,
  noDelay: true,
  keepAlive: false,
  keepAliveInitialDelay: 0,
  httpAllowHalfOpen: false,
  timeout: 0,
  maxHeadersCount: null,
  maxRequestsPerSocket: 0,
  _connectionKey: '6::::0',
  [Symbol(IncomingMessage)]: [Function: IncomingMessage],
  [Symbol(ServerResponse)]: [Function: ServerResponse],
  [Symbol(kCapture)]: false,
  [Symbol(async_id_symbol)]: 7,
  [Symbol(http.server.connections)]: ConnectionsList {},
  [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
    _idleTimeout: 30000,
    _idlePrev: [TimersList],
    _idleNext: [TimersList],
    _idleStart: 384,
    _onTimeout: [Function: bound checkConnections],
    _timerArgs: undefined,
    _repeat: 30000,
    _destroyed: false,
    [Symbol(refed)]: false,
    [Symbol(kHasPrimitive)]: false,
    [Symbol(asyncId)]: 4,
    [Symbol(triggerId)]: 1
  },
  [Symbol(kUniqueHeaders)]: null
}
*/

/*arg._events.request
<ref *1> [Function: app] {
  _events: [Object: null prototype] { mount: [Function: onmount] },
  _eventsCount: 1,
  _maxListeners: undefined,
  setMaxListeners: [Function: setMaxListeners],
  getMaxListeners: [Function: getMaxListeners],
  emit: [Function: emit],
  addListener: [Function: addListener],
  on: [Function: addListener],
  prependListener: [Function: prependListener],
  once: [Function: once],
  prependOnceListener: [Function: prependOnceListener],
  removeListener: [Function: removeListener],
  off: [Function: removeListener],
  removeAllListeners: [Function: removeAllListeners],
  listeners: [Function: listeners],
  rawListeners: [Function: rawListeners],
  listenerCount: [Function: listenerCount],
  eventNames: [Function: eventNames],
  init: [Function: init],
  defaultConfiguration: [Function: defaultConfiguration],
  lazyrouter: [Function: lazyrouter],
  handle: [Function: handle],
  use: [Function: use],
  route: [Function: route],
  engine: [Function: engine],
  param: [Function: param],
  set: [Function: set],
  path: [Function: path],
  enabled: [Function: enabled],
  disabled: [Function: disabled],
  enable: [Function: enable],
  disable: [Function: disable],
  acl: [Function (anonymous)],
  bind: [Function (anonymous)],
  checkout: [Function (anonymous)],
  connect: [Function (anonymous)],
  copy: [Function (anonymous)],
  delete: [Function (anonymous)],
  get: [Function (anonymous)],
  head: [Function (anonymous)],
  link: [Function (anonymous)],
  lock: [Function (anonymous)],
  'm-search': [Function (anonymous)],
  merge: [Function (anonymous)],
  mkactivity: [Function (anonymous)],
  mkcalendar: [Function (anonymous)],
  mkcol: [Function (anonymous)],
  move: [Function (anonymous)],
  notify: [Function (anonymous)],
  options: [Function (anonymous)],
  patch: [Function (anonymous)],
  post: [Function (anonymous)],
  propfind: [Function (anonymous)],
  proppatch: [Function (anonymous)],
  purge: [Function (anonymous)],
  put: [Function (anonymous)],
  rebind: [Function (anonymous)],
  report: [Function (anonymous)],
  search: [Function (anonymous)],
  source: [Function (anonymous)],
  subscribe: [Function (anonymous)],
  trace: [Function (anonymous)],
  unbind: [Function (anonymous)],
  unlink: [Function (anonymous)],
  unlock: [Function (anonymous)],
  unsubscribe: [Function (anonymous)],
  all: [Function: all],
  del: [Function (anonymous)],
  render: [Function: render],
  listen: [Function: listen],
  request: IncomingMessage { app: [Circular *1] },
  response: ServerResponse { app: [Circular *1] },
  cache: {},
  engines: {},
  settings: {
    'x-powered-by': true,
    etag: 'weak',
    'etag fn': [Function: generateETag],
    env: 'development',
    'query parser': 'extended',
    'query parser fn': [Function: parseExtendedQueryString],
    'subdomain offset': 2,
    'trust proxy': false,
    'trust proxy fn': [Function: trustNone],
    view: [Function: View],
    views: 'C:\\Users\\USER\\Documents\\Repository\\study-club\\web\\views',
    'jsonp callback name': 'callback'
  },
  locals: [Object: null prototype] {
    settings: {
      'x-powered-by': true,
      etag: 'weak',
      'etag fn': [Function: generateETag],
      env: 'development',
      'query parser': 'extended',
      'query parser fn': [Function: parseExtendedQueryString],
      'subdomain offset': 2,
      'trust proxy': false,
      'trust proxy fn': [Function: trustNone],
      view: [Function: View],
      views: 'C:\\Users\\USER\\Documents\\Repository\\study-club\\web\\views',
      'jsonp callback name': 'callback'
    }
  },
  mountpath: '/',
  _router: [Function: router] {
    params: {},
    _params: [],
    caseSensitive: false,
    mergeParams: undefined,
    strict: false,
    stack: [ [Layer], [Layer], [Layer] ]
  }
}
*/
