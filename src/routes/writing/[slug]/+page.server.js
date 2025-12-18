// Mock data for blog posts
// In a real app, this would load from MDX files or a CMS
const posts = {
	'getting-started-with-sveltekit': {
		slug: 'getting-started-with-sveltekit',
		title: 'Getting Started with SvelteKit',
		date: '2024-12-18',
		tags: ['svelte', 'web development', 'tutorial'],
		content: `# Getting Started with SvelteKit

SvelteKit is a modern framework for building web applications. It combines the best of both worlds: the simplicity of Svelte with powerful features like server-side rendering, routing, and more.

## Why SvelteKit?

- **Fast by default**: Built on Svelte's compiler
- **Flexible**: Choose between SPA, SSR, or static generation
- **Developer experience**: Hot reloading, TypeScript support, and more

## Basic Setup

\`\`\`bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

This will give you a basic SvelteKit application running on \`http://localhost:5173\`.

## Key Concepts

### Routes
Routes are defined by creating files in the \`src/routes\` directory. For example:

- \`+page.svelte\` - The main page
- \`+layout.svelte\` - Layout wrapper
- \`+page.server.js\` - Server-side data loading

### Loading Data

Use \`+page.server.js\` to load data before rendering:

\`\`\`javascript
export async function load({ params }) {
  return {
    title: 'My Page',
    content: await fetchSomeData()
  };
}
\`\`\`

## Conclusion

SvelteKit makes it easy to build modern web applications. Start with the basics and explore the documentation for more advanced features!`
	},
	'building-cms-free-websites': {
		slug: 'building-cms-free-websites',
		title: 'Building CMS-Free Websites',
		date: '2024-12-17',
		tags: ['cms', 'jamstack', 'web development'],
		content: `# Building CMS-Free Websites

Traditional content management systems can be heavy, complex, and expensive. What if you could build websites without them?

## The Problem with Traditional CMS

- **Complexity**: WordPress, Drupal, and similar systems require extensive setup
- **Performance**: Database queries and heavy PHP/Python backends slow things down
- **Security**: Large attack surface with plugins and extensions
- **Cost**: Hosting, maintenance, and development time add up

## The Alternative: Code-Based Content

Modern frameworks allow you to write content in code, giving you:

- **Version control**: Git-based content management
- **Performance**: Static generation and CDN delivery
- **Security**: Minimal attack surface
- **Flexibility**: Full control over design and functionality

## Tools for CMS-Free Development

### Static Site Generators
- **Astro**: Component-based with multiple framework support
- **Next.js**: React-based with static generation
- **SvelteKit**: Svelte-based with powerful routing

### Headless CMS (When You Need It)
- **Contentful**: API-first content management
- **Strapi**: Open-source headless CMS
- **Sanity**: Real-time collaborative editing

## Getting Started

1. Choose your framework
2. Design your content structure
3. Create components for different content types
4. Write your content in Markdown or code
5. Deploy to a CDN

## Example Structure

\`\`\`
src/
  routes/
    +page.svelte          # Home page
    writing/
      +page.svelte        # Blog index
      [slug]/
        +page.server.js   # Load post data
        +page.svelte      # Render post
  components/
    Header.svelte
    Footer.svelte
    PostPreview.svelte
\`\`\`

This approach gives you the best of both worlds: easy content management with full developer control.`
	},
	'the-future-of-web-development': {
		slug: 'the-future-of-web-development',
		title: 'The Future of Web Development',
		date: '2024-12-16',
		tags: ['future', 'technology', 'web development'],
		content: `# The Future of Web Development

Web development is constantly evolving. What trends should developers pay attention to?

## Current State of Web Development

The web has come a long way from simple HTML pages. Today we have:

- **Modern Frameworks**: React, Vue, Svelte, Angular
- **Build Tools**: Vite, esbuild, webpack
- **Deployment**: Vercel, Netlify, Cloudflare Pages
- **APIs**: REST, GraphQL, tRPC

## Emerging Trends

### 1. AI-Assisted Development

AI tools are becoming increasingly sophisticated:
- Code generation and completion
- Automated testing and debugging
- Performance optimization suggestions

### 2. Edge Computing

Moving computation closer to users:
- Cloudflare Workers and Vercel Edge Functions
- Reduced latency and improved performance
- Global distribution of applications

### 3. Web Components

Framework-agnostic reusable components:
- Native browser support
- Interoperability between frameworks
- Design system consistency

### 4. Server Components

Server-side rendering of components:
- Reduced bundle sizes
- Better SEO and performance
- Progressive enhancement

## The Role of Frameworks

Frameworks will continue to evolve:

- **React**: Server Components and concurrent features
- **Vue**: Composition API improvements
- **Svelte**: Compiler optimizations and ecosystem growth
- **Astro**: Multi-framework support and performance focus

## Developer Experience

The focus is shifting toward:

- **Faster builds**: esbuild and similar tools
- **Better TypeScript support**: Stricter type checking
- **Improved debugging**: Better error messages and tooling
- **Zero-config setups**: Convention over configuration

## Preparing for the Future

To stay relevant:

1. **Learn fundamentals**: JavaScript, HTML, CSS, HTTP
2. **Stay curious**: Try new tools and frameworks
3. **Focus on performance**: Core Web Vitals matter
4. **Embrace change**: The web platform evolves rapidly

## Conclusion

The future of web development is exciting. By staying adaptable and focusing on fundamentals, developers can thrive in this rapidly changing landscape.`
	}
};

export async function load({ params }) {
	const post = posts[params.slug];

	if (!post) {
		throw new Error('Post not found');
	}

	return {
		post
	};
}
