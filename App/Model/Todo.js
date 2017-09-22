export default class Todo {
  constructor(
    id,
    title,
    description,
    assignor,
     completionTime,
    // alarmTime,
    // isCompleted
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.assignor = assignor;
     this.completionTime = completionTime;
    // this.alarmTime = alarmTime || new Date();
    // this.isCompleted = isCompleted || false;
    // this.createdAt = new Date();
    // this.updatedAt = new Date();
  }
}
