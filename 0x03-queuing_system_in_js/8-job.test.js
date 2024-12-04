const kue = require("kue");
const { createPushNotificationsJobs } = require("./8-job"); // Assuming 8-job.js is in the same directory

describe("createPushNotificationsJobs function", () => {
  let queue;

  beforeEach(() => {
    // Enter Kue test mode
    queue = kue.createQueue({ redis: { host: "localhost", port: 6379 } });
    queue.testMode.enter();
  });

  afterEach(() => {
    // Clear the queue and exit test mode
    return new Promise((resolve) => {
      queue.testMode.clear((err) => {
        if (err) throw err;
        queue.testMode.exit();
        resolve();
      });
    });
  });

  it("throws error for non-array jobs argument", () => {
    expect(() =>
      createPushNotificationsJobs("not an array", queue),
    ).toThrowError("Jobs is not an array");
  });

  it("creates jobs in the queue for a valid jobs array", async () => {
    const jobs = [
      { name: "John Doe", message: "This is a notification" },
      { name: "Jane Doe", message: "Another notification" },
    ];
    await createPushNotificationsJobs(jobs, queue);

    const queuedJobs = await queue.testMode.getJobs();
    expect(queuedJobs.length).toBe(jobs.length);
    queuedJobs.forEach((job, index) => {
      expect(job.type).toBe("sendNotification");
      expect(job.data).toEqual(jobs[index]);
    });
  });
});
