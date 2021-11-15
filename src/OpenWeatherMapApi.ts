import { request } from './utils/restClient'
import { BASE_URL, ENDPOINT_GEOCODING, ENDPOINT_ONE_CALL } from './constants/endpoints'
import { GeoCodingRequestConfig, OneCallRequestConfig, OneCallResponse } from './types/requests'

export class OpenWeatherMapApi {
    apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async geoCoding(requestConfig: GeoCodingRequestConfig): Promise<OneCallResponse> {
        const response = await request<OneCallResponse>('GET', BASE_URL, ENDPOINT_GEOCODING, {
            ...requestConfig,
            appid: this.apiKey,
        })

        return response.data
    }

    async oneCall(requestConfig: OneCallRequestConfig): Promise<OneCallResponse> {
        const response = await request<OneCallResponse>('GET', BASE_URL, ENDPOINT_ONE_CALL, {
            ...requestConfig,
            ...(requestConfig.exclude ? { exclude: requestConfig.exclude.join(',') } : {}),
            appid: this.apiKey,
        })

        return response.data
    }
}
