// src/utils/apiConfig.js

export const API_BASE_URL = 'https://assets-local-icc.sportz.io/cricket/v1/series';

export const apiEndpoints = {
  standings: (seriesId: number) => `${API_BASE_URL}/standing?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&series_id=${seriesId}`,
};
