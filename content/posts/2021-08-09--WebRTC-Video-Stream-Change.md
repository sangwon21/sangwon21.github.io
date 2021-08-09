---
title: WebRTC 연결 시 Video Stream 변경
date: "2021-08-09T10:24:43.539Z"
template: "post"
draft: false
slug: "WebRTC-Video-Stream-Change"
category: "WebRTC"
tags:
  - "WebRTC"
description: "WebRTC 연결 시 Video Stream 변경에 따른 Peer의 상태 변화"
socialImage: "/media/42-line-bible.jpg"
---

# WebRTC 연결시 Video Stream 변경

- 전제

  - 이미 WebRTC 연결이 맺어져 있다

- 상황
  - A와 B가 WebRTC로 연결되어 있다
  - B의 화면을 공유 중이었다 (A는 자신의 화면을 가져오지도 않았다)
  - A의 화면을 B에게 공유한다

```javascript
peer.onnegotiationneeded = async () => {
  const { sdp } = await peer.createOfferSdp();
  this.sdp = sdp;
};

peer.onsignalingstatechange = () => {
  this.sendSdp({ sdp: this.sdp });
};

peer.addTrack(mediaStream.getVideoTracks()[0], mediaStream);
```

- [참고1](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/negotiationneeded_event)
- [참고2](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange)
- [참고3](https://stackoverflow.com/questions/39126347/webrtc-switch-camera)
- [참고4](https://stackoverflow.com/questions/23497037/change-the-videotrack-of-a-mediastream-object)
