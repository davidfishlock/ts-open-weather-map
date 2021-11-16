import { AxiosResponse } from 'axios'
import { mock } from 'jest-mock-extended'
import * as restClient from './utils/restClient'
import { DEFAULT_API_KEY, DEFAULT_CITY, DEFAULT_ONECALL_RESPONSE } from './testUtils/testDefaults'
import { OpenWeatherMapApi } from './OpenWeatherMapApi'
import { BASE_URL, ENDPOINT_GEOCODING, ENDPOINT_ONE_CALL } from './constants/endpoints'
import { OneCallResponseSection } from './types/requests'

function setupRestClientMock(responseData: unknown, status = 200): jest.SpyInstance {
    const response = mock<AxiosResponse>({ status, data: responseData })
    return jest.spyOn(restClient, 'request').mockResolvedValue(response)
}

function getTarget() {
    return new OpenWeatherMapApi(DEFAULT_API_KEY)
}

describe('OpenWeatherMapApi', () => {
    describe('oneCall', () => {
        const lat = 123
        const lon = 456
        const exclude = ['daily', 'hourly'] as OneCallResponseSection[]
        const units = 'metric'
        const lang = 'en'
        const mockResponse = DEFAULT_ONECALL_RESPONSE

        test('makes get request with expected params', async () => {
            const requestMock = setupRestClientMock(mockResponse)
            const api = getTarget()

            await api.oneCall(lat, lon, exclude, units, lang)

            expect(requestMock).toBeCalledTimes(1)
            expect(requestMock).toBeCalledWith('GET', BASE_URL, ENDPOINT_ONE_CALL, {
                lat,
                lon,
                exclude: `${exclude[0]},${exclude[1]}`,
                units,
                lang,
                appid: DEFAULT_API_KEY,
            })
        })

        test('returns result from rest client', async () => {
            setupRestClientMock(mockResponse)
            const api = getTarget()

            const result = await api.oneCall(lat, lon, exclude, units, lang)

            expect(result).toEqual(mockResponse)
        })
    })

    describe('geoCoding', () => {
        const query = 'Lapland'
        const limit = 5
        const mockResponse = [DEFAULT_CITY]

        test('makes get request with expected params', async () => {
            const requestMock = setupRestClientMock(mockResponse)
            const api = getTarget()

            await api.geoCoding(query, limit)

            expect(requestMock).toBeCalledTimes(1)
            expect(requestMock).toBeCalledWith('GET', BASE_URL, ENDPOINT_GEOCODING, {
                q: query,
                limit,
                appid: DEFAULT_API_KEY,
            })
        })

        test('returns result from rest client', async () => {
            setupRestClientMock(mockResponse)
            const api = getTarget()

            const result = await api.geoCoding(query, limit)

            expect(result).toEqual(mockResponse)
        })
    })
})
