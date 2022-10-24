import { exampleTasks } from './exampleTasks'
import { Task } from './components/TasksList/types'

export const loadTasks = () => {
  const loadedTasks = window.localStorage.getItem('tasks-mz')

  try {
    if (loadedTasks) {
      return JSON.parse(loadedTasks)
    }
  } catch (e) {
    console.log(e)
  }

  saveTasks(exampleTasks)
  return exampleTasks
}

export const saveTasks = (tasks: Task[]) => {
  window.localStorage.setItem('tasks-mz', JSON.stringify(tasks))
}
