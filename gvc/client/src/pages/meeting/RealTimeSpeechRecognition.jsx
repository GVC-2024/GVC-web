import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

function RealTimeSpeechTranslation({ socket, userNick }) {
    const [recognitionLang, setRecognitionLang] = useState('en-US');
    const [targetLang, setTargetLang] = useState('DE');
    const [recognizedText, setRecognizedText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [isMicOn, setIsMicOn] = useState(false);

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
                        // 번역된 텍스트를 소켓을 통해 송신
                        if (socket) {
                            socket.emit('sendTranslatedText', { userNick, text: finalTranscript });
                        }
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

        const handleMicState = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setMediaStream(stream);

                if (isMicOn) {
                    startRecognition();
                } else {
                    stopRecognition();
                }

                stream.getTracks()[0].addEventListener('ended', () => {
                    stopRecognition();
                    setIsMicOn(true);
                });
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        handleMicState();

        const muteButton = document.getElementById('mute');
        if (muteButton) {
            muteButton.addEventListener('click', toggleMic);
        }

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
            if (muteButton) {
                muteButton.removeEventListener('click', toggleMic);
            }
        };
    }, [isMicOn]);

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

    const toggleMic = () => {
        if (isMicOn) {
            stopRecognition();
        } else {
            startRecognition();
        }
        setIsMicOn(!isMicOn);
    };

    const translateText = async (text) => {
        const apiKey = 'd6bfe500-3143-489a-8668-a4a3979eadbd:fx';
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

            // 번역된 텍스트를 소켓을 통해 송신
            if (socket) {
                socket.emit('sendTranslatedText', {text: translated });
            }

        } catch (error) {
            console.error('Error translating text:', error);
        }
    };

    return (
        <div>
            <label htmlFor="recognitionLangSelect">Select Recognition Language:</label>
            <select id="recognitionLangSelect" onChange={(e) => setRecognitionLang(e.target.value)}>
                <option value="en-US">English(US)</option>
                <option value="ko-KR">Korean</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
                <option value="DE">German</option>
                <option value="IT">Italian</option>
                <option value="NL">Dutch</option>
                <option value="PL">Polish</option>
                <option value="RU">Russian</option>
                <option value="JA">Japanese</option>
                <option value="ZH">Chinese</option>
            </select>

            <label htmlFor="targetLangSelect">Select Target Language:</label>
            <select id="targetLangSelect" onChange={(e) => setTargetLang(e.target.value)}>
                <option value="en-US">English(US)</option>
                <option value="ko-KR">Korean</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
                <option value="DE">German</option>
                <option value="IT">Italian</option>
                <option value="NL">Dutch</option>
                <option value="PL">Polish</option>
                <option value="RU">Russian</option>
                <option value="JA">Japanese</option>
                <option value="ZH">Chinese</option>
            </select>

            <h2>Recognized Text:</h2>
            <p>{recognizedText}</p>

            <h2>Translated Text:</h2>
            <p>{translatedText}</p>
        </div>
    );
}

export default RealTimeSpeechTranslation;
