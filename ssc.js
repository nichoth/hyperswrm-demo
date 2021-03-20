var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var hub = signalhub('my-app-name', [
    'https://hub-world.herokuapp.com/'
])
var observ = require('observ')
var struct = require('observ-struct')
var onend = require('end-of-stream')

// -------------------------------------

import { render } from 'preact'
import { html } from 'htm/preact'
import { useState } from 'preact/hooks'
var ssc = require('@nichoth/ssc')
var ssbKeys = require("ssb-keys")

// --------------------------------------

var swarm = wswarm(hub)

var state = struct({
    peers: observ({}),
    msgs: observ([])
})

swarm.on('peer', function (stream, id) {
    console.log('CONNECTED to a new peer', id)
    var _peers = state.peers()
    _peers[id] = stream
    state.peers.set(_peers)


    // add messages to state
    // this works if peers give a straight stream of posts,
    // no other message types
    // it should really be a stream of different msg types, like naming
    // yourself, etc
    // also should gossip msgs from different users
    stream.on('data', function (data) {
        addMsg(JSON.parse(data.toString()))
    })


    onend(stream, () => {
        var peers = state.peers()
        delete peers[id]
        state.peers.set(peers)
    })
})

var keys = ssbKeys.generate()

function addMsg (msg) {
    var newMsgs = state.msgs().concat([msg])
    state.msgs.set(newMsgs)
}

function App () {
    var [_state, setState] = useState(state())
    state(function onChange (newState) {
        console.log('state change', newState)
        setState(newState)
    })

    function sendMsg (msg) {
        Object.keys(_state.peers).forEach(function (peerId) {
            _state.peers[peerId].write(msg)
        })
    }

    function submitMsg (ev) {
        ev.preventDefault()

        var content = {
            type: 'post',
            text: ev.target.elements.newMsg.value
        }

        // TODO: use the prev msg when making a new one
        // (keys, prevMsg, content)
        var _msg = ssc.createMsg(keys, null, content)

        addMsg(_msg)
        sendMsg(JSON.stringify(_msg))
    }

    return html`
        ${_state.msgs.map(msg => {
            return html`<p class="msg">${msg.content.text}</p>`
        })}

        <form class="msg-input" onSubmit=${submitMsg}>
            <textarea id="newMsg" name="newMsg" cols="44" rows="12"></textarea>
            <div>
                <input type="submit" value="senf new message" />
            </div>
        </form>
    `
}

render(html`<${App} />`, document.getElementById('content'));
