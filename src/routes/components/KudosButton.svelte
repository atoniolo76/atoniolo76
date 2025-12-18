<script>
	let { postSlug } = $props();

	// Track kudos state
	let hasKudosed = $state(false);
	let isHovered = $state(false);
	let isAnimating = $state(false);

	// Check localStorage on mount
	$effect(() => {
		const kudosedPosts = JSON.parse(localStorage.getItem('kudosedPosts') || '[]');
		hasKudosed = kudosedPosts.includes(postSlug);
	});

	function handleClick() {
		if (hasKudosed) return; // Already kudosed

		isAnimating = true;

		// Update localStorage
		const kudosedPosts = JSON.parse(localStorage.getItem('kudosedPosts') || '[]');
		kudosedPosts.push(postSlug);
		localStorage.setItem('kudosedPosts', JSON.stringify(kudosedPosts));

		// Update state
		hasKudosed = true;

		// Reset animation after it completes
		setTimeout(() => {
			isAnimating = false;
		}, 1000);
	}
</script>

<button
	class="kudos-button"
	class:has-kudosed={hasKudosed}
	class:hovered={isHovered}
	class:animating={isAnimating}
	onclick={handleClick}
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
	disabled={hasKudosed}
	aria-label={hasKudosed ? 'You gave kudos to this post!' : 'Give kudos to this post'}
>
	<svg
		viewBox="0 0 24 24"
		class="heart-icon"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
	>
		<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
	</svg>
	<span class="kudos-text">
		{hasKudosed ? 'Kudosed!' : 'Kudos'}
	</span>
</button>

<style>
	.kudos-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		border: 2px solid #e5e7eb;
		border-radius: 0.75rem;
		background: white;
		color: #6b7280;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.kudos-button:not(:disabled):hover {
		border-color: #ef4444;
		color: #ef4444;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
	}

	.kudos-button:disabled {
		cursor: default;
	}

	/* Fill animation */
	.kudos-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
		transition: width 0.6s ease;
		z-index: -1;
		border-radius: 0.5rem;
	}

	.kudos-button.hovered::before {
		width: 100%;
	}

	.kudos-button.has-kudosed {
		border-color: #ef4444;
		background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
		color: #dc2626;
	}

	.kudos-button.animating {
		animation: pulse 0.6s ease-in-out;
	}

	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.heart-icon {
		width: 1.25rem;
		height: 1.25rem;
		transition: all 0.3s ease;
	}

	.kudos-button:not(.has-kudosed) .heart-icon {
		stroke: #6b7280;
	}

	.kudos-button.has-kudosed .heart-icon {
		fill: #ef4444;
		stroke: #ef4444;
	}

	.kudos-button:not(.has-kudosed).hovered .heart-icon {
		fill: #ef4444;
		stroke: #ef4444;
		animation: heartbeat 0.6s ease-in-out;
	}

	@keyframes heartbeat {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}

	.kudos-text {
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.kudos-button.has-kudosed .kudos-text {
		color: #dc2626;
	}
</style>
