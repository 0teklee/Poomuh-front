
# [프로젝트 회고](https://velog.io/@leetekwoo/2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0)
# 담당 기능 데모

## 지도 컴포넌트 (범위 내 매물 불러오기)
### <img src="public/poomang_map.gif">

## 지도 범위 내 매물 검색 및 필터링
### <img src="public/poomang_search.gif">
### <img src="public/poomang_filter_1.gif">
### <img src="public/poomang_filter_2.gif">

## 매물 등록 
### <img src="public/poomang_register.gif">


### Description

- Poomang은 부동산 중개 플랫폼 서비스입니다. 부동산 중개 플랫폼 다방의 디자인과 기획만 참고하였습니다. 5명의 팀원들과 함께 서버/클라이언트를 개발하고 배포까지 진행했습니다.  
### 개발 인원 및 기간

- 개발기간 : 2022/4/18 ~ 2022/5/6
- 개발 인원 : 프론트엔드 3명, 백엔드 2명
- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/justcode-4-2nd-poomuh-back)

### Project Goal

- 오픈 API를 통해 **다양한 이벤트 처리**를 해야하는 서비스에 도전하고자 했습니다.
- 백엔드 **서버에 저장된 매물의 등록, 수정, 삭제 상태가 지도 UI에 반영**되도록 API를 활용하고 싶었습니다.

### Tech Stack

`React.js`, `Styled-Components`, `Context API`, `KaKao Maps API`, `react-daum-postcode api` 

### Responsibilities

- 부동산 매물 등록 / 수정 페이지
    - 페이지 내 모든 input 을 컴포넌트 분리하고, `**Context API**` 를 활용해 리렌더링을 최소화
    - `**react-daum-postcode api**`를 이용해 상세주소 검색창을 모달로 구현하고, 모달에서 선택한 검색 결과 주소로 `**Kakao map api**` 의 지도를 업데이트하도록 구현

- 부동산 매물 탐색 페이지 지도 컴포넌트
    - **`Context API`**로 지도의 좌표 정보와 범위 내의 매물 데이터를 페이지 안에서 전역으로 관리하게끔 로직을 단순화하였고, 이를 통해 팀 생산성을 개선함
    
- 부동산 매물 탐색 페이지 검색/필터링 모달
    - onClick 이벤트로 모달 밖 영역 클릭 시 모달이 꺼지도록 개선
    - 방 종류와 거래 종류에 따른 필터링 기능 구현
    - 매물, 주소 검색 기능 구현

## 적용 기술 및 구현 기능

### 적용 기술

> - Front-End : React.js, Styled-Components, react-modal
> - Back-End : Python, Django web framework, Beautifulsoup, Selenium, Bcrypt, My SQL
> - Common : AWS(EC2,RDS), RESTful API

### 구현 기능

#### 메인페이지

#### 지도

- 지도 API 구현
- 매물 검색 / 필터
- 매물 리스트 컴포넌트
- 중개자 정보, 연락처 모달

#### 관심목록

- 최근 본 방 리스트
- 찜한 방 리스트

#### 방 내놓기

- 매물 등록
- 내 방 관리 (매물 관리)

#### 로그인

- 일반, 중개인 공통 로그인 기능 구현

#### 회원가입

- 일반, 중개인 회원가입을 한 페이지에 구현

## Reference

- 이 프로젝트는 [다방](http://dabangapp.com) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
