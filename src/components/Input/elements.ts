import styled from 'styled-components'

export const StyledInput = styled.input<{ error?: boolean }>`
  padding: 10px 15px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${({ error }) => (error ? 'red' : '#818181')};
  box-sizing: border-box;
  font-size: 16px;
  transition: border 0.2s;
  background-color: #818181;
  color: #fff;

  &:focus {
    border-color: ${({ error }) => (error ? 'red' : '#ccc')};
    outline: none;
  }
`
