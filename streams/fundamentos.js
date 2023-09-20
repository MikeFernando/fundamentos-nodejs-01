// process.stdin
//   .pipe(process.stdout)


import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    setTimeout(() => {
      const i  = this.index++

      if (i > 100) {
        this.push(null)
      } else {
        this.push(String(i))
    }
    }, 1000)
  }
}

class DecrementNumberStream extends Transform {
  _transform(chunk, encoded, callback) {
    const transformed = Number(chunk.toString()) * -1
    
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultipleByTenStream extends Writable {
  _write(chunk, encoded, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new DecrementNumberStream())
  .pipe(new MultipleByTenStream())