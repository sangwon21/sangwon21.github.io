---
title: WebRTC를 이해하기 위한 기본 개념
date: "2021-08-10T06:07:59.770Z"
template: "post"
draft: false
slug: "WebRTC Basic Concepts"
category: "WebRTC"
tags:
  - "WebRTC"
  - "NAT"
description: "WebRTC Basic Concepts"
socialImage: "/media/42-line-bible.jpg"
---

# WebRTC를 이해하기 위한 기본 개념

## NAT

- NAT는 Network Address Translation의 약자
- 말 그래로 네트워크 주소 변환 기술
- 출발지 및 목적지의 IP주소와 포트 숫자등을 바꿔 재기록하면서 네트워크 트래픽을 주고받을 수 있는 기술
- 여러 대 컴퓨터들의 IP 주소를 하나의 IP주소로 교환 가능
- 예를 들어, A 컴퓨터에서 나가는 패킷에 A 컴퓨터의 IP주소와 공유기 IP 주소, 그리고 목적지 IP 주소를 모두 NAT 테이블에 보관
- 만약, 외부에서 공인 IP로 요청이 들어왔을 때는 NAT 테이블을 이용하여, 컴퓨터 A에 전달될 수 있도록 중간에서 중계
- 이 NAT에는 4가지 방식이 존재하는데, 각각 경우에 따라서, NAT가 패킷을 통과시키는 경우와 통과시키지 않는 경우 존재

## One to One NAT 방식

![One-to-One NAT](/media/one-to-one-nat.png)

- 위에 보이는 표는 임의로 작성한 NAT 테이블
- Internal ip는 사설 ip, External ip는 외부 ip, Destination ip는 목적지 ip를 의미
- 밑에 보이는 4개는 각각 네트워크 요청
- 왼쪽 2개는 각각 출발지 port, ip이고 오른쪽 2개는 각각 도착지 ip, port
- One-to-One NAT는 출발지 ip와 port가 NAT 테이블에 존재하기만 한다면, 패킷을 통과

## Address Restricted NAT 방식

![Address-Restricted NAT](/media/address-restricted-nat.png)

- 목적지 ip가 NAT 테이블에 존재하기만 하면, 패킷을 통과

## Port Restricted NAT 방식

![Port-Restricted NAT](/media/port-restricted-nat.png)

- 목적지 ip와 port가 NAT테이블에 존재하기만 하면 패킷을 통과

## Symmetric NAT 방식

![Symmetric NAT](/media/symmetric-nat.png)

- NAT테이블에 노란색으로 칠해진 모든 부분이 정확히 일치해야 통과
- 즉,공유기 ip와 port, 목적지 ip와 port가 모두 일치해야 통과
- 4가지 중에서 앞선 3가지 NAT방식은 STUN 서버를 사용 가능
- Symmetric NAT 방식은 사용이 불가
- Symmetric 방식을 위하여, TURN 서버를 사용

## STUN 서버

![STUN Server](/media/stun-server.png)

- STUN 서버를 통하여 WebRTC를 연결한다고 가정
- 앞서 말한 NAT 때문에, 외부에서는 공유기 뒤에 있는 사설 ip를 알 방법이 전무
- 즉, A라는 컴퓨터가 B라는 컴퓨터를 바라볼 때는 B 컴퓨터의 사설 ip를 모름
- 더불어, B 컴퓨터는 자신의 공인 ip 주소를 모름
- 왜냐하면, 인터넷 세상에 연결시켜주는 공유기의 ip 주소를 모르기 때문
- 이 때, STUN서버에 요청
- A 컴퓨터에서 STUN서버에 요청을 보내면, A 컴퓨터가 공유기를 통하여 변환된 ip주소를 응답 패킷에 동봉하여, A 컴퓨터에게 전송
- 이 과정을 통하면 A 컴퓨터는 자신의 공인 ip 주소를 획득
- B 컴퓨터 역시 이 과정을 거치게 됩니다.
- WebRTC에서는 '시그널링(Signaling)' 과정을 통하여, A 컴퓨터는 자신이 연결해야 하는 B 컴퓨터의 공인 ip 주소를, B 컴퓨터는 A 컴퓨터의 공인 ip 주소를, 획득
- 이 둘은 이렇게 연결 성립
- 이 과정에서, Symmetric NAT는 STUN 서버를 사용 불가
- 왜냐하면 A 컴퓨터가 B 컴퓨터와 연결을 시도한다면, Symmetric NAT는 아마 이렇게 불평
- 내 NAT 테이블에 있는 공인 ip는 STUN서버와 연결되어 있지, A 컴퓨터는 연결한 적이 없기에 NAT테이블엔 존재하지 않는다!

## TURN 서버

![TURN Server](/media/turn-server.png)

- Symmetric NAT 경우에는 다른 방법을 사용
- 이 방법이 TURN 서버
- TURN 서버는 '잘' 알려진 서버입니다.
- 그래서, A와 B 모두 이 서버와 연결 성립
- 이 서버와 연결을 이루면, 이 서버를 통한 패킷은 NAT를 통과 가능
- 그래서 이 서버에서 A와 B의 연결을 중계

## ICE와 SDP

![ICE-SDP](/media/ice-sdp.png)

- ICE는 Interactive Connectivity Establishment의 약자
- WebRTC에 사용할 수 있는 STUN 서버와 TURN 서버를 고르는 과정
- SDP는 WebRTC에 참여하는 참여자의 정보
- 예를 들어, 사용하는 비디오의 코덱이 될 수도 있고, 앞에서 본 것처럼 공인 ip 주소도 포함
- 시그널링(Signaling)은 이 SDP를 WebRTC에 참여하는 객체들끼리 교환하는 과정

## 비유를 통한 WebRTC

![WebRTC Analogy](/media/webrtc-analogy.png)
