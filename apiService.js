async function apiRequest(endpoint) {
  const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "x-apisports-key": CONFIG.API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`API hatası: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(JSON.stringify(data.errors));
  }

  return data.response || [];
}

async function getFixturesByDate(date) {
  return await apiRequest(`/fixtures?date=${date}`);
}

async function getFixtureStatistics(fixtureId) {
  return await apiRequest(`/fixtures/statistics?fixture=${fixtureId}`);
}

async function getLineups(fixtureId) {
  return await apiRequest(`/fixtures/lineups?fixture=${fixtureId}`);
}

async function getInjuries(fixtureId) {
  return await apiRequest(`/injuries?fixture=${fixtureId}`);
}

async function getOdds(fixtureId) {
  return await apiRequest(`/odds?fixture=${fixtureId}`);
}
