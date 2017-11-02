export default class Todo {
  constructor(
    id,
    title,
    description,
    created_by,
    assigned_to,
    isaccepted,
    iscompleted,
    isdeleted,
    due_date,
    created_date,
    assigned_date,
    completed_date,
    attachment
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdBy = created_by;
    this.assignedTo = assigned_to;
    this.isAccepted = isaccepted;
    this.isCompleted = iscompleted;
    this.isDeleted = isdeleted;
    this.dueDate = due_date;
    this.createdDate = created_date;
    this.assignedDate = assigned_date;
    this.completedDate = completed_date;
    this.attachment = attachment;
  }
}
