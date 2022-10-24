import React, { useState } from 'react'
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md'

import {
  ButtonWrap,
  DeleteModalContent,
  SubtasksWrap,
  TaskHeader,
  TaskHeaderIsDone,
  TaskHeaderSection,
  TaskHeaderTitle,
  TaskWrap,
} from './elements'
import { Task } from '../types'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { Input } from '../../Input'

type Props = {
  task: Task
  parentTaskId?: string | null
  changeStatusHandler: (id: Task['id'], subtaskId: string | null) => void
  deleteHandler: (id: Task['id'], subtaskId: string | null) => void
  editHandler: (id: Task['id'], subtaskId: string | null, title: string) => void
  addNewSubtask: (id: Task['id'], title: string) => void
}

export const SimpleTask = ({
  task,
  parentTaskId = null,
  changeStatusHandler,
  deleteHandler,
  editHandler,
  addNewSubtask,
}: Props) => {
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenAddNewSubtaskModal, setIsOpenAddNewSubtaskModal] = useState(false)

  const [taskIdToAction, setTaskIdToAction] = useState<string | null>(null)
  const [subtaskIdToAction, setSubtaskIdToAction] = useState<string | null>(null)

  const [editTaskTitle, setEditTaskTitle] = useState('')
  const [editTaskTouched, setEditTaskTouched] = useState(false)

  const inputChangeHandler = (value: string) => {
    setEditTaskTouched(true)
    setEditTaskTitle(value)
  }

  const changeStatusClickHandler = () => {
    if (parentTaskId === null) {
      changeStatusHandler(task.id, null)
    } else {
      changeStatusHandler(parentTaskId, task.id)
    }
  }

  const editClickHandler = (e: React.MouseEvent<HTMLButtonElement>, id: string, title: string) => {
    e.stopPropagation()

    setTaskIdToAction(parentTaskId === null ? id : parentTaskId)
    setSubtaskIdToAction(parentTaskId === null ? null : id)
    setEditTaskTitle(title)

    setIsOpenEditModal(true)
  }

  const deleteClickHandler = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()

    setTaskIdToAction(parentTaskId === null ? id : parentTaskId)
    setSubtaskIdToAction(parentTaskId === null ? null : id)

    setIsOpenDeleteConfirmModal(true)
  }

  const deleteModalOkHandler = () => {
    setIsOpenDeleteConfirmModal(false)
    deleteHandler(taskIdToAction as string, subtaskIdToAction)
  }

  const editModalOkHandler = () => {
    if (editTaskTitle.length > 0) {
      setIsOpenEditModal(false)

      editHandler(taskIdToAction as string, subtaskIdToAction, editTaskTitle)
    }
  }

  const addNewSubtaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    setEditTaskTouched(false)
    setIsOpenAddNewSubtaskModal(true)
    setEditTaskTitle('')
  }

  const addNewSubtaskOkHandler = () => {
    setIsOpenAddNewSubtaskModal(false)
    setEditTaskTouched(false)

    addNewSubtask(task.id, editTaskTitle)
  }

  return (
    <TaskWrap isSubtask={parentTaskId !== null}>
      <TaskHeader onClick={changeStatusClickHandler}>
        <TaskHeaderSection>
          <TaskHeaderIsDone isDone={task.isDone} />
          <TaskHeaderTitle>{task.title}</TaskHeaderTitle>
        </TaskHeaderSection>
        <TaskHeaderSection>
          <ButtonWrap>
            <Button onClick={e => editClickHandler(e, task.id, task.title)}>
              <MdEdit />
            </Button>
          </ButtonWrap>
          <ButtonWrap>
            <Button onClick={e => deleteClickHandler(e, task.id)}>
              <MdDelete />
            </Button>
          </ButtonWrap>
          {parentTaskId === null && (
            <ButtonWrap>
              <Button onClick={addNewSubtaskHandler}>
                <MdAdd />
              </Button>
            </ButtonWrap>
          )}
        </TaskHeaderSection>
      </TaskHeader>
      {parentTaskId === null && !!task.subtasks?.length && (
        <SubtasksWrap>
          {task.subtasks.map(subtask => (
            <SimpleTask
              task={subtask}
              parentTaskId={task.id}
              changeStatusHandler={changeStatusHandler}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              addNewSubtask={addNewSubtask}
              key={subtask.id}
            />
          ))}
        </SubtasksWrap>
      )}
      <Modal
        isOpen={isOpenDeleteConfirmModal}
        closeHandler={() => setIsOpenDeleteConfirmModal(false)}
        okHandler={deleteModalOkHandler}
      >
        <DeleteModalContent>Do you really want to delete this task?</DeleteModalContent>
      </Modal>
      <Modal
        isOpen={isOpenEditModal}
        closeHandler={() => setIsOpenEditModal(false)}
        okHandler={editModalOkHandler}
      >
        <Input
          value={editTaskTitle}
          onValueChange={inputChangeHandler}
          error={editTaskTitle.length < 1 && editTaskTouched}
        />
      </Modal>
      <Modal
        isOpen={isOpenAddNewSubtaskModal}
        closeHandler={() => setIsOpenAddNewSubtaskModal(false)}
        okHandler={addNewSubtaskOkHandler}
      >
        <Input
          value={editTaskTitle}
          onValueChange={inputChangeHandler}
          error={editTaskTitle.length < 1 && editTaskTouched}
        />
      </Modal>
    </TaskWrap>
  )
}
