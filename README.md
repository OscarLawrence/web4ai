# web4ai

`web4ai` is an npm package designed to fetch and process web pages using Puppeteer. It provides a flexible and configurable way to capture HTML, PDF, screenshots, and markdown from web pages.

## Installation

To install the package, run:

```bash
npm install web4ai
```

## Usage

Here's an example of how to use `web4ai`:

```typescript
import { loadWeb } from 'web4ai';

const context = {
	page1: {
		url: 'https://example.com',
		run: async (page) => {
			// Custom script to run on the page
		},
	},
};

loadWeb(context).then((responses) => {
	console.log(responses);
});
```

## Configuration

The `web4ai` package allows you to customize its behavior through a configuration object. Below are the default settings and possible configurations:

### Default Configuration

```typescript
export const DEFAULT_CONFIG: ConfigI = {
	viewPort: {
		width: 375,
		height: 667,
	},
	gotoOptions: {},
	pdf: {
		format: 'A4',
		waitForFonts: true,
	},
	screenshot: {
		captureBeyondViewport: false,
		optimizeForSpeed: true,
	},
	markdown: {
		pdf: {
			format: 'A4',
		},
	},
	html: false,
};
```

### Custom Configuration

You can override the default settings by passing a partial configuration object to the `loadWeb` function:

```typescript
const customConfig = {
	viewPort: {
		width: 1920,
		height: 1080,
	},
	html: true,
};

loadWeb(context, customConfig).then((responses) => {
	console.log(responses);
});
```

### Configuration Options

- `viewPort`: Sets the viewport size for the browser.
- `gotoOptions`: Options to pass to the `page.goto` method.
- `pdf`: Configuration for generating PDF files.
- `screenshot`: Configuration for capturing screenshots.
- `markdown`: Configuration for generating markdown from PDF.
- `html`: Boolean to enable or disable HTML capture.

## Contribution

We welcome contributions to the `web4ai` project. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Donations

If you find this project useful and would like to support its development, please consider making a donation. [Donation Placeholder]
