const testLinks = function (string) {
    const lc = string.toLowerCase();
    if (lc.includes(process.env.TEST_FOR)) {
        return true;
    }
}
module.exports = {
    testLinks
}