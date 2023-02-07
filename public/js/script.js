const socket = io('/chatapp')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/chatapp',
    port: '3001'
})
const message = document.getElementById('message');
const sendMessage = document.getElementById('send-message');

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

peerConnection.ondatachannel = event => {
    const receiveChannel = event.channel;
    receiveChannel.onmessage = event => {
        console.log('Received Message: ' + event.data);
    };
};

peerConnection.createOffer()
    .then(offer => peerConnection.setLocalDescription(offer))
    .then(() => {
        sendOffer(peerConnection.localDescription);
    });

sendMessage.addEventListener('click', () => {
    channel.send(message.value);
});