let path=require('path')
let fs = require('pn/fs')
let request = require('request');
let mkdirp = require('mkdirp')
let rimraf = require('rimraf')

let nssocket = require('nssocket')

var outbound = new nssocket.NsSocket();
 outbound.connect(8002,'127.0.0.1');
// let options = {
//     url: 'https://127.0.0.1:8000/',
//    headers: {'Accept': 'application/x-gtar'}
// }
// request(options, 'http://127.0.0.1:8000/').pipe(tarExtractStream)

console.log("connected to 8002")

outbound.data('Broadcasting',function (data) {
	data =JSON.parse(data);
console.log('received',data)

var filePath = data['filePath']
syncupdata(data)
if (data['action'] === 'delete') {
	console.log(filePath,' to be deleted')
}
})

function syncupdata(data){

	console.log('in syncupdata')
	console.log(data.path)
	if(data.action=='write'){
		if(data.type=='false'){
			getfile(data.path)
		
		}
		else {
			 async()=>{
			 	await mkdirp.promise(req.dirPath)
			}
		}
	}
	 else if(data.action=='delete'){
		remove(data.path,data.type)
	}
}

 function getfile(path) {
 	async()=>{
 		console.log('1111111111')
	let stat =  await fs.stat(path)
		console.log(stat)
		if(!stat){
			console.log('2334')
			await mkdirp.promise(path)
		}
	}

 	 let options = {
             url: 'http://localhost:8000/'+path,
             method:'GET'
     }
     // options.method = req.method
     console.log('in Proxy 2')

    request(options,function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) 
	   
	    	console.log('stat 1')

		    let stream =  fs.createWriteStream(path)
		    stream.once('open', function(fd) {
		  	stream.write(body)
		  	stream.end()
			})
			console.log('out async') 
		}
		
	 })
}

 function remove(path, isDir) {
    console.log(' remove this ')

    if(isDir=='true'){

         rimraf.promise(path)
    }else{
         fs.unlink(path)
    }
 
}




