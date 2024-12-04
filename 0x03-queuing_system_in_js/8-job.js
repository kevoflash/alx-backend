const kue = requiere("kue");

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }

  jobs.forEach((job) => {
    const createdJob = queue
      .createJob("sendNotification", job)
      .on("complete", () => {
        console.log(`Notification job ${createdJob.id} completed`);
      })
      .on("failed", (err) => {
        console.error(
          `Notification job ${createdJob.id} failed: ${err.message}`,
        );
      })
      .on("progress", (progress) => {
        console.log(`Notification job ${createdJob.id} ${progress}% complete`);
      })
      .save();

    console.log(`Notification job created: ${createdJob.id}`);
  });
}
