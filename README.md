## Monitoring Page Manual

*현재 서버에 모두 설치와 빌드가 되어있는 상황입니다*

`/Web/Spark-Structured-Streaming/` 폴더에 존재합니다.

아래의 설치와 빌드없이 `npm start` 로 서버 (http://165.132.105.28:3000/) 에서 확인 가능합니다.

자세한 실행법은 아래와 같습니다.



### 설치법

환경 : node v8.10.0, npm v3.5.2

웹 루트 디렉토리에서

```bash
npm install
```

웹 디렉토리 안의 client 폴더에서

```bash
npm install
```



### 실행법

`npm run build` : vue client 파일 build 및 서버 실행

`client/npm run build` : vue client 파일만 빌드

`npm start` : 서버만 실행



*웹 서버가 실행된 경우 <http://165.132.105.28:3000/> 에서 확인할 수 있습니다*

*웹 서버의 Spark Environment 는 현재 작동하지 않습니다*

**서버에 zookeeper, Kafka server, Spark application step3, step4, step4_2, step4_tunning 이 실행되어 있는 상황에서 웹 서버에 접속합니다.**



1. 웹 서버에서 kafka topic(step2,step3,step4,step4_2,step4_tunning) 을 listen 하기 위해 kafka consumer 를 실행합니다.

   ![consumer](https://user-images.githubusercontent.com/33674947/58400749-f5df1b80-8096-11e9-8e45-8295a680c70a.png)

2. 터미널에서 Spark step2 application, 또는 임의로 인풋 개수와 시간을 조정한 python 파일을 실행합니다.

   터미널에서 어플리케이션을 실행할 수도 있으며, 웹에서 정해진 어플리케이션(1초 2000row씩 전송, emp1.csv)을 다음과 같이 선택하고 실행할 수도 있습니다.**하드코딩 되어있기에 터미널에서 어플리케이션을 실행하는 것이 좋습니다**
   ![input_select](https://user-images.githubusercontent.com/33674947/58400750-f677b200-8096-11e9-8164-089432dfa98e.png)

3. 웹서버에서 들어오는 input 을 monitoring 합니다.

   ![monitoring](https://user-images.githubusercontent.com/33674947/58400752-f677b200-8096-11e9-9cda-530ee512fd3b.png)



### 구조

**Node server**

- app

  - controllers

    - file.controller.js

      > /uploads 에 저장된 csv 파일들을 불러오거나, 웹에서 업로드한 csv 파일들을 처리합니다

    - kafka.controller.js

      > 웹의 kafak environment 의 동작을 처리합니다.

    - main.controller.js

      > 메인 SPA 페이지를 출력합니다.

  - routes

    - main.route.js

      > 모든 라우팅 요청을 처리합니다.

- client

  > 클라이언트 구조에서 설명합니다.

- config

  - config.js

    > export 되는 웹포트의 설정과, 세션 암호화 키입니다.

  - Express.js

    > express 의 설정과 static 파일 설정, production mode 의 설정입니다.

  - fileReader.js

    > uploads 의 csv 파일들을 불러오는 기능을 합니다.

  - **localData.js**

    > 하드코딩된 다른 application 의 경로를 바꾸어주는 파일입니다.

  - socket.js

    > Kafka로부터 들어오는 topic 을 listen 하는 socket 설정 부분입니다.

  - testJson.js

    > 테스트 파일입니다. (현재 사용X)

- uploads

  - files

    > 웹의 application 에서 실행할 csv 파일들이 저장되어있는 폴더입니다.



**Vue client**

- dist

  > 빌드된 client 파일이 생성되는 폴더입니다.

- public

  > favicon 과 뼈대가 되는 index.html 의 폴더입니다.

- src

  - assets

    > static 데이터들의 폴더입니다.

  - components

    > 웹 구조에 들어갈 세부 component 들 입니다.

  - layout

    > 웹 구조의 component 들을 담고 있습니다.

  - pages

    > 웹의 각 페이지를 정의합니다.

  - plugins

    > global component 들을 설정합니다. (현재 사용X)

  - router

    > 모든 vue-route 를 설정합니다.

  - App.vue

    > 메인 vue 파일로 전체 구조를 담고 있습니다.

  - main.js

    > 메인 vue 의 socket 연결과 디자인, 서버 통신을 정의합니다.

  - store.js

    > 모든 client 내의 데이터를 저장하고 불러오는 파일입니다.

- package.json

  > 의존성 패키지 목록입니다.

- vue.config.js

  > vue 빌드환경 설정입니다.
