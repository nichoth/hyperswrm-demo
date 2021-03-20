// Based on example in hyperswarm repo
// Try running the regular hyperswarm demo with node
const hyperswarm = require('hyperswarm-web')
const crypto = require('crypto')

const swarm = hyperswarm({
  // Specify a server list of HyperswarmServer instances
  bootstrap: ['ws://yourhyperswarmserver.com'],
  // You can also specify proxy and signal servers separated
  wsProxy: [
    'ws://proxy1.com',
    'ws://proxy2.com'
  ],
  webrtcBootstrap: [
    'ws://signal1.com',
    'ws://signal2.com'
  ],
  // The configuration passed to the SimplePeer constructor
  //See https://github.com/feross/simple-peer#peer--new-peeropts
  // for more options
  simplePeer:{
    // The configuration passed to the RTCPeerConnection constructor,for more details see
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
    config:{
      // List of STUN and TURN setvers to connect
      // Without the connection is limited to local peers
      iceServers:require("./ice-servers.json")
    }
  }
})

// look for peers listed under this topic
const topic = crypto.createHash('sha256')
  .update('my-hyperswarm-topic')
  .digest()

swarm.join(topic)

swarm.on('connection', (socket, details) => {
  console.log('new connection!', details)

  // you can now use the socket as a stream, eg:
  // socket.pipe(hypercore.replicate()).pipe(socket)
})

