import { PICKER_OPTIONS } from "../Constants";
let defaultReminderTime = PICKER_OPTIONS[0];
export default class Todo {
  constructor(
    id,
    title,
    description,
    attachment,
    sender,
    created_date,
    receiver,
    assigned_date,
    due_date,
    is_accepted,
    is_completed,
    completed_date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.attachment = attachment;
    this.sender = sender;
    this.createdDate = created_date;
    this.receiver = receiver;
    this.assignedDate = assigned_date;
    this.dueDate = due_date;
    this.isAccepted = is_accepted;
    this.isCompleted = is_completed;
    this.completedDate = completed_date;
    this.reminderTime = defaultReminderTime;
  }
}
