import { useState } from "react";
import { api } from "../services/api";

/**
 * Hook that handles the full pitch generation flow:
 * 1. Generate the pitch
 * 2. In parallel, enrich with scores, SWOT, competitors, and valuation
 *
 * Returns { generate, loading, error }.
 */
export function usePitchGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Generate a pitch and all enrichment data.
   * @param {{ startup_idea: string, industry: string, revenue_model: string }} payload
   * @returns {Promise<string|null>} The pitch ID on success, or null on failure.
   */
  async function generate(payload) {
    setLoading(true);
    setError("");

    try {
      const pitch = await api.generatePitch(payload);
      const pitchId = pitch?.pitch_id;

      if (!pitchId) {
        throw new Error("Server did not return a pitch ID — please try again.");
      }

      // Fire all enrichment calls in parallel; individual failures are acceptable
      // (the Results page shows "pending" state for missing sections).
      await Promise.allSettled([
        api.generateScore(pitchId),
        api.generateSwot(pitchId),
        api.generateCompetitors(pitchId),
        api.generateValuation(pitchId),
      ]);

      return pitchId;
    } catch (err) {
      setError(err.message || "Unable to generate pitch. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading, error };
}
