const cmd = require('../src/util/Command');

command = new cmd();

let c = command.stripUlink("/u/SnootyScraper ?is this a command?");

console.log(command.test(c));

