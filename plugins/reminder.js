import fs from 'fs'
import path from 'path'
import schedule from 'node-schedule'
import { DateTime, Duration } from 'luxon' // ✅ استيراد Duration من luxon

const remindersFile = path.resolve('./reminders.json')
if (!fs.existsSync(remindersFile)) fs.writeFileSync(remindersFile, '[]')

// ⚠️ غيّر المنطقة الزمنية حسب موقعك
const TIMEZONE = 'Asia/Riyadh'

// 🔁 دالة لجدولة التذكير
function scheduleReminder(reminder, conn) {
  let [hour, minute] = reminder.time.split(':').map(Number)
  let ruleOrDate

  if (reminder.repeat === 'مرة') {
    let now = DateTime.now().setZone(TIMEZONE)
    let when = now.set({ hour, minute, second: 0, millisecond: 0 })
    if (when <= now) when = when.plus({ days: 1 })
    ruleOrDate = when.toJSDate()
  } else {
    let rule = new schedule.RecurrenceRule()
    rule.hour = hour
    rule.minute = minute
    rule.tz = TIMEZONE

    if (reminder.repeat === 'اسبوعي') {
      rule.dayOfWeek = DateTime.now().setZone(TIMEZONE).weekday % 7 // 0=Sunday
    } else if (reminder.repeat === 'شهري') {
      rule.date = DateTime.now().setZone(TIMEZONE).day
    }

    ruleOrDate = rule
  }

  schedule.scheduleJob(reminder.id, ruleOrDate, async () => {
    await conn.sendMessage(reminder.chat, {
      text: `🔔 تذكير: ${reminder.message}`
    })
  })
}

// 🔁 تحميل التذكيرات عند تشغيل البوت
export function loadAndScheduleReminders(conn) {
  let data = JSON.parse(fs.readFileSync(remindersFile))
  for (let reminder of data) {
    scheduleReminder(reminder, conn)
  }
}

// ⚙️ أمر البوت
let handler = async (m, { args, command, usedPrefix, conn }) => {
  let example = `${usedPrefix + command} 18:30 اشرب دواء يومي`
  if (args.length < 3)
    return m.reply(`❗ الصيغة الصحيحة:\n${usedPrefix + command} [الوقت] [الرسالة] [التكرار]\nمثال:\n${example}`)

  let time = args[0]
  let repeat = args[args.length - 1]
  let message = args.slice(1, -1).join(' ')

  if (!/^\d{2}:\d{2}$/.test(time))
    return m.reply('❌ صيغة الوقت غير صحيحة، استخدم مثلا 18:30')

  if (!['مرة', 'يومي', 'اسبوعي', 'شهري'].includes(repeat))
    return m.reply('❌ نوع التكرار غير صحيح. اختر من: مرة، يومي، اسبوعي، شهري')

  // 🧮 حساب الوقت المتبقي
  let [hour, minute] = time.split(':').map(Number)
  let now = DateTime.now().setZone(TIMEZONE)
  let target = now.set({ hour, minute, second: 0, millisecond: 0 })
  if (target <= now) target = target.plus({ days: 1 })
  let diff = target.diff(now, ['hours', 'minutes', 'seconds']).toObject()

  let remainingTime = `${String(Math.floor(diff.hours)).padStart(2, '0')}:${String(Math.floor(diff.minutes)).padStart(2, '0')}:${String(Math.floor(diff.seconds)).padStart(2, '0')}`

  let reminder = {
    id: `${m.chat}-${Date.now()}`,
    chat: m.chat,
    time,
    repeat,
    message,
    createdAt: Date.now()
  }

  let data = JSON.parse(fs.readFileSync(remindersFile))
  data.push(reminder)
  fs.writeFileSync(remindersFile, JSON.stringify(data, null, 2))
  scheduleReminder(reminder, conn)

  await m.reply(`✅ تم ضبط التذكير بنجاح\n🕒 الوقت: ${time}\n🔁 التكرار: ${repeat}\n💬 الرسالة: ${message}\n⏳ الوقت المتبقي: ${remainingTime}`)
}

handler.command = /^ذكرني$/i
handler.help = ['ذكرني']
handler.tags = ['tools']
handler.group = false

export default handler