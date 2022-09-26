import styled from "styled-components";

export const JoinedUserCon = styled.div`
  background-color:#83c5be;
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:50px;
    gap:20px;
    .main{
        width:90%;
        height:70%;
        border-radius:15px;
        overflow:hidden;
    }
    .secondary{
        width:90%;
        height:20%;
        display:flex;
        gap:20px;

    }
    .reload{
        width:200px;
        height:50px;
        border-radius:10px;
        position:absolute;
        top:10px;
        left:10px;
        background-color:#a8dadc;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .leave{
        width:80px;
        height:30px;
        border-radius:10px;
        background-color:#a8dadc;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        z-index:1;

    }
    @media screen and (max-width: 400px) {
        .secondary{
            flex-direction:column;
            overflow-x:scroll;
            height:500px;
        }
    }
`