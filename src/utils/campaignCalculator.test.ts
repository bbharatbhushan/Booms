import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoiEstimate, getProjectIndex, validateContactForm, formatINR } from './campaignCalculator';

test('getProjectIndex wraps forward and backward safely', () => {
  const total = 4;
  assert.equal(getProjectIndex(0, 1, total), 1);
  assert.equal(getProjectIndex(3, 1, total), 0);
  assert.equal(getProjectIndex(0, -1, total), 3);
  assert.equal(getProjectIndex(2, -1, total), 1);
  assert.equal(getProjectIndex(0, 0, 0), 0);
});

test('calculateRoiEstimate yields scalable metrics and timeline', () => {
  const estimate = calculateRoiEstimate(100000, 'video-ad-production');
  assert.ok(estimate.estimatedImpressions > 0);
  assert.ok(estimate.projectedLeads >= 10);
  assert.ok(estimate.estimatedRoas >= 4.0);
  assert.equal(estimate.productionTimelineWeeks, 4);
  assert.ok(estimate.recommendedMix.length >= 3);
});

test('validateContactForm checks required fields strictly', () => {
  const invalid = validateContactForm({
    fullName: '',
    email: 'not-an-email',
    phone: '123',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);

  const valid = validateContactForm({
    fullName: 'Rahul Sharma',
    email: 'rahul@brand.com',
    phone: '8006603090',
    serviceType: 'video-ad-production',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('formatINR formats currency properly', () => {
  const str = formatINR(500000);
  assert.ok(str.includes('5,00,000') || str.includes('500,000'));
});
