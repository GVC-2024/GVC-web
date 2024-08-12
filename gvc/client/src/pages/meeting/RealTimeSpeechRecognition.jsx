<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Speech Recognition and Translation with DeepL</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <h1>Real-Time Speech Recognition and Translation with DeepL</h1>

    <label for="recognitionLangSelect">Select Recognition Language:</label>
    <select id="recognitionLangSelect">
        <option value="en-US">English (US)</option>
        <option value="es-ES">Spanish</option>
        <option value="fr-FR">French</option>
        <option value="de-DE">German</option>
        <option value="zh-CN">Chinese (Mandarin)</option>
        <option value="ko-KR">Korean</option> <!-- 한국어 추가 -->
        <!-- 추가 언어를 여기에 추가할 수 있습니다 -->
    </select>

    <label for="targetLangSelect">Select Target Language:</label>
    <select id="targetLangSelect">
        <option value="DE">German</option>
        <option value="FR">French</option>
        <option value="ES">Spanish</option>
        <option value="IT">Italian</option>
        <option value="NL">Dutch</option>
        <option value="PL">Polish</option>
        <option value="RU">Russian</option>
        <option value="JA">Japanese</option>
        <option value="ZH">Chinese</option>
        <!-- 추가 언어를 여기에 추가할 수 있습니다 -->
    </select>

    <button id="startButton">Start Listening</button>
    <button id="stopButton" disabled>Stop Listening</button>

    <h2>Recognized Text:</h2>
    <p id="recognizedText"></p>

    <h2>Translated Text:</h2>
    <p id="translatedText"></p>

    <script>
        const startButton = document.getElementById('startButton');
        const stopButton = document.getElementById('stopButton');
        const recognizedText = document.getElementById('recognizedText');
        const translatedText = document.getElementById('translatedText');
        const recognitionLangSelect = document.getElementById('recognitionLangSelect');
        const targetLangSelect = document.getElementById('targetLangSelect');

        let recognition;
        let isRecognizing = false;

        // Web Speech API 사용
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true; // 실시간 인식
            recognition.interimResults = true; // 중간 결과 표시

            recognition.onstart = function() {
                isRecognizing = true;
                startButton.disabled = true;
                stopButton.disabled = false;
                recognizedText.textContent = '';
                translatedText.textContent = '';
            };

            recognition.onresult = function(event) {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = 0; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                        // 최종 텍스트 번역
                        translateText(finalTranscript);
                    } else {
                        interimTranscript += transcript;
                    }
                }

                recognizedText.textContent = finalTranscript || interimTranscript;
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
            };

            recognition.onend = function() {
                isRecognizing = false;
                startButton.disabled = false;
                stopButton.disabled = true;
            };
        } else {
            console.log('Web Speech API is not supported in this browser.');
        }

        function updateRecognitionLanguage() {
            const selectedLanguage = recognitionLangSelect.value;
            if (recognition) {
                recognition.lang = selectedLanguage;
            }
        }

        async function translateText(text) {
            const targetLang = targetLangSelect.value;
            const apiKey = 'd6bfe500-3143-489a-8668-a4a3979eadbd:fx'; // DeepL API 키
            const url = 'https://api-free.deepl.com/v2/translate';

            try {
                const response = await axios.post(url, null, {
                    params: {
                        auth_key: apiKey,
                        text: text,
                        target_lang: targetLang
                    }
                });

                const translated = response.data.translations[0].text;
                translatedText.textContent = translated;
            } catch (error) {
                console.error('Error translating text:', error);
            }
        }

        recognitionLangSelect.addEventListener('change', updateRecognitionLanguage);

        startButton.addEventListener('click', function() {
            if (recognition && !isRecognizing) {
                updateRecognitionLanguage(); // 언어 변경 반영
                recognition.start();
            }
        });

        stopButton.addEventListener('click', function() {
            if (recognition && isRecognizing) {
                recognition.stop();
            }
        });
    </script>
</body>
</html>
