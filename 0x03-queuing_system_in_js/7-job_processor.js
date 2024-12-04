const kue = require("kue");

const blacklistedNumbers = ["4153518780", "4153518781"];

function sendNotification(phoneNumber, message, job, done) {
  job.progress(0);

  if (blacklistedNumbers.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }

  job.progress(50);

  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`,
  );

  done();
}

const queue = kue.createQueue({
  redis: {
    host: "localhost",
    port: 6379,
  },
  name: "push_notification_code_2",
  concurrency: 2,
});

const jobData = [
  {
    phone: "4153518743",
    message: "This is the code 4321 to verify your account",
  },
];

jobData.forEach((data) => {
  queue
    .createJob("sendNotification", data)
    .on("complete", () => {
      console.log("Notification job completed");
    })
    .on("failed", (err) => {
      console.error("Notification job failed:", err.message);
    })
    .save();
});
