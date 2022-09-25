import styled from 'styled-components';

export const Container = styled.div`
  /* background: linear-gradient(113.63deg, rgba(0, 155, 255, 0.4) -10.54%, rgba(255, 255, 255, 0.1) 112.17%); */
  background-color:#83c5be;
    /* backdrop-filter: blur(100px);  */
    display:flex;
    flex-direction:column;
    width:100%;
    height:100vh;
    overflow:hidden;
    /* padding: 0 20px; */
    box-sizing:border-box;
    /* align-items:center; */
    /* background: linear-gradient(113.63deg, rgba(0, 255, 255, 0.4) -10.54%, rgba(255, 255, 255, 0.1) 112.17%);
    backdrop-filter: blur(200px); */
   .not-joined-div{
    width:90%;
    border-radius:10px;
    height:700px;
    background-color:#dde7c7;
    margin:0 auto;
   }
   .conference-body{
     display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    overflow:hidden;
    /* padding: 0 50px; */
    padding-top:50px;
    box-sizing:border-box;
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
   .publisher{
    width:90%;
    height:500px
  ;
    border-radius:15px;
    display:none;
    overflow:hidden;
   }
   .audience{
    gap:20px;
    width:90%;
    height:200px;
    display:none;
    justify-content:flex-start;
    margin-top:10px;
    border-radius:10px;
    overflow:auto;
   }
   .controlls{
    position:fixed;
    bottom:40px;
    display:flex;
    width:100%;
    margin:0 auto;
    gap:10px;
    align-items:center;
    justify-content:center;
   }
   #ctrl-btn{
    width:100px;
    height:40px;
    border-radius:8pc;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    /* background-color:#e76f51; */
    background-color:#3a86ff;
    color:white;
   }
   .videos-body{
    display:none;
    width:100%;
    height:100%;
    /* border:1px solid; */

   }
   .videoframes{
  
    box-sizing:border-box;
    /* padding-top:50px; */
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    align-items:center;

   }
   .sidebar{
    width:30%;
    height:100vh;
   }

`