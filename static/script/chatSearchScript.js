const { getJson } = require("serpapi");

/**
 * Function to perform a Google search using SerpAPI and log the JSON response.
 * @param {string} apiKey - Your SerpAPI key.
 * @param {string} query - The search query.
 * @param {string} location - The location for the search results.
 * @param {string} domain - The Google domain to use.
 * @param {string} gl - The geographical location.
 * @param {string} hl - The language.
 */
function performSearch(apiKey, query, location, domain, gl, hl) {
  getJson({
    api_key: apiKey,
    engine: "google",
    q: query,
    location: location,
    google_domain: domain,
    gl: gl,
    hl: hl
  }, (json) => {
    console.log(json);
  });
}
