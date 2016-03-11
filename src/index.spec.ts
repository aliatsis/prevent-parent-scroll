import * as tape from 'tape';
import { Test } from 'tape';

let _test = require('tape-promise');
const test = _test(tape); // decorate tape 

test('placeholder', function(t: Test): void {
  t.end();
});