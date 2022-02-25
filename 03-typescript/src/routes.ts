import { Request, Response } from "express";

import { createCourseService } from './CreateCourseService'

export function createCourse(request: Request, response: Response) {

  createCourseService.execute({
    name: 'NodeJS',
    duration: 10,
    educator: 'Dani',
  })

  createCourseService.execute({
    name: 'ReactJS',
    educator: 'Diego',
  })

  return response.send()
}
