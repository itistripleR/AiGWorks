export const setupWebSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('subscribe', async (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return {
    notifyUser: (userId, event, data) => {
      io.to(`user:${userId}`).emit(event, data);
    }
  };
};