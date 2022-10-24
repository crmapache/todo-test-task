import { ButtonsWrap, ButtonWrap, ModalOverlay, ModalWindow, ModalWrap } from './elements'
import { Button } from '../Button'

type Props = {
  isOpen: boolean
  children: any
  closeHandler: () => void
  okHandler: () => void
}

export const Modal = ({ isOpen, children, closeHandler, okHandler }: Props) => {
  return isOpen ? (
    <ModalWrap>
      <ModalWindow>
        {children}
        <ButtonsWrap>
          <ButtonWrap>
            <Button onClick={closeHandler}>Cancel</Button>
          </ButtonWrap>
          <ButtonWrap>
            <Button onClick={okHandler}>Ok</Button>
          </ButtonWrap>
        </ButtonsWrap>
      </ModalWindow>
      <ModalOverlay onClick={closeHandler} />
    </ModalWrap>
  ) : null
}
