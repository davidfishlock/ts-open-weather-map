import {
    City,
    CurrentWeatherReport,
    DailyWeatherForecast,
    HourlyWeatherForecast,
    MinutelyWeatherForecast,
    WeatherAlert,
} from './models'

export type OneCallResponseSection = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts'
export type MeasurementUnit = 'standard' | 'metric' | 'imperial'

export type OneCallResponse = {
    lat: number // Coords
    lon: number // Coords
    timezone: string // Timezone name
    timezoneOffset: number // Seconds from UTC
    current?: CurrentWeatherReport
    minutely?: MinutelyWeatherForecast[]
    hourly?: HourlyWeatherForecast[]
    daily?: DailyWeatherForecast[]
    alerts?: WeatherAlert[]
}

export type GeoCodingResponse = City[]
