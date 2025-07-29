export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const result = await response.json();

    console.log("Countries API response length:", result?.length);

    if (Array.isArray(result)) {
      // Sort countries alphabetically by common name
      const sortedCountries = result.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      return sortedCountries;
    }

    return [];
  } catch (error) {
    console.log("Error fetching countries:", error);
    return []; // Return empty array on error
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
    {
      headers,
    }
  );

  const result = await response.json();

  return result.data;
};
