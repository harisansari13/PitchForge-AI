import { motion } from "framer-motion";

/**
 * Animated horizontal score bar.
 * Renders a dash label when `value` is null, undefined, or not a finite number.
 */
export function ScoreBar({ label, value }) {
  const hasScore = value !== null && value !== undefined && Number.isFinite(Number(value));
  const score = hasScore ? Math.max(0, Math.min(100, Number(value))) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-white">
          {hasScore ? `${score}/100` : "—"}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        {hasScore && (
          <motion.div
            className="progress-fill h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
}
