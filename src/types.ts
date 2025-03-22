import type { Page, ScreenshotOptions, Viewport, PDFOptions, GoToOptions } from 'puppeteer';

/**
 * A function that runs on a Puppeteer page.
 * @param page - The Puppeteer page instance.
 * @returns A promise or void.
 */
export type RunFunctionF = (page: Page) => Promise<void> | void;

/**
 * Options for GitHub Flavored Markdown (GFM).
 */
export interface GfmOptionsI {
    /** Enable strikethrough syntax. */
    strikethrough: boolean;
    /** Enable table syntax. */
    tables: boolean;
    /** Enable task list items syntax. */
    taskItems: boolean;
}

/**
 * Options for converting HTML to Markdown.
 */
export interface MarkdownOptions {
    pdf: PDFOptions | boolean
}

/**
 * Configuration options for the page processing.
 */
export interface ConfigI {
    /** Output directory. */
    dist?: string;
    /** Viewport settings for the page. */
    viewPort?: Viewport;
    /** Options for the page navigation. */
    gotoOptions?: GoToOptions;
    /** User agent string for the page. */
    userAgent?: string;
    /** Options for generating a PDF. */
    pdf: PDFOptions;
    /** Options for taking a screenshot. */
    screenshot: ScreenshotOptions;
    /** Options for converting the page to Markdown. */
    markdown: MarkdownOptions | boolean
    /** Flag to enable/disable HTML output. */
    html: boolean;
}

/**
 * Context for a page request.
 */
export interface PageRequestContextI extends Partial<ConfigI> {
    /** URL of the page to process. */
    url: string;
    /** Function to run on the page. */
    run?: RunFunctionF;
}

/**
 * Asset generated from a page response.
 */
export interface PageResponseAssetI {
    /** Raw data of the asset. */
    raw: Uint8Array | string;
    /** Path to save the asset. */
    path?: string;
    /** Text content of the asset. */
    text: string;
}

/**
 * Context for a page response.
 * @template T - Type of the page request context.
 */
export interface PageResponseContextI<T extends PageRequestContextI = PageRequestContextI> {
    /** Title of the page. */
    title: string;
    /** URL of the page. */
    url: string;
    /** Viewport settings used for the page. */
    viewPort: Viewport;
    /** PDF asset generated from the page. */
    pdf: T['pdf'] extends undefined ? undefined : PageResponseAssetI;
    /** Screenshot asset generated from the page. */
    screenshot: T['screenshot'] extends undefined ? undefined : PageResponseAssetI;
    /** Markdown asset generated from the page. */
    markdown: T['markdown'] extends undefined ? undefined : PageResponseAssetI;
    /** HTML asset generated from the page. */
    html: T['html'] extends undefined | false ? undefined : PageResponseAssetI;
}

/**
 * Request context for processing multiple pages.
 */
export type RequestContextI = {
    [key: string]: PageRequestContextI | RequestContextI
};

/**
 * Response context for processing multiple pages.
 * @template T - Type of the request context.
 */
export type ResponseContextI<T extends RequestContextI> = T extends PageRequestContextI ? PageResponseContextI : {
    //@ts-expect-error PageRequestContextI will never be here
    [Key in keyof T]: PageRequestContextI extends T[Key] ? PageResponseContextI : ResponseContextI<T[Key]>
}