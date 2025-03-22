import { test, expect } from '@playwright/test';
import { fetchWeb } from './index';
import { Browser, launch } from 'puppeteer';
import { DEFAULT_CONFIG } from '../constants';
import type { RequestContextI, ConfigI } from '../types';

test.describe('fetchWeb', () => {
    let browser: Browser;

    test.beforeAll(async () => {
        browser = await launch();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('should fetch a page and save HTML', async () => {
        const context: RequestContextI = {
            page1: {
                url: 'https://google.com',
                html: true
            }
        };
        const config: ConfigI = { ...DEFAULT_CONFIG, dist: './test-results' };

        const responses = await fetchWeb(context, browser, config);
        const page1Response = responses.page1


        expect(page1Response).toBeDefined();
        expect(page1Response?.html).toBeDefined();
        expect(page1Response?.html?.text).toContain('<html');
    });

    test('should fetch a page and save PDF', async () => {
        const context: RequestContextI = {
            page1: {
                url: 'https://google.com',
                pdf: { format: 'A4' }
            }
        };
        const config: ConfigI = { ...DEFAULT_CONFIG, dist: './test-results' };

        const responses = await fetchWeb(context, browser, config);
        const page1Response = responses.page1
        expect(page1Response).toBeDefined()
        expect(page1Response?.pdf).toBeDefined();
        expect(page1Response?.pdf?.path).toContain('page1');
    });

    test('should fetch a page and save a screenshot', async () => {
        const context: RequestContextI = {
            page1: {
                url: 'https://google.com',
                screenshot: { fullPage: true }
            }
        };
        const config: ConfigI = { ...DEFAULT_CONFIG, dist: './test-results' };

        const responses = await fetchWeb(context, browser, config);
        const page1Response = responses.page1

        expect(page1Response).toBeDefined();

        expect(page1Response?.screenshot).toBeDefined();
        expect(page1Response?.screenshot?.text).toBe('screenshot');
    });

    test('should fetch a page and convert to Markdown', async () => {
        const context: RequestContextI = {
            page1: {
                url: 'https://google.com',
                markdown: true
            }
        };
        const config: ConfigI = { ...DEFAULT_CONFIG, dist: './test-results' };

        const responses = await fetchWeb(context, browser, config);
        const page1Response = responses.page1

        expect(page1Response?.markdown).toBeDefined();
        expect(page1Response?.markdown.text).toBe(page1Response?.markdown.raw)
    });
});