import cron from "node-cron";

const task = cron.schedule("1 * * * * *", () => {
  console.log("running every minute 1, 2, 4 and 5");
});

export default task;
