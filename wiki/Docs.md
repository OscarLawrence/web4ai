# web4ai Documentation

## Overview

`web4ai` is an npm package designed to fetch and process web pages using Puppeteer. It provides a flexible and configurable way to capture HTML, PDF, screenshots, and markdown from web pages.

## Installation

To install the package, use npm:

```sh
npm install web4ai
```

Or use pnpm:

```sh
pnpm add web4ai
```

## Usage

### Basic Example

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

### Detailed Examples

#### Example 1: Basic Usage

```typescript
// Add detailed example code here
```

#### Example 2: Advanced Usage

```typescript
// Add advanced example code here
```

## API Reference

### Functions

#### `loadWeb(context, config?)`

Description of what the `loadWeb` function does.

**Parameters:**

- `context`: An object defining the pages to load and the scripts to run on them.
- `config` (optional): A configuration object to customize the behavior of the function.

**Returns:**

- `Promise<object>`: Returns a promise that resolves to an object containing the responses from the pages.

## Contributing

Contributions are welcome! Please read the [contribution guidelines](https://github.com/OscarLawrence/web4ai/blob/master/CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/OscarLawrence/web4ai/blob/master/LICENSE) file for details.

## Support

If you like this project, help us maintain it and create more awesome projects by donating:

[donorbox](https://donorbox.org/vindao)

[Paypal](https://www.paypal.com/pool/9djs5G3kWz?sr=wccr)

![Paypal-qr code](../Data/qrcode.png)

## Author

Vindao - [contact@vindao.io](mailto:contact@vindao.io)
