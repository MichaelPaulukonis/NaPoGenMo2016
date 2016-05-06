'option strict';

// var defaultTemplates = require('./default.templates.js');
var config = require('./config.js'),
    Tumblr = require('tumblrwks'),
    poetifier = require('./jgnoetryRunner.js'),
    mispelr = require('node-mispelr'),
    ALWAYS_PRINT = 0,
    util = new require('./util.js')({statusVerbosity: ALWAYS_PRINT}),
    transform = require('./transform.js');

var tumblr = new Tumblr(
  {
    consumerKey:    config.consumerKey,
    consumerSecret: config.consumerSecret,
    accessToken:    config.accessToken,
    accessSecret:   config.accessSecret
  },
  'poeticalbot.tumblr.com'
);

var logger = function(msg) {
  util.debug(msg, ALWAYS_PRINT);
};

var transformer = function(poem) {

  var stragegies = [transformLeadingSpaces,
                    transformMispeller],
      strategy = util.pick(stragegies);

  var chance = config.transformChance || 0.25;
  // only applies this 25% of the time
  return util.coinflip(chance) ? strategy(poem) : poem;

};

var transformLeadingSpaces = function(poem) {

  var noLeadingSpaceTemplates = ['howl', 'haiku', 'couplet'];
  if (noLeadingSpaceTemplates.indexOf(poem.template) === -1) {
    logger('initial spaces');
    poem.text = transform.initialSpaces().generate(poem.text);
  }

  return poem;

};

var transformMispeller = function(poem) {
  var spelltype = util.randomProperty(mispelr.spelltypes);
  logger(`spelltype: ${spelltype}`);
  poem.text = mispelr.respell(poem.text, spelltype);
  return poem;
};


var onePoem = function() {

  // var titlifier = function(text) {
  //   // TODO: make some generic strategies (like common words)
  //   // but also allow for poem-generating-specific strategies to be returned
  //   return 'untitled';
  // };

  try {

    var poem = poetifier();

    poem = transformer(poem);

    return poem;

  } catch(ex) {
    // the last 3 items are non-standard.....
    var msg = ex.name + ' : ' + ex.message;
    if (ex.lineNumber && ex.columnNumber && ex.stack) {
      msg += ' line: ' + ex.lineNumber + ' col: ' + ex.columnNumber + '\n'
        + ex.stack;
    }
    logger(msg);
    return 'An error has occured';
  }
};


var teller = function() {

  var poem = onePoem();

  if (poem && poem.title && poem.text) {

    if (config.postLive) {
      poem.text = poem.text.replace(/ /g, '&nbsp;'); // "format" for HTML display
      tumblr.post('/post',
                  {type: 'text', title: poem.title, body: poem.text},
                  function(err, json){
                    logger(err + ' ' + json); // TODO: should be able to pass in arbitrary args
                  });
    } else {
      logger(JSON.stringify(poem));
      logger(poem.text);
    }
  }

};


var program = require('commander');
program
  .version('0.0.2')
  .option('-l, --local', 'dump to log, don\'t post to Twitter (overrides environment vars)')
  .option('-t, --transform [percent]', 'percent chance of text transform (in hundreths, eg 0.25 = 25%')
  .parse(process.argv);

if (program.local) {
  config.postLive = false;
}

if (program.transform) {
  var chance = parseFloat(program.transform, 10);
  if (!isNaN(chance)) {
    config.transformChance = chance;
  }
}


teller();
