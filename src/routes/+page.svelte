<nav class="flex justify-center py-6 mb-8">
  <div class="flex gap-8">
    <a href="/" class="text-blue-600 font-medium">Home</a>
    <a href="/writing" class="text-gray-700 hover:text-blue-600 transition-colors">Writing</a>
    <a href="/projects" class="text-gray-700 hover:text-blue-600 transition-colors">Projects</a>
    <a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
  </div>
</nav>

<div class="p-10">
  <h1 class="text-2xl font-bold">Alessio Toniolo</h1>
  <p class="pt-6">
    building multi-node training <a class="underline" href="https://modal.com" target="_blank" rel="noopener">@modal</a>
    <a class="underline inline-flex items-center gap-1" href="https://github.com/atoniolo76" target="_blank" rel="noopener">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.775.418-1.305.76-1.606-2.665-.305-5.467-1.334-5.467-5.932 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.897-.015 3.293 0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
      @atoniolo76
    </a>.
  </p>

  <!-- Builder Checker -->
  <div class="mt-12 max-w-md">
    <div class="flex gap-2">
      <input
        bind:value={url}
        type="url"
        placeholder="Enter LinkedIn or GitHub URL"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onclick={checkBuilder}
        disabled={loading}
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {#if loading}
          <span class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Checking...
          </span>
        {:else}
          Builder?
        {/if}
      </button>
    </div>

    {#if result !== null}
      <div
        class="mt-4 p-4 rounded-lg text-center font-bold text-lg transition-all duration-300 {result ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'}"
        class:flash={showFlash}
      >
        {result ? 'YES! 🚀' : 'NO 😔'}
      </div>
    {/if}

    {#if error}
      <div class="mt-4 p-4 bg-red-100 text-red-800 rounded-lg border-2 border-red-300">
        {error}
      </div>
    {/if}
  </div>
</div>

<script>
  let url = $state('');
  let loading = $state(false);
  let result = $state(null);
  let error = $state('');
  let showFlash = $state(false);

  async function checkBuilder() {
    if (!url.trim()) {
      error = 'Please enter a URL';
      return;
    }

    // Basic validation
    try {
      const urlObj = new URL(url);
      if (!urlObj.hostname.includes('linkedin.com') && !urlObj.hostname.includes('github.com')) {
        error = 'Only LinkedIn and GitHub URLs are allowed';
        return;
      }
    } catch {
      error = 'Please enter a valid URL';
      return;
    }

    loading = true;
    error = '';
    result = null;
    showFlash = false;

    try {
      const response = await fetch('/api/check-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to check');
      }

      result = data.isBuilder;
      showFlash = true;

      // Remove flash effect after animation
      setTimeout(() => {
        showFlash = false;
      }, 2000);

    } catch (err) {
      error = err.message || 'Something went wrong';
    } finally {
      loading = false;
    }
  }
</script>

<style>
  .flash {
    animation: flash 0.5s ease-in-out;
  }

  @keyframes flash {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
</style>
