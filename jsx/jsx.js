// eslint-disable react/react-in-jsx-scope
const http = require('http')
const { renderToString } = require('react-dom/server')

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-XSS-Protection': 0,
    // 'Content-Security-Policy': 'default-src \'self\' \'unsafe-inline\''
  });
  const data = {
    title: "<script>{alert(1)}</script>",
    href: "javascript:console.log('hello')"
  }
  const body = renderToString(
    <div>
      <a href={data.href}>click</a>
      <h3>{data.title}</h3>
      <script dangerouslySetInnerHTML={{ __html: "console.log(\"hello!\")" }}>
      </script>
    </div>
  )
  console.log(body)
  response.end(body)

}).listen(9999);
console.log("server is running ......")
