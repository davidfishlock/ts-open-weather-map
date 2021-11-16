# ts-open-weather-map

A TypeScript wrapper for the Open Weather Map API.

## Installation

```
npm install ts-open-weather-map
```

## Usage

API keys can be obtained from the Open Weather Map website: https://openweathermap.org/api

### OneCall Endpoint

Basic usage:

```
const api = new OpenWeatherMapApi("MY_API_KEY")
const response = await api.oneCall(67.75, 26.5) // Latitude and Longitude
```

Optional parameters:

```
// Exclude sections from the response, specify unit types and language
await api.oneCall(67.75, 26.5, ['minutely', 'alerts'], 'metric', 'en')
```

### Geocoding - Get city data

```
// Get geo data for Lapland, max 5 results
await api.geoCoding('Lapland', 5)
```
