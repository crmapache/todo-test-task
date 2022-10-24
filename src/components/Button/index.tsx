import React from 'react'

import { ButtonContentWrap, ButtonLayout, ButtonWrap } from './elements'
import { Props } from './types'

export const Button = ({ onClick, children }: Props) => {
  return (
    <ButtonWrap onClick={onClick}>
      <ButtonContentWrap>{children}</ButtonContentWrap>
      <ButtonLayout />
    </ButtonWrap>
  )
}
