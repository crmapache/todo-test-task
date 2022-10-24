import random from 'lodash/random.js'
import { LoremIpsum } from 'lorem-ipsum'
import { v4 as uuidv4 } from 'uuid'

import { Task } from './components/TasksList/types'

const lorem = new LoremIpsum()

const generateTasks = (n: number, isSubtask: boolean) => {
  const tasks: Task[] = []

  for (let i = 0; i < n; i++) {
    const title = lorem.generateWords(random(2, 15))
    const task: Task = {
      id: uuidv4(),
      title: `${title[0].toUpperCase()}${title.slice(1)}`,
      isDone: false,
    }

    if (!isSubtask) {
      task.subtasks = generateTasks(random(0, 5), true)
    }

    tasks.push(task)
  }

  return tasks
}

export const exampleTasks = generateTasks(50, false)
