const WebSocket = require('ws')
const crypto = require('crypto')

const server = new WebSocket.Server({ port: 5000 })

const mockMessageFactory = () => {
  const id = crypto.createHash('sha1').update(Math.random().toString()).digest('hex')
  const timestamp = new Date()
  const message = 'Raindrops on roses. And whiskers on kittens. Bright copper kettles and warm woolen mittens. Brown paper packages tied up with strings. These are a few of my favorite things'
  return { user: 'julie', message, timestamp, id  }
}

server.on('connection', socket => {

  // receive message
  socket.on('message', msg => {
    console.log('received: %s', msg)
  })

  // send message
  const timerId = setInterval(() => {
    const msg = mockMessageFactory()
    socket.send(JSON.stringify(msg))
  }, 1000)

  // when closed
  socket.on('close', () => {
    clearInterval(timerId)
  })
})
