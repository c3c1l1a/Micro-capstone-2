/**
 * @jest-environment jsdom
 */

import testFunction from '../modules/exampleModule.js';

describe('Making sure it works', () => {
  it('should sum 1 plus 1', () => {
    expect(testFunction('input')).toEqual('input');
  });
});