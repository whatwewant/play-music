<!--
@Author: eason
@Date:   2017-05-02T10:11:02+08:00
@Email:  uniquecolesmith@gmail.com
@Last modified by:   eason
@Last modified time: 2017-05-14T00:44:28+08:00
@License: MIT
@Copyright: Eason(uniquecolesmith@gmail.com)
-->

# Netease Music Mobile

Simple mobile netease music powered by React + [Dva](https://github.com/dvajs/dva) + [Roadhog](https://github.com/sorrycc/roadhog)

### Demo
* [Demo](moeover.com/play-music/)
* ![QR](http://moeover.com/images/music-app/qr.jpg)

### Overview

  <image width="320px" src="http://moeover.com/images/music-app/1.home.jpg" />
  <image width="320px" src="http://moeover.com/images/music-app/2.playlist.jpg" />
  <image width="320px" src="http://moeover.com/images/music-app/3.rank.jpg" />
  <image width="320px" src="http://moeover.com/images/music-app/4.playlist.detail.1.jpg" />
  <image width="320px" src="http://moeover.com/images/music-app/4.playlist.detail.2.jpg" />
  <image width="320px" src="http://moeover.com/images/music-app/4.playlist.detail.3.jpg" />

### Knowledgemap
- [Dva](https://github.com/dvajs/dva):
  - Redux + Redux-saga + React-router + React-router-redux + React-redux
  - **The Easiest way to use react + redux**
- [Roadhog](https://github.com/sorrycc/roadhog):
  - a command line tools to use webpack, like [create-react-app](https://github.com/facebookincubator/create-react-app)
- [React-Router Async](https://segmentfault.com/a/1190000006063554#articleHeader25)
- [PWA: Service Woker vs AppCache --- OfflinePlugin](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c)
  - [Service Worker, what are you ?](http://kosamari.com/notes/Service-Worker-what-are-you)
  - PWA: [Chromium Blog: 深度集成渐进式 Web App 到 Android](http://www.zcfy.cc/article/chromium-blog-integrating-progressive-web-apps-deeply-into-android-2467.html)
- Desktop: Wrapper with [Electron], [Electron-forge](https://github.com/electron-userland/electron-forge)
- [Mobile Web Skills](https://juejin.im/collection/58faccb41e35c9353d93648c)
- [Deploy API Server on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

### TODOs
* [ ] Pages
  * [x] Home Page
  * [x] Playlists Page
  * [x] One Playlist Detail Page
  * [x] Rank Page
  * [x] Audio Playlist Page
  * [ ] Audio Play Detail Page
  * [ ] Radio Page
* [ ] Features
  * [x] Async React-Router
  * [x] PWA: Progressive Web Application
  * [x] Scroll Smooth on Mobile
  * [x] Html Audio Questions on IOS
  * [ ] LazyLoad: lazy load image resource
  * [ ] React Motion, like material motion

### How to

```sh
git clone https://github.com/whatwewant/play-music.git
npm i
npm start
```

### Thanks
