node��http�������

���⣺ express��ʹ�����м��body-parser���ڽ���POST/PUT���������ʱ����������data���ݣ�����node��httpģ�飬pipe���ɹ���

����Ҫ���˽�node��http�Ĵ������
  - ԭ��https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#anatomy-of-an-http-transaction�������������˼�������ģ������ַ��룩

������node����һ������

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
    // Note: ��������п�����������һ�д���
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));//6
    response.end();
    // Note: ��������п�����������һ�д���
    // response.end(JSON.stringify(responseBody))

    
    // END OF NEW STUFF
    
  });
}).listen(8080); // ����server,�����˿�8080.
1: ���ǵõ������headers,method,url. request������һ��IncomingMessage�����ʵ����method��һ��ͨ����http�����method��url������server,protocol,port��headers�������еĲ�������Сд��ĸ�ģ����ܿͻ���ʵ�ʴ����Ǵ�д�Ļ���Сд�ġ���Ϊheaders����������ظ��Ĳ��������ǵ�ֵ���ܱ�����Ҳ�����ö���������һ������rawHeadersҲ����Ҫ�ġ�
2,3: ������һ��Post/Put�����ʱ��request��bodyҲ�Ǻ����õġ�request���󴫵ݵ���һ����������������������Ա���������pipe���������������ǿ���ͨ������'data'��'end'�¼�����ȡ�������������'data'�ļ����¼��У�ÿһ��chunk����һ��Buffer,������һ��array�����е����ݶ���������Ȼ����'end'���¼��а�����ƴ��������

4: request������һ��ReadableStream,ͬʱ��Ҳ��һ��EventEmitter.�������һ���������ˣ�������'error'�¼�������������㲻��������¼��Ļ����������ͻر��׳�����ᵼ��node����ı����� ��ʹֻ����error�¼��д�log,Ҳ��Ҫ����������Ȼ�������error��ʱ�򣬸�http����error������Ϣ��

5: ����response��headers

6: ��Ϊresponse��һ��WritableStream, ��������д���ķ�ʽ�Ϳ��ԡ�ע�⣬Ҫ��дresponse��body֮ǰ���÷��ص�status��headers,��Ϊ��http��response�����У�headersҲ����body֮ǰ��

7: ��requestһ������Ҫ����error�¼�

���⣬������»���������pipe�ķ�ʽ������򵥵�ֱ����Ӧ��������ӡ�

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
��������method��'GET'����url��'/echo'����ô��ֱ�Ӱѽ��յ������ݴ����ͻ���(request.pipe(response))����Ϊrequest��ReadableStream����response ��WritableStream�����Ƕ���������������ֱ����pipe��

�� �� body-parserģ��
body parser���npmģ�飬������node��mvc����У���Ϊһ���м�������������������body����Ȼ��Ҳ�ṩ�����ַ�ʽ�Ľ�����

JSON body parser
Raw body parser
Text body Parser
URL-encoded form body parser.
��Ϊ����ʹ����json�ķ�ʽ����body�Ľ�����bodyParser.json();����request�����content-type��application/json, ��ô����м���ͻ�ȥ����������data��������ݽ�����body�С����ʱ��request�����data�Ѿ���������������ʽ�����Ե�����POST/PUT��ʱ��pipe���ɹ�����Ϊdata�Ѿ��������ˡ�

0�˵���
node


���ߣ�Lucyhao
���ӣ�https://www.jianshu.com/p/6683cf46e14b
��Դ������
����Ȩ���������С���ҵת������ϵ���߻����Ȩ������ҵת����ע��������