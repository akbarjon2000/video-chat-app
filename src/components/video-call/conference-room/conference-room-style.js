import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100vh;
    overflow:hidden;
    box-sizing:border-box;
    align-items:center;
   .not-joined-div{
    width:90%;
    border-radius:10px;
    height:700px;
    background-color:#dde7c7;

   }
   .join-video{
    width: 281px;
    height: 63px;
    background: #3380FF;
    border-radius: 15px;
    border:none;
    outline:none;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    text-align: center;
    color: #DFEBFF;
    cursor:pointer
   }
   .joined-div{
    width:1046px;
    height:471px;
    display:none;
   }
`