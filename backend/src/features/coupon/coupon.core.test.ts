import { describe, it } from 'node:test';

import { getHostname, isValidHostname } from './coupon.core';
import assert from 'node:assert';

describe('coupon.core', () => {
  it('should extract hostname from URL', () => {
    assert.strictEqual(getHostname('https://amazon.com/product/umbrella'), 'amazon.com');
    assert.strictEqual(getHostname('https://www.tokopedia.com/product/umbrella'), 'tokopedia.com');
    assert.strictEqual(getHostname('https://www.shopee.co.id/product/umbrella'), 'shopee.co.id');
    assert.strictEqual(getHostname('https://www.bukalapak.com/product/umbrella'), 'bukalapak.com');
    assert.strictEqual(getHostname('https://www.zalora.co.id/product/umbrella'), 'zalora.co.id');
  });

  it('should validate hostname', () => {
    assert.strictEqual(isValidHostname('example.com'), true);
    assert.strictEqual(isValidHostname('sub.example.com'), true);
    assert.strictEqual(isValidHostname('-example.com'), false);
    assert.strictEqual(isValidHostname('example-.com'), false);
  });
});
