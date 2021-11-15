type OneCallResponseSection = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts'
type MeasurementUnit = 'standard' | 'metric' | 'imperial'

export type GeoCodingRequestConfig = {
    q: string
    limit?: number
}

export type GeoCodingResponse = {
    name: string
    localNames: Record<string, string>
    lat: number
    lon: number
    country: string
}

export type OneCallRequestConfig = {
    lat: number
    lon: number
    exclude?: OneCallResponseSection[]
    units?: MeasurementUnit
    lang?: string
}

export type OneCallResponse = {
    lat: number
    lon: number
    timezone: string
    timezoneOffset: number
    current?: Record<string, unknown>
    minutely?: Record<string, unknown>
    hourly?: Record<string, unknown>
    daily?: Record<string, unknown>
    alerts?: Record<string, unknown>
}
