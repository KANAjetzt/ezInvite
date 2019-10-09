const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

exports.myEmitter = new MyEmitter()
