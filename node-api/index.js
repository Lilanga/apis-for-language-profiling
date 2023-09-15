const { count } = require('console');
const http = require('http');
var url = require('url');

const listner = (req, res) =>{
    const qs = url.parse(req.url, true).query;
    const iterations = (qs && qs.value||0);
    const count = counter(iterations);

    res.writeHead(200);
    res.end((`Final count is ${count}`));
};

const counter = (n) => {
    let count = 0;
    if (n > 500000000) {
        n = 5000000000;
    }

    for (let i = 0; i <= n; i++) {
        count += i;
    }

    return count;
}

const server = http.createServer(listner);
server.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:3000`);
});