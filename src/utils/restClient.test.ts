import Axios, { AxiosStatic, AxiosResponse, AxiosError } from 'axios'
import { request } from './restClient'
import { mock } from 'jest-mock-extended'
import * as caseConverter from 'axios-case-converter'

jest.mock('axios')

const DEFAULT_BASE_URI = 'https://someapi.com/'
const DEFAULT_ENDPOINT = 'endpoint'

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
}

const DEFAULT_PAYLOAD = {
    someKey: 'someValue',
}

const DEFAULT_RESPONSE = mock<AxiosResponse>({
    data: DEFAULT_PAYLOAD,
})

const DEFAULT_ERROR_MESSAGE = 'There was an error'

function setupAxiosMock(response = DEFAULT_RESPONSE) {
    const axiosMock = Axios as jest.Mocked<typeof Axios>

    axiosMock.create = jest.fn(() => axiosMock)
    axiosMock.get.mockResolvedValue(response)
    axiosMock.post.mockResolvedValue(response)
    axiosMock.delete.mockResolvedValue(response)

    jest.spyOn(caseConverter, 'default').mockImplementation(() => axiosMock)
    return axiosMock
}

function setupAxiosMockWithError(statusCode: number, responseData: unknown) {
    const axiosMock = Axios as jest.Mocked<typeof Axios>
    axiosMock.create = jest.fn(() => axiosMock)

    const axiosError = mock<AxiosError>({
        message: DEFAULT_ERROR_MESSAGE,
        response: { status: statusCode, data: responseData },
        isAxiosError: true,
    } as AxiosError)

    function errorFunc(): Promise<unknown> {
        throw axiosError
    }

    axiosMock.get.mockImplementation(errorFunc)
    axiosMock.post.mockImplementation(errorFunc)
    axiosMock.delete.mockImplementation(errorFunc)
    return axiosMock
}

describe('restClient', () => {
    let axiosMock: jest.Mocked<AxiosStatic>

    beforeEach(() => {
        axiosMock = setupAxiosMock()
    })

    test('request creates axios client with default headers', async () => {
        await request('GET', DEFAULT_BASE_URI, DEFAULT_ENDPOINT)

        expect(axiosMock.create).toBeCalledTimes(1)
        expect(axiosMock.create).toBeCalledWith({ headers: DEFAULT_HEADERS })
    })

    test('get calls axios with expected endpoint', async () => {
        await request('GET', DEFAULT_BASE_URI, DEFAULT_ENDPOINT)

        expect(axiosMock.get).toBeCalledTimes(1)
        expect(axiosMock.get).toBeCalledWith(DEFAULT_BASE_URI + DEFAULT_ENDPOINT, {
            params: undefined,
        })
    })

    test('get passes params to axios', async () => {
        await request('GET', DEFAULT_BASE_URI, DEFAULT_ENDPOINT, DEFAULT_PAYLOAD)

        expect(axiosMock.get).toBeCalledTimes(1)
        expect(axiosMock.get).toBeCalledWith(DEFAULT_BASE_URI + DEFAULT_ENDPOINT, {
            params: DEFAULT_PAYLOAD,
        })
    })

    test('get returns response from axios', async () => {
        const result = await request('GET', DEFAULT_BASE_URI, DEFAULT_ENDPOINT)

        expect(axiosMock.get).toBeCalledTimes(1)
        expect(result).toEqual(DEFAULT_RESPONSE)
    })

    test('post sends expected payload to axios', async () => {
        await request('POST', DEFAULT_BASE_URI, DEFAULT_ENDPOINT, DEFAULT_PAYLOAD)

        expect(axiosMock.post).toBeCalledTimes(1)
        expect(axiosMock.post).toBeCalledWith(DEFAULT_BASE_URI + DEFAULT_ENDPOINT, DEFAULT_PAYLOAD)
    })

    test('post returns response from axios', async () => {
        const result = await request('POST', DEFAULT_BASE_URI, DEFAULT_ENDPOINT, DEFAULT_PAYLOAD)

        expect(axiosMock.post).toBeCalledTimes(1)
        expect(result).toEqual(DEFAULT_RESPONSE)
    })

    test('delete calls axios with expected endpoint', async () => {
        await request('DELETE', DEFAULT_BASE_URI, DEFAULT_ENDPOINT)

        expect(axiosMock.delete).toBeCalledTimes(1)
        expect(axiosMock.delete).toBeCalledWith(DEFAULT_BASE_URI + DEFAULT_ENDPOINT)
    })

    test('throws error from axios', async () => {
        const statusCode = 403
        const responseData = 'Some Data'
        axiosMock = setupAxiosMockWithError(statusCode, responseData)

        expect.assertions(3)

        try {
            await request('GET', DEFAULT_BASE_URI, DEFAULT_ENDPOINT)
        } catch (e: unknown) {
            const error = e as AxiosError
            expect(error.message).toEqual(DEFAULT_ERROR_MESSAGE)
            expect(error.response?.status).toEqual(statusCode)
            expect(error.response?.data).toEqual(responseData)
        }
    })
})
