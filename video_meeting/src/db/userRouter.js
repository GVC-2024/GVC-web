const express = require('express');
const userDBC = require('./userDBC');

//사용 예시로 추정.
// 사용자에게 요청 받으면, 결과를 반환하는, api를 정의하는 페이지.

//const router = express.Router();: Express의 라우터 객체를 생성합니다.
// 이 객체를 사용하여 API 엔드포인트를 정의하고 해당 엔드포인트에 대한 HTTP 요청
const router = express.Router();
// 엔드포인트를 정의
// 소환할 엔드포인트 이름: getUsers
// /getUsers 경로로 들어오는 GET 요청을 처리하는 핸들러를 정의
router.get('/getUsers', async (req, res)=>
{
    //res_get_members는 user_DBC에서 정의한 쿼리함수의 결과값을 나타냄. 
    //status_code: 해당 쿼리가 잘 작동했는지 나타내는지를 나타냄.
    //members 나중에 쿼리가 잘 되면 집어 넣을 공간. 
    let res_get_members = 
    {
        status_code : 500,
        members : [] 
    };

    try
    {
        const rows = await userDBC.getUsers(); //쿼리 실행 및 쿼리 결과값 가져오기.
        res_get_members.status_code = 200; //에러없으면 잘 작동한 것.
        //결과값들 넣어주기.
        if(rows.length > 0)
        {
            rows.forEach((member)=>
            {
                //이미 정의 된 쿼리 열 이름대로 데이터 집어넣을려고 만든 문장.
                res_get_members.members.push
                ({
                    MB_ID : member.MB_ID,
                    MB_PW : member.MB_PW,
                    NAME : member.NAME,
                    PH_NUM : member.PH_NUM
                });
            });
        }
        else
        {
            console.log('사용자 없음');
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
    finally
    {

        //그냥 응답들 출력해주는 것. 생략가능.  
        //대신 res.json(res_get_members);로 처리해서 전달 가능.
        var result = '';

        for(var i=0; i < res_get_members.members.length; i++)
        {
        result += res_get_members.members[i].MB_ID;
        result += res_get_members.members[i].MB_PW;
        result += res_get_members.members[i].NAME;
        result += res_get_members.members[i].PH_NUM;
        
        result += "<br>";
        }
        //라우터 실행시 보내줄 데이터.
        
        res.send(result);
    }
});


module.exports = router;