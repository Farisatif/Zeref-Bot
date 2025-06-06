console.clear()
console.log('Zeref')

import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import { EventEmitter } from 'events'
import dns from 'dns'
import express from 'express'

EventEmitter.defaultMaxListeners = 20

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

const { name, author } = require(join(__dirname, './package.json'))
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('Zeref', {
  font: 'block',
  align: 'center',
  colors: ['cyan', 'red']
})

say('ASTA', {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})

let isRunning = false

function checkInternet(cb) {
  dns.lookup('google.com', (err) => {
    cb(!err || err.code !== 'ENOTFOUND')
  })
}

function start(file) {
  if (isRunning) return
  isRunning = true

  let args = [join(__dirname, file), ...process.argv.slice(2)]

  setupMaster({
    exec: args[0],
    args: args.slice(1)
  })

  let p = fork()

  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })

  p.on('exit', (code, signal) => {
    isRunning = false
    console.error('❎ exit signal/code:', signal || code)

    // لا تعيد التشغيل إذا كانت SIGTERM (إنهاء من النظام أو الريلوى)
    if (signal === 'SIGTERM') {
      console.log('🛑 تم الإنهاء بواسطة SIGTERM، إيقاف البوت نهائيًا')
      process.exit()
    }

    // إعادة تشغيل البوت لأي سبب آخر
    start(file)
  })

  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test']) {
    if (!rl.listenerCount('line')) {
      rl.on('line', line => {
        p.emit('message', line.trim())
      })
    }
  }
}

function startWithInternetCheck() {
  checkInternet((isConnected) => {
    if (isConnected) {
      console.log('✅ الإنترنت متصل، جاري تشغيل البوت...')
      start('main.js')
    } else {
      console.log('❌ لا يوجد اتصال بالإنترنت، سيتم إعادة المحاولة بعد 5 ثواني...')
      setTimeout(startWithInternetCheck, 5000)
    }
  })
}

// ⚠️ منع الخروج المفاجئ وعرض الأخطاء
process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

// 🟢 Express server لحفظ الاتصال نشطًا في Railway أو غيرها
const app = express()
app.get('/', (_, res) => res.send('✅ Bot is running'))
app.listen(process.env.PORT || 3000, () => console.log("Listening..."));
// 🚀 بدء التشغيل
startWithInternetCheck()
