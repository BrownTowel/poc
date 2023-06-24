require("dotenv").config();
const conversations = require("./lib/models/conversations")
const sanitize = require("./lib/utility/sanitize")
const parser = require("./lib/utility/parser")

const server = require("http").createServer();

const options = {
  cors: {
    origin: ["http://localhost", "file://*"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
};

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

server.listen(port, host);


const io = require("socket.io")(server, options);

io.on("connection", connection);


const CHAT = "chat";
const FETCH = "fetch";
const VIDEO = "video";
const VIDEO_KILL = "video_kill";

const LIMIT = 10;

/**
 *
 * @param {*} socket
 */
function connection(socket) {
  console.log("a user connected");

  socket.on(CHAT, onChat);
  socket.on(FETCH, onFetch);
  socket.on(VIDEO, onVideo);
  socket.on(VIDEO_KILL, onVideoKill);
}

/**
 *
 * @param {*} msg
 */
function onChat(message) {
  console.log("broadcast", `${message.user}: ${message.content}`);
  // debug
  parser.parse(message.content);

  const [ret, data] = conversations.create({
    user: message.user,
    content: message.content
  });

  data.content = sanitize.html_escape( data.content );

  io.emit(CHAT, { status: ret, data: sanitize.html_escape( data ) });
}

function onFetch(cursor) {
  console.log("onFetch", cursor);

  const data = conversations.fetch(cursor, LIMIT).map(el => {
    el.content = sanitize.html_escape( el.content );

    return el;
  });

  io.emit(FETCH, JSON.stringify(data));
}

function onVideo() {
  console.log("onVideo");
  io.emit(VIDEO);
};
function onVideoKill() {
  console.log("onVideoKill");
  io.emit(VIDEO_KILL);
};
