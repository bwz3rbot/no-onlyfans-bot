const dotenv = require('dotenv').config({
    path: "pw.env"
});
const colors = require('colors');
const Reddit = require('../src/lib/Reddit');



/* Get Mentions Test */

(async () => {
    console.log("Running sub monitor test".rainbow);
    console.log("creating new reddit object".magenta);
    reddit = new Reddit();
    console.log("First time getting commands from test".magenta);
    const submissions = await reddit.getSubmissions(1);
    console.log("App Finished the first sweep.".magenta);

    while (!submissions.isEmpty()) {
        console.log("submissions queue size: ", submissions.size());
        const submission = (submissions.dequeue());
        console.log({
            body: submission.item.title,
            created_utc: submission.item.created_utc,
            priority: submission.priority
        });
    }

    setInterval(async () => {
        console.log("Getting more commands from app.js".magenta);
        const submissions = await reddit.getSubmissions(2);

        console.log("commands queue size:", submissions.size());
        console.log("commands collection length:", submissions.collection.length);
        while (!submissions.isEmpty()) {
            console.log("command queue size: ", submissions.size());
            const submission = (submissions.dequeue());
            console.log({
                body: submission.item.title,
                created_utc: submission.item.created_utc,
                priority: submission.priority
            });
        }

    }, 5000);

})();