import { Clock, Loader2, Rocket, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Navbar, Shell } from "../components/Layout";
import { Page } from "../components/Motion";
import { usePitchGeneration } from "../hooks/usePitchGeneration";
import { api } from "../services/api";

const IDEA_EXAMPLES = [
  "AI platform that helps small clinics reduce patient no-shows with predictive outreach",
  "Marketplace for climate-friendly construction materials with verified supplier data",
  "Personal finance copilot for students entering their first job",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { generate, loading, error } = usePitchGeneration();

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [form, setForm] = useState({
    startup_idea: IDEA_EXAMPLES[0],
    industry: "Healthcare SaaS",
    revenue_model: "Monthly subscription with premium analytics",
  });

  useEffect(() => {
    api
      .history()
      .then((result) => setHistory(result.data || []))
      .catch(() => setHistory([]))
      .finally(() => setHistoryLoading(false));
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const pitchId = await generate(form);
    if (pitchId) {
      navigate(`/results/${pitchId}`);
    }
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <Shell>
      <Navbar />
      <Page>
        <section className="section-shell min-h-screen pb-16 pt-32">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Form card */}
            <div className="glass rounded-lg p-6 md:p-8">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-mint">
                    Dashboard
                  </p>
                  <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
                    Generate an investor-ready pitch.
                  </h1>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                    Describe the startup in plain language. PitchForge will create the pitch,
                    scoring, SWOT, competitor analysis, valuation, and exportable report.
                  </p>
                </div>
                <div className="hidden rounded-md border border-white/10 bg-white/10 p-3 md:block">
                  <Rocket className="text-coral" size={24} />
                </div>
              </div>

              <form className="space-y-5" onSubmit={onSubmit}>
                <label className="block">
                  <span className="text-sm font-medium text-slate-300">Startup Idea</span>
                  <textarea
                    className="mt-2 min-h-40 w-full resize-y rounded-lg border border-white/10 bg-ink/70 px-4 py-4 leading-7 text-white outline-none placeholder:text-slate-600 focus:border-mint"
                    value={form.startup_idea}
                    onChange={(e) => updateField("startup_idea", e.target.value)}
                    placeholder="What are you building, for whom, and what pain does it solve?"
                    minLength={10}
                    maxLength={1200}
                    required
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-300">Industry</span>
                    <input
                      className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-ink/70 px-4 text-white outline-none placeholder:text-slate-600 focus:border-mint"
                      value={form.industry}
                      onChange={(e) => updateField("industry", e.target.value)}
                      placeholder="e.g. Healthcare SaaS"
                      minLength={2}
                      maxLength={120}
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-300">Revenue Model</span>
                    <input
                      className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-ink/70 px-4 text-white outline-none placeholder:text-slate-600 focus:border-mint"
                      value={form.revenue_model}
                      onChange={(e) => updateField("revenue_model", e.target.value)}
                      placeholder="e.g. Monthly subscription"
                      minLength={3}
                      maxLength={240}
                      required
                    />
                  </label>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Sparkles size={18} />
                  )}
                  {loading ? "Forging Pitch..." : "Generate Pitch"}
                </Button>

                {error && <p className="text-sm text-red-400">{error}</p>}
              </form>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Idea starters */}
              <div className="glass rounded-lg p-5">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Sparkles size={18} className="text-mint" />
                  Idea Starters
                </h2>
                <div className="mt-4 space-y-3">
                  {IDEA_EXAMPLES.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => updateField("startup_idea", example)}
                      className="w-full rounded-md border border-white/10 bg-white/5 p-3 text-left text-sm leading-6 text-slate-300 transition hover:border-mint/40 hover:bg-white/10"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pitch history */}
              <div className="glass rounded-lg p-5">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Clock size={18} className="text-coral" />
                  Pitch History
                </h2>
                <div className="mt-4 space-y-3">
                  {historyLoading && (
                    <p className="text-sm text-slate-500">Loading history...</p>
                  )}
                  {!historyLoading && history.length === 0 && (
                    <p className="text-sm text-slate-500">
                      No pitches yet. Generate your first pitch above.
                    </p>
                  )}
                  {!historyLoading &&
                    history.map((pitch) => (
                      <Link
                        key={pitch.id}
                        to={`/results/${pitch.id}`}
                        className="block rounded-md border border-white/10 bg-white/5 p-3 text-sm transition hover:border-white/30 hover:bg-white/10"
                      >
                        <p className="font-medium text-white">{pitch.startup_name}</p>
                        {pitch.industry && (
                          <p className="mt-1 text-xs text-slate-500">{pitch.industry}</p>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </Page>
    </Shell>
  );
}
