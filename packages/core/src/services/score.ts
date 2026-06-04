import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type { Diagnostic, ScoreResult } from "../types/index.js";
import { calculateScore, type ScoreRequestMetadata } from "../calculate-score.js";

interface ComputeInput {
  readonly diagnostics: ReadonlyArray<Diagnostic>;
  readonly isCi?: boolean;
  readonly metadata?: ScoreRequestMetadata;
}

export class Score extends Context.Service<
  Score,
  {
    readonly compute: (input: ComputeInput) => Effect.Effect<ScoreResult | null>;
  }
>()("react-doctor/Score") {
  /**
   * Computes the score offline (the `pinned` fork's local scorer; upstream
   * POSTed diagnostics to a hosted API). The scorer is infallible — it never
   * rejects and never returns `null` — so there is no network failure to
   * collapse; `--no-score` swaps in `layerOf(null)` instead.
   *
   * `Effect.fn("Score.compute")` wraps the body so the effect carries
   * an OpenTelemetry-compatible span name out of the box (canonical
   * eval pattern from `react-doctor-evals/src/Runner.ts`). Zero runtime
   * cost when no tracing layer is provided; surfaces in
   * `Otlp.layerJson` traces when one is.
   */
  static readonly layerLocal = Layer.succeed(
    Score,
    Score.of({
      compute: Effect.fn("Score.compute")(function* (input: ComputeInput) {
        return yield* Effect.promise(() =>
          calculateScore([...input.diagnostics], {
            isCi: input.isCi,
            metadata: input.metadata,
          }),
        );
      }),
    }),
  );

  static readonly layerOf = (result: ScoreResult | null): Layer.Layer<Score> =>
    Layer.succeed(
      Score,
      Score.of({
        compute: () => Effect.succeed(result),
      }),
    );
}
