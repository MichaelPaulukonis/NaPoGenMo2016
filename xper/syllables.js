'use strict';

let util = new require('./lib/util.js')(),
    jg = new require('./lib/jgnoetry.headless.js')(util.debug),
    nlp = require('nlp_compromise'),
    syllables = require('nlp-syllables');

nlp.plugin(syllables);

  // see notes @ https://gnoetrydaily.wordpress.com/2011/12/27/presenting-jgnoetry/#comment-952
var exceptions = Object.keys( {
    'people': 2, 'our': 2, 'israel': 3, 'little': 2, 'mr': 2, 'being': 2, 'saying': 2,
    'therefore': 2, 'called': 1, 'p': 1, 'mrs': 2, 'something': 2, 'themselves': 2, 'going': 2, 'fire': 2, 'seemed': 1,
    'looked': 1, 'times': 1, 'turned': 1, 'c': 1, 'used': 1, 'm': 1, 'l': 1, 'dorothea': 4, 'asked': 1, 'able': 2,
    'answered': 2, 's': 1, 'sometimes': 2, 'possible': 3, 'everything': 3, 'received': 2, 'passed': 1, 'surely': 2,
    'desire': 3, 'trouble': 2, 'doing': 2, 'makes': 1, 'empire': 3, 'business': 2, 'beyond': 2, 'comes': 1, 'several': 2,
    'battle': 2, 'table': 2, 'filled': 1, 'hour': 2, 'seeing': 2, 'returned': 2, 'states': 1, 'didn\'t': 2, 'followed': 2,
    'delivered': 3, 'temple': 2, 'interest': 2, 'entered': 2, 'appeared': 2, 'opened': 2, 'blessed': 1, 'single': 2,
    'happened': 2, 'everybody': 4, 'idea': 3, 'gathered': 2, 'various': 3, 'evening': 2, 'walked': 1, 'james': 1,
    'there\'s': 1, 'dr': 1, 'ones': 1, 'b': 1, 'loved': 1, 'considered': 3, 'tabernacle': 4, 'killed': 1, 'lived': 1,
    'names': 1, 'raised': 1, 'believed': 2, 'learned': 1, 'lives': 1, 'hours': 2, 'st': 1, 'spiritual': 4, 'd': 1,
    'miles': 1, 'v': 1, 'example': 3, 'offered': 2, 'society': 4, 't': 1, 'covered': 2, 'stones': 1, 'moved': 1,
    'prepared': 2, 'changed': 1, 'likely': 2, 'impossible': 4, 'g': 1, 'tongue': 1, 'gates': 1, 'experience': 4,
    'caused': 1, 'trying': 2, 'middle': 2, 'usual': 3, 'likewise': 2, 'simple': 2, 'quiet': 2, 'wives': 1, 'terrible': 3,
    'available': 4, 'remained': 2, 'liked': 1, 'noble': 2, 'curious': 3, 'clothes': 1, 'described': 2, 'gives': 1,
    'philistines': 3, 'formed': 1, 'wished': 1, 'allowed': 2, 'joshua': 3, 'uncle': 2, 'especially': 3, 'discovered': 3,
    'takes': 1, 'statement': 2, 'period': 3, 'mentioned': 2, 'one\'s': 1, 'lying': 2, 'saved': 1, 'ashamed': 2, 'merely': 2,
    'minutes': 2, 'reached': 1, 'bones': 1, 'named': 1, 'removed': 2, 'placed': 1, 'situation': 4, 'beloved': 2, 'stopped': 1,
    'served': 1, 'barbarians': 4, 'yourselves': 2, 'besides': 2, 'possessed': 2, 'obtained': 2, 'media': 3, 'purple': 2,
    'cattle': 2, 'established': 3, 'becomes': 2, 'determined': 3, 'reigned': 1, 'doesn\'t': 2, 'whatsoever': 4, 'f': 1,
    'obliged': 2, 'tribes': 1, 'remembered': 3, 'pleased': 1, 'sides': 1, 'couldn\'t': 2, 'suffered': 2, 'wouldn\'t': 2,
    'rules': 1, 'produced': 2, 'charles': 1, 'whosoever': 4, 'serious': 3, 'medea': 3, 'created': 3, 'increased': 2,
    'violence': 3, 'finished': 2, 'ores': 1, 'lion': 2, 'sanctuary': 4, 'actually': 4, 'dion': 2, 'scattered': 2, 'engaged': 2,
    'title': 2, 'talked': 1, 'ideas': 3, 'armed': 1, 'fixed': 1, 'preserved': 2, 'anyone': 3, 'maybe': 2, 'imperial': 4,
    'supposed': 2, 'completely': 3, 'x': 1, 'science': 2, 'o\'brien': 3, 'gentle': 2, 'individual': 5, 'leaves': 1,
    'safety': 2, 'moab': 2, 'double': 2, 'somewhat': 2, 'zion': 2, 'observed': 2, 'poured': 1, 'movement': 2, 'worked': 1,
    'ruin': 2, 'promised': 2, 'usually': 4, 'showed': 1, 'occurred': 2, 'superior': 4, 'chariots': 3, 'syria': 3, 'notes': 1,
    'creative': 3, 'principle': 3, 'isn\'t': 2, 'burned': 1, 'somebody': 3, 'statutes': 2, 'bowed': 1, 'refused': 2, 'royal': 2,
    'expressed': 2, 'continually': 5, 'pictures': 2, 'escaped': 2, 'material': 4, 'considerable': 5, 'centre': 2, 'useful': 2,
    'radio': 3, 'touched': 1, 'feared': 1, 'stretched': 1, 'declared': 2, 'proposed': 2, 'forced': 1, 'carefully': 3,
    'influence': 3, 'earlier': 3, 'gradually': 4, 'glorious': 3, 'reality': 4, 'measures': 2, 'lines': 1, 'aged': 1,
    'surprised': 2, 'distinguished': 3, 'consumed': 2, 'proved': 1, 'jeremiah': 4, 'closed': 1, 'miserable': 4, 'gained': 1,
    'arrived': 2, 'chariot': 3, 'hopes': 1, 'somehow': 2, 'marked': 1, 'n': 1, 'ordered': 2, 'unable': 3, 'joined': 1,
    'sovereign': 2, 'numbered': 2, 'etc': 4, 'samaria': 4, 'published': 2, 'playing': 2, 'gentiles': 2, 'wasn\'t': 2, 'mixed': 1,
    'intellectual': 5, 'cruel': 2, 'immediate': 4, 'scarcely': 2, 'explained': 2, 'r': 1, 'sinned': 1, 'struggle': 2, 'ph': 2,
    'announced': 2, 'failed': 1, 'careful': 2, 'require': 3, 'creatures': 2, 'concerned': 2, 'capable': 3, 'charged': 1,
    'laughed': 1, 'obvious': 3, 'dropped': 1, 'despised': 2, 'dying': 2, 'measured': 2, 'accustomed': 3, 'violent': 3,
    'y\'all': 1, 'somewhere': 2, 'household': 2, 'colored': 2, 'watched': 1, 'fulfilled': 2, 'helped': 1, 'assyria': 4,
    'based': 1, 'humble': 2, 'released': 2, 'marble': 2, 'noticed': 2, 'clothed': 1, 'plague': 1, 'carrying': 3, 'contained': 2,
    'dressed': 1, 'claimed': 1, 'involved': 2, 'actual': 3, 'introduced': 3, 'advanced': 2, 'judged': 1, 'area': 3,
    'oppressed': 2, 'honorable': 4, 'flying': 2, 'valuable': 3, 'revealed': 2, 'crying': 2, 'slaves': 1, 'create': 2,
    'washed': 1, 'vague': 1, 'trial': 2, 'confirmed': 2, 'exposed': 2, 'ceased': 1, 'entire': 3, 'performed': 2, 'mysterious': 4,
    'cursed': 1, 'wondered': 2, 'couple': 2, 'previously': 4, 'resolved': 2, 'w': 3, 'restored': 2, 'associated': 5,
    'triumph': 2, 'extremely': 3, 'convinced': 2, 'visible': 3, 'accomplished': 3, 'remarkable': 4, 'attacked': 2, 'pressed': 1,
    'seized': 1, 'curiosity': 5, 'previous': 3, 'inclined': 2, 'interests': 2, 'sexual': 3, 'quietly': 3, 'everywhere': 3,
    'treasures': 2, 'appropriate': 4, 'namely': 2, 'figures': 2, 'machines': 2, 'farewell': 2, 'jeroboam': 4, 'graduate': 3,
    'acknowledged': 3, 'interested': 3, 'lately': 2, 'probable': 3, 'reduced': 2, 'whereby': 2, 'pitched': 1, 'interesting': 3,
    'useless': 2, 'agreeable': 4, 'easier': 3, 'informed': 2, 'accused': 2, 'pleasures': 2, 'remarked': 2, 'assumed': 2,
    'attached': 2, 'desperate': 2, 'games': 1, 'exclaimed': 2, 'astonished': 3, 'audience': 3, 'careless': 2, 'horsemen': 2,
    'healed': 1, 'waves': 1, 'perpetual': 4, 'obviously': 4, 'worshipped': 2, 'lonely': 2, 'features': 2, 'composed': 2,
    'condemned': 2, 'louis': 2, 'creativity': 5, 'article': 3, 'ruins': 2, 'perceived': 2, 'rites': 1, 'scientific': 4,
    'trembling': 3, 'grateful': 2, 'lovely': 2, 'q': 1, 'compared': 2, 'devour': 3, 'spoiled': 1, 'individuals': 5, 'h': 1,
    'deceived': 2, 'managed': 2, 'paused': 1, 'loves': 1, 'confined': 2, 'derived': 2, 'likeness': 2, 'poet': 2, 'genuine': 3,
    'assured': 2, 'hoped': 1, 'inferior': 4, 'perished': 2, 'imagined': 3, 'listened': 2, 'anxiety': 4, 'feeble': 2,
    'closely': 2, 'idle': 2, 'designed': 2, 'reserved': 2, 'enable': 3, 'maintained': 2, 'compelled': 2, 'association': 5,
    'preached': 1, 'urged': 1, 'likes': 1, 'atonement': 3, 'conceived': 2, 'abandoned': 3, 'hadn\'t': 2, 'sacrificed': 3,
    'prevailed': 2, 'disposed': 2, 'wandered': 2, 'doings': 2, 'twentieth': 3, 'paying': 2, 'approved': 2, 'rendered': 2,
    'describes': 2, 'poetry': 3, 'prism': 2, 'addressed': 2, 'punished': 2, 'injured': 2, 'barbarian': 4, 'circle': 2,
    'movements': 2, 'horrible': 3, 'pushed': 1, 'iago': 3, 'recognized': 3, 'declined': 2, 'vanished': 2, 'christianity': 5,
    'lively': 2, 'dared': 1, 'formidable': 4, 'deity': 3, 'obedience': 4, 'pronounced': 2, 'thereby': 2, 'captives': 2,
    'deserved': 2, 'stirred': 1, 'beings': 2, 'ts': 2, 'uttered': 2, 'sealed': 1
});

// expect(jg.countSyllables(s[0])).to.equal(s[1]);

let ns = (w) => nlp.term(w).syllables().length,
    js = (w) => jg.countSyllables(w);

let diffs = exceptions.map(e => ns(e) !== js(e) ? console.log(`nlp: ${ns(e)} js: ${js(e)} - ${e}`) : '' );

console.log(`total mismatch: ${diffs.length}`);