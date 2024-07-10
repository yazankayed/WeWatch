require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});
const cookieParser = require('cookie-parser');
const PORT = 8000;


app.use(cors({

    credentials:true
}));
app.use(express.json());


app.use(cookieParser());

require("./config/mongoose.config");

require('./routes/user.routes')(app);

const favoritesRoutes = require('./routes/favorites.routes');
app.use('/api/favorites', favoritesRoutes);
server.listen(PORT, function () {
    console.log(`The server has started on PORT: ${PORT}`);
});

const msgs = [];
io.on("connection", socket => {
    console.log("Nice to meet me.");
    socket.emit("welcome", "Welcome to our socket!");
    io.emit("messages_to_chat", msgs);
    socket.on("message_from_client", data => {
        msgs.push(data);
        io.emit("messages_to_chat", msgs);
    });
    socket.on("new_user", data => {
        msgs.push({msg:data+" has joined the chat"});
        io.emit("messages_to_chat", msgs);
    });
});