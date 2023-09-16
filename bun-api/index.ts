const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url);
        const qs = url.searchParams;
        const iterations: number = +(qs.get('value')||0);

        const count = counter(iterations);
        return new Response(`Final count is ${count}`);
    },
});

const counter = (n: number) :number => {
    let count = 0;
    if (n > 5000000000) {
        n = 5000000000;
    }

    for (let i = 0; i <= n; i++) {
        count += i;
    }

    return count;
}

console.log(`Listing on http://localhost:${server.port}`)