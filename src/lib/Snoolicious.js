const Snoowrap = require('../config/snoo.config');
const SubMonitorBot = require('../service/SubMonitorBot');
const PriorityQueue = require('../util/PriorityQueue');
const Command = require('../util/Command');
/*
    [Snoolicious RTS] - Snoolicious Reddit Tool Suite
    
    Instantiates a Snoowrap requester, then genrates helper classes to manage commands.

        - Class contains functions to interact with these services:
            a. MentionBot
                - Listens for username mentions in the inbox
            b. SubMonitorBot
                - Watches a subreddits *new* section for new submissions
            c. CommandBot
                - Follows a single thread to listen for commands
            d. WikiEditor
                - Edits Wiki Pages
                - Has access to SnooMD

        The tasks list is a PriorityQueue that will get the queued messages from the mentions, submissions, and commands queues,
        and dequeue them from their original queue, then re-enqueue them into itself. The priority level is to be defined when
        calling the get* functions. With 0 being highest priority, all tasks will be called first in first out from the tasks queue.
            
*/
module.exports = class Reddit {
    constructor() {
        /* [Snoowrap API] */
        this.requester = new Snoowrap().requester;

        /* [Services] */

        /* [SubMonitorBot Service] */
        this.submissions = new SubMonitorBot(this.requester);

        /* 
            [Tasks]
                - Tasks = All tasks to be fulfilled by the bot
                - All items are dequeued from their original bot service queues and into this priority queue
         */
        this.tasks = new PriorityQueue();
    }
    /*
        [Get Submissions]
            - Asks SubMonitor Service to get submissions
            - Dequeues the submissions queue into tasks queue
            - Returns the tasks queue
    */
    async getSubmissions(priority) {
        const submissions = await this.submissions.getSubmissions();
        // Dequeue all the submissions into the priority queue
        while (submissions && !submissions.isEmpty()) {
            this.tasks.enqueue([submissions.dequeue(), priority]);
        }
        return this.tasks;
    }
    /* 
        [Query Tasks]
            - Dequeus all the tasks and handles commands based on your callback function
            - Checks if item.body exists before handling command
            - If item.body exists, runs handleSubmission instead.
     */
    async queryTasks(handleCommand, handleSubmission) {
        const D = new Date().getTime();
        while (!this.tasks.isEmpty()) {
            const task = this.tasks.dequeue();
            // If not a submission
            if (task.item.body) {
                const command = new Command().test(task.item.body);
                console.log("Testing command: ", command);
                if (command) { // If the item received was a command, return the command, the item, and priority
                    const T = {
                        command: command,
                        item: task.item,
                        priority: task.priority,
                        time: D
                    }
                    await handleCommand(T);
                }
            } else if (task.item.title) { // Task was a submission
                const T = {
                    item: task.item,
                    priority: task.priority,
                    time: D
                }
                await handleSubmission(T);
            }
        }
    }
    /* [Snoowrap Requester] */
    getRequester() {
        return this.requester;
    }
}