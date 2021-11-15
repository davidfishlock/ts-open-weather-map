import Axios, { AxiosResponse, AxiosInstance } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import urljoin from 'url-join'
import axiosRetry from 'axios-retry'

let axiosClient: AxiosInstance

const requestHeaders = {
    'Content-Type': 'application/json',
}

function createAxiosClient() {
    const client = Axios.create({ headers: requestHeaders })
    applyCaseMiddleware(client)
    axiosRetry(client, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
    })

    return client
}

export async function request<T>(
    httpMethod: 'GET' | 'POST' | 'DELETE',
    baseUri: string,
    relativePath: string,
    payload?: unknown,
): Promise<AxiosResponse<T>> {
    const axios = axiosClient ?? createAxiosClient()

    switch (httpMethod) {
        case 'GET':
            return await axios.get<T>(urljoin(baseUri, relativePath), {
                params: payload,
            })
        case 'POST':
            return await axios.post<T>(urljoin(baseUri, relativePath), payload)
        case 'DELETE':
            return await axios.delete<T>(urljoin(baseUri, relativePath))
    }
}
