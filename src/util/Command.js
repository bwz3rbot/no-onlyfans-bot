/* 
    [Command Validator]
        - Checks to see if the string passed starts with the prefix
        - Returns a command with:
            a. 

*/
const pre = process.env.COMMAND_PREFIX || "!";
const prefix = function (string) {
    if (string.startsWith(pre)) {
        return true;
    }
}
// Takes in text (from on 'message' listener)
// Returns a command/arguments
const buildCMD = function (string) {
    const args = string.slice(pre.length).trim().split(/ +/g);
    const directive = args.shift().toLowerCase();
    const command = {
        directive,
        args
    }
    return command;
}
const command = function (string) {
    if (prefix(string)) {
        return buildCMD(string);
    }
}


module.exports = class Command {
    constructor() {
        this.directive = new String();
        this.args = new Array();
    }
    /* 
        [Strip Ulink]
            - Strips the /u/username OR u/username if present
            - returns the rest of the string
         */
    stripUlink(string = String) {
        if (string.startsWith('/u/') || string.startsWith('u/')) {
            return string.substring(string.indexOf(" ") + 1);
        }
    }
    /* 
        [Test]
            - Tests a string for first char = prefix
            - Returns a built command with array of args
            - Or false if no prefix is found

    */
    test(string) {
        console.log(`testing this string: "${string}"`);

        let placeholder = new String(string);
        try {
            string = this.stripUlink(string);
            string = string.trim();
        } catch (err) {
            string = placeholder;
        }
        console.log("checking command...");
        const cmd = command(string);
        if (cmd) {

            this.directive = cmd.directive;
            this.args = cmd.args;
            return {
                directive: this.directive,
                args: this.args
            }
        } else {
            return false;
        }

    }
}