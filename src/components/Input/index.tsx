import React from 'react'

import { StyledInput } from './elements'

type Props = {
  value: string
  onValueChange: (value: string) => void
  error?: boolean
}

export const Input = ({ value, onValueChange, error }: Props) => {
  return <StyledInput value={value} onChange={e => onValueChange(e.target.value)} error={error} />
}
