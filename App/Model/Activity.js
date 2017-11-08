export default class Activity {
  constructor(
    id,
    sender_id,
    sender_name,
    receiver_id,
    receiver_name,
    choice,
    task_id,
    task_title,
    message
  ) {
    this.id = id;
    this.sender_id = sender_id;
    this.sender_name = sender_name;
    this.receiver_id = receiver_id;
    this.receiver_name = receiver_name;
    this.choice = choice;
    this.task_id = task_id;
    this.task_title = task_title;
    this.message = message;
  }
}
