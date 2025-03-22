import defu from 'defu'
import { join } from 'path';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';

import { Browser } from 'puppeteer';

import pdf2md from '@opendocsg/pdf2md'
import type { ConfigI, PageRequestContextI, PageResponseContextI, RequestContextI, ResponseContextI } from '../types';

/**
 * Fetches and processes web pages based on the provided context and configuration.
 * @template ReqContextI - Type of the request context.
 * @param context - The request context containing page details.
 * @param browser - The Puppeteer browser instance.
 * @param config - Configuration options for processing the pages.
 * @param keyBase - Base key for nested contexts.
 * @returns A promise that resolves to the response context containing processed page data.
 */
export const fetchWeb = async <ReqContextI extends RequestContextI>(
    context: ReqContextI,
    browser: Browser,
    config: ConfigI,
    keyBase: string = ''
): Promise<ResponseContextI<ReqContextI>> => {

    const responses = {} as ResponseContextI<ReqContextI>;

    for (const key of Object.keys(context)) {
        const currentIndex = join(keyBase, key);
        let value = context[key] as PageRequestContextI | RequestContextI;

        if ((value as PageRequestContextI).url) {
            console.info('Fetching', (value as PageRequestContextI).url, 'at', currentIndex)

            const response = {} as PageResponseContextI;
            value = value as PageRequestContextI;
            // Found a page to fetch
            const settings = defu(value, config);

            const page = await browser.newPage();
            if (settings.userAgent) {
                await page.setUserAgent(settings.userAgent);
            }
            if (settings.viewPort) {
                await page.setViewport(settings.viewPort);
            }
            if (value.run) {
                await value.run(page)
            }
            if (settings.gotoOptions) {
                await page.goto(value.url, settings.gotoOptions);
            } else {
                await page.goto(value.url);
            }
            const path = config.dist ? join(config.dist, currentIndex) : undefined;
            if (path && !existsSync(path)) {
                await mkdir(path, { recursive: true })
            }
            const content = await page.content();
            response.title = await page.title();
            response.url = page.url()
            // Handle HTML
            if (settings.html) {
                response.html = {
                    raw: content,
                    path: path ? join(path, key + '.html') : undefined,
                    text: content
                }
                if (path) {
                    await writeFile(join(path, key + '.html'), content)
                }
            }

            // Handle PDF

            if (settings.pdf) {
                if (path) settings.pdf.path = join(path, key + '.pdf')
                const pdf = await page.pdf(settings.pdf);
                response.pdf = {
                    raw: pdf,
                    path: settings.pdf.path,
                    text: pdf.toString()
                }
            }
            // Handle Screenshot
            if (settings.screenshot) {
                if (path) settings.screenshot.path = join(path, key + '.png')
                const screenshot = await page.screenshot(settings.screenshot);
                response.screenshot = {
                    raw: screenshot,
                    path: settings.screenshot.path,
                    text: 'screenshot'
                }
            }
            // Handle Markdown
            if (settings.markdown) {
                settings.markdown = defu(settings.markdown, config.markdown) as ConfigI['markdown']
                const markdown = await pdf2md(await page.pdf(typeof settings.markdown === 'object' ? typeof settings.markdown.pdf === 'object' ? settings.markdown.pdf : undefined : undefined))
                response.markdown = {
                    raw: markdown,
                    path: path ? join(path, key + '.md') : undefined,
                    text: markdown
                }
                if (path) {
                    await writeFile(join(path, key + '.md'), markdown)
                }
            }
            // @ts-expect-error Indexing is correct
            responses[key] = response;
        } else {
            // Handle nested context
            value = value as RequestContextI
            // @ts-expect-error Indexing is correct
            responses[key] = await fetchWeb(value, browser, config, currentIndex)
        }
    }

    return responses

}