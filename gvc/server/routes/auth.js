const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'your_secret_key'; // 안전하게 관리

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: '토큰이 제공되지 않았습니다.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
        req.uid = decoded.uid;
        next();
    });
}

// 아이디 중복 확인 엔드포인트
router.post('/check-username', async (req, res) => {
    const { uid } = req.body;

    try {
        const user = await User.findOne({ where: { uid } });
        if (user) {
            return res.status(409).json({ message: '아이디가 이미 존재합니다.' });
        }
        res.status(200).json({ message: '아이디를 사용할 수 있습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 이메일 중복 확인 엔드포인트
router.post('/check-email', async (req, res) => {
    const { uemail } = req.body;

    try {
        const user = await User.findOne({ where: { uemail } });
        if (user) {
            return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
        }
        res.status(200).json({ message: '이메일을 사용할 수 있습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 전화번호 중복 확인 엔드포인트
router.post('/check-phoneNumber', async (req, res) => {
    const { utel } = req.body;

    try {
        const user = await User.findOne({ where: { utel } });
        if (user) {
            return res.status(409).json({ message: '이미 가입된 전화번호입니다.' });
        }
        res.status(200).json({ message: '전화번호를 사용할 수 있습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 로그인 엔드포인트
router.post('/login', async (req, res) => {
    const { uid, upassword } = req.body;

    try {
        const user = await User.findOne({ where: { uid } });

        if (user) {
            if (user.upassword === upassword) {
                const token = jwt.sign({ uid: user.uid, uemail: user.uemail }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ message: '로그인에 성공했습니다.', token, user: { uid: user.uid, uemail: user.uemail } });
            } else {
                res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            res.status(401).json({ message: '등록되지 않은 회원입니다.' });
        }
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 회원가입 엔드포인트
router.post('/register', async (req, res) => {
    const { uid, uname, uemail, upassword, utel, ubirth } = req.body;

    try {
        const formattedBirthDate = new Date(ubirth).toISOString().split('T')[0];

        const user = await User.create({
            uid,
            uname,
            uemail,
            upassword,
            utel,
            ubirth: formattedBirthDate,
        });
        res.status(201).json({ message: '회원가입에 성공했습니다.', user });
    } catch (error) {
        console.error('Error creating user:', error); // 에러 로그 추가
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 사용자 정보 엔드포인트
router.get('/userinfo', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ where: { uid: req.uid } });
        if (user) {
            res.status(200).json({ uid: user.uid, uemail: user.uemail }); 
        } else {
            res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

module.exports = router;