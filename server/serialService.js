const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const ByteLength = require('@serialport/parser-byte-length')

const SerialService = {
    _port:undefined,
    _line:undefined,
    setSerial(comport,br){
        if(!this._port){
            this._port = new SerialPort(comport,{
                baudRate: br
            })

            this._line=this._port.pipe(new Readline())

            this._port.on('data',(data)=>{
                console.log('data:',data.toString())
            })
            console.log('init port for this time')
        }
        return this
    },
    getPort() {
        return this._port
    },
    getLine(){
        return this._line
    },
    getByteParser(n){
        const parser = this._port.pipe(new ByteLength({length: n}))
        return parser
    }
}

module.exports = SerialService;
