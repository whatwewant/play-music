/**
* @Author: eason
* @Date:   2017-07-13T10:23:38+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-07-13T12:47:09+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

export function device() {
  const ua = navigator.userAgent; // eslint-disable-line

  const android = ua.match(/(Android);?[\s/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

  return { android, ipad, ipod, iphone };
}

export function isiOS() {
  const ua = navigator.userAgent; // eslint-disable-line

  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  return ipad || ipod || iphone;
}

export function isAndroid() {
  const ua = navigator.userAgent; // eslint-disable-line
  return ua.match(/(Android);?[\s/]+([\d.]+)?/);
}

export function isWeixin() {
  const ua = navigator.userAgent; // eslint-disable-line
  return /MicroMessenger/i.test(ua);
}
