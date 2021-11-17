export type DateInfo = {
    dt: number // Unix, UTC
}

export type SunInfo = {
    sunrise: number // Unix, UTC
    sunset: number // Unix, UTC
}

export type MoonInfo = {
    moonrise: number // Unix, UTC
    moonset: number // Unix, UTC
    moonPhase: number // 0-1
}

export type TemperatureInfo = {
    temp: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
    feelsLike: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
}

export type DailyTemperatureRange = {
    day: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
    night: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
    eve: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
    morn: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
}

export type DailyTemperatureMinMax = {
    min: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
    max: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
}

export type WindInfo = {
    windSpeed: number // default: metre/sec, metric: metre/sec, imperial: miles/hour
    windDeg: number // degrees
    windGust?: number // default: metre/sec, metric: metre/sec, imperial: miles/hour
}

export type WeatherEntry = {
    // See: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    id: number
    main: string
    description: string
    icon: string
}

export type CurrentWeatherReport = DateInfo &
    WindInfo &
    SunInfo &
    TemperatureInfo & {
        pressure: number // hPa
        humidity: number // %
        dewPoint: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
        uvi: number // 0-11+
        clouds: number // %
        visibility: number // metres
        weather: WeatherEntry[]
        rain?: { '1h': number } // mm
        snow?: { '1h': number } // mm
    }

export type MinutelyWeatherForecast = DateInfo & {
    precipitation: number
}

export type HourlyWeatherForecast = DateInfo &
    WindInfo &
    TemperatureInfo & {
        pressure: number // hPa
        humidity: number // %
        dewPoint: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
        uvi: number // 0-11+
        clouds: number // %
        visibility: number // metres
        weather: WeatherEntry[]
        pop: number // probability of precipitation %
        rain?: { '1h': number } // mm
        snow?: { '1h': number } // mm
    }

export type DailyWeatherForecast = DateInfo &
    SunInfo &
    MoonInfo &
    WindInfo & {
        temp: DailyTemperatureRange & DailyTemperatureMinMax
        feelsLike: DailyTemperatureRange
        pressure: number // hPa
        humidity: number // %
        dewPoint: number // default: Kelvin, metric: Celsius, imperial: Fahrenheit
        uvi: number // 0-11+
        clouds: number // %
        weather: WeatherEntry[]
        pop: number // probability of precipitation %
        rain?: number // mm
        snow?: number // mm
    }

export type WeatherAlert = {
    senderName: string
    event: string
    start: number // Unix, UTC
    end: number // Unix, UTC
    description: string
    tags: string[]
}

export type City = {
    name: string
    localNames: Record<string, string>
    lat: number // Coords
    lon: number // Coords
    country: string
}
