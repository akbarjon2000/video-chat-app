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
        width: 301px;
        height: 63px;
        background: #0060FF;
        border-radius: 15px;
        font-family: 'DM Sans', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
        color: #FFFFFF;
    }
    
`