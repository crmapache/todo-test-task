import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { SimpleTask } from './SimpleTask'
import { NoTasks, TasksListWrap } from './elements'
import { Task } from './types'

type Props = {
  tasks: Task[]
  onTasksChange: React.Dispatch<React.SetStateAction<Task[]>>
}

export const TasksList = ({ tasks, onTasksChange }: Props) => {
  const changeStatusHandler = (id: Task['id'], subtaskId: Task['id'] | null = null) => {
    onTasksChange(prevState => {
      return prevState.map(task => {
        if (task.id !== id) return task

        if (subtaskId !== null) {
          const subtasks = task.subtasks?.map(subtask => {
            return subtask.id === subtaskId ? { ...subtask, isDone: !subtask.isDone } : subtask
          })

          return {
            ...task,
            subtasks,
          }
        }

        return { ...task, isDone: !task.isDone }
      })
    })
  }

  const deleteHandler = (id: Task['id'], subtaskId: Task['id'] | null = null) => {
    if (subtaskId === null) {
      onTasksChange(prevState => prevState.filter(task => task.id !== id))
    } else {
      onTasksChange(prevState => {
        return prevState.map(task => {
          if (task.id !== id) return task

          const subtasks = task.subtasks?.filter(subtask => subtask.id !== subtaskId)

          return {
            ...task,
            subtasks,
          }
        })
      })
    }
  }

  const editHandler = (id: Task['id'], subtaskId: Task['id'] | null = null, title: string) => {
    if (subtaskId === null) {
      onTasksChange(prevState => {
        return prevState.map(task => {
          if (task.id === id) {
            task.title = title
          }

          return task
        })
      })
    } else {
      onTasksChange(prevState => {
        return prevState.map(task => {
          if (task.id !== id) return task

          const subtasks = task.subtasks?.map(subtask => {
            if (subtask.id === subtaskId) {
              subtask.title = title
            }

            return subtask
          })

          return {
            ...task,
            subtasks,
          }
        })
      })
    }
  }

  const addNewSubtask = (id: Task['id'], title: string) => {
    onTasksChange(prevState => {
      return prevState.map(task => {
        if (task.id === id && task.subtasks) {
          task.subtasks.unshift({
            id: uuidv4(),
            isDone: false,
            title,
          })
        }

        return task
      })
    })
  }

  return (
    <TasksListWrap>
      {tasks.map(task => (
        <SimpleTask
          task={task}
          key={task.id}
          changeStatusHandler={changeStatusHandler}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          addNewSubtask={addNewSubtask}
        />
      ))}
      {tasks.length < 1 && <NoTasks>You dont have any tasks</NoTasks>}
    </TasksListWrap>
  )
}
