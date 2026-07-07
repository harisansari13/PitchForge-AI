import { ArrowLeft, Download, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Navbar, Shell } from "../components/Layout";
import { Page } from "../components/Motion";
import { PitchCard } from "../components/PitchCard";
import { ScoreBar } from "../components/ScoreBar";
import { api } from "../services/api";

/** Renders a list of string items as styled pills. */
function ListItems({ items = [] }) {
  if (!items.length) return <p className="text-sm text-slate-500">No data available.</p>;
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Results() {
  const { pitchId } = useParams();
  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const loadPitch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await api.getPitch(pitchId);
      setPitch(result.data);
    } catch (err) {
      setError(err.message || "Unable to load pitch.");
    } finally {
      setLoading(false);
    }
  }, [pitchId]);

  async function enrichPitch() {
    setRefreshing(true);
    setError("");
    try {
      await Promise.allSettled([
        api.generateScore(pitchId),
        api.generateSwot(pitchId),
        api.generateCompetitors(pitchId),
        api.generateValuation(pitchId),
      ]);
      // Reload to get the latest enriched data
      await loadPitch();
    } catch (err) {
      setError(err.message || "Unable to refresh analysis.");
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadPitch();
  }, [loadPitch]);

  const pdfName = useMemo(() => {
    if (!pitch?.startup_name) return "pitchforge-report.pdf";
    return `${pitch.startup_name.replace(/\s+/g, "-").toLowerCase()}-pitch.pdf`;
  }, [pitch]);

  async function downloadPdf() {
    setExporting(true);
    try {
      await api.exportPdf(pitchId, pdfName);
    } catch (err) {
      setError(err.message || "PDF export failed.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <Shell>
      <Navbar />
      <Page>
        <section className="section-shell min-h-screen pb-16 pt-32">
          {/* Loading state */}
          {loading && (
            <div className="glass grid min-h-[420px] place-items-center rounded-lg">
              <div className="text-center">
                <Loader2 className="mx-auto animate-spin text-mint" size={30} />
                <p className="mt-4 text-slate-300">Loading pitch intelligence...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {!loading && error && !pitch && (
            <div className="glass rounded-lg p-8">
              <p className="text-coral">{error}</p>
              <Link className="mt-5 inline-flex" to="/dashboard">
                <Button variant="secondary">
                  <ArrowLeft size={18} /> Back to Dashboard
                </Button>
              </Link>
            </div>
          )}

          {/* Loaded state */}
          {!loading && pitch && (
            <div className="space-y-6">
              {/* Inline error (e.g. refresh failed) */}
              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Header */}
              <div className="glass rounded-lg p-6 md:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
                    >
                      <ArrowLeft size={16} /> Dashboard
                    </Link>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-mint">
                      Pitch Report
                    </p>
                    <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">
                      {pitch.startup_name}
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                      {pitch.elevator_pitch}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <Button variant="secondary" onClick={enrichPitch} disabled={refreshing}>
                      {refreshing ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <RefreshCw size={18} />
                      )}
                      Refresh Analysis
                    </Button>
                    <Button onClick={downloadPdf} disabled={exporting}>
                      {exporting ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Download size={18} />
                      )}
                      Export PDF
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pitch sections */}
              <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <PitchCard title="Problem Statement">{pitch.problem_statement}</PitchCard>
                <PitchCard title="Solution" accent="border-mint/30">{pitch.solution}</PitchCard>
                <PitchCard title="Business Model">{pitch.business_model}</PitchCard>
                <PitchCard title="Market Opportunity" accent="border-sky/30">
                  {pitch.market_opportunity}
                </PitchCard>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <PitchCard title="Revenue Streams" accent="border-gold/30">
                  <ListItems items={pitch.revenue_streams} />
                </PitchCard>
                <PitchCard title="Investor Summary" accent="border-coral/30">
                  {pitch.investor_summary}
                </PitchCard>
              </div>

              {/* Score + SWOT */}
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <section className="glass rounded-lg p-5">
                  <h2 className="flex items-center gap-2 text-xl font-bold">
                    <Sparkles className="text-mint" size={20} /> Startup Score Engine
                  </h2>
                  {pitch.scores ? (
                    <div className="mt-5 space-y-5">
                      <ScoreBar label="Innovation" value={pitch.scores.innovation_score} />
                      <ScoreBar label="Market Demand" value={pitch.scores.market_demand_score} />
                      <ScoreBar label="Scalability" value={pitch.scores.scalability_score} />
                      <ScoreBar
                        label="Investor Appeal"
                        value={pitch.scores.investor_appeal_score}
                      />
                      {pitch.scores.overall_score !== undefined && (
                        <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-3 text-center">
                          <p className="text-xs uppercase tracking-widest text-slate-400">
                            Overall
                          </p>
                          <p className="mt-1 text-3xl font-extrabold text-mint">
                            {pitch.scores.overall_score}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-5 text-sm text-slate-500">
                      Click &quot;Refresh Analysis&quot; to generate scores.
                    </p>
                  )}
                </section>

                <section className="glass rounded-lg p-5">
                  <h2 className="text-xl font-bold">SWOT Analysis</h2>
                  {pitch.swot ? (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {[
                        ["Strengths", pitch.swot.strengths],
                        ["Weaknesses", pitch.swot.weaknesses],
                        ["Opportunities", pitch.swot.opportunities],
                        ["Threats", pitch.swot.threats],
                      ].map(([title, items]) => (
                        <div
                          key={title}
                          className="rounded-md border border-white/10 bg-white/5 p-4"
                        >
                          <h3 className="font-semibold text-white">{title}</h3>
                          <div className="mt-3">
                            <ListItems
                              items={Array.isArray(items) ? items : items ? [items] : []}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5 text-sm text-slate-500">
                      Click &quot;Refresh Analysis&quot; to generate SWOT.
                    </p>
                  )}
                </section>
              </div>

              {/* Competitors + Valuation */}
              <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <section className="glass rounded-lg p-5">
                  <h2 className="text-xl font-bold">Competitor Analysis</h2>
                  {pitch.competitors ? (
                    <>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {pitch.competitors.market_insights}
                      </p>
                      <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {(pitch.competitors.competitors || []).map((competitor) => (
                          <article
                            key={competitor.name}
                            className="rounded-md border border-white/10 bg-white/5 p-4"
                          >
                            <h3 className="font-semibold">{competitor.name}</h3>
                            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                              {competitor.market_position}
                            </p>
                            <p className="mt-4 text-sm text-slate-300">{competitor.weaknesses}</p>
                            <div className="mt-4">
                              <ListItems items={competitor.strengths || []} />
                            </div>
                          </article>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="mt-5 text-sm text-slate-500">
                      Click &quot;Refresh Analysis&quot; to generate competitor analysis.
                    </p>
                  )}
                </section>

                <section className="glass rounded-lg p-5">
                  <h2 className="text-xl font-bold">Valuation Estimator</h2>
                  {pitch.valuation ? (
                    <>
                      <div className="mt-5 grid gap-3">
                        {[
                          ["Low Estimate", pitch.valuation.low_estimate],
                          ["Medium Estimate", pitch.valuation.medium_estimate],
                          ["High Estimate", pitch.valuation.high_estimate],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-md border border-white/10 bg-white/5 p-4"
                          >
                            <p className="text-sm text-slate-400">{label}</p>
                            <p className="mt-2 text-2xl font-bold text-white">
                              {value || "—"}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-300">
                        {pitch.valuation.reasoning}
                      </p>
                    </>
                  ) : (
                    <p className="mt-5 text-sm text-slate-500">
                      Click &quot;Refresh Analysis&quot; to generate valuation.
                    </p>
                  )}
                </section>
              </div>
            </div>
          )}
        </section>
      </Page>
    </Shell>
  );
}
