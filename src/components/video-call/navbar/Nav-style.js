import styled from 'styled-components';

export const Nav = styled.div`
    width:100%;
    height:170px;
    display:flex;
    align-items:center;
    background-color:transparent;
    justify-content:space-between;
    padding:0 90px 0 90px;
    .logo{
        font-family: 'DM Sans', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 2rem;
        line-height: 42px;
        /* identical to box height */

        text-align: center;

        color: #000000;
    }
    .link{
        font-family: 'DM Sans', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
        text-align: center;
        text-decoration:none;
        color: #000000;
    }
    .create-channel-btn{
       
        display:flex;
        align-items:center;
        justify-content:center;
        width: ${({ width }) => width};
        height: 63px;
        background: #0060FF;
        border-radius: 15px;
        font-family: 'DM Sans', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
        color: #FFFFFF;
        cursor: pointer;
    }
    @media screen and (max-width:400px){
        &{
            display:${(({ open }) => open ? "flex" : "none")};
            flex-direction:column;
            position:absolute;
            z-index:1;
            width:100%;
            height:100vh;
            justify-content:flex-start;
            gap:20px;
            background-color: lightblue;
            align-items:flex-start;
            padding-left:10px;
        }
        .links{
            flex-direction:column;
            gap:10px;
            align-items:flex-start;
        }
        .create-channel-btn{
            display:none;
        }
   }
`