import { describe, expect, it } from 'vitest';
import { isGeneratedAppHost, isMainPlatformHost, normalizeHostname } from './urls';

describe('hostname routing', () => {
	const env = { CUSTOM_DOMAIN: 'UsedArtifacts.com' };

	it('normalizes hostnames to lowercase without a port', () => {
		expect(normalizeHostname('UsedArtifacts.com:443')).toBe('usedartifacts.com');
	});

	it('treats CUSTOM_DOMAIN as the platform host regardless of casing', () => {
		expect(isMainPlatformHost('usedartifacts.com', env)).toBe(true);
		expect(isMainPlatformHost('UsedArtifacts.com', env)).toBe(true);
	});

	it('treats the Worker workers.dev URL as the platform host', () => {
		expect(isMainPlatformHost('youneekvibecode.account.workers.dev', env)).toBe(true);
	});

	it('does not treat generated-app subdomains as the platform host', () => {
		expect(isMainPlatformHost('app-123.usedartifacts.com', env)).toBe(false);
		expect(isGeneratedAppHost('app-123.usedartifacts.com', env.CUSTOM_DOMAIN)).toBe(true);
	});
});
