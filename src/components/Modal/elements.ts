import styled from 'styled-components'

export const ModalWrap = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

export const ModalWindow = styled.div`
  background-color: #484848;
  border-radius: 4px;
  padding: 15px;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
  box-shadow: 5px 5px 14px rgb(41, 41, 41, 0.2);
`

export const ButtonsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 30px;
`

export const ButtonWrap = styled.div`
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`
