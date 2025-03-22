import defu from 'defu'
import { launch } from "puppeteer"
import { fetchWeb } from "./utils"
import { DEFAULT_CONFIG } from "./constants"
import type { ConfigI, RequestContextI, ResponseContextI } from "./types"
import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'

/**
 * Loads and processes web pages based on the provided context and configuration.
 * @template ReqContextI - Type of the request context.
 * @param context - The request context containing page details.
 * @param config - Partial configuration options to override the default settings.
 * @returns A promise that resolves to the response context containing processed page data.
 */
export const loadWeb = async <ReqContextI extends RequestContextI>(
    context: ReqContextI,
    config: Partial<ConfigI> = {}
): Promise<ResponseContextI<ReqContextI>> => {
    const mergedConfig = defu(config, DEFAULT_CONFIG) as ConfigI

    if (mergedConfig.dist && !existsSync(mergedConfig.dist)) {
        await mkdir(mergedConfig.dist, { recursive: true })
    }
    const browser = await launch()
    const responses: ResponseContextI<ReqContextI> = await fetchWeb(context, browser, mergedConfig)

    return responses
}