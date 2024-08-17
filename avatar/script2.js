const videoElement = document.getElementsByClassName('input_video')[0];
const canvasCharacterElement = document.getElementsByClassName('output_canvas')[0];
const canvasElement = document.getElementsByClassName('character_canvas')[0];
//결과를 보기 위해 위의 코드에서 canvasCharacterElement, canvasElement 바꿔서 처리함. 
//
const canvasCtx = canvasElement.getContext('2d');
let mixer; // 애니메이션 믹서를 전역 변수로 선언
(async function main() {
    {
        // 캐릭터 로드하기
        canvasCharacterElement.width = canvasCharacterElement.offsetWidth;
        canvasCharacterElement.height = canvasCharacterElement.offsetHeight;
        const scene = new THREE.Scene();//3d 무대. 렌더러에 추가하면 3d 무대를 송출할 수 있음. 
        const camera_three = new THREE.PerspectiveCamera(75, canvasCharacterElement.width / canvasCharacterElement.height, 0.1, 1000);
        camera_three.position.set(0, 1, 2); // 모델 위치 조정
        camera_three.lookAt(0, 1, 0); // 모델 찍는 카메라 위치 조절
        //렌더러 설정. scene을화면 송출하는 것. 
        const renderer = new THREE.WebGLRenderer({ canvas: canvasCharacterElement, antialias: true, transparent: true });
        renderer.setSize(canvasCharacterElement.width, canvasCharacterElement.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        //모델이 있는 장소의 조명(빛) 설정
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(-8, 12, 8).normalize();
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 500;
        scene.add(dirLight);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        //모델 가져오기
        const modelUrl = 'https://api.readyplayer.me/v1/avatars/61ce5704d8df61381f95953f.glb';
        const loadingManager = new THREE.LoadingManager(() => { /* Optional: callback after loading */ });
        const loader = new THREE.GLTFLoader(loadingManager);
        loader.load(
            modelUrl,
            (gltf) => {
                scene.add(gltf.scene); //장소에 모델 추가하기
                //모델 크기 및 위치 조정
                gltf.scene.position.set(0, 0, 0);
                gltf.scene.scale.set(1, 1, 1);
                //렌더러에 카메라와 장소 추가하기-렌더러는 화면 송출하는 것. 
                renderer.render(scene, camera_three);
            },
            undefined,
            function (error) {
                console.error('An error occurred while loading the model:', error);
            }
        );
    }

    //
    function onResults(results) {
        drawMesh(results);
        drawCharacter(results); //아직정의 안함.
    }

    // Initialize MediaPipe Holistic -  내 카메라 움직임을 분석하는 도구
    const holistic = new Holistic({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    }});
    holistic.setOptions({
        modelComplexity: 0.1, //모델의 복잡도. 높을 수록 성능이 좋고 느림. 
        smoothLandmarks: true, 
        enableSegmentation: true,
        smoothSegmentation: true,
        refineFaceLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    //홀리스틱의 좌표 결과값을 저장. 
    holistic.onResults(onResults);

    // 비디오 요소를 홀리스틱에 연결. videoElement는 html에 정의한 video 객체. 
    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await holistic.send({image: videoElement});
        },
        width: 1280,
        height: 720
    });

    // 비디오 객체 스트림 가져오기. 
    navigator.mediaDevices.getUserMedia({
        video: {
            width: 1280,
            height: 720
        }
    }).then((stream) => {
        videoElement.srcObject = stream;
        let playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                camera.start();
            });
        }
    }).catch((error) => {
        console.error('Error accessing media devices.', error);
    });
})();

const drawCharacter = (results) => {
    /*
    //좌표값만 가져옴. 
    if (!mixer||!results) return; // 애니메이션 믹서가 준비되지 않았을 경우 처리
    // landmark 매칭
    let facelm = results.faceLandmarks;
    let poselm = results.poseLandmarks;
    let poselm3D = results.ea;
    let rightHandlm = results.rightHandLandmarks;
    let leftHandlm = results.leftHandLandmarks;

    let faceRig = Kalidokit.Face.solve(facelm,{runtime:'mediapipe',video:HTMLVideoElement});
    let poseRig = Kalidokit.Pose.solve(poselm3d,poselm,{runtime:'mediapipe',video:HTMLVideoElement});
    let rightHandRig = Kalidokit.Hand.solve(rightHandlm,"Right");
    let leftHandRig = Kalidokit.Hand.solve(leftHandlm,"Left");
    */
};

const drawMesh = (results) => {
    //화상회의 결과 가져온 값으로 랜드마크 및 초록색 칠하기
    let points = results;
    if (!canvasElement || !videoElement || !points) return;
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    canvasCtx.save();
    
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // 감지 영역에 초록색칠하기_  아예 비디오의 영상을 복사해서 캔버스에 붙여넣고, 초록색을 침함.  
    //초록색 칠하기 없애고 싶어 아래 코드 주석 처리
    //canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);
    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    //canvasCtx.fillStyle = '#00FF00';
    //canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop'; //'destination-atop' 모드로 비디오 이미지를 덮어쓰우는 모드 
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.globalCompositeOperation = 'source-over';
    canvasCtx.restore();
    
    //랜드 마크 그리기. 
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
        { color: '#00FF00', lineWidth: 4 });
    drawLandmarks(canvasCtx, results.poseLandmarks,
        { color: '#FF0000', lineWidth: 2 });
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
        { color: '#C0C0C070', lineWidth: 1 });
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
        { color: '#CC0000', lineWidth: 5 });
    drawLandmarks(canvasCtx, results.leftHandLandmarks,
        { color: '#00FF00', lineWidth: 2 });
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
        { color: '#00CC00', lineWidth: 5 });
    drawLandmarks(canvasCtx, results.rightHandLandmarks,
        { color: '#FF0000', lineWidth: 2 });
};
