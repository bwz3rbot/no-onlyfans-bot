const dotenv = require('dotenv').config({
    path: "pw.env"
});
const colors = require('colors');
const Reddit = require('../src/lib/Reddit');

/* Wiki Editor Test */
reddit = new Reddit();
(async () => {
    console.log("Running sub monitor test".rainbow);
    console.log("creating new reddit object".magenta);
    const row1 = {
        rating: "5",
        type: "Trade",
        comments: "https://www.reddit.com/r/s/g6j7nix?utm_source=share&utm_medium=web2x&context=3"
    }
    const row2 = {
        rating: "2",
        type: "Giveaway",
        comments: `https://www.reddit.com/r/s/g6j7nix?utm_source=share&utm_medium=web2x&context=3`
    }
    const row3 = {
        rating: "1",
        type: "Sale",
        comments: "https://www.reddit.com/r/s/g6j7nix?utm_source=share&utm_medium=web2x&context=3"
    }


    const md = reddit.getWikiEditor().md;
    console.log("got this markdown: ", md);

    const table = md.table(["Rating", "Type", "Comments"], [row1, row2, row3]);
    const page = await reddit.getWikiEditor().editPage('bottestpage', table);
    console.log(page);



})();