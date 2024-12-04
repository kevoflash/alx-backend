const kue = require("kue");
const port = 6379;

const jobs = [
  {
    phoneNumber: "4153518780",
    message: "This is the code 1234 to verify your account",
  },
  {
    phoneNumber: "4153518781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153518743",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153538781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153118782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4159518782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4158718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153818782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4154318781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4151218782",
    message: "This is the code 4321 to verify your account",
  },
];

const queue = kue.createQueue({
  redis: `redis://localhost:${port}`,
});

jobs.forEach((jobData) => {
  queue
    .createJob("push_notification_code_2", jobData)
    .on("complete", (id) => {
      console.log(`Notification job ${id} completed`);
    })
    .on("failed", (err, id) => {
      console.log(`Notification job ${id} failed: ${err.message}`);
    })
    .on("progress", (id, percentage) => {
      console.log(`Notification job ${id} ${percentage}% complete`);
    })
    .save((err) => {
      if (err) {
        console.error(`Error creating notification job: ${err.message}`);
      } else {
        console.log(`Notification job created: ${job.id}`);
      }
    });
});
