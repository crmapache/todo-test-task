import styled, { css } from 'styled-components'

export const TaskWrap = styled.div<{ isSubtask: boolean }>`
  margin-bottom: 15px;
  padding-left: ${({ isSubtask }) => (isSubtask ? '15px' : 0)};

  &:last-child {
    margin-bottom: 0;
  }

  ${({ isSubtask }) => {
    if (isSubtask) {
      return css`
        margin-bottom: 5px;

        ${TaskHeader} {
          padding: 5px 15px;
        }

        ${TaskHeaderTitle} {
          font-size: 14px;
        }
      `
    }
  }}
`

export const TaskHeader = styled.div`
  border-radius: 4px;
  padding: 15px;
  background: #616161;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`

export const TaskHeaderIsDone = styled.div<{ isDone: boolean }>`
  background-color: ${({ isDone }) => (isDone ? '#fff' : '#747474')};
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  border-radius: 50%;
  margin-right: 10px;
  transition: background-color 0.2s;
`

export const TaskHeaderTitle = styled.div`
  font-size: 16px;
  color: #ccc;
`

export const TaskHeaderSection = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
`

export const ButtonWrap = styled.div`
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`

export const SubtasksWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`

export const DeleteModalContent = styled.h3`
  text-align: center;
  margin: 0;
  font-size: 22px;
  font-weight: 400;
  color: #ccc;
`
