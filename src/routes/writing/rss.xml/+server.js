import { json } from '@sveltejs/kit';

export async function GET() {
	const posts = [
		{
			slug: 'getting-started-with-sveltekit',
			title: 'Getting Started with SvelteKit',
			excerpt: 'Learn how to build modern web applications with SvelteKit',
			date: '2024-12-18',
			tags: ['svelte', 'web development', 'tutorial'],
			content: 'This is the full content of the getting started with SvelteKit post...'
		},
		{
			slug: 'building-cms-free-websites',
			title: 'Building CMS-Free Websites',
			excerpt: 'Why and how to create websites without traditional content management systems',
			date: '2024-12-17',
			tags: ['cms', 'jamstack', 'web development'],
			content: 'This is the full content of the CMS-free websites post...'
		},
		{
			slug: 'the-future-of-web-development',
			title: 'The Future of Web Development',
			excerpt: 'Exploring upcoming trends and technologies shaping the web',
			date: '2024-12-16',
			tags: ['future', 'technology', 'web development'],
			content: 'This is the full content of the future of web development post...'
		}
	];

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Alessio Toniolo - Writing</title>
		<description>Articles, thoughts, and insights on software development, technology, and building things.</description>
		<link>https://alessiotoniolo.com/writing</link>
		<atom:link href="https://alessiotoniolo.com/writing/rss.xml" rel="self" type="application/rss+xml" />
		<language>en-us</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${posts.map(post => `
		<item>
			<title>${post.title}</title>
			<description><![CDATA[${post.excerpt}]]></description>
			<link>https://alessiotoniolo.com/writing/${post.slug}</link>
			<guid>https://alessiotoniolo.com/writing/${post.slug}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			${post.tags.map(tag => `<category>${tag}</category>`).join('')}
		</item>
		`).join('')}
	</channel>
</rss>`.trim();

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
