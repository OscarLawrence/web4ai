# web4ai

`web4ai` is an npm package designed to fetch and process web pages using Puppeteer. It provides a flexible and configurable way to capture HTML, PDF, screenshots, and markdown from web pages.

[![npm version](https://badge.fury.io/js/web4ai.svg)](https://badge.fury.io/js/web4ai)
[![Build Status](https://travis-ci.org/OscarLawrence/web4ai.svg?branch=master)](https://travis-ci.org/OscarLawrence/web4ai)
[![GitHub license](https://img.shields.io/github/license/OscarLawrence/web4ai.svg)](https://github.com/OscarLawrence/web4ai/blob/master/LICENSE)

## Installation

Install the package using npm:

```sh
npm install web4ai
```

Or using pnpm:

```sh
pnpm add web4ai
```

## Usage

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

## Documentation

For detailed documentation, please refer to the [API Documentation](https://github.com/OscarLawrence/web4ai/wiki).

### Adding Documentation

To add or update the documentation, follow these steps:

1. Go to the [wiki](https://github.com/OscarLawrence/web4ai/wiki) of the repository.
2. Create a new page or edit an existing page.
3. Use Markdown to format the documentation.
4. Save the changes.

## Contributing

Contributions are welcome! Please read the [contribution guidelines](https://github.com/OscarLawrence/web4ai/blob/master/CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/OscarLawrence/web4ai/blob/master/LICENSE) file for details.

## Support

If you like this project, help us maintain it and create more awesome projects by donating:

[donorbox](https://donorbox.org/vindao)

[Paypal](https://www.paypal.com/pool/9djs5G3kWz?sr=wccr)

![Paypal-qr code](Data/qrcode.png)

## Author

Vindao - [contact@vindao.io](mailto:contact@vindao.io)
