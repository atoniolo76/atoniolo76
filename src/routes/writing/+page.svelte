<script>
	import KudosButton from '../components/KudosButton.svelte';

	// Mock data for now - in a real app, this would come from a CMS or file system
	let posts = $state([
		{
			slug: 'getting-started-with-sveltekit',
			title: 'Getting Started with SvelteKit',
			excerpt: 'Learn how to build modern web applications with SvelteKit',
			date: '2024-12-18',
			tags: ['svelte', 'web development', 'tutorial']
		},
		{
			slug: 'building-cms-free-websites',
			title: 'Building CMS-Free Websites',
			excerpt: 'Why and how to create websites without traditional content management systems',
			date: '2024-12-17',
			tags: ['cms', 'jamstack', 'web development']
		},
		{
			slug: 'the-future-of-web-development',
			title: 'The Future of Web Development',
			excerpt: 'Exploring upcoming trends and technologies shaping the web',
			date: '2024-12-16',
			tags: ['future', 'technology', 'web development']
		}
	]);
</script>

<svelte:head>
	<title>Writing - Alessio Toniolo</title>
	<meta name="description" content="Articles, thoughts, and insights on software development, technology, and building things." />
	<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/writing/rss.xml" />
</svelte:head>

<div class="max-w-4xl mx-auto p-6">
	<header class="mb-12">
		<h1 class="text-4xl font-bold mb-4">Writing</h1>
		<p class="text-lg text-gray-600 mb-6">
			Articles, thoughts, and insights on software development, technology, and building things.
		</p>
		<div class="flex gap-4">
			<a href="/writing/rss.xml" class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors">
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75v-.5A.75.75 0 003.75 3zM4 6.5A2.5 2.5 0 006.5 4h.5a.75.75 0 00.75-.75v-.5A.75.75 0 006.75 2h-.5A4 4 0 002 6.5v.5c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75v-.5z"/>
					<path d="M7.5 8a.75.75 0 00-.75.75v.5c0 1.404.906 2.62 2.248 3.043.175.055.375-.04.45-.21l.5-1.25A.75.75 0 009.75 10h-.5A.75.75 0 019 9.25v-.5A.75.75 0 017.5 8z"/>
				</svg>
				RSS Feed
			</a>
		</div>
	</header>

	<main class="space-y-8">
		{#each posts as post}
			<article class="border-b border-gray-200 pb-8 last:border-b-0">
				<div class="mb-3">
					<h2 class="text-2xl font-semibold mb-2">
						<a href="/writing/{post.slug}" class="hover:text-blue-600 transition-colors">
							{post.title}
						</a>
					</h2>
					<div class="flex items-center gap-4 text-sm text-gray-500">
						<time datetime={post.date}>
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
					</div>
				</div>
				<p class="text-gray-700 mb-4">{post.excerpt}</p>
				<div class="flex flex-wrap gap-2">
					{#each post.tags as tag}
						<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
							#{tag}
						</span>
					{/each}
				</div>

				<!-- Kudos Button for post preview -->
				<div class="mt-4 pt-4 border-t border-gray-100">
					<KudosButton postSlug={post.slug} />
				</div>
			</article>
		{/each}
	</main>
</div>
