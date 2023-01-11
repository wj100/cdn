const github = require('octonode');
// 生成的github Token
const client = github.client('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');
// 仓库名称，比如file-cdn
const ghrepo = client.repo('wj100/cdn');
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const {v4:uuidv1} = require('uuid');
const app = express()
const port = 3000
app.use(fileUpload())
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})
app.post('/upload', (req, res) => {
  const file = req.files['user-file']
  const fileArr = file.name.split('.')
  const fileType = fileArr[fileArr.length -1]
  const md5Name = `${uuidv1()}.${fileType}`
  ghrepo.createContents(md5Name, 'Upload new file', file.data, function (err, status, body, headers) {
    res.send({
      // 上传后的文件url
      url: `https://raw.githubusercontent.com/wj100/cdn/master/${md5Name}`
    })
  })
})

app.listen(port, () => console.log(`Github CDN app listening on port: ${port}!`))