/**
 * @Author: eason
 * @Date:   2017-05-28T15:55:40+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-05-29T02:02:52+08:00
 */

 function resolveLyricTime(t) {
   const [minute, second] = t.split(':');
   return (((+minute) * 60) + (+second)).toFixed(3);
 }

 export function resolveLyric(lyric) {
   if (!lyric) return [];

  //  const reg = /\[(\d+:\d+\.\d+)\](.*)/g;
   const lines = lyric.split('\n');
   return lines.map((e) => {
     const [_, time, lrc] = /\[(\d+:\d+\.\d+)\](.*)/g.exec(e) || []; // eslint-disable-line
     if (time && lrc) {
       return {
         time,
         timestamps: resolveLyricTime(time),
         lrc: lrc.trim(),
       };
     } else {
       return null;
     }
   }).filter(e => !!e);
 }

 export function secondsToTime(seconds) {
   const minute = parseInt(seconds / 60, 10);
   const second = parseInt(seconds % 60, 10);
   return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`; // eslint-disable-line
 }

 export function secondsToProgress(current, duration) {
   return current / duration;
 }
