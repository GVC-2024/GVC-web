const express = require('express');
const router = express.Router();
const Link = require('../models/link');
const LinkUser = require('../models/linkUser');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // 안전하게 관리

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[[1]]; // Bearer 토큰에서 실제 토큰 추출
    if (!token) return res.status(403).json({ message: '토큰이 제공되지 않았습니다.' });
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    req.uid = decoded.uid;
    next();
    });
    }
    

// 링크 저장 엔드포인트
router.post('/save-link', verifyToken, async (req, res) => {
    const { url, allowedUsers, ownerId } = req.body; // ownerId 추가

    try {
        const newLink = await Link.create({
            url,
            ownerId: ownerId || req.uid // ownerId가 없는 경우 req.uid 사용
        });

        // allowedUsers 배열에 있는 사용자들을 LinkUser 테이블에 추가
        for (const userId of allowedUsers) {
            await LinkUser.create({
                linkId: newLink.lid,
                userId: userId
            });
        }

        res.status(201).json(newLink);
    } catch (error) {
        console.error('Error saving link:', error); // 에러 로그 추가
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 링크 가져오기 엔드포인트
router.get('/get-links', verifyToken, async (req, res) => {
    try {
        const links = await Link.findAll({
            where: {
                [Op.or]: [
                    { ownerId: req.uid },
                    { '$LinkUsers.userId$': req.uid }
                ]
            },
            include: [{
                model: LinkUser,
                as: 'LinkUsers'
            }]
        });
        res.status(200).json(links);
    } catch (error) {
        console.error('Error fetching links:', error); // 에러 로그 추가
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

router.post('/add-user/:linkId', verifyToken, async (req, res) => {
    const { linkId } = req.params;
    const { userId } = req.body;
    
    try {
    // 링크가 존재하는지 확인
    const link = await Link.findByPk(linkId);
    if (!link) {
    return res.status(404).json({ message: '링크를 찾을 수 없습니다.' });
    }
    
    // 이미 추가된 사용자인지 확인
    const existingUser = await LinkUser.findOne({
    where: { linkId, userId }
    });
    if (existingUser) {
    return res.status(400).json({ message: '이미 추가된 사용자입니다.' });
    }
    
    // 새 사용자 추가
    await LinkUser.create({
    linkId,
    userId
    });
    
    res.status(200).json({ message: '사용자가 성공적으로 추가되었습니다.' });
    } catch (error) {
    console.error('Error adding user to link:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
    });
    
    router.delete('/delete-link/:linkId', verifyToken, async (req, res) => {
        const { linkId } = req.params;
        
        try {
        const link = await Link.findByPk(linkId);
        if (!link) {
        return res.status(404).json({ message: '링크를 찾을 수 없습니다.' });
        }
        
        if (link.ownerId !== req.uid) {
        return res.status(403).json({ message: '이 링크를 삭제할 권한이 없습니다.' });
        }
        
        await link.destroy();
        res.status(200).json({ message: '링크가 성공적으로 삭제되었습니다.' });
        } catch (error) {
        console.error('링크 삭제 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
        }
        });

        
module.exports = router;
