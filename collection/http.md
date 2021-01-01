node的http处理过程

问题： express，使用了中间件body-parser；在接收POST/PUT这类请求的时候，请求中有data数据，是用node的http模块，pipe不成功。

首先要先了解node中http的处理过程
  - 原文https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#anatomy-of-an-http-transaction。翻译过来的意思是这样的（非逐字翻译）

我们在node端做一个服务

const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;//1
  let body = [];
  request.on('error', (err) => {//4
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk); //2
  }).on('end', () => {
    body = Buffer.concat(body).toString();//3
    
    
    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {//7
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json'); //5
    // Note: 上面的两行可以用下面这一行代替
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));//6
    response.end();
    // Note: 上面的两行可以用下面这一行代替
    // response.end(JSON.stringify(responseBody))

    
    // END OF NEW STUFF
    
  });
}).listen(8080); // 激活server,监听端口8080.
1: 我们得到请求的headers,method,url. request对象是一个IncomingMessage对象的实例。method是一个通常的http请求的method；url不包括server,protocol,port。headers里面所有的参数都是小写字母的，不管客户端实际传的是大写的还是小写的。因为headers里面可能有重复的参数，它们的值可能被覆盖也可能用逗号链接在一起。所以rawHeaders也是需要的。
2,3: 当接收一个Post/Put请求的时候，request的body也是很有用的。request对象传递的是一个数据流。这个数据流可以被监听或者pipe给其他的流。我们可以通过监听'data'和'end'事件来获取这个数据流。在'data'的监听事件中，每一个chunk都是一个Buffer,可以用一个array把所有的数据都存起来，然后在'end'的事件中把它们拼接起来。

4: request对象是一个ReadableStream,同时它也是一个EventEmitter.所以如果一个错误发生了，可以用'error'事件来监听。如果你不监听这个事件的话，这个错误就回被抛出，这会导致node程序的崩溃。 即使只是在error事件中打log,也需要监听它。当然最好是在error的时候，给http返回error错误信息。

5: 设置response的headers

6: 因为response是一个WritableStream, 用正常的写流的方式就可以。注意，要在写response的body之前设置返回的status和headers,因为在http的response过程中，headers也是在body之前的

7: 与request一样，需要处理error事件

另外，这个文章还介绍了用pipe的方式来做最简单的直接响应服务的例子。

const http = require('http');

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'GET' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
如果请求的method是'GET'并且url是'/echo'，那么就直接把接收到的数据传给客户端(request.pipe(response))。因为request是ReadableStream，而response 是WritableStream。他们都是数据流。可以直接用pipe。

二 ： body-parser模块
body parser这个npm模块，常用在node的mvc框架中，作为一个中间件用来解析网络请求的body。当然它也提供了四种方式的解析。

JSON body parser
Raw body parser
Text body Parser
URL-encoded form body parser.
因为我们使用了json的方式来做body的解析，bodyParser.json();。当request请求的content-type是application/json, 那么这个中间件就会去做解析，把data里面的数据解析到body中。这个时候，request请求的data已经不是数据流的形式。所以导致在POST/PUT的时候pipe不成功。因为data已经被解析了。

0人点赞
node


作者：Lucyhao
链接：https://www.jianshu.com/p/6683cf46e14b
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。