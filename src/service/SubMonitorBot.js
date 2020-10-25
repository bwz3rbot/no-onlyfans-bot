const Queue = require('../util/Queue');
/* 
    [SubMonitor Class]
        1. Gets the subreddit/new
        2. Assigns the first utc
        3. Checks again filtering items with < preivious utc

    cutoff = the most recently received item's created_utc.
    When adding items to the array, checking the items created_utc
    against the value of cutoff will determine if the item is to be filtered

*/
let firstUTCAssigned = false;
module.exports = class SubMonitor {
    constructor(requester) {
        this.sub = process.env.MASTER_SUB;
        this.requester = requester;
        this.startupLimit = process.env.STARTUP_LIMIT;
        this.submissionLimit = process.env.SUBMISSION_LIMIT;
        this.submissions = new Queue();
        this.cutoff = new Number();
    }
    /*
        [Get Submissions]
        - Loops over every sub in the ALL_SUBS map
        - Checks to see if their utc has been asigned,
        - Then assigns first, or checks again
    */
    async getSubmissions() {
        if (firstUTCAssigned === false) {
            firstUTCAssigned = true;
            await this.assignFirst();
        } else {
            await this.checkAgain();
        }
        return this.submissions;
    }
    /* 
        [Assign First UTC]
            - Checks the subreddit/new
            - Enqueues all the mentions
            - Assigns this.cutoff to the most recent utc
        */
    async assignFirst() {
        // Check inbox
        const listing = await this.requester.getSubreddit(this.sub).getNew({
            limit: parseInt(this.startupLimit)
        });
        // Reverse the array and enqueue the mentions, set the new cutoff UTC
        listing.slice().reverse().forEach(submission => {
            if (submission.created_utc > this.cutoff) {
                this.cutoff = submission.created_utc;
                this.submissions.enqueue(submission);
            }
        });
        // Return the queue
        return this.submissions;
    }
    /* 
        [Check Again]
            - Checks the subreddit/new
            - Filters out the old submissions
            - Enqueues the new submissions
            - Returns the submission queue
     */
    async checkAgain() {
        // Check inbox
        const listing = await this.requester.getSubreddit(this.sub).getNew({
            limit: parseInt(this.submissionLimit)
        });
        // Filter items with created_utc > than the cutoff
        const newSubmissions = listing.filter(mention => mention.created_utc > this.cutoff).slice();
        // Reverse the array and enqueue the new mentions, set the new cutoff UTC
        if (newSubmissions.length > 0) {
            newSubmissions.slice().reverse().forEach(submission => {
                if (submission.created_utc > this.cutoff) {
                    this.cutoff = submission.created_utc;
                    this.submissions.enqueue(submission);
                }
            });
            // Return the queue
            return this.submissions;
        }
    }
}