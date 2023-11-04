import { getTransactions, writeTransactions } from './blockchain-helpers.js';
import { getKnownPeerAddresses } from './network-helpers.js';

import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const knownPeers = getKnownPeerAddresses();
const MY_PORT = process.env.PORT;
const MY_ADDRESS = `ws://localhost:${MY_PORT}`;
const transactions = getTransactions();
const openedSockets = [];
const connectedAddresses = [];
const attemptingToConnectAddresses = [];
// Add your code below

const myServer = new WebSocketServer({port : MY_PORT})

myServer.on('listening', ()=>{
    console.log(`lisening on port ${MY_PORT}`)
    connectedAddresses.push(MY_ADDRESS)
    knownPeers.forEach(addr => {
        if(addr !== MY_ADDRESS && !attemptingToConnectAddresses.includes(addr) ){
            attemptingToConnectAddresses.push(addr)
            const socket = new WebSocket(addr)
            socket.on('open', () => {
                attemptingToConnectAddresses.splice(attemptingToConnectAddresses.indexOf(addr),1)
                connectedAddresses.push(addr)
                const handshakeData = {
                    type : 'HANDSHAKE',
                    data : connectedAddresses
                }
                socket.send(JSON.stringify(handshakeData))
            })
            socket.on('close', () => {
                console.log(`Connection closed from ${addr}`)
                const index = connectedAddresses.indexOf(addr)
                if (index !== -1) {
                    connectedAddresses.splice(index, 1)
                }
            })
        }
    })
})

myServer.on('connection', (socket) => {
    socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message)
        console.log(parsedMessage)
        if( parsedMessage.type === 'HANDSHAKE' ){
            parsedMessage.data.forEach(addr => {
                if (addr !== MY_ADDRESS && !attemptingToConnectAddresses.includes(addr) && !connectedAddresses.includes(addr)){
                        attemptingToConnectAddresses.push(addr)
                        const socket = new WebSocket(addr)
                        socket.on('open', ()=> {
                            attemptingToConnectAddresses.splice(attemptingToConnectAddresses.indexOf(addr),1)
                            connectedAddresses.push(addr)
                            const handshakeData = {
                                type : 'HANDSHAKE',
                                data : connectedAddresses
                            }
                            socket.send(JSON.stringify(handshakeData))
                        })

                        socket.on('close', () => {
                            console.log(`Connection closed from ${addr}`)
                            const index = connectedAddresses.indexOf(addr)
                            if (index !== -1) {
                                connectedAddresses.splice(index, 1)
                            }
                        })
                    }
            })
        }
    })
})