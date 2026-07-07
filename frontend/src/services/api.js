/**
 * API service — thin wrapper around fetch for all backend calls.
 *
 * VITE_API_URL should be the backend base URL without a trailing slash,
 * e.g. "http://127.0.0.1:8000"  (set in .env or .env.local)
 *
 * The "/api" prefix is appended here so the variable stays clean for
 * environments where the base URL might differ (Render, Railway, etc.).
 */

const BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const API_URL = `${BASE_URL}/api`;

/**
 * Internal helper — sends a JSON request and throws on non-2xx responses.
 * @param {string} path      - Path relative to API_URL, e.g. "/generate-pitch"
 * @param {RequestInit} opts - Standard fetch options
 * @returns {Promise<any>}   - Parsed JSON body
 */
async function request(path, opts = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...opts.headers,
    },
    ...opts,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      message = body.detail || body.error || message;
    } catch {
      // body was not JSON — keep the generic message
    }
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  /**
   * Generate a new pitch from the three required fields.
   * @param {{ startup_idea: string, industry: string, revenue_model: string }} payload
   */
  generatePitch(payload) {
    return request("/generate-pitch", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Fetch the full pitch document by ID.
   * @param {string} pitchId
   */
  getPitch(pitchId) {
    return request(`/pitch/${pitchId}`);
  },

  /**
   * Generate innovation / demand / scalability / investor appeal scores.
   * @param {string} pitchId
   */
  generateScore(pitchId) {
    return request("/generate-score", {
      method: "POST",
      body: JSON.stringify({ pitch_id: pitchId }),
    });
  },

  /**
   * Generate a SWOT analysis for an existing pitch.
   * @param {string} pitchId
   */
  generateSwot(pitchId) {
    return request("/generate-swot", {
      method: "POST",
      body: JSON.stringify({ pitch_id: pitchId }),
    });
  },

  /**
   * Generate a competitor analysis for an existing pitch.
   * @param {string} pitchId
   */
  generateCompetitors(pitchId) {
    return request("/generate-competitors", {
      method: "POST",
      body: JSON.stringify({ pitch_id: pitchId }),
    });
  },

  /**
   * Generate a valuation estimate for an existing pitch.
   * @param {string} pitchId
   */
  generateValuation(pitchId) {
    return request("/generate-valuation", {
      method: "POST",
      body: JSON.stringify({ pitch_id: pitchId }),
    });
  },

  /**
   * Fetch the pitch history list.
   * @param {number} [limit=12]
   */
  history(limit = 12) {
    return request(`/history?limit=${limit}`);
  },

  /**
   * Download a PDF report for an existing pitch.
   * Triggers a browser file download automatically.
   * @param {string} pitchId
   * @param {string} [filename]
   */
  async exportPdf(pitchId, filename = "pitchforge-report.pdf") {
    const response = await fetch(`${API_URL}/export-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pitch_id: pitchId }),
    });

    if (!response.ok) {
      throw new Error(`PDF export failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  },
};
