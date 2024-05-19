import React, { useState } from 'react';
import './LoginSearchPage.css';


const LoginSearchPage = () => {
    //전체오류 메세지.
    const [formError, setFormError] = useState(false); // 폼 오류 상태

    // 아이디를 찾기 위한 변수 선언
    const [userDetails_ID, setUserDetailsID] = useState({
        username: '', //유저 이름
        connectionTool: '', //연결방식
        phoneNumber: '', //핸드폰 번호
        email: '', //이메일

    });  
    //비밀번호를 찾기 위한 변수 선언
    const [userDetails_PW, setUserDetailsPW] = useState({
        username: '', //유저 이름
        connectionTool: '', //연결방식
        phoneNumber: '', //핸드폰 번호
        email: '', //이메일
        userID: '' //유저 아이디

    });

    const handleInputChangeID = (e) => {
        const { name, value } = e.target;
        setUserDetailsID({
            ...userDetails_ID,
            [name]: value
        });

        
    };

    const handleInputChangePW = (e) => {
        const { name, value } = e.target;
        setUserDetailsPW(prev => ({ ...prev, [name]: value }));
    };


    //아이디 찾기를 했을 때 작성하지 않은 것이 있는지 확인하는 함수
    const chenckEmtySearchID = () => {
        //인증 수단으로 휴대전화 번호를 선택한 경우
        if(userDetails_ID.connectionTool==="connect_phone"){
            if (!userDetails_ID.username) {
                console.log('Form submitted:', userDetails_ID);
                alert('아이디를 입력하지 않으셨습니다. ' + userDetails_ID.username);
                return false;
            }
            else if(!userDetails_ID.phoneNumber){
                alert('휴대전화를 입력하지 않으셨습니다.');
                return false;
            }
            else return true
        }
        //인증 수단으로 이메일을 선택한 경우
        else if(userDetails_ID.connectionTool==="connect_mail"){
            if (!userDetails_ID.username || !userDetails_ID.email) {
                return false;
            }
            else return true
        }
        
    };
    //비밀번호 찾기를 했을 때 작성하지 않은것이 있는지 확인한다
    const chenckEmtySearchPW = () => {
        //인증 수단으로 휴대전화 번호를 선택한 경우
        if(userDetails_PW.connectionTool==="connect_phone"){
            if (!userDetails_PW.username || !userDetails_PW.phoneNumber || !userDetails_PW.userID) {
                return false;
            }
            else return true
        }
        //인증 수단으로 이메일을 선택한 경우
        else if(userDetails_PW.connectionTool==="connect_mail"){
            if (!userDetails_PW.username || !userDetails_PW.email || !userDetails_PW.userID) {
                return false;
            }
            else return true
        }

    };
    //형식이 맞는지, 데이터 베이스에 있는 건지 확인한다.
    const chenckValidateEmail = (email) => {
            // 이메일 주소의 유효성을 검사하는 정규 표현식
            const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            var isRihgtForm=emailPattern.test(email);
            if(isRihgtForm===false){
                return false;
            } 
            // 정규 표현식을 사용하여 이메일 주소가 유효한 형식인지 확인

        // 이메일 형식이 맞는지 확인한다
        // 아직 데이터베이스가 없으므로 비워놓음
        return true;
    }
    // 유효한 전화번호인지 확인한다.
    
    const chenckValidateTelephone = (phoneNumber) => {
        // 전화번호 형식이 맞는지 확인한다
        
        const phoneNumberPattern = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/; // 휴대전화 번호는 숫자로 이루어진 문자열이어야 합니다.
        var isRihgtForm=phoneNumberPattern.test(phoneNumber) // 정규 표현식을 사용하여 휴대전화 번호가 유효한 형식인지 확인합니다.
        if(isRihgtForm===false){
            return false;
        } 

        // 아직 데이터베이스가 없으므로 비워놓음
        return true;
    }
    //유효한 아이디인지 확인한다. 
    
    const chenckValidateID = () => {
        //아직 데이터베이스가 없으 므로 비워놓음
        return true;
    }
    //유효한 이름인인지 확인한다. 
    const chenckValidateName = () => {
        // 아직 데이터 베이스가 없으므로 비워놓음.
        return true;
    }
    // 빠진 것이 없고, 모든 데이터를 유효하게 입력했는지 확인한다. 
    //chenckValidateEmail chenckValidateTelephone chenckValidateID chenckValidateName
    //phoneNumber email
    const validateForm_ID = () => {
        if(userDetails_ID.connectionTool==='connect_phone'){
            if (!chenckValidateName(userDetails_ID.username) || !chenckValidateTelephone(userDetails_ID.phoneNumber)) {
                return false;
            }
        }
        else{
            if (!chenckValidateName(userDetails_ID.username) || !chenckValidateEmail(userDetails_ID.email)) {
                return false;
            }

        }
        return true;
    };

    const validateForm_PW = () => {
        if(userDetails_PW.connectionTool==='connect_phone'){
            if (!chenckValidateName(userDetails_ID.username) || !chenckValidateID()|| !chenckValidateTelephone(userDetails_ID.phoneNumber)) {
                return false;
            }
        }
        else{
            if (!chenckValidateName(userDetails_ID.username) ||!chenckValidateID()|| !chenckValidateEmail(userDetails_ID.email)) {
                return false;
            }

        }
        return true;
    };
// 폼의 유효성을 검사
    const handleSubmit_ID = (e) => {
        e.preventDefault();
        
        // 폼 제출 후, 홈페이지로 
        //
        if (!chenckEmtySearchID()) {
            setFormError(true);
            return false;
        } else if(!validateForm_ID()){ 
            alert('유효하지 않은 입력 방식입니다.');
            setFormError(true);
            return false;
        }
        alert('아이디 찾기에 성공하셨습니다.');
        return true;
    };

    const handleSubmit_PW = (e) => {
        e.preventDefault();
        // 폼의 유효성을 검사
        // 폼 제출 후, 홈페이지로 
        if (validateForm_PW()&&chenckEmtySearchPW) {
            setFormError(false);
            window.location.href = '/home'; // 홈페이지 URL로 변경
        } else { // 오류 상태를 업데이트
            setFormError(true);
        }
    };


    //버튼을 누른 경우 폼 검사한다
    const click_button = (e) => {
    };
     //ID 찾기에서 체크박스를 선택한 경우 표시한다.
     const chooseConnetToolID = (e) => {
        setUserDetailsID({
            ...userDetails_ID, // 기존 상태를 복사
            connectionTool: e.target.value // 새로운 값을 설정
        });

    };
    //비밀번호에서 체크박스를 선택한 경우 표시한다.
    const chooseConnetToolIPW = (e) => {
        setUserDetailsPW({
            ...userDetails_PW, // 기존 상태를 복사
            connectionTool: e.target.value // 새로운 값을 설정
        });


    };

    //데이터 베이스에 연결해서 맞는 데이터인지 확인하는 함수
    //아직 작성은 하지 않음
    const checkDataRight = () => {
            return true;
    };

        return (<div className="specific-element">
                <div className="search-containers">
                    <div className="search-container">
                        <div className="form-title">아이디/비밀번호 찾기</div>   
                    </div>
                         
                        
                    <div className="search-container"></div>
                    </div> 
    <div className="search-containers">
                    
                    <div className="search-container">
                    <div className="form-title-container">아이디 찾기</div>
                        <form className="search-form" onSubmit={handleSubmit_ID}>
                            <div className="input-group">
                                <label>이름</label>
                                <input type="text" name="username" placeholder="이름" onChange={handleInputChangeID}/>
                            </div>
                            <div className="input_connect_radio">
                                <label>연결방식</label>
                                <input type='radio' name='connetTool' value='connect_phone'  onChange={chooseConnetToolID}/>휴대폰         
                                <input type='radio' name='connetTool' value='connect_mail'  onChange={chooseConnetToolID}/>이메일
                            </div>

                            {userDetails_ID.connectionTool==='connect_phone' &&                             
                                                        <div className="input-group">
                                                        <label>전화번호</label>
                                                        <input type="tel" name="phoneNumber" pattern="[0-9]{2,3}[0-9]{3,4}[0-9]{4}" placeholder="전화번호를 입력해 주세요" onChange={handleInputChangeID}/>
                                                    </div>

                            }

                            {userDetails_ID.connectionTool==='connect_mail' &&                             
                            <div className="input-group">
                            <label>이메일 </label>
                            <input type="email" name="email" placeholder="이메일을 작성해 주세요" onChange={handleInputChangeID}/>
                            
                        </div>
                        }


                            <div className="submit_button">
                                <button type="submit">아이디 찾기</button>
                            </div>
                        </form>
                    </div>
            
            
                    <div className="search-container">
                    <div className="form-title-container">비밀번호 찾기</div>
                        <form className="search-form" onSubmit={handleSubmit_PW}>
                            
                            <div className="input-group">
                                <label>이름</label>
                                <input type="text" name="username" placeholder="이름" onChange={handleInputChangePW}/>
                            </div>
                            <div className="input-group">
                                <label>아이디</label>
                                <input type="text" name="userID" placeholder="아이디" onChange={handleInputChangePW}/>
                            </div>
                            <div className="input_connect_radio">
                                <label>연결방식</label>
                                <input type='radio' name='connetToolPW' value='connect_phone'  onChange={chooseConnetToolIPW} />휴대폰
                                <input type='radio' name='connetToolPW' value='connect_mail'  onChange={chooseConnetToolIPW} />이메일
                            </div>
            
                            {userDetails_PW.connectionTool==='connect_phone' &&                             
                                                        <div className="input-group">
                                                        <label>전화번호</label>
                                                        <input type="tel" name="phoneNumber" pattern="[0-9]{2,3}[0-9]{3,4}[0-9]{4}" placeholder="전화번호를 입력해 주세요" onChange={handleInputChangePW}/>
                                                    </div>

                            }

                            {userDetails_PW.connectionTool==='connect_mail' &&                             
                            <div className="input-group">
                            <label>이메일 </label>
                            <input type="email" name="email" placeholder="이메일을 작성해 주세요" onChange={handleInputChangePW}/>
                            
                        </div>
                        }   

                            <div className="submit_button">
                                <button type="submit">비밀번호 찾기</button>
                            </div>
                        </form>
                    </div>
            
                </div>
        </div>


);
}

export default LoginSearchPage;
