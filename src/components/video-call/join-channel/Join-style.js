import styled from 'styled-components';

export const Container = styled.div`
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:100vh;
    background: linear-gradient(113.63deg, rgba(0, 255, 255, 0.4) -10.54%, rgba(255, 255, 255, 0.1) 112.17%);
    backdrop-filter: blur(200px);
    overflow:hidden;
    .line{
        box-sizing:border-box;
        width: 80%;
        height: 0px;
        border-top: 1px solid #000000;
        position:absolute;
        bottom:80px;
        display:flex;
        justify-content:center;
        /* padding-top:29px; */
    }
    .learn-more{
        margin-top:20px;

        position: absolute;
        font-family: 'DM Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 42px;
        /* identical to box height */

        text-align: center;

        color: #000;
    }
    .menu{
        display:none;
        position:absolute;
        left:10px;
        top:10px;
        
        font-size:30px;
    }
    .create-channel{
        display:none;
        align-items:center;
        justify-content:center;
        width: 343px;
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
    @media screen and (max-width:500px) {
        &{
            padding:30px 10px !important;

        }
        .menu{
            display:flex;
        }
            .line{
            display:none;
        }
        img{
            display:none;
        }
        .create-channel-btn{
            display:flex;
        }
        .menu{
            display:flex;
        }
        .hero-title{
            font-size:30px !important;
            width:400px !important;
        }
        .create-form{
            width:400px;
            height:fit-content;
            align-items:flex-start;
            gap:20px;
        }
        .create-channel{
            display:flex !important;
            position:absolute;
            bottom:50px;

        }
         .id-input::placeholder{
            font-size:20px !important;
        }
        .join-panel{
            height:50px !important;
            width:400px !important;
        }
        .join-btn{
            height:35px !important;
            width:100px !important;
        }
    }
    
`

export const JoinDiv = styled.div`
@media screen and (max-width:500px) {
        &{
            padding:30px 10px !important;

        }
    }
    width:100%;
    padding:0 90px 0 90px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    .hero-title{
        width: 795px;
        font-family: 'Syne', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 64px;
        line-height: 77px;
        text-transform: capitalize;
        color: #000000;
        margin-bottom:29px;
    }
    .hero-subtitle{
        font-family: 'DM Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 47px;
        color: #000000;
        width: fit-content;
        margin-top:0;
    }
    .join-panel{
        box-sizing:border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:0 16px 0 16px;
        width: 665px;
        height: 95px;
        background: #DFEBFF;
        border: 1px solid #0060FF;
        border-radius: 25px;
    }
    .id-input{
        width:60%;
        height:50%;
        font-size:20px;
        font-family: 'DM Sans';
        font-weight: 300;
        border:none;
        outline:unset;
        background-color:transparent;
        &::placeholder{
            width:fit-content;
            font-family: 'DM Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 31px;
            text-align: center;

            color: #707070;
        }
    }
    .join-btn{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:center;
        width: 194px;
        height: 63px;
        background: #0060FF;
        border-radius: 15px;
        font-family: 'DM Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
        text-align: center;
        color: #FFFFFF;
    }
 
`
