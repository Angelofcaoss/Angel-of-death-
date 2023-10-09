const items = ['limit', 'exp'];
const confirmation = {};

async function handler(m, { conn, args, usedPrefix, command }) {
  if (confirmation[m.sender]) return conn.sendMessage(m.chat, {text: '*[❗] Aun hay fondos en transferencia, aguarda un momento.*', mentions: [m.sender]}, {quoted: m});
  const user = global.db.data.users[m.sender];
  const item = items.filter((v) => v in user && typeof user[v] == 'number');
  const lol = `*[❗] Uso del comamdo.* 
*—◉ ${usedPrefix + command}*  [tipo] [cantidad] [@user]
*📌 Ejemplo:* ${usedPrefix + command} exp 65 @${m.sender.split('@')[0]}

*—◉ 📍 Artículos transferibles.*
▢ *limit* = diamantes
▢ *exp* = experiencia
`.trim();
  const type = (args[0] || '').toLowerCase();
  if (!item.includes(type)) return conn.sendMessage(m.chat, {text: lol, mentions: [m.sender]}, {quoted: m});
  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  if (!who) return conn.sendMessage(m.chat, {text: '*[❗] Menciona al usuario que desea hacer la transferencia.*', mentions: [m.sender]}, {quoted: m});
  if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, {text: `*[❗] El usuario ${who} no está en la base de datos.*`, mentions: [m.sender]}, {quoted: m});
  if (user[type] * 1 < count) return conn.sendMessage(m.chat, {text: `*[❗] No tienes suficientes ${type} para transferir.*`, mentions: [m.sender]}, {quoted: m});
const confirm = `*¿Está seguro de que desea transferir ${count} ${type} a @${(who || '').replace(/@s\.whatsapp\.net/g, '')}?* 
*—◉ Tienes 60 segundos para confirmar*

*—◉ Escriba:* 
*◉ si = para acertar*
*◉ no = para cancelar*`.trim();
  await conn.sendMessage(m.chat, {text: confirm, mentions: [who]}, {quoted: m});