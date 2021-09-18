#!/usr/bin/env node
/**
 * 服务入口
 */
const http = require('http');
const koaStatic = require('koa-static');
const Koa = require('koa2');
const app = new Koa();
const port = 8900
const serverContentRoot = process.cwd()
function getCanUsePort(port){
  const spawn = require( 'child_process' ).spawnSync,
  ls = spawn( 'lsof', [ '-i', ':'+port ] );
  const stdout = ls.stdout.toString()
  if(stdout){
    return getCanUsePort(parseInt(port,10)+1)
  }
  return port
}

app.use(koaStatic(`${serverContentRoot}/static`));

/**
 * Create HTTP server.
 */
const lastPort = getCanUsePort(port)
var server = http.createServer(app.callback());
server.listen(lastPort,()=>{
  const targetUrl = 'http://localhost:'+lastPort
  console.log('server start ......',targetUrl);
  require("openurl").open(targetUrl+'/index.html')//默认打开index.html
});
