const dotenv = require('dotenv').config({
    path: "pw.env"
});
const colors = require('colors');
const Reddit = require('../src/lib/Reddit');



/* Get Mentions Test */

(async () => {
    console.log("Running mention test".rainbow);
    console.log("creating new reddit object".magenta);
    reddit = new Reddit();
    console.log("First time getting commands from test".magenta);
    commands = await reddit.getMentions(1);
    console.log("App Finished the first sweep.".magenta);

    let i = 0;
    while (!commands.isEmpty()) {
        console.log("command queue size: ", commands.size());
        const command = (i, commands.dequeue());
        console.log({
            body: command.item.body,
            created_utc: command.item.created_utc,
            priority: command.priority
        });
    }

    setInterval(async () => {
        console.log("Getting more commands from app.js".magenta);
        const mentions = await reddit.getMentions(1);
        let i = 0;
        console.log("commands queue size:", mentions.size());
        console.log("commands collection length:", mentions.collection.length);
        while (!mentions.isEmpty()) {
            console.log("command queue size: ", mentions.size());
            const mention = (i, mentions.dequeue());
            console.log({
                body: mention.item.body,
                created_utc: mention.item.created_utc,
                priority: mention.priority
            });
        }

    }, 5000);

})();