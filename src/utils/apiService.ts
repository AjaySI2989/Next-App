// src/utils/apiService.js
import { apiEndpoints } from './apiConfig';

export const fetchStandingsData = async (seriesId: number) => {
  const url = apiEndpoints.standings(seriesId);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch standings data:', error);
    throw error;
  }
};
