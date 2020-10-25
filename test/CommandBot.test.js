const dotenv = require('dotenv').config({
    path: "pw.env"
});
const colors = require('colors');
const Reddit = require('../src/lib/Snoolicious');
/* Get Commands Test */
(async () => {
    console.log("Running command test".rainbow);
    console.log("creating new reddit object".magenta);
    reddit = new Reddit();
    console.log("First time getting commands from app.js".magenta);
    commands = await reddit.getCommands(1);
    console.log("App Finished the first sweep.".magenta);

    console.log("got these commands: ", commands);

    let i = 0;
    console.log("dequeueing commands...".magenta);
    while (!commands.isEmpty()) {
        console.log("commands.isEmpty() is false!".green);
        console.log("command queue size: ", commands.size());
        const command = (commands.dequeue());
        console.log(command);
    }

    setInterval(async () => {
        console.log("Getting more commands from app.js".magenta);
        commands = await reddit.getCommands(1);
        let i = 0;
        console.log("commands queue size:", commands.size());
        console.log("commands collection length:", commands.collection.length);
        while (!commands.isEmpty()) {
            console.log("command queue size: ", commands.size());
            const command = (i, commands.dequeue());
            console.log({
                body: command.item.body,
                created_utc: command.item.created_utc,
                priorityLevel: command.priority
            });
        }

    }, 5000);

})();