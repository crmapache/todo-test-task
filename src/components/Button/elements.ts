import styled from 'styled-components'

export const ButtonLayout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  transition: background-color 0.2s;
  z-index: 1;
`

export const ButtonWrap = styled.button`
  border-radius: 4px;
  font-size: 16px;
  padding: 0 10px;
  border: none;
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: #2f2f2f;

  &:hover {
    cursor: pointer;

    ${ButtonLayout} {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &:active {
    ${ButtonLayout} {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`

export const ButtonContentWrap = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  white-space: nowrap;
`
