# puppeteer2pdf

`puppeteer2pdf` is an npm package that leverages Puppeteer to generate PDFs and screenshots from web pages. This package allows you to automate the process of capturing web content and saving it as PDF or image files.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the package, use npm or yarn:

```bash
npm install puppeteer2pdf
```

or

```bash
yarn add puppeteer2pdf
```

## Usage

Here's a basic example of how to use `puppeteer2pdf`:

```typescript
import { loadPdfs } from 'puppeteer2pdf';

const settings = {
	page1: {
		url: 'https://example.com',
	},
	page2: {
		url: 'https://example.org',
		run: async (page) => {
			// Custom script to run on the page
		},
	},
};

loadPdfs(settings).then((results) => {
	console.log('PDFs and screenshots generated:', results);
});
```

## Configuration

The `loadPdfs` function accepts an optional configuration object to customize the PDF and screenshot generation:

```typescript
const config = {
	pdfOptions: {
		format: 'A4',
	},
	screenshotOptions: {
		fullPage: true,
	},
};
```

## API

### `loadPdfs(settings: NestedSettingsI, dist?: string, config?: ConfigI): Promise<NestedResultsI>`

- `settings`: An object defining the pages to process.
- `dist`: The directory to save the generated files. Defaults to `./PDFs`.
- `config`: Configuration options for PDF and screenshot generation.

### Types

#### `SettingI`

- `url`: The URL of the page to fetch.
- `run`: An optional function to run on the page.

#### `ResponseI`

- `pdf`: The PDF data of the page.
- `screenshot`: The screenshot data of the page.
- `error`: An error message if the page processing failed.

#### `NestedSettingsI`

An object where keys are page identifiers and values are `SettingI` or nested `NestedSettingsI`.

#### `NestedResultsI`

An object where keys are page identifiers and values are `ResponseI` or nested `NestedResultsI`.

#### `ConfigI`

- `pdfOptions`: Options for generating PDFs.
- `screenshotOptions`: Options for taking screenshots.

## Examples

### Basic Example

```typescript
import { loadPdfs } from 'puppeteer2pdf';

const settings = {
	homepage: {
		url: 'https://example.com',
	},
};

loadPdfs(settings).then((results) => {
	console.log('Generated files:', results);
});
```

### Advanced Example

```typescript
import { loadPdfs } from 'puppeteer2pdf';

const settings = {
	homepage: {
		url: 'https://example.com',
		run: async (page) => {
			await page.evaluate(() => {
				document.querySelector('h1').style.color = 'red';
			});
		},
	},
};

const config = {
	pdfOptions: {
		format: 'A4',
	},
	screenshotOptions: {
		fullPage: true,
	},
};

loadPdfs(settings, './output', config).then((results) => {
	console.log('Generated files:', results);
});
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
