<script>
	let { path } = $props(); // Keep for compatibility, but don't use it

	// Static navigation for production - doesn't depend on database
	const navItems = [
		{ url: '/', label: 'Home' },
		{ url: '/writing', label: 'Writing' },
		{ url: '/projects', label: 'Projects' },
		{ url: '/about', label: 'About' }
	];
</script>

<div class="nav mx-auto w-full max-w-5xl py-6 pb-12">
	<div class="nav-items flex flex-wrap gap-6">
		{#each navItems as item}
			<a
				href={item.url}
				class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
			>
				{item.label}
			</a>
		{/each}
	</div>
</div>

<style>
	.nav .nav-items {
		align-items: center;
	}
</style>
