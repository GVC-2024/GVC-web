import React, {useState, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import homephoto1 from '../image/homephoto1.png';
import homephoto2 from '../image/homephoto2.png';

const HomePage = () => {

  const images = [homephoto1, homephoto2]; // 이미지 배열 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // 이미지 인덱스를 업데이트
    }, 5000); // 5초 간격으로 이미지 변경

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌을 정리
  }, [images.length]);

  return (
    <>
    <Container>
      <TopContainer>
        <LeftContainer>
          <TopLeftContainer>
            <MainText>
              Connecting the World, <HighlightedText>Virtually</HighlightedText>
            </MainText>
            <SubText>
              Global Virtual Conference 를 사용하여 커뮤니케이션을 간소화하고 
              글로벌 시대 속 업무의 효율성을 높이세요. 추가 비용 없이 GVC Companion을 통해 지원됩니다.
            </SubText>
          </TopLeftContainer>
        </LeftContainer>
        <RightContainer>
        <ImageContainer>
          {currentImageIndex === 0 && <Image src={images[0]} alt='homephoto1' />}
          {currentImageIndex === 1 && <Image src={images[1]} alt='homephoto2' />}
        </ImageContainer>
        </RightContainer>
      </TopContainer>
    </Container>
     <Footer>
      <FooterText>
       Copyright @ 2024 Global Virtual Conference, Inc. All rights reserved.
      </FooterText>
     <FooterText style={{ marginTop: '10px' }}>
      김민성, 박샘솔, 이아영
     </FooterText>
   </Footer>
   </>
  );
};

export default HomePage;

// 좌우에 5% 패딩 줌.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  padding: 0 5%;
`;

const TopContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 40px;
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 5px;
  margin-right: 40px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MainText = styled.h1`
  font-size: 3rem;
  text-align: left;
  font-weight: bold;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
  animation: ${fadeIn} 1s ease-in;
`;

// 강조 텍스트 색상
const HighlightedText = styled.span`
  color: #75A1FF;  
`;

const SubText = styled.p`
  font-size: 18px;  
  text-align: left;
  margin-top: 1rem;
  max-width: 550px; 
  word-break: keep-all;
  white-space: pre-line;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  animation: ${fadeIn} 1s ease-in;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 이미지 설정
const Image = styled.img`
  width: 100%;
  max-width: 400px; /* 이미지 크기 조정 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-70%, -60%);
`;

const Footer = styled.footer`
  padding: 20px;
  background-color: #343a40;
  color: #ffffff;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;
