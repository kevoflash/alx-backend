import kue from "kue";
const port = 6379;

const queue = kue.createQueue({
  redis: `redis://localhost:${port}`,
});

function sendNotification(phoneNumber, mesage) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${mesage}`,
  );
}

queue.process("push_notification_code", (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
