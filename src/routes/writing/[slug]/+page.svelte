<script>
	import KudosButton from '../components/KudosButton.svelte';

	let { data } = $props();
	let post = $derived(data.post);

	function renderMarkdown(content) {
		// Simple markdown renderer for basic formatting
		return content
			// Code blocks
			.replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
			// Inline code
			.replace(/`([^`]+)`/g, '<code>$1</code>')
			// Headers
			.replace(/^### (.*$)/gm, '<h3>$1</h3>')
			.replace(/^## (.*$)/gm, '<h2>$1</h2>')
			.replace(/^# (.*$)/gm, '<h1>$1</h1>')
			// Lists
			.replace(/^\* (.*$)/gm, '<li>$1</li>')
			.replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
			// Wrap consecutive list items
			.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
			// Bold
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// Italic
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			// Line breaks
			.replace(/\n\n/g, '</p><p>')
			// Wrap in paragraphs
			.replace(/^(.+)$/gm, '<p>$1</p>')
			// Clean up empty paragraphs
			.replace(/<p><\/p>/g, '')
			// Fix nested elements
			.replace(/<\/p>\s*<ul>/g, '</p><ul>')
			.replace(/<\/ul>\s*<p>/g, '</ul><p>');
	}
</script>

<svelte:head>
	<title>{post.title} - Writing</title>
	<meta name="description" content={post.title} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.title} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="max-w-4xl mx-auto p-6">
	<header class="mb-8">
		<div class="mb-4">
			<a href="/writing" class="text-blue-600 hover:text-blue-800 text-sm">← Back to Writing</a>
		</div>
		<h1 class="text-4xl font-bold mb-4">{post.title}</h1>
		<div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
			<time datetime={post.date}>
				{new Date(post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			<span>•</span>
			<div class="flex gap-2">
				{#each post.tags as tag}
					<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
						#{tag}
					</span>
				{/each}
			</div>
		</div>
	</header>

	<main class="prose prose-lg max-w-none">
		<!-- Simple markdown-like renderer -->
		<div class="markdown-content">
			{@html renderMarkdown(post.content)}
		</div>

		<!-- Kudos Button -->
		<div class="mt-12 pt-8 border-t border-gray-200">
			<div class="flex items-center justify-between">
				<div class="text-sm text-gray-600">
					Did you enjoy this post? Show some love!
				</div>
				<KudosButton postSlug={post.slug} />
			</div>
		</div>
	</main>
</div>

<style>
	.markdown-content {
		line-height: 1.7;
	}

	.markdown-content h1,
	.markdown-content h2,
	.markdown-content h3,
	.markdown-content h4,
	.markdown-content h5,
	.markdown-content h6 {
		color: #1f2937;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.markdown-content h1 { font-size: 2.25rem; }
	.markdown-content h2 { font-size: 1.875rem; }
	.markdown-content h3 { font-size: 1.5rem; }

	.markdown-content p {
		margin-bottom: 1rem;
	}

	.markdown-content pre {
		background: #f3f4f6;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.markdown-content code {
		background: #f3f4f6;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	.markdown-content pre code {
		background: transparent;
		padding: 0;
	}

	.markdown-content blockquote {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}

	.markdown-content ul,
	.markdown-content ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.markdown-content li {
		margin-bottom: 0.5rem;
	}
</style>
