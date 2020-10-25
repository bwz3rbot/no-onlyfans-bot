const dotenv = require('dotenv').config({
    path: "pw.env"
});
const colors = require('colors');
const Reddit = require('../src/lib/Reddit');
/* Get Commands Test */
(async () => {
    console.log("Running app test".rainbow);
    console.log("creating new reddit object".magenta);
    reddit = new Reddit();
    console.log("First time getting commands from app.js".magenta);
    let tasks = await reddit.getCommands(1);
    tasks = await reddit.getMentions(2);
    tasks = await reddit.getSubmissions(3);
    console.log("App Finished the first sweep.".magenta);

    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);
    task = tasks.dequeue();
    console.log(task.item.body, task.priority);


    // let i = 0;
    // while (!tasks.isEmpty()) {
    //     console.log("command queue size: ", tasks.size());
    //     const task = (i, tasks.dequeue());
    //     console.log({
    //         body: task.body,
    //         created_utc: task.created_utc
    //     });
    // }

    // setInterval(async () => {
    //     console.log("Getting more commands from app.js".magenta);
    //     commands = await reddit.getCommands();
    //     let i = 0;
    //     console.log("commands queue size:", commands.size());
    //     console.log("commands collection length:", commands.collection.length);
    //     while (!commands.isEmpty()) {
    //         console.log("command queue size: ", commands.size());
    //         const command = (i, commands.dequeue());
    //         console.log({
    //             body: command.body,
    //             created_utc: command.created_utc
    //         });
    //     }

    // }, 5000);

})();