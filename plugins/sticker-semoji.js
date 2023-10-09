import {sticker, addExif} from '../lib/sticker.js';
import {Sticker} from 'wa-sticker-formatter';
import fetch from 'node-fetch';
import got from 'got';
import cheerio from 'cheerio';
const handler = async (m, {usedPrefix, conn, args, text, command}) => {
  let [tipe, emoji] = text.includes('|') ? text.split('|') : args;
  const defaultType = 'apple';
  if (tipe && !emoji) {
    emoji = '😎';
    tipe = defaultType;
  }
  const err = `*[❗] 𝙴𝙻 𝚄𝚂𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾 𝙳𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙴𝚂*
*◉ ${usedPrefix + command} <tipo> <emoji>*

*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*
*◉ ${usedPrefix + command}* fa 😎

*—◉ 𝚃𝙸𝙿𝙾𝚂* 

*◉ wha = whatsapp* 
*◉ ap = apple*
*◉ fa = facebook*
*◉ mi = microsoft*
*◉ ht = htc*
*◉ tw = twitter*
*◉ go = google*
*◉ mo = mozilla*
*◉ op = openmoji*