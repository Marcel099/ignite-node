"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const CreateCourseService_1 = require("./CreateCourseService");
function createCourse(request, response) {
    CreateCourseService_1.createCourseService.execute({
        name: 'NodeJS',
        duration: 10,
        educator: 'Dani',
    });
}
exports.createCourse = createCourse;
