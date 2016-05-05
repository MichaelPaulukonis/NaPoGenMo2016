'use strict';

// exeecute with `mocha test.js`

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Util = require('../util.js'),
      util = new Util();


  describe('util tests', function() {

    describe('API tests', function() {

      it('Util should return a new instance with new', function() {
        var newutil = new Util();
        expect(newutil).to.be.a('object');
        expect(newutil).to.be.an.instanceof(Util);
      });

      it('Util should return a new instance even without new', function() {
        var util = Util();
        expect(util).to.be.a('object');
        expect(util).to.be.an.instanceof(Util);
      });

      it('Util should expose a debug method', function() {
        expect(util.debug).to.be.a('function');
      });

      it('Util should expose a debugOutput method', function() {
        expect(util.debugOutput).to.be.a('function');
      });

      it('Util should expose a randomProperty method', function() {
        expect(util.randomProperty).to.be.a('function');
      });

      it('Util should expose a pick method', function() {
        expect(util.pick).to.be.a('function');
      });

      it('Util should expose a random method', function() {
        expect(util.random).to.be.a('function');
      });

      it('Util should expose a getRandomInRange method', function() {
        expect(util.getRandomInRange).to.be.a('function');
      });

      it('Util should expose a coinflip method', function() {
        expect(util.coinflip).to.be.a('function');
      });

      it('Util should expose a pickRemove method', function() {
        expect(util.pickRemove).to.be.a('function');
      });

      it('Util should expose a shuffle method', function() {
        expect(util.shuffle).to.be.a('function');
      });


    });

  });

}();