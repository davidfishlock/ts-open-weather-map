import { request } from './utils/restClient'
import { BASE_URL, ENDPOINT_GEOCODING, ENDPOINT_ONE_CALL } from './constants/endpoints'
import {
    GeoCodingResponse,
    MeasurementUnit,
    OneCallResponse,
    OneCallResponseSection,
} from './types/requests'

export class OpenWeatherMapApi {
    apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async oneCall(
        lat: number,
        lon: number,
        exclude?: OneCallResponseSection[],
        units?: MeasurementUnit,
        lang?: string,
    ): Promise<OneCallResponse> {
        const response = await request<OneCallResponse>('GET', BASE_URL, ENDPOINT_ONE_CALL, {
            lat,
            lon,
            ...(exclude ? { exclude: exclude.join(',') } : {}),
            ...(units ? { units } : {}),
            ...(lang ? { lang } : {}),
            appid: this.apiKey,
        })

        return response.data
    }

    async geoCoding(q: string, limit?: number): Promise<GeoCodingResponse> {
        const response = await request<GeoCodingResponse>('GET', BASE_URL, ENDPOINT_GEOCODING, {
            q,
            ...(limit ? { limit } : {}),
            appid: this.apiKey,
        })

        return response.data
    }
}
