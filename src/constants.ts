import { ConfigI } from "./types";

/**
 * The default configuration options for processing pages.
 * @type {ConfigI}
 */
export const DEFAULT_CONFIG: ConfigI = {
    viewPort: {
        width: 375,
        height: 667
    },
    gotoOptions: {
    },
    pdf: {
        format: 'A4',
        waitForFonts: true
    },
    screenshot: {
        captureBeyondViewport: false,
        optimizeForSpeed: true
    },
    markdown: {
        pdf: {
            format: 'A4',
        },
    },
    html: false
}
