const dotenv = require('dotenv').config({
    path: "pw.env"
});
const colors = require('colors');
const Snoolicious = require('./lib/Snoolicious');
const snoolicious = new Snoolicious();
const linktest = require('./util/URLExtractor');
/*
    [Handle Submission]
        - Passed in as the second argument to queryTasks()
        - Awaited by Snoolicious for each submission dequeued from the task queue

        [Submission Task Object]
            - The Submission Task object will be passed with these key/value pairs:
                task: {
                    item: {
                        <Reddit Submission Object>
                    },
                    priority: <Number you set when calling getCommands or getMentions>,
                    time: <new Date().getTime()>
                }
*/
let count = 0;
async function handleSubmission(task) {
    console.log("received task!".yellow);
    const saved = await snoolicious.requester.getSubmission(task.item.id).saved;
    if (!saved) {
        console.log("getting user: ", task.item.author.name);
        const user = await snoolicious.requester.getUser(task.item.author.name).fetch();
        const description = user.subreddit.display_name.public_description;
        console.log(`Users Description: ${description}`);
        const links = linktest.testLinks(description);
        links ?
            await markSpam(task.item) : false;
        console.log("saving task as complete...".grey);
        await snoolicious.requester.getSubmission(task.item.id).save();
        console.log("task saved successfully!".green);
    } else {
        console.log("task was already saved!".yellow);
    }
    console.log("size of the queue: ".grey, snoolicious.tasks.size());
    console.log("total tasks completed: ".grey, ++count);
}
const markSpam = async function (item) {
    console.log("making a report...".red);
    await snoolicious.requester.getSubmission(item.id).report({
        reason: `${item.author.name} has references to ${process.env.TEST_FOR} in their public description.`
    });
    console.log("removing the post....".red);
    await snoolicious.requester.getSubmission(item.id).remove({
        spam: true
    });
}
/* [Snoolicious Run Cycle] */
const INTERVAL = (process.env.INTERVAL * 1000 * 60);
async function run() {
        await snoolicious.getSubmissions(3);
        await snoolicious.queryTasks(null, handleSubmission);
        console.log(`Finished Quereying Tasks. Sleeping for ${INTERVAL/1000/60} minutes...`.grey);
        setTimeout(async () => {
            await run()
        }, (INTERVAL));
    }
    (async () => {
        await run();
    })();