import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RealTimeSpeechTranslation() {
    const [recognitionLang, setRecognitionLang] = useState('en-US');
    const [targetLang, setTargetLang] = useState('DE');
    const [recognizedText, setRecognizedText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [isRecognizing, setIsRecognizing] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;

            recognitionInstance.onstart = () => {
                setIsRecognizing(true);
                setRecognizedText('');
                setTranslatedText('');
            };

            recognitionInstance.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = 0; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                        translateText(finalTranscript);
                    } else {
                        interimTranscript += transcript;
                    }
                }

                setRecognizedText(finalTranscript || interimTranscript);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error', event.error);
            };

            recognitionInstance.onend = () => {
                setIsRecognizing(false);
            };

            setRecognition(recognitionInstance);
        } else {
            console.log('Web Speech API is not supported in this browser.');
        }
    }, []);

    const startRecognition = () => {
        if (recognition && !isRecognizing) {
            recognition.lang = recognitionLang;
            recognition.start();
        }
    };

    const stopRecognition = () => {
        if (recognition && isRecognizing) {
            recognition.stop();
        }
    };

    const translateText = async (text) => {
        const apiKey = 'd6bfe500-3143-489a-8668-a4a3979eadbd:fx'; // DeepL API 키를 사용하세요.
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
            setTranslatedText(translated);
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };

    return (
        <div>
            

            <label htmlFor="recognitionLangSelect">Select Recognition Language:</label>
            <select id="recognitionLangSelect" onChange={(e) => setRecognitionLang(e.target.value)}>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="zh-CN">Chinese (Mandarin)</option>
                <option value="ko-KR">Korean</option> {/* 한국어 추가 */}
            </select>

            <label htmlFor="targetLangSelect">Select Target Language:</label>
            <select id="targetLangSelect" onChange={(e) => setTargetLang(e.target.value)}>
                <option value="DE">German</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
                <option value="IT">Italian</option>
                <option value="NL">Dutch</option>
                <option value="PL">Polish</option>
                <option value="RU">Russian</option>
                <option value="JA">Japanese</option>
                <option value="ZH">Chinese</option>
            </select>

            <button onClick={startRecognition}
  disabled={isRecognizing}
  style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
>
  Start Listening
</button>
<button
  onClick={stopRecognition}
  disabled={!isRecognizing}
  style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
>
  Stop Listening
</button>


            <h2>Recognized Text:</h2>
            <p>{recognizedText}</p>

            <h2>Translated Text:</h2>
            <p>{translatedText}</p>
        </div>
    );
}

export default RealTimeSpeechTranslation;
