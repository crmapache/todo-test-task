import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AddNewTaskButtonWrap, AddNewTaskWrap, AppTitle, AppWrap } from './elements'
import { TasksList } from '../TasksList'
import { Task } from '../TasksList/types'
import { Input } from '../Input'
import { Button } from '../Button'
import { loadTasks, saveTasks } from '../../helpers'
import { MAX_TASKS_PER_PAGE } from '../../constants'

export const App = () => {
  // window.localStorage.clear()
  const [tasks, setTasks] = useState<Task[]>(loadTasks())
  const [page, setPage] = useState(1)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskTitleTouched, setNewTaskTitleTouched] = useState(false)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    const scrollHandler = () => {
      const scrollPosition = document.body.scrollHeight - (window.scrollY + window.innerHeight)

      if (scrollPosition === 0) {
        const maxPageValue = Math.ceil(tasks.length / MAX_TASKS_PER_PAGE)

        if (page < maxPageValue) {
          setPage(prevState => prevState + 1)
        }
      }
    }

    window.document.addEventListener('scroll', scrollHandler)

    return () => {
      window.document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const inputChangeHandler = (value: string) => {
    setNewTaskTitleTouched(true)
    setNewTaskTitle(value)
  }

  const addNewTaskButtonHandler = () => {
    if (newTaskTitle.length > 0) {
      setTasks([
        {
          id: uuidv4(),
          title: newTaskTitle,
          isDone: false,
          subtasks: [],
        },
        ...tasks,
      ])

      setNewTaskTitleTouched(false)
      setNewTaskTitle('')
    }
  }

  return (
    <AppWrap>
      <AppTitle>TO-DO</AppTitle>
      <AddNewTaskWrap>
        <Input
          value={newTaskTitle}
          onValueChange={inputChangeHandler}
          error={newTaskTitle.length < 1 && newTaskTitleTouched}
        />
        <AddNewTaskButtonWrap>
          <Button onClick={addNewTaskButtonHandler}>Add Task</Button>
        </AddNewTaskButtonWrap>
      </AddNewTaskWrap>
      <TasksList
        tasks={tasks.slice(
          0,
          page > 1 ? MAX_TASKS_PER_PAGE * page + MAX_TASKS_PER_PAGE : MAX_TASKS_PER_PAGE * 2,
        )}
        onTasksChange={setTasks}
      />
    </AppWrap>
  )
}
