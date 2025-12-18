import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { url } = await request.json();

		// Validate URL
		if (!url) {
			throw error(400, 'URL is required');
		}

		let urlObj;
		try {
			urlObj = new URL(url);
		} catch {
			throw error(400, 'Invalid URL format');
		}

		// Only allow LinkedIn and GitHub URLs
		if (!urlObj.hostname.includes('linkedin.com') && !urlObj.hostname.includes('github.com')) {
			throw error(400, 'Only LinkedIn and GitHub URLs are allowed');
		}

		// Fetch the page content with timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; BuilderChecker/1.0)'
			},
			signal: controller.signal
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw error(400, 'Unable to fetch the page');
		}

		const content = await response.text();

		// Check for "build" or "built" (case insensitive)
		const isBuilder = /buil/i.test(content);

		return json({
			isBuilder,
			url: url,
			checked: true
		});

	} catch (err) {
		console.error('Builder check error:', err);
		throw error(500, 'Failed to check builder status');
	}
}
