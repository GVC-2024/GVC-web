	  PS C:\Users\SM-PC\Desktop\졸프 모든 프로젝트 관리\meeting> npm list
	  meeting@1.0.0 C:\Users\SM-PC\Desktop\졸프 모든 프로젝트 관리\meeting
	  ├── @mediapipe/camera_utils@0.3.1675466862
	  ├── @mediapipe/holistic@0.5.1675471629
	  ├── @mediapipe/pose@0.5.1675469404
	  ├── express@4.19.2
	  ├── kalidokit@1.1.5
	  ├── mysql2@3.10.3
	  ├── node-gyp@10.2.0
	  ├── node-webcam@0.8.2
	  ├── peer@0.6.1
	  ├── pixi-live2d-display@0.4.0
	  ├── socket.io@4.7.5
	  ├── three-vrm@0.0.17
	  ├── three@0.103.0
	  ├── vite@5.4.0
	  ├── webpack-cli@5.1.4
	  ├── webpack-dev-server@5.0.4
	  └── webpack@5.93.0를 설치한 명령어

npm install @mediapipe/camera_utils@0.3.1675466862 @mediapipe/holistic@0.5.1675471629 @mediapipe/pose@0.5.1675469404 express@4.19.2 kalidokit@1.1.5 mysql2@3.10.3 node-gyp@10.2.0 node-webcam@0.8.2 peer@0.6.1 pixi-live2d-display@0.4.0 socket.io@4.7.5 three-vrm@0.0.17 three@0.103.0 vite@5.4.0 webpack-cli@5.1.4 webpack-dev-server@5.0.4 webpack@5.93.0

위의 명령어 그대로 복사해서 붙여넣기.

설치하지 않아도 되는 명령어: socket.io 등. 

기술 스택 선택:

캐릭터 트래킹: OpenCV 또는 Mediapipe
캐릭터 애니메이션: Blender, Three.js, 또는 Live2D와 Live2D의 SDK

라이브2d를 사용한 것(몸 전체 커버 가능)
https://github.com/yeemachine/kalidokit

블렌더를 사용한 것.
https://github.com/jays0606/mediapipe-facelandmark-demo

mediapipe: 공식문서
https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/holistic.md
three.js  공식문서
https://threejs.org/docs/
