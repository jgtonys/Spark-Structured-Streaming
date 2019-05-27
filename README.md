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



1. 웹 서버에서 kafka topic 을 listen 하기 위해 kafka consumer 를 실행합니다.

   ![consumer](https://user-images.githubusercontent.com/33674947/58400749-f5df1b80-8096-11e9-8e45-8295a680c70a.png)

2. 터미널에서 Spark step2 application, 또는 임의로 인풋 개수와 시간을 조정한 python 파일을 실행합니다.

   터미널에서 어플리케이션을 실행할 수도 있으며, 웹에서 정해진 어플리케이션(1초 2000row씩 전송, emp1.csv)을 다음과 같이 선택하고 실행할 수도 있습니다.**하드코딩 되어있기에 터미널에서 어플리케이션을 실행하는 것이 좋습니다**
   ![input_select](https://user-images.githubusercontent.com/33674947/58400750-f677b200-8096-11e9-8164-089432dfa98e.png)

3. 웹서버에서 들어오는 input 을 monitoring 합니다.

   ![monitoring](https://user-images.githubusercontent.com/33674947/58400752-f677b200-8096-11e9-9cda-530ee512fd3b.png)
