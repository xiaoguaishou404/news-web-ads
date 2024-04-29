const { resolve } = require('node:path')
const express = require('express')

const app = express()
app.use('/', express.static(resolve(__dirname, '../dist/')))

const server = app.listen(3344, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

// app.get('/', (req, res) => {
//   // res.sendfile(resolve(__dirname, '../dist/'))
//   // res.send('Hello World!');
// })

// app.listen(3344, () => {
//   console.log('Server running on port 3000')
// })
