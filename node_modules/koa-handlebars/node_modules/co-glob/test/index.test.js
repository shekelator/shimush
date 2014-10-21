
describe('Test co-glob', function(){

  var glob = require('..');

  it('should be wrapped', function * (){
    var ret = yield glob('./*');

    ret.length.should.be.greaterThan(0);
  })
})
