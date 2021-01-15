/* eslint-disable */
const http = require('http');
const escapeHtml = require('./escapeHtml');

function html(strings, ...keys) {
  let raw = strings.raw;
  console.log(raw, strings)
  let result = '';
  keys.forEach((key, i) => {
    let str = raw[i];
    if (Array.isArray(key)) {
      key = key.join('');
    }
    key = escapeHtml(key);
    result += str;
    result += key;
  });
  result += raw[raw.length - 1];
  return result;
}

const render = (data) => html`
  <div>
    <a href="${data.href}">click</a>
    <h3>${data.title}!</h3>
    <script>
      console.log("hello!")
    </script>
  </div>
`


http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-XSS-Protection': 0,
    // 'Content-Security-Policy': 'default-src \'self\' \'unsafe-inline\''
  });
  const body = render({
    title: "<script>{alert(1)}</script>",
    href: "javascript:console.log('hello')"
  })
  console.log(body)
  response.end(body)

}).listen(8888);
console.log("server is running ......")
