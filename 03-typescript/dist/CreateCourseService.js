"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseService = void 0;
class CreateCourseService {
    execute({ name, duration, educator }) {
        console.log(name, duration, educator);
    }
}
exports.createCourseService = new CreateCourseService;
