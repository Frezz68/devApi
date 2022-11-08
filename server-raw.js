import http, { request } from 'http'

//const dump = {
    //property1: () => { console.log('kuku')}
//}

const server = http.createServer((request, res)=>{
    if(request.url === '/api/products' && request.method === 'GET'){
        res.writeHead(200,{ 'Content-type': 'application/json' })
        res.end(JSON.stringify({
            id: 1,
            name: "Iphone",
            color: "black"
        }))

    }else{
        res.writeHead(404,{ 'Content-type': 'application/json' })
        res.end(JSON.stringify({
            message:'Route not found, please use api/products endpoint'
        }))
    }
});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))