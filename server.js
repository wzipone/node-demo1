var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname//path 里没有查询参数，
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  //一个路径返回html内容，一个路径返回css字符串
  //模仿请求网页的过程
  
  if(path === '/'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')//响应的描述信息
    // response.write(`我是write写入的内容\n`)
    response.write(`
      <!DOCTYPE html>
      <head>
        <link rel="stylesheet" href="/x">
      </head>
        <h1 id="bigTittle">我是标题h1中的内容。如果CSS引入成功，我会变成红色，如果JS引入成功，我会变的很大。</h1>
        <h2>别看我没写html和body标签，浏览器会给我补全。</h2>
        <script src="/y"></script>
    `)//html和css就是 通过link...连接起来了
    response.end('我是response.end里写入的内容。\n')//end也会写入，一调用就会发送给浏览器，如果没有写end就会一直等你调用end（当然浏览器可能会优化，还是建议写上）
  } else if(path === '/x'){//在 sources/page中由x这个资源，浏览器是把响应的内容创建文件，然后写入进去的吗？ //这里的x（其实是个文件）没有写后缀，文件的类型就是contenttype决定的
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`body{color: red;}`)//请求的本子，手写的代码，都是请求路径+文件，这里直接fan'h
    response.end()
  }else if(path === '/y'){//在 sources/page中由x这个资源，浏览器是把响应的内容创建文件，然后写入进去的吗？ //这里的x（其实是个文件）没有写后缀，文件的类型就是contenttype决定的
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(`bigTittle.style.fontSize='50px'`)//请求的本子，手写的代码，都是请求路径+文件，这里直接fan'h
    response.end()
  }  else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
