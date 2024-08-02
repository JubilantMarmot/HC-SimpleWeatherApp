import Elysia, { t } from "elysia";

const getWeather = async ({ latitude, longitude }: {
  latitude: string;
  longitude: string;
}) => {
  const result = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`
  );
  const data = await result.json();

  const forecastHourlyUrl = data.properties.forecastHourly;
  const forecastHourlyResult = await fetch(forecastHourlyUrl);

  const forecastHourlyData = await forecastHourlyResult.json();

  return forecastHourlyData.properties.periods;
}

new Elysia()
  .get(
    "/weather",
    async ({ query }) => {
      const { latitude, longitude } = query;
      const weather = await getWeather({ latitude, longitude });

      return weather;
    },
    {
      query: t.Object({
        latitude: t.String(),
        longitude: t.String(),
      }),
    }
  )
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });
