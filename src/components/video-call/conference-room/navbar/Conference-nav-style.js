import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height:140px;
    padding:0 40px 0 40px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-color: rgba(217, 217, 217, 0.29);
    .channel-name{
        width: fit-content;
        padding:0 25px 0 25px;
        height: 55px;
        background: #DFEBFF;
        border-radius: 115.404px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16.6849px;
        line-height: 20px;
        color: #0060FF;
        gap:13px;
    }
    .user{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 13px;
        width: 366px;
        height: 80px;
        left: 1117px;
        top: 33px;
        background: #F6F6F6;
        border-radius: 83px;
    }
    .user-img{
        width:60px;
        border-radius:50%;

    }
    .user-name{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 33px;
        color: #25293B;
        margin:0;
        margin-bottom:5px;
    }
    .user-role{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 4px;
        margin:0;
        display: flex;
        align-items: center;
        letter-spacing: 0.03em;
        color: #9E9E9E;
    }
`
