import { Transform } from 'node:stream'
import http from 'node:http'


class DecrementNumberStream extends Transform {
  _transform(chunk, encoded, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)
    
    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async(req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullContentStream = Buffer.concat(buffers).toString()

  console.log(fullContentStream)

  res.end(fullContentStream)
})

server.listen(3334)