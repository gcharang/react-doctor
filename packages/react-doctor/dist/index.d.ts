import { SyntaxKind } from "typescript";

//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Types.d.ts
/**
 * Function-type alias encoding covariant variance for a phantom type
 * parameter.
 *
 * **When to use**
 *
 * Use as a phantom field type to make a type parameter covariant in output
 * position.
 *
 * **Details**
 *
 * `Covariant<A>` is assignable to `Covariant<B>` when `A extends B`, following
 * the subtype direction.
 *
 * **Example** (Covariant phantom type)
 *
 * ```ts
 * import type { Types } from "effect"
 *
 * interface Producer<T> {
 *   readonly _phantom: Types.Covariant<T>
 *   readonly get: () => T
 * }
 * ```
 *
 * @see {@link Covariant.Type}
 * @see {@link Contravariant}
 * @see {@link Invariant}
 *
 * @category models
 * @since 2.0.0
 */
type Covariant<A> = (_: never) => A;
/**
 * Namespace for {@link Covariant}-related utilities.
 *
 * @since 3.9.0
 */
declare namespace Covariant {
  /**
   * Extracts the type parameter `A` from a `Covariant<A>`.
   *
   * **Example** (Extracting the inner type)
   *
   * ```ts
   * import type { Types } from "effect"
   *
   * type Inner = Types.Covariant.Type<Types.Covariant<string>>
   * // string
   * ```
   *
   * @see {@link Covariant}
   *
   * @category models
   * @since 3.9.0
   */
  type Type<A> = A extends Covariant<infer U> ? U : never;
}
/**
 * Extracts the required keys from a type.
 *
 * @category types
 * @since 4.0.0
 */
type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Combiner.d.ts
/**
 * Represents a strategy for combining two values of the same type `A`. A
 * `Combiner` contains a single `combine` method that takes two values and
 * returns a merged result. It does not include an identity/empty value; use
 * `Reducer` when you need one.
 *
 * **When to use**
 *
 * Use `Combiner` when you need to describe how two values of the same type
 * merge, pass a reusable combining strategy to library functions like
 * `Struct.makeCombiner` or `Option.makeCombinerFailFast`, or define the
 * combining step for a `Reducer`.
 *
 * **Example** (number addition combiner)
 *
 * ```ts
 * import { Combiner } from "effect"
 *
 * const Sum = Combiner.make<number>((self, that) => self + that)
 *
 * console.log(Sum.combine(3, 4))
 * // Output: 7
 * ```
 *
 * @see {@link make} – create a `Combiner` from a function
 * @category models
 * @since 4.0.0
 */
interface Combiner<A> {
  /**
   * Combines two values into a new value.
   */
  readonly combine: (self: A, that: A) => A;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Equivalence.d.ts
/**
 * Represents an equivalence relation over type `A`.
 *
 * **When to use**
 *
 * - Use as a type annotation for equivalence functions
 * - Use when implementing custom equivalence logic
 * - Use when working with collection operations that require equivalence relations
 *
 * **Details**
 *
 * - Pure function: does not mutate inputs or have side effects
 * - Returns `boolean`: `true` if values are equivalent, `false` otherwise
 * - Must satisfy reflexive, symmetric, and transitive properties
 *
 * **Example** (Simple number equivalence)
 *
 * ```ts
 * import type { Equivalence } from "effect"
 *
 * const numberEq: Equivalence.Equivalence<number> = (a, b) => a === b
 *
 * console.log(numberEq(1, 1)) // true
 * console.log(numberEq(1, 2)) // false
 * ```
 *
 * **Example** (Custom object equivalence)
 *
 * ```ts
 * import type { Equivalence } from "effect"
 *
 * interface Point {
 *   x: number
 *   y: number
 * }
 *
 * const pointEq: Equivalence.Equivalence<Point> = (a, b) =>
 *   a.x === b.x && a.y === b.y
 *
 * console.log(pointEq({ x: 1, y: 2 }, { x: 1, y: 2 })) // true
 * ```
 *
 * @see {@link make}
 * @see {@link strictEqual}
 * @category type class
 * @since 2.0.0
 */
type Equivalence<in A> = (self: A, that: A) => boolean;
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Inspectable.d.ts
/**
 * Interface for objects that can be inspected and provide custom string representations.
 *
 * **Details**
 *
 * Objects implementing this interface can control how they appear in debugging contexts,
 * JSON serialization, and Node.js inspection. This is particularly useful for creating
 * custom data types that display meaningful information during development.
 *
 * **Example** (Implementing inspectable objects)
 *
 * ```ts
 * import { Formatter, Inspectable } from "effect"
 *
 * class Result implements Inspectable.Inspectable {
 *   constructor(
 *     private readonly tag: "Success" | "Failure",
 *     private readonly value: unknown
 *   ) {}
 *
 *   toString(): string {
 *     return Formatter.format(this.toJSON())
 *   }
 *
 *   toJSON() {
 *     return { _tag: this.tag, value: this.value }
 *   }
 *
 *   [Inspectable.NodeInspectSymbol]() {
 *     return this.toJSON()
 *   }
 * }
 *
 * const success = new Result("Success", 42)
 * console.log(success.toString()) // Pretty formatted JSON
 * ```
 *
 * @category models
 * @since 2.0.0
 */
interface Inspectable {
  toString(): string;
  toJSON(): unknown;
  [NodeInspectSymbol](): unknown;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Pipeable.d.ts
/**
 * The `Pipeable` module defines the shared interface and implementation helpers
 * for values that support Effect-style method chaining with `.pipe(...)`.
 *
 * A `Pipeable` value can pass itself through a sequence of unary functions from
 * left to right, so code can be written as `value.pipe(f, g, h)` instead of
 * deeply nesting calls. This is the method form used by many Effect data types
 * to compose transformations, validations, and effectful operations while
 * keeping the original value as the starting point of the pipeline.
 *
 * **Common tasks**
 *
 * - Type values that expose a `.pipe(...)` method with the {@link Pipeable} interface
 * - Implement a custom `.pipe(...)` method with {@link pipeArguments}
 * - Reuse the standard implementation through {@link Prototype}, {@link Class}, or {@link Mixin}
 *
 * **Gotchas**
 *
 * - Each function receives the result of the previous function, not the original value
 * - The overloads preserve precise types for long pipelines, but very long chains may be easier to read when split
 *
 * @since 2.0.0
 */
/**
 * Interface for values that support method-style `pipe` composition.
 *
 * **Details**
 *
 * Calling `value.pipe(f, g, h)` passes the value through each function from
 * left to right, returning the final result. Many Effect data types implement
 * this so operations can be chained without nesting function calls.
 *
 * **Example** (Chaining operations with pipe)
 *
 * ```ts
 * import { Effect } from "effect"
 *
 * // The Pipeable interface allows Effect values to be chained using the pipe method
 * const program = Effect.succeed(1).pipe(
 *   Effect.map((x) => x + 1),
 *   Effect.flatMap((x) => Effect.succeed(x * 2)),
 *   Effect.tap((x) => Effect.log(`Result: ${x}`))
 * )
 * ```
 *
 * @category models
 * @since 2.0.0
 */
interface Pipeable {
  pipe<A>(this: A): A;
  pipe<A, B = never>(this: A, ab: (_: A) => B): B;
  pipe<A, B = never, C = never>(this: A, ab: (_: A) => B, bc: (_: B) => C): C;
  pipe<A, B = never, C = never, D = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D): D;
  pipe<A, B = never, C = never, D = never, E = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E): E;
  pipe<A, B = never, C = never, D = never, E = never, F = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F): F;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G): G;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H): H;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I): I;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J): J;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K): K;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L): L;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M): M;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N): N;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O): O;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O, op: (_: O) => P): P;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O, op: (_: O) => P, pq: (_: P) => Q): Q;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O, op: (_: O) => P, pq: (_: P) => Q, qr: (_: Q) => R): R;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O, op: (_: O) => P, pq: (_: P) => Q, qr: (_: Q) => R, rs: (_: R) => S): S;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never, T = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O, op: (_: O) => P, pq: (_: P) => Q, qr: (_: Q) => R, rs: (_: R) => S, st: (_: S) => T): T;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never, T = never, U = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O, op: (_: O) => P, pq: (_: P) => Q, qr: (_: Q) => R, rs: (_: R) => S, st: (_: S) => T, tu: (_: T) => U): U;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never, T = never, U = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F, fg: (_: F) => G, gh: (_: G) => H, hi: (_: H) => I, ij: (_: I) => J, jk: (_: J) => K, kl: (_: K) => L, lm: (_: L) => M, mn: (_: M) => N, no: (_: N) => O, op: (_: O) => P, pq: (_: P) => Q, qr: (_: Q) => R, rs: (_: R) => S, st: (_: S) => T, tu: (_: T) => U): U;
}
/**
 * Base constructor whose instances implement the standard `Pipeable.pipe`
 * method.
 *
 * **When to use**
 *
 * Extend or compose this constructor when defining a class that should support
 * Effect-style method chaining through `.pipe(...)`.
 *
 * @category constructors
 * @since 3.15.0
 */
declare const Class$1: new () => Pipeable;
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Unify.d.ts
/**
 * The `Unify` module contains the type-level protocol Effect uses to normalize
 * unions of data types that opt in to unification. It is primarily a library
 * authoring tool: data types expose hidden symbol properties describing how
 * their variants should be widened, and {@link Unify} turns those protocol
 * entries into the user-facing union type that TypeScript should infer.
 *
 * Most application code does not need to interact with these symbols directly.
 * The main runtime helper, {@link unify}, is an identity function that preserves
 * values and functions at runtime while applying {@link Unify} to the relevant
 * static type. This is useful when authoring APIs that return branded or
 * protocol-enabled values and need inference to collapse to the public Effect
 * data type rather than exposing implementation details.
 *
 * @since 2.0.0
 */
/**
 * A unique symbol used to identify unification behavior in Effect types.
 *
 * **Details**
 *
 * This symbol is used internally by the Effect type system to enable automatic
 * unification of Effect types in unions and complex type operations.
 *
 * @category symbols
 * @since 2.0.0
 */
declare const unifySymbol: unique symbol;
/**
 * The type of the unifySymbol.
 *
 * **Details**
 *
 * This type represents the unique symbol used for identifying unification
 * behavior in Effect types. It's typically used in type-level operations
 * to enable automatic type unification.
 *
 * @category symbols
 * @since 2.0.0
 */
type unifySymbol = typeof unifySymbol;
/**
 * A unique symbol used to identify the type information for unification.
 *
 * **Details**
 *
 * This symbol is used internally by the Effect type system to store type
 * information that can be used during type unification operations.
 *
 * @category symbols
 * @since 2.0.0
 */
declare const typeSymbol: unique symbol;
/**
 * The type of the typeSymbol.
 *
 * **Details**
 *
 * This type represents the unique symbol used for storing type information
 * in types that support unification. It's used in type-level operations
 * to access and manipulate type information.
 *
 * @category symbols
 * @since 2.0.0
 */
type typeSymbol = typeof typeSymbol;
/**
 * A unique symbol used to specify types that should be ignored during unification.
 *
 * **Details**
 *
 * This symbol is used internally by the Effect type system to mark types
 * that should be excluded from the unification process, allowing for more
 * precise type handling in complex scenarios.
 *
 * @category symbols
 * @since 2.0.0
 */
declare const ignoreSymbol: unique symbol;
/**
 * The type of the ignoreSymbol.
 *
 * **Details**
 *
 * This type represents the unique symbol used for marking types that should
 * be ignored during unification operations. It's used in type-level operations
 * to exclude specific types from the unification process.
 *
 * @category symbols
 * @since 2.0.0
 */
type ignoreSymbol = typeof ignoreSymbol;
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Formatter.d.ts
/**
 * A callable interface representing a function that converts a `Value` into a `Format`, which defaults to `string`.
 *
 * **When to use**
 *
 * Use `Formatter` when you want to type a formatting or rendering function generically, or when you are building a pipeline that accepts pluggable formatters.
 *
 * **Details**
 *
 * This is a pure callable type and carries no runtime implementation. It is contravariant in `Value` and covariant in `Format`.
 *
 * **Example** (Define a custom formatter)
 *
 * ```ts
 * import type { Formatter } from "effect"
 *
 * const upper: Formatter.Formatter<string> = (s) => s.toUpperCase()
 *
 * console.log(upper("hello"))
 * // HELLO
 * ```
 *
 * @see {@link format}
 * @see {@link formatJson}
 * @category models
 * @since 4.0.0
 */
interface Formatter<in Value, out Format = string> {
  (value: Value): Format;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/SchemaIssue.d.ts
declare const TypeId$5 = "~effect/SchemaIssue/Issue";
/**
 * Returns `true` if the given value is an {@link Issue}.
 *
 * **When to use**
 *
 * - Narrowing an `unknown` value to `Issue` in error-handling code.
 * - Distinguishing an `Issue` from other error types in a catch-all handler.
 *
 * **Details**
 *
 * - Pure; does not mutate input.
 * - Checks for the internal `TypeId` brand on the value.
 *
 * **Example** (Type-guarding an unknown error)
 *
 * ```ts
 * import { SchemaIssue } from "effect"
 *
 * const issue = new SchemaIssue.MissingKey(undefined)
 * console.log(SchemaIssue.isIssue(issue))
 * // true
 * console.log(SchemaIssue.isIssue("not an issue"))
 * // false
 * ```
 *
 * @see {@link Issue}
 *
 * @category guards
 * @since 4.0.0
 */
/**
 * Union of all terminal (leaf) issue types that have no inner `Issue` children.
 *
 * **When to use**
 *
 * - Constraining formatter hooks to only handle terminal nodes.
 * - Pattern-matching on the `_tag` of an issue when you only care about leaves.
 *
 * **Details**
 *
 * Members: {@link InvalidType}, {@link InvalidValue}, {@link MissingKey},
 * {@link UnexpectedKey}, {@link Forbidden}, {@link OneOf}.
 *
 * @see {@link Issue} — the full union including composite nodes
 * @see {@link LeafHook} — formatter hook that operates on `Leaf` values
 *
 * @category models
 * @since 4.0.0
 */
type Leaf = InvalidType | InvalidValue | MissingKey | UnexpectedKey | Forbidden | OneOf;
/**
 * The root discriminated union of all validation error nodes.
 *
 * **When to use**
 *
 * - Typing the error channel in `Effect<A, Issue, R>` results from schema
 *   parsing.
 * - Writing custom formatters or issue-tree walkers.
 *
 * **Details**
 *
 * Every node has a `_tag` field for pattern-matching. The union includes both
 * terminal {@link Leaf} types and composite types that wrap inner issues:
 * {@link Filter}, {@link Encoding}, {@link Pointer}, {@link Composite},
 * {@link AnyOf}. All `Issue` instances have a `toString()` that delegates to
 * the default formatter, so `String(issue)` produces a human-readable message.
 *
 * @see {@link Leaf} — the terminal subset
 * @see {@link isIssue} — type guard
 * @see {@link getActual} — extract the actual value from any issue
 *
 * @category models
 * @since 4.0.0
 */
type Issue = Leaf | Filter$1 | Encoding$1 | Pointer | Composite | AnyOf;
declare class Base$1 {
  readonly [TypeId$5] = "~effect/SchemaIssue/Issue";
  toString(this: Issue): string;
}
/**
 * Issue produced when a schema filter (refinement check) fails.
 *
 * **When to use**
 *
 * - Inspect which filter rejected the value.
 * - Walk the inner `issue` for the specific validation failure.
 *
 * **Details**
 *
 * - `actual` is the raw input value that was tested (plain `unknown`, not
 *   wrapped in `Option`).
 * - `filter` is the AST filter node that produced this issue.
 * - `issue` is the inner issue describing the failure reason.
 *
 * **Example** (Matching a Filter issue)
 *
 * ```ts
 * import { SchemaIssue } from "effect"
 *
 * function describe(issue: SchemaIssue.Issue): string {
 *   if (issue._tag === "Filter") {
 *     return `Filter failed on: ${JSON.stringify(issue.actual)}`
 *   }
 *   return String(issue)
 * }
 * ```
 *
 * @see {@link Leaf} — terminal issue types that commonly appear as the inner `issue`
 * @see {@link CheckHook} — formatter hook for `Filter` issues
 *
 * @category models
 * @since 4.0.0
 */
declare class Filter$1 extends Base$1 {
  readonly _tag = "Filter";
  /**
   * The input value that caused the issue.
   */
  readonly actual: unknown;
  /**
   * The filter that failed.
   */
  readonly filter: Filter<unknown>;
  /**
   * The issue that occurred.
   */
  readonly issue: Issue;
  constructor(
  /**
   * The input value that caused the issue.
   */

  actual: unknown,
  /**
   * The filter that failed.
   */

  filter: Filter<any>,
  /**
   * The issue that occurred.
   */

  issue: Issue);
}
/**
 * Issue produced when a schema transformation (encode/decode step) fails.
 *
 * **When to use**
 *
 * - Inspect failures from `Schema.decodeTo` / `Schema.encodeTo`
 *   transformations.
 * - Walk the inner `issue` for the root cause of the transformation failure.
 *
 * **Details**
 *
 * - `ast` is the AST node for the transformation that failed.
 * - `actual` is `Option.some(value)` when the input was present, or
 *   `Option.none()` when it was absent.
 * - `issue` is the inner issue describing the failure.
 *
 * @see {@link Filter} — failure from a refinement check (not a transformation)
 * @see {@link Composite} — multiple issues from a single schema node
 *
 * @category models
 * @since 4.0.0
 */
declare class Encoding$1 extends Base$1 {
  readonly _tag = "Encoding";
  /**
   * The schema that caused the issue.
   */
  readonly ast: AST;
  /**
   * The input value that caused the issue.
   */
  readonly actual: Option<unknown>;
  /**
   * The issue that occurred.
   */
  readonly issue: Issue;
  constructor(
  /**
   * The schema that caused the issue.
   */

  ast: AST,
  /**
   * The input value that caused the issue.
   */

  actual: Option<unknown>,
  /**
   * The issue that occurred.
   */

  issue: Issue);
}
/**
 * Wraps an inner {@link Issue} with a property-key path, indicating *where* in
 * a nested structure the error occurred.
 *
 * **When to use**
 *
 * - Walk the issue tree to accumulate path segments for error reporting.
 * - Match on `_tag === "Pointer"` when flattening nested issues.
 *
 * **Details**
 *
 * - `path` is an array of property keys (strings, numbers, or symbols).
 * - Has no `actual` value — {@link getActual} returns `Option.none()`.
 * - Formatters concatenate nested `Pointer` paths into a single path like
 *   `["a"]["b"][0]`.
 *
 * @see {@link getActual} — returns `Option.none()` for `Pointer`
 * @see {@link Composite} — groups multiple issues under one schema node
 *
 * @category models
 * @since 3.10.0
 */
declare class Pointer extends Base$1 {
  readonly _tag = "Pointer";
  /**
   * The path to the location in the input that caused the issue.
   */
  readonly path: ReadonlyArray<PropertyKey>;
  /**
   * The issue that occurred.
   */
  readonly issue: Issue;
  constructor(
  /**
   * The path to the location in the input that caused the issue.
   */

  path: ReadonlyArray<PropertyKey>,
  /**
   * The issue that occurred.
   */

  issue: Issue);
}
/**
 * Issue produced when a required key or tuple index is missing from the input.
 *
 * **When to use**
 *
 * - Detect absent fields in struct/tuple validation.
 * - Typically found inside a {@link Pointer} that indicates which key is
 *   missing.
 *
 * **Details**
 *
 * - Has no `actual` value — {@link getActual} returns `Option.none()`.
 * - `annotations` may contain a custom `messageMissingKey` for formatting.
 *
 * @see {@link Pointer} — wraps this issue with the missing key's path
 * @see {@link UnexpectedKey} — the opposite case (extra key present)
 *
 * @category models
 * @since 4.0.0
 */
declare class MissingKey extends Base$1 {
  readonly _tag = "MissingKey";
  /**
   * The metadata for the issue.
   */
  readonly annotations: Annotations.Key<unknown> | undefined;
  constructor(
  /**
   * The metadata for the issue.
   */

  annotations: Annotations.Key<unknown> | undefined);
}
/**
 * Issue produced when an input object or tuple contains a key/index not
 * declared by the schema.
 *
 * **When to use**
 *
 * - Detect excess properties during strict struct/tuple validation.
 * - Typically found inside a {@link Pointer} that indicates which key was
 *   unexpected.
 *
 * **Details**
 *
 * - `actual` is the raw value at the unexpected key (plain `unknown`).
 * - `ast` is the schema that was being validated against.
 * - `annotations` on `ast` may contain a custom `messageUnexpectedKey`.
 *
 * @see {@link MissingKey} — the opposite case (required key absent)
 * @see {@link Pointer} — wraps this issue with the unexpected key's path
 *
 * @category models
 * @since 4.0.0
 */
declare class UnexpectedKey extends Base$1 {
  readonly _tag = "UnexpectedKey";
  /**
   * The schema that caused the issue.
   */
  readonly ast: AST;
  /**
   * The input value that caused the issue.
   */
  readonly actual: unknown;
  constructor(
  /**
   * The schema that caused the issue.
   */

  ast: AST,
  /**
   * The input value that caused the issue.
   */

  actual: unknown);
}
/**
 * Issue that groups multiple child issues under a single schema node.
 *
 * **When to use**
 *
 * - Walk the issue tree for struct/tuple schemas that collect all field errors
 *   rather than failing on the first.
 * - Match on `_tag === "Composite"` to iterate over `issues`.
 *
 * **Details**
 *
 * - `issues` is a non-empty readonly array (at least one child).
 * - `actual` is `Option.some(value)` when the input was present, or
 *   `Option.none()` when absent.
 * - Formatters flatten `Composite` by recursing into each child.
 *
 * @see {@link AnyOf} — used for union no-match errors (similar but different semantics)
 * @see {@link Pointer} — adds path context to individual issues
 *
 * @category models
 * @since 3.10.0
 */
declare class Composite extends Base$1 {
  readonly _tag = "Composite";
  /**
   * The schema that caused the issue.
   */
  readonly ast: AST;
  /**
   * The input value that caused the issue.
   */
  readonly actual: Option<unknown>;
  /**
   * The issues that occurred.
   */
  readonly issues: readonly [Issue, ...Array<Issue>];
  constructor(
  /**
   * The schema that caused the issue.
   */

  ast: AST,
  /**
   * The input value that caused the issue.
   */

  actual: Option<unknown>,
  /**
   * The issues that occurred.
   */

  issues: readonly [Issue, ...Array<Issue>]);
}
/**
 * Issue produced when the runtime type of the input does not match the type
 * expected by the schema (e.g. got `null` when `string` was expected).
 *
 * **When to use**
 *
 * - Detect basic type mismatches (wrong primitive, null where object expected,
 *   etc.).
 * - The most common leaf issue in typical validation failures.
 *
 * **Details**
 *
 * - `ast` is the schema node that expected a different type.
 * - `actual` is `Option.some(value)` when the input was present, or
 *   `Option.none()` when no value was provided.
 * - The default formatter renders this as `"Expected <type>, got <actual>"`.
 *
 * **Example** (Formatted output)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * try {
 *   Schema.decodeUnknownSync(Schema.String)(42)
 * } catch (e) {
 *   if (Schema.isSchemaError(e)) {
 *     console.log(String(e.issue))
 *     // "Expected string, got 42"
 *   }
 * }
 * ```
 *
 * @see {@link InvalidValue} — the input has the right type but fails a value constraint
 *
 * @category models
 * @since 4.0.0
 */
declare class InvalidType extends Base$1 {
  readonly _tag = "InvalidType";
  /**
   * The schema that caused the issue.
   */
  readonly ast: AST;
  /**
   * The input value that caused the issue.
   */
  readonly actual: Option<unknown>;
  constructor(
  /**
   * The schema that caused the issue.
   */

  ast: AST,
  /**
   * The input value that caused the issue.
   */

  actual: Option<unknown>);
}
/**
 * Issue produced when the input has the correct type but its value violates a
 * constraint (e.g. a string that is too short, a number out of range).
 *
 * **When to use**
 *
 * - Detect constraint violations from `Schema.filter`, `Schema.minLength`,
 *   `Schema.greaterThan`, etc.
 * - Create custom validation errors in `Schema.makeFilter` callbacks.
 *
 * **Details**
 *
 * - `actual` is `Option.some(value)` when the failing value is known, or
 *   `Option.none()` when absent.
 * - `annotations` optionally carries a `message` string for formatting.
 * - The default formatter renders this as `"Invalid data <actual>"` unless a
 *   custom `message` annotation is provided.
 *
 * **Example** (Custom filter returning InvalidValue)
 *
 * ```ts
 * import { Option, SchemaIssue } from "effect"
 *
 * const issue = new SchemaIssue.InvalidValue(
 *   Option.some(""),
 *   { message: "must not be empty" }
 * )
 * console.log(String(issue))
 * // "must not be empty"
 * ```
 *
 * @see {@link InvalidType} — the input has the wrong type entirely
 * @see {@link Filter} — composite wrapper when a schema filter produces this issue
 *
 * @category models
 * @since 4.0.0
 */
declare class InvalidValue extends Base$1 {
  readonly _tag = "InvalidValue";
  /**
   * The value that caused the issue.
   */
  readonly actual: Option<unknown>;
  /**
   * The metadata for the issue.
   */
  readonly annotations: Annotations.Issue | undefined;
  constructor(
  /**
   * The value that caused the issue.
   */

  actual: Option<unknown>,
  /**
   * The metadata for the issue.
   */

  annotations?: Annotations.Issue | undefined);
}
/**
 * Issue produced when a forbidden operation is encountered during parsing,
 * such as an asynchronous Effect running inside `Schema.decodeUnknownSync`.
 *
 * **When to use**
 *
 * - Detect that a schema requires async execution but was run synchronously.
 * - Provide custom error messages via the `annotations.message` field.
 *
 * **Details**
 *
 * - `actual` is `Option.some(value)` when the input is known, or
 *   `Option.none()` when absent.
 * - `annotations` optionally carries a `message` string.
 * - The default formatter renders this as `"Forbidden operation"`.
 *
 * **Example** (Creating a Forbidden issue)
 *
 * ```ts
 * import { Option, SchemaIssue } from "effect"
 *
 * const issue = new SchemaIssue.Forbidden(
 *   Option.none(),
 *   { message: "async operation not allowed in sync context" }
 * )
 * console.log(String(issue))
 * // "async operation not allowed in sync context"
 * ```
 *
 * @see {@link InvalidValue} — for value-constraint failures (not operation failures)
 *
 * @category models
 * @since 3.10.0
 */
declare class Forbidden extends Base$1 {
  readonly _tag = "Forbidden";
  /**
   * The input value that caused the issue.
   */
  readonly actual: Option<unknown>;
  /**
   * The metadata for the issue.
   */
  readonly annotations: Annotations.Issue | undefined;
  constructor(
  /**
   * The input value that caused the issue.
   */

  actual: Option<unknown>,
  /**
   * The metadata for the issue.
   */

  annotations: Annotations.Issue | undefined);
}
/**
 * Issue produced when a value does not match *any* member of a union schema.
 *
 * **When to use**
 *
 * - Inspect which union members were attempted and why each failed.
 * - `issues` may be empty when the union has no members or when the input does
 *   not pass the initial type guard.
 *
 * **Details**
 *
 * - `ast` is the `Union` AST node.
 * - `actual` is the raw input value (plain `unknown`).
 * - `issues` contains per-member failures. When empty, the formatter falls
 *   back to the union's `expected` annotation.
 *
 * @see {@link OneOf} — the opposite: *too many* members matched
 * @see {@link Composite} — groups multiple issues under a non-union schema
 *
 * @category models
 * @since 4.0.0
 */
declare class AnyOf extends Base$1 {
  readonly _tag = "AnyOf";
  /**
   * The schema that caused the issue.
   */
  readonly ast: Union$1;
  /**
   * The input value that caused the issue.
   */
  readonly actual: unknown;
  /**
   * The issues that occurred.
   */
  readonly issues: ReadonlyArray<Issue>;
  constructor(
  /**
   * The schema that caused the issue.
   */

  ast: Union$1,
  /**
   * The input value that caused the issue.
   */

  actual: unknown,
  /**
   * The issues that occurred.
   */

  issues: ReadonlyArray<Issue>);
}
/**
 * Issue produced when a value matches *multiple* members of a union that is
 * configured to allow exactly one match (oneOf mode).
 *
 * **When to use**
 *
 * - Detect ambiguous union matches when `oneOf` validation is enabled.
 * - Inspect `successes` to see which members matched.
 *
 * **Details**
 *
 * - `ast` is the `Union` AST node.
 * - `actual` is the raw input value (plain `unknown`).
 * - `successes` lists the AST nodes of each member that accepted the input.
 * - The default formatter renders this as
 *   `"Expected exactly one member to match the input <actual>"`.
 *
 * @see {@link AnyOf} — the opposite: *no* members matched
 *
 * @category models
 * @since 4.0.0
 */
declare class OneOf extends Base$1 {
  readonly _tag = "OneOf";
  /**
   * The schema that caused the issue.
   */
  readonly ast: Union$1;
  /**
   * The input value that caused the issue.
   */
  readonly actual: unknown;
  /**
   * The schemas that were successful.
   */
  readonly successes: ReadonlyArray<AST>;
  constructor(
  /**
   * The schema that caused the issue.
   */

  ast: Union$1,
  /**
   * The input value that caused the issue.
   */

  actual: unknown,
  /**
   * The schemas that were successful.
   */

  successes: ReadonlyArray<AST>);
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/SchemaGetter.d.ts
/**
 * A composable transformation from an encoded type `E` to a decoded type `T`.
 *
 * **When to use**
 *
 * - Building custom schema transformations with `Schema.decodeTo` or `Schema.decode`.
 * - Composing multiple transformation steps into a single getter.
 *
 * **Details**
 *
 * - A getter wraps a function `Option<E> -> Effect<Option<T>, Issue, R>`.
 * - Receives `Option.None` when the encoded key is absent (e.g. missing struct field).
 * - Returns `Option.None` to omit the value from the decoded output.
 * - Fails with `Issue` on invalid input.
 * - May require Effect services via `R`.
 * - Immutable — constructing or composing getters does not mutate existing instances.
 * - `.map(f)` applies `f` to the decoded value (inside the `Some`), leaving `None` unchanged.
 * - `.compose(other)` chains two getters: the output of `this` feeds into `other`.
 *   Passthrough getters on either side are optimized away.
 *
 * **Example** (Creating and composing getters)
 *
 * ```ts
 * import { SchemaGetter } from "effect"
 *
 * const parseNumber = SchemaGetter.transform<number, string>((s) => Number(s))
 * const double = SchemaGetter.transform<number, number>((n) => n * 2)
 * const composed = parseNumber.compose(double)
 * // composed: Getter<number, string> — parses then doubles
 * ```
 *
 * @see {@link transform} - create a getter from a pure function
 * @see {@link passthrough} - identity getter
 * @see {@link transformOrFail} - fallible transformation
 *
 * @category models
 * @since 4.0.0
 */
declare class Getter<out T, in E, R = never> extends Class$1 {
  readonly run: (input: Option<E>, options: ParseOptions) => Effect<Option<T>, Issue, R>;
  constructor(run: (input: Option<E>, options: ParseOptions) => Effect<Option<T>, Issue, R>);
  map<T2>(f: (t: T) => T2): Getter<T2, E, R>;
  compose<T2, R2>(other: Getter<T2, T, R2>): Getter<T2, E, R | R2>;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/SchemaTransformation.d.ts
/**
 * A middleware that wraps the entire parsing `Effect` pipeline for both
 * decode and encode directions.
 *
 * **When to use**
 *
 * - You need to catch or recover from parsing errors (e.g. `Schema.catchDecoding`).
 * - You need to run side effects around the parsing pipeline.
 * - You need access to the full `Effect` rather than a single decoded value.
 *
 * **Details**
 *
 * Unlike `Transformation`, which operates on individual values via `Getter`,
 * `Middleware` receives the full `Effect` produced by the inner schema and can
 * intercept, modify, retry, or replace it.
 *
 * - Immutable — constructing a Middleware does not mutate existing instances.
 * - `decode` receives an `Effect<Option<E>, Issue, RDE>` and returns
 *   `Effect<Option<T>, Issue, RDT>`.
 * - `encode` receives an `Effect<Option<T>, Issue, RET>` and returns
 *   `Effect<Option<E>, Issue, REE>`.
 * - `flip()` swaps the decode and encode functions, producing a
 *   `Middleware<E, T, ...>`.
 *
 * Typically constructed indirectly via `Schema.middlewareDecoding` or
 * `Schema.middlewareEncoding` rather than instantiating this class directly.
 *
 * **Example** (Creating a middleware that falls back on decode failure)
 *
 * ```ts
 * import { Effect, Option, SchemaTransformation } from "effect"
 *
 * const fallback = new SchemaTransformation.Middleware(
 *   (effect) => Effect.catch(effect, () => Effect.succeed(Option.some("fallback"))),
 *   (effect) => effect
 * )
 * ```
 *
 * @see {@link Transformation} — value-level bidirectional transformation
 *
 * @category models
 * @since 4.0.0
 */
declare class Middleware<in out T, in out E, RDE, RDT, RET, REE> {
  readonly _tag = "Middleware";
  readonly decode: (effect: Effect<Option<E>, Issue, RDE>, options: ParseOptions) => Effect<Option<T>, Issue, RDT>;
  readonly encode: (effect: Effect<Option<T>, Issue, RET>, options: ParseOptions) => Effect<Option<E>, Issue, REE>;
  constructor(decode: (effect: Effect<Option<E>, Issue, RDE>, options: ParseOptions) => Effect<Option<T>, Issue, RDT>, encode: (effect: Effect<Option<T>, Issue, RET>, options: ParseOptions) => Effect<Option<E>, Issue, REE>);
  flip(): Middleware<E, T, RET, REE, RDE, RDT>;
}
declare const TypeId$4 = "~effect/SchemaTransformation/Transformation";
/**
 * A bidirectional transformation between a decoded type `T` and an encoded
 * type `E`, built from a pair of `Getter`s.
 *
 * **When to use**
 *
 * - You need to define how a schema converts between two representations.
 * - You want to compose multiple transformations into a pipeline.
 * - You want to flip a transformation to swap decode/encode.
 *
 * **Details**
 *
 * This is the primary building block for `Schema.decodeTo`, `Schema.encodeTo`,
 * `Schema.decode`, `Schema.encode`, and `Schema.link`. Each direction is a
 * `SchemaGetter.Getter` that handles optionality, failure, and Effect services.
 *
 * - Immutable — `flip()` and `compose()` return new instances.
 * - `flip()` swaps the decode and encode getters.
 * - `compose(other)` chains: `this.decode` then `other.decode` for decoding,
 *   `other.encode` then `this.encode` for encoding.
 *
 * **Example** (Composing two transformations)
 *
 * ```ts
 * import { SchemaTransformation } from "effect"
 *
 * const trimAndLower = SchemaTransformation.trim().compose(
 *   SchemaTransformation.toLowerCase()
 * )
 * // decode: trim then lowercase
 * // encode: passthrough (both directions)
 * ```
 *
 * @see {@link make} — construct from `{ decode, encode }` getters
 * @see {@link transform} — construct from pure functions
 * @see {@link transformOrFail} — construct from effectful functions
 * @see {@link Middleware} — effect-pipeline-level alternative
 *
 * @category models
 * @since 4.0.0
 */
declare class Transformation<in out T, in out E, RD = never, RE = never> {
  readonly [TypeId$4] = "~effect/SchemaTransformation/Transformation";
  readonly _tag = "Transformation";
  readonly decode: Getter<T, E, RD>;
  readonly encode: Getter<E, T, RE>;
  constructor(decode: Getter<T, E, RD>, encode: Getter<E, T, RE>);
  flip(): Transformation<E, T, RE, RD>;
  compose<T2, RD2, RE2>(other: Transformation<T2, T, RD2, RE2>): Transformation<T2, E, RD | RD2, RE | RE2>;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/SchemaAST.d.ts
/**
 * Discriminated union of all AST node types.
 *
 * **Details**
 *
 * Every `Schema` has an `.ast` property of this type. Use the guard functions
 * ({@link isString}, {@link isObjects}, etc.) to narrow to a specific variant,
 * then access variant-specific fields.
 *
 * - All variants share the {@link Base} fields: `annotations`, `checks`,
 *   `encoding`, `context`.
 * - Discriminate on the `_tag` field (e.g. `"String"`, `"Objects"`, `"Union"`).
 *
 * @see {@link Base}
 * @see {@link isAST}
 * @category models
 * @since 3.10.0
 */
type AST = Declaration | Null | Undefined | Void | Never | Unknown$1 | Any | String$1 | Number$1 | Boolean | BigInt | Symbol$2 | Literal$2 | UniqueSymbol | ObjectKeyword | Enum | TemplateLiteral$1 | Arrays | Objects$1 | Union$1 | Suspend;
/**
 * A single step in an {@link Encoding} chain.
 *
 * **Details**
 *
 * A link pairs a target {@link AST} with a `Transformation` or `Middleware`
 * that converts values between the current node and the target.
 *
 * - `to` — the AST node on the other side of this transformation step.
 * - `transformation` — the bidirectional conversion logic (decode/encode).
 *
 * Links are composed into a non-empty array ({@link Encoding}) attached to
 * AST nodes that have a different encoded representation.
 *
 * @see {@link Encoding}
 * @see {@link decodeTo}
 * @category models
 * @since 4.0.0
 */
declare class Link {
  readonly to: AST;
  readonly transformation: Transformation<any, any, any, any> | Middleware<any, any, any, any, any, any>;
  constructor(to: AST, transformation: Transformation<any, any, any, any> | Middleware<any, any, any, any, any, any>);
}
/**
 * A non-empty chain of {@link Link} values representing the transformation
 * steps between a schema's decoded (type) form and its encoded (wire) form.
 *
 * **Details**
 *
 * Stored on {@link Base.encoding}. When `undefined`, the node has no
 * encoding transformation (type and encoded forms are identical).
 *
 * @see {@link Link}
 * @see {@link toEncoded}
 * @category models
 * @since 4.0.0
 */
type Encoding = readonly [Link, ...Array<Link>];
/**
 * Options that control schema parsing, validation, transformation, and output behavior.
 *
 * **Details**
 *
 * Pass to `Schema.decodeUnknown`, `Schema.encode`, and related APIs to customize
 * error reporting, excess property handling, output key ordering, check
 * execution, and asynchronous parser concurrency.
 *
 * - `errors` — `"first"` (default) stops at the first error; `"all"` collects
 *   every error.
 * - `onExcessProperty` — `"ignore"` (default) strips unknown object keys;
 *   `"error"` fails; `"preserve"` keeps them.
 * - `propertyOrder` — `"none"` (default) lets the system choose key order;
 *   `"original"` preserves input key order.
 * - `disableChecks` — skips validation checks while still applying defaults and
 *   transformations.
 * - `concurrency` — maximum number of async parse effects to run concurrently;
 *   defaults to `1`, or use `"unbounded"`.
 *
 * @category models
 * @since 3.10.0
 */
interface ParseOptions {
  /**
   * Controls how many parsing errors are reported.
   *
   * **Details**
   *
   * The default, `"first"`, stops at the first error. Set the option to `"all"`
   * to collect every parsing error, which can help with debugging or with
   * presenting more complete error messages to a user.
   *
   * @default "first"
   */
  readonly errors?: "first" | "all" | undefined;
  /**
   * Controls how object parsing handles keys that are not declared by the schema.
   *
   * **Details**
   *
   * The default, `"ignore"`, strips unspecified properties from the output. Use
   * `"error"` to fail when an excess property is present, or `"preserve"` to
   * keep excess properties in the output.
   *
   * @default "ignore"
   */
  readonly onExcessProperty?: "ignore" | "error" | "preserve" | undefined;
  /**
   * The `propertyOrder` option provides control over the order of object fields
   * in the output. This feature is useful when the sequence of keys is
   * important for the consuming processes or when maintaining the input order
   * enhances readability and usability.
   *
   * **Details**
   *
   * By default, the `propertyOrder` option is set to `"none"`. This means that
   * the internal system decides the order of keys to optimize parsing speed.
   *
   * Setting `propertyOrder` to `"original"` ensures that the keys are ordered
   * as they appear in the input during the decoding/encoding process.
   *
   * **Gotchas**
   *
   * The key order for `"none"` should not be considered stable and may change
   * in future updates without notice.
   *
   * @default "none"
   */
  readonly propertyOrder?: "none" | "original" | undefined;
  /**
   * Whether to disable checks while still applying defaults and
   * transformations.
   */
  readonly disableChecks?: boolean | undefined;
  /**
   * The maximum number of async effects to run concurrently.
   *
   * @default 1
   */
  readonly concurrency?: number | "unbounded" | undefined;
}
/**
 * Per-property metadata attached to AST nodes via {@link Base.context}.
 *
 * **Details**
 *
 * Tracks whether a property key is optional, mutable, has a constructor
 * default, or carries key-level annotations. Typically set by helpers like
 * {@link optionalKey} and `Schema.mutableKey`.
 *
 * - `isOptional` — the property key may be absent from the input.
 * - `isMutable` — the property is `readonly` when `false`.
 * - `defaultValue` — an {@link Encoding} applied during construction to
 *   supply missing values.
 * - `annotations` — key-level annotations (e.g. description of the key
 *   itself).
 *
 * @see {@link optionalKey}
 * @see {@link isOptional}
 * @category models
 * @since 4.0.0
 */
declare class Context$1 {
  readonly isOptional: boolean;
  readonly isMutable: boolean;
  /** Used for constructor default values (e.g. `withConstructorDefault` API) */
  readonly defaultValue: Encoding | undefined;
  readonly annotations: Annotations.Key<unknown> | undefined;
  constructor(isOptional: boolean, isMutable: boolean, /** Used for constructor default values (e.g. `withConstructorDefault` API) */

  defaultValue?: Encoding | undefined, annotations?: Annotations.Key<unknown> | undefined);
}
/**
 * Non-empty array of validation {@link Check} values attached to an AST node
 * via {@link Base.checks}.
 *
 * **Details**
 *
 * Checks are run after basic type matching succeeds. They represent
 * refinements like `minLength`, `pattern`, `int`, etc.
 *
 * @see {@link Check}
 * @see {@link Filter}
 * @see {@link FilterGroup}
 * @category models
 * @since 4.0.0
 */
type Checks = readonly [Check<any>, ...Array<Check<any>>];
declare const TypeId$3 = "~effect/Schema";
/**
 * Abstract base class for all {@link AST} node variants.
 *
 * **Details**
 *
 * Every AST node extends `Base` and inherits these fields:
 *
 * - `annotations` — user-supplied metadata (identifier, title, description,
 *   arbitrary keys).
 * - `checks` — optional {@link Checks} for post-type-match validation.
 * - `encoding` — optional {@link Encoding} chain for type ↔ wire
 *   transformations.
 * - `context` — optional {@link Context} for per-property metadata.
 *
 * Subclasses add a `_tag` discriminant and variant-specific data.
 *
 * @see {@link AST}
 * @category models
 * @since 4.0.0
 */
declare abstract class Base {
  readonly [TypeId$3] = "~effect/Schema";
  abstract readonly _tag: string;
  readonly annotations: Annotations.Annotations | undefined;
  readonly checks: Checks | undefined;
  readonly encoding: Encoding | undefined;
  readonly context: Context$1 | undefined;
  constructor(annotations?: Annotations.Annotations | undefined, checks?: Checks | undefined, encoding?: Encoding | undefined, context?: Context$1 | undefined);
  toString(): string;
}
/**
 * AST node for user-defined opaque types with custom parsing logic.
 *
 * **When to use**
 *
 * Use when none of the built-in AST nodes fit. The `run` function receives
 * `typeParameters` and returns a parser that validates/transforms raw input.
 *
 * **Details**
 *
 * - `typeParameters` — inner schemas this declaration is parameterized over
 *   (e.g. the element type for a custom collection).
 * - `run` — factory producing the actual parse function.
 *
 * @see {@link isDeclaration}
 * @category models
 * @since 3.10.0
 */
declare class Declaration extends Base {
  readonly _tag = "Declaration";
  readonly typeParameters: ReadonlyArray<AST>;
  readonly run: (typeParameters: ReadonlyArray<AST>) => (input: unknown, self: Declaration, options: ParseOptions) => Effect<any, Issue, any>;
  constructor(typeParameters: ReadonlyArray<AST>, run: (typeParameters: ReadonlyArray<AST>) => (input: unknown, self: Declaration, options: ParseOptions) => Effect<any, Issue, any>, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * AST node matching the `null` literal value.
 *
 * **Details**
 *
 * Parsing succeeds only when the input is exactly `null`.
 *
 * @see {@link null}
 * @see {@link isNull}
 * @category models
 * @since 4.0.0
 */
declare class Null extends Base {
  readonly _tag = "Null";
}
/**
 * AST node matching the `undefined` value.
 *
 * **Details**
 *
 * Parsing succeeds only when the input is exactly `undefined`.
 *
 * @see {@link undefined}
 * @see {@link isUndefined}
 * @category models
 * @since 4.0.0
 */
declare class Undefined extends Base {
  readonly _tag = "Undefined";
}
/**
 * AST node matching the `void` type (accepts `undefined` at runtime).
 *
 * **Details**
 *
 * Behaves like {@link Undefined} for parsing but represents the TypeScript
 * `void` type semantically.
 *
 * @see {@link void}
 * @see {@link isVoid}
 * @category models
 * @since 4.0.0
 */
declare class Void extends Base {
  readonly _tag = "Void";
}
/**
 * AST node representing the `never` type — no value matches.
 *
 * **Details**
 *
 * Parsing always fails. Useful as a placeholder in unions or as the result
 * of narrowing that eliminates all options.
 *
 * @see {@link never}
 * @see {@link isNever}
 * @category models
 * @since 4.0.0
 */
declare class Never extends Base {
  readonly _tag = "Never";
}
/**
 * AST node representing the `any` type — every value matches.
 *
 * @see {@link any}
 * @see {@link isAny}
 *
 * @category models
 * @since 4.0.0
 */
declare class Any extends Base {
  readonly _tag = "Any";
}
/**
 * AST node representing the `unknown` type — every value matches.
 *
 * **Details**
 *
 * Unlike {@link Any}, this is type-safe: the parsed result is typed as
 * `unknown` rather than `any`.
 *
 * @see {@link unknown}
 * @see {@link isUnknown}
 * @category models
 * @since 4.0.0
 */
declare class Unknown$1 extends Base {
  readonly _tag = "Unknown";
}
/**
 * AST node matching the TypeScript `object` type — accepts objects, arrays,
 * and functions (anything non-primitive and non-null).
 *
 * @see {@link objectKeyword}
 * @see {@link isObjectKeyword}
 *
 * @category models
 * @since 3.10.0
 */
declare class ObjectKeyword extends Base {
  readonly _tag = "ObjectKeyword";
}
/**
 * AST node representing a TypeScript `enum`.
 *
 * **Details**
 *
 * Holds `enums` as an array of `[name, value]` pairs where values are
 * `string | number`. Parsing succeeds when the input matches any enum value.
 *
 * @see {@link isEnum}
 * @category models
 * @since 4.0.0
 */
declare class Enum extends Base {
  readonly _tag = "Enum";
  readonly enums: ReadonlyArray<readonly [string, string | number]>;
  constructor(enums: ReadonlyArray<readonly [string, string | number]>, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * AST node representing a TypeScript template literal type
 * (e.g. `` `user_${string}` ``).
 *
 * **Details**
 *
 * `parts` is an array of AST nodes; each part contributes to the
 * template literal pattern. A regex is derived from the parts to validate
 * strings at runtime.
 *
 * @see {@link isTemplateLiteral}
 * @category models
 * @since 3.10.0
 */
declare class TemplateLiteral$1 extends Base {
  readonly _tag = "TemplateLiteral";
  readonly parts: ReadonlyArray<AST>;
  constructor(parts: ReadonlyArray<AST>, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * AST node matching a specific `unique symbol` value.
 *
 * **Details**
 *
 * Parsing succeeds only when the input is reference-equal to the stored
 * `symbol`.
 *
 * @see {@link isUniqueSymbol}
 * @category models
 * @since 3.10.0
 */
declare class UniqueSymbol extends Base {
  readonly _tag = "UniqueSymbol";
  readonly symbol: symbol;
  constructor(symbol: symbol, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * The set of primitive types that can appear as a {@link Literal} value.
 *
 * @see {@link Literal}
 *
 * @category models
 * @since 3.10.0
 */
type LiteralValue = string | number | boolean | bigint;
/**
 * AST node matching an exact primitive value (string, number, boolean, or
 * bigint).
 *
 * **Details**
 *
 * Parsing succeeds only when the input is strictly equal (`===`) to the
 * stored `literal`. Numeric literals must be finite — `Infinity`, `-Infinity`,
 * and `NaN` are rejected at construction time.
 *
 * **Example** (Creating a literal AST)
 *
 * ```ts
 * import { SchemaAST } from "effect"
 *
 * const ast = new SchemaAST.Literal("active")
 * console.log(ast.literal) // "active"
 * ```
 *
 * @see {@link LiteralValue}
 * @see {@link isLiteral}
 * @category models
 * @since 3.10.0
 */
declare class Literal$2 extends Base {
  readonly _tag = "Literal";
  readonly literal: LiteralValue;
  constructor(literal: LiteralValue, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * AST node matching any `string` value.
 *
 * @see {@link string}
 * @see {@link isString}
 *
 * @category models
 * @since 4.0.0
 */
declare class String$1 extends Base {
  readonly _tag = "String";
}
/**
 * AST node matching any `number` value (including `NaN`, `Infinity`,
 * `-Infinity`).
 *
 * **Details**
 *
 * Default JSON serialization:
 *
 * - Finite numbers are serialized as JSON numbers.
 * - `Infinity`, `-Infinity`, and `NaN` are serialized as JSON strings.
 *
 * If the node has an `isFinite` or `isInt` check, the string fallback is
 * skipped since non-finite values cannot occur.
 *
 * @see {@link number}
 * @see {@link isNumber}
 * @category models
 * @since 4.0.0
 */
declare class Number$1 extends Base {
  readonly _tag = "Number";
}
/**
 * AST node matching any `boolean` value (`true` or `false`).
 *
 * @see {@link boolean}
 * @see {@link isBoolean}
 *
 * @category models
 * @since 4.0.0
 */
declare class Boolean extends Base {
  readonly _tag = "Boolean";
}
/**
 * AST node matching any `symbol` value.
 *
 * **Details**
 *
 * When serialized to a string-based codec, symbols are converted via
 * `Symbol.keyFor` and must be registered with `Symbol.for`.
 *
 * @see {@link symbol}
 * @see {@link isSymbol}
 * @category models
 * @since 4.0.0
 */
declare class Symbol$2 extends Base {
  readonly _tag = "Symbol";
}
/**
 * AST node matching any `bigint` value.
 *
 * **Details**
 *
 * When serialized to a string-based codec, bigints are converted to/from
 * their decimal string representation.
 *
 * @see {@link bigInt}
 * @see {@link isBigInt}
 * @category models
 * @since 4.0.0
 */
declare class BigInt extends Base {
  readonly _tag = "BigInt";
}
/**
 * AST node for array-like types — both tuples and arrays.
 *
 * **Details**
 *
 * - `elements` — positional element types (tuple elements). An element is
 *   optional if its {@link Context.isOptional} is `true`.
 * - `rest` — the rest/variadic element types. When non-empty, the first
 *   entry is the "spread" type (e.g. `...Array<string>`), and subsequent
 *   entries are trailing positional elements after the spread.
 * - `isMutable` — whether the resulting array is `readonly` (`false`) or
 *   mutable (`true`).
 *
 * **Gotchas**
 *
 * Construction enforces TypeScript ordering rules: a required element
 * cannot follow an optional one, and an optional element cannot follow a
 * rest element.
 *
 * **Example** (Inspecting a tuple AST)
 *
 * ```ts
 * import { Schema, SchemaAST } from "effect"
 *
 * const schema = Schema.Tuple([Schema.String, Schema.Number])
 * const ast = schema.ast
 *
 * if (SchemaAST.isArrays(ast)) {
 *   console.log(ast.elements.length) // 2
 *   console.log(ast.rest.length)     // 0
 * }
 * ```
 *
 * @see {@link isArrays}
 * @see {@link Objects}
 * @category models
 * @since 4.0.0
 */
declare class Arrays extends Base {
  readonly _tag = "Arrays";
  readonly isMutable: boolean;
  readonly elements: ReadonlyArray<AST>;
  readonly rest: ReadonlyArray<AST>;
  constructor(isMutable: boolean, elements: ReadonlyArray<AST>, rest: ReadonlyArray<AST>, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * A named property within an {@link Objects} node.
 *
 * **Details**
 *
 * Pairs a `name` (any `PropertyKey`) with a `type` ({@link AST}). The
 * property's optionality and mutability are determined by the `type`'s
 * {@link Context}.
 *
 * @see {@link Objects}
 * @category models
 * @since 3.10.0
 */
declare class PropertySignature {
  readonly name: PropertyKey;
  readonly type: AST;
  constructor(name: PropertyKey, type: AST);
}
/**
 * Bidirectional merge strategy for index signature key-value pairs.
 *
 * **Details**
 *
 * Used by {@link IndexSignature} when the same key appears multiple times
 * (e.g. from `Schema.extend` or overlapping records). Provides separate
 * `decode` and `encode` combiners that determine how duplicate entries are
 * merged.
 *
 * @see {@link IndexSignature}
 * @category models
 * @since 4.0.0
 */
declare class KeyValueCombiner {
  readonly decode: Combiner<readonly [key: PropertyKey, value: any]> | undefined;
  readonly encode: Combiner<readonly [key: PropertyKey, value: any]> | undefined;
  constructor(decode: Combiner<readonly [key: PropertyKey, value: any]> | undefined, encode: Combiner<readonly [key: PropertyKey, value: any]> | undefined);
}
/**
 * An index signature entry within an {@link Objects} node.
 *
 * **Details**
 *
 * - `parameter` — the key type AST (e.g. {@link String} for `string` keys,
 *   {@link TemplateLiteral} for patterned keys).
 * - `type` — the value type AST.
 * - `merge` — optional {@link KeyValueCombiner} for handling duplicate keys.
 *
 * **Gotchas**
 *
 * Using `Schema.optionalKey` on the value type is not allowed for index
 * signatures (throws at construction); use `Schema.optional` instead.
 *
 * @see {@link Objects}
 * @see {@link PropertySignature}
 * @category models
 * @since 3.10.0
 */
declare class IndexSignature {
  readonly parameter: AST;
  readonly type: AST;
  readonly merge: KeyValueCombiner | undefined;
  constructor(parameter: AST, type: AST, merge: KeyValueCombiner | undefined);
}
/**
 * AST node for object-like schemas, including structs and records.
 *
 * **Details**
 *
 * - `propertySignatures` — named properties with their types (struct fields).
 * - `indexSignatures` — index signature entries (record patterns), each with
 *   a `parameter` AST for matching keys and a `type` AST for values.
 *
 * An `Objects` node with no properties and no index signatures performs only a
 * non-nullish check: it accepts any value except `null` and `undefined`,
 * including primitive values.
 *
 * **Gotchas**
 *
 * Duplicate property names throw at construction time.
 *
 * **Example** (Inspecting a struct AST)
 *
 * ```ts
 * import { Schema, SchemaAST } from "effect"
 *
 * const schema = Schema.Struct({ name: Schema.String })
 * const ast = schema.ast
 *
 * if (SchemaAST.isObjects(ast)) {
 *   for (const ps of ast.propertySignatures) {
 *     console.log(ps.name, ps.type._tag)
 *   }
 *   // "name" "String"
 * }
 * ```
 *
 * @see {@link isObjects}
 * @see {@link PropertySignature}
 * @see {@link IndexSignature}
 * @see {@link Arrays}
 * @category models
 * @since 4.0.0
 */
declare class Objects$1 extends Base {
  readonly _tag = "Objects";
  readonly propertySignatures: ReadonlyArray<PropertySignature>;
  readonly indexSignatures: ReadonlyArray<IndexSignature>;
  constructor(propertySignatures: ReadonlyArray<PropertySignature>, indexSignatures: ReadonlyArray<IndexSignature>, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
  private rebuild;
}
/**
 * AST node representing a union of schemas.
 *
 * **Details**
 *
 * - `types` — the member AST nodes.
 * - `mode` — `"anyOf"` succeeds on the first match (like TypeScript unions);
 *   `"oneOf"` requires exactly one member to match (fails if multiple do).
 *
 * During parsing, members are tried in order. An internal candidate index
 * narrows which members to try based on the runtime type of the input and
 * discriminant ("sentinel") fields, making large unions efficient.
 *
 * **Example** (Inspecting a union AST)
 *
 * ```ts
 * import { Schema, SchemaAST } from "effect"
 *
 * const schema = Schema.Union([Schema.String, Schema.Number])
 * const ast = schema.ast
 *
 * if (SchemaAST.isUnion(ast)) {
 *   console.log(ast.types.length) // 2
 *   console.log(ast.mode)         // "anyOf"
 * }
 * ```
 *
 * @see {@link isUnion}
 * @category models
 * @since 3.10.0
 */
declare class Union$1<A extends AST = AST> extends Base {
  readonly _tag = "Union";
  readonly types: ReadonlyArray<A>;
  readonly mode: "anyOf" | "oneOf";
  constructor(types: ReadonlyArray<A>, mode: "anyOf" | "oneOf", annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * AST node for lazy/recursive schemas.
 *
 * **Details**
 *
 * Wraps a thunk (`() => AST`) that is memoized on first call. Use this to
 * define recursive or mutually recursive schemas without infinite loops at
 * construction time.
 *
 * **Example** (Recursive schema AST)
 *
 * ```ts
 * import { Schema, SchemaAST } from "effect"
 *
 * interface Category {
 *   readonly name: string
 *   readonly children: ReadonlyArray<Category>
 * }
 *
 * const Category = Schema.Struct({
 *   name: Schema.String,
 *   children: Schema.Array(Schema.suspend((): Schema.Codec<Category> => Category))
 * })
 *
 * // The recursive branch is a Suspend node
 * ```
 *
 * @see {@link isSuspend}
 * @category models
 * @since 3.10.0
 */
declare class Suspend extends Base {
  readonly _tag = "Suspend";
  readonly thunk: () => AST;
  constructor(thunk: () => AST, annotations?: Annotations.Annotations, checks?: Checks, encoding?: Encoding, context?: Context$1);
}
/**
 * A single validation check attached to an AST node.
 *
 * **Details**
 *
 * - `run` — the validation function. Returns `undefined` on success, or an
 *   `Issue` on failure.
 * - `annotations` — optional filter-level metadata (expected message, meta
 *   tags, arbitrary constraint hints).
 * - `aborted` — when `true`, parsing stops immediately after this filter
 *   fails (no further checks run).
 *
 * Use `.annotate()` to add metadata and `.abort()` to mark as aborting.
 * Combine with another check via `.and()` to form a {@link FilterGroup}.
 *
 * @see {@link FilterGroup}
 * @see {@link Check}
 * @see {@link isPattern}
 * @category models
 * @since 4.0.0
 */
declare class Filter<in E> extends Class$1 {
  readonly _tag = "Filter";
  readonly run: (input: E, self: AST, options: ParseOptions) => Issue | undefined;
  readonly annotations: Annotations.Filter | undefined;
  /**
   * Whether the parsing process should be aborted after this check has failed.
   */
  readonly aborted: boolean;
  constructor(run: (input: E, self: AST, options: ParseOptions) => Issue | undefined, annotations?: Annotations.Filter | undefined,
  /**
   * Whether the parsing process should be aborted after this check has failed.
   */

  aborted?: boolean);
  annotate(annotations: Annotations.Filter): Filter<E>;
  abort(): Filter<E>;
  and(other: Check<E>, annotations?: Annotations.Filter): FilterGroup<E>;
}
/**
 * A composite validation check grouping multiple {@link Check} values.
 *
 * **Details**
 *
 * Created by calling `.and()` on a {@link Filter} or another `FilterGroup`.
 * All inner checks are run; failures from aborted filters still stop
 * evaluation.
 *
 * @see {@link Filter}
 * @see {@link Check}
 * @category models
 * @since 4.0.0
 */
declare class FilterGroup<in E> extends Class$1 {
  readonly _tag = "FilterGroup";
  readonly checks: readonly [Check<E>, ...Array<Check<E>>];
  readonly annotations: Annotations.Filter | undefined;
  constructor(checks: readonly [Check<E>, ...Array<Check<E>>], annotations?: Annotations.Filter | undefined);
  annotate(annotations: Annotations.Filter): FilterGroup<E>;
  and(other: Check<E>, annotations?: Annotations.Filter): FilterGroup<E>;
}
/**
 * A validation check — either a single {@link Filter} or a composite
 * {@link FilterGroup}.
 *
 * **Details**
 *
 * Stored in the {@link Checks} array on {@link Base.checks}.
 *
 * @see {@link Filter}
 * @see {@link FilterGroup}
 * @category models
 * @since 4.0.0
 */
type Check<T> = Filter<T> | FilterGroup<T>;
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Cause.d.ts
/**
 * Base interface for error classes that can be yielded directly inside
 * `Effect.gen`. Yielding one of these errors fails the generator with that
 * error as the typed failure value.
 *
 * **Details**
 *
 * All built-in error classes in this module ({@link NoSuchElementError},
 * {@link TimeoutError}, {@link IllegalArgumentError},
 * {@link ExceededCapacityError}, {@link AsyncFiberError}, and
 * {@link UnknownError}) implement this interface.
 *
 * **Example** (yielding an error in Effect.gen)
 *
 * ```ts
 * import { Cause, Effect } from "effect"
 *
 * const error = new Cause.NoSuchElementError("not found")
 *
 * const program = Effect.gen(function*() {
 *   return yield* error // fails the effect with NoSuchElementError
 * })
 * ```
 *
 * @category errors
 * @since 2.0.0
 */
interface YieldableError extends Error, Pipeable, Inspectable {
  readonly [TypeId$2]: Variance<never, this, never>;
  [Symbol.iterator](): EffectIterator<Effect<never, this, never>>;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Effect.d.ts
/**
 * Type-level identifier for `Effect` values.
 *
 * @category Type identifiers
 * @since 4.0.0
 */
type TypeId$2 = "~effect/Effect";
/**
 * Runtime identifier used to recognize `Effect` values.
 *
 * @category Type identifiers
 * @since 4.0.0
 */
declare const TypeId$2: TypeId$2;
/**
 * The `Effect` interface defines a value that lazily describes a workflow or
 * job. The workflow requires some context `R`, and may fail with an error of
 * type `E`, or succeed with a value of type `A`.
 *
 * **Details**
 *
 * `Effect` values model resourceful interaction with the outside world,
 * including synchronous, asynchronous, concurrent, and parallel interaction.
 * They use a fiber-based concurrency model, with built-in support for
 * scheduling, fine-grained interruption, structured concurrency, and high
 * scalability.
 *
 * To run an `Effect` value, you need a `Runtime`, which is a type that is
 * capable of executing `Effect` values.
 *
 * @category models
 * @since 2.0.0
 */
interface Effect<out A, out E = never, out R = never> extends Pipeable, Inspectable {
  readonly [TypeId$2]: Variance<A, E, R>;
  [Symbol.iterator](): EffectIterator<Effect<A, E, R>>;
  [typeSymbol]?: unknown;
  [unifySymbol]?: EffectUnify<this>;
  [ignoreSymbol]?: {};
}
/**
 * Type-level unification support for `Effect` values.
 *
 * @category models
 * @since 2.0.0
 */
interface EffectUnify<A extends {
  [typeSymbol]?: any;
}> {
  Effect?: () => A[typeSymbol] extends Effect<infer A0, infer E0, infer R0> | infer _ ? Effect<A0, E0, R0> : never;
}
/**
 * Variance interface for Effect, encoding the type parameters' variance.
 *
 * @category models
 * @since 2.0.0
 */
interface Variance<A, E, R> {
  _A: Covariant<A>;
  _E: Covariant<E>;
  _R: Covariant<R>;
}
/**
 * Extracts the success type from an `Effect`.
 *
 * @category models
 * @since 2.0.0
 */
type Success<T> = T extends Effect<infer _A, infer _E, infer _R> ? _A : never;
/**
 * Iterator interface for Effect generators, enabling Effect values to work with generator functions.
 *
 * @category models
 * @since 4.0.0
 */
interface EffectIterator<T extends Effect<any, any, any>> {
  next(...args: ReadonlyArray<any>): IteratorResult<T, Success<T>>;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Option.d.ts
declare const TypeId$1 = "~effect/data/Option";
/**
 * The `Option` data type represents optional values. An `Option<A>` is either
 * `Some<A>`, containing a value of type `A`, or `None`, representing absence.
 *
 * **When to use**
 *
 * - Representing initial values that may not yet exist
 * - Returning from partial functions (not defined for all inputs)
 * - Managing optional fields in data structures
 *
 * @see {@link some} for creating a `Some`
 * @see {@link none} for creating a `None`
 * @see {@link match} for pattern matching
 *
 * @category models
 * @since 2.0.0
 */
type Option<A> = None<A> | Some<A>;
/**
 * Represents the absence of a value within an {@link Option}.
 *
 * **When to use**
 *
 * - Use as a type guard target when narrowing via {@link isNone}
 *
 * **Details**
 *
 * - `_tag` is always `"None"`
 * - Implements `Pipeable`, `Inspectable`, and structural equality
 *
 * @see {@link isNone} to check if an `Option` is `None`
 * @see {@link none} to construct a `None`
 *
 * @category models
 * @since 2.0.0
 */
interface None<out A> extends Pipeable, Inspectable {
  readonly _tag: "None";
  readonly _op: "None";
  readonly valueOrUndefined: undefined;
  readonly [TypeId$1]: {
    readonly _A: Covariant<A>;
  };
  [Symbol.iterator](): OptionIterator<Option<A>>;
  [typeSymbol]?: unknown;
  [unifySymbol]?: OptionUnify<this>;
  [ignoreSymbol]?: OptionUnifyIgnore;
}
/**
 * Iterator protocol used to yield an `Option` inside {@link gen}, returning the
 * contained value type back to the generator.
 *
 * @category Generators
 * @since 4.0.0
 */
interface OptionIterator<T extends Option<any>> {
  next(...args: ReadonlyArray<any>): IteratorResult<T, Option.Value<T>>;
}
/**
 * Represents the presence of a value within an {@link Option}.
 *
 * **When to use**
 *
 * - Use as a type guard target when narrowing via {@link isSome}
 * - Access the inner value via `.value`
 *
 * **Details**
 *
 * - `_tag` is always `"Some"`
 * - `.value` holds the contained value of type `A`
 * - Implements `Pipeable`, `Inspectable`, and structural equality
 *
 * @see {@link isSome} to check if an `Option` is `Some`
 * @see {@link some} to construct a `Some`
 *
 * @category models
 * @since 2.0.0
 */
interface Some<out A> extends Pipeable, Inspectable {
  readonly _tag: "Some";
  readonly _op: "Some";
  readonly value: A;
  readonly valueOrUndefined: A;
  readonly [TypeId$1]: {
    readonly _A: Covariant<A>;
  };
  [Symbol.iterator](): OptionIterator<Option<A>>;
  [typeSymbol]?: unknown;
  [unifySymbol]?: OptionUnify<this>;
  [ignoreSymbol]?: OptionUnifyIgnore;
}
/**
 * Type-level unification support for `Option` values.
 *
 * **Details**
 *
 * This is used by Effect's `Unify` machinery to preserve the contained value
 * type when generic code returns or combines `Option` values. Users normally
 * do not need to reference this interface directly.
 *
 * @category models
 * @since 2.0.0
 */
interface OptionUnify<A extends {
  [typeSymbol]?: any;
}> {
  Option?: () => A[typeSymbol] extends Option<infer A0> | infer _ ? Option<A0> : never;
}
/**
 * Namespace containing utility types for `Option`.
 *
 * @since 2.0.0
 */
declare namespace Option {
  /**
   * Extracts the type of the value contained in an `Option`.
   *
   * **Example** (Extracting the value type)
   *
   * ```ts
   * import type { Option } from "effect"
   *
   * declare const myOption: Option.Option<string>
   *
   * //      ┌─── string
   * //      ▼
   * type MyType = Option.Option.Value<typeof myOption>
   * ```
   *
   * @category Type-level Utils
   * @since 2.0.0
   */
  type Value<T extends Option<any>> = [T] extends [Option<infer _A>] ? _A : never;
}
/**
 * Marker interface used by Effect's `Unify` machinery for `Option` values.
 *
 * **Details**
 *
 * This supports type-level unification behavior for `Option`. Users normally
 * do not need to reference this interface directly.
 *
 * @category models
 * @since 2.0.0
 */
interface OptionUnifyIgnore {}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/internal/schema/schema.d.ts
declare class SchemaError {
  readonly [SchemaErrorTypeId] = "~effect/Schema/SchemaError";
  readonly _tag = "SchemaError";
  readonly name: string;
  readonly issue: Issue;
  constructor(issue: Issue);
  get message(): string;
  toString(): string;
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Struct.d.ts
/**
 * Flattens intersection types into a single object type for readability.
 *
 * **When to use**
 *
 * Use when hovering over a type shows `A & B & C` instead of the merged shape.
 *
 * **Details**
 *
 * This helper is purely cosmetic at the type level and has no runtime effect.
 * It preserves `readonly` modifiers; use {@link Mutable} to strip them.
 *
 * **Example** (Flattening an intersection)
 *
 * ```ts
 * import type { Struct } from "effect"
 *
 * type Original = { a: string } & { b: number }
 *
 * // Without Simplify, the type displays as `{ a: string } & { b: number }`
 * type Simplified = Struct.Simplify<Original>
 * // { a: string; b: number }
 * ```
 *
 * @see {@link Mutable} – also flattens but removes `readonly`
 * @see {@link Assign} – merges two types with right-side precedence
 * @category Type-Level Programming
 * @since 4.0.0
 */
type Simplify<T> = { [K in keyof T]: T[K] } & {};
/**
 * Merges two object types with properties from `U` taking precedence over `T`
 * on overlapping keys (like `Object.assign` at the type level).
 *
 * **When to use**
 *
 * Use when you need the type-level equivalent of `{ ...T, ...U }`.
 *
 * **Details**
 *
 * When no keys overlap, this returns a simple intersection for efficiency.
 * When keys overlap, the type from `U` wins.
 *
 * **Example** (Merging two types with overlapping keys)
 *
 * ```ts
 * import type { Struct } from "effect"
 *
 * type A = { a: string; b: number }
 * type B = { b: boolean; c: string }
 * type Merged = Struct.Assign<A, B>
 * // { a: string; b: boolean; c: string }
 * ```
 *
 * @see {@link assign} – the runtime equivalent
 * @see {@link Simplify} – flatten the resulting intersection
 * @category Type-Level Programming
 * @since 4.0.0
 */
type Assign<T, U> = Simplify<keyof T & keyof U extends never ? T & U : Omit<T, keyof T & keyof U> & U>;
//#endregion
//#region ../../node_modules/.pnpm/pure-rand@8.4.0/node_modules/pure-rand/lib/RandomGenerator-CKZRB3Fu.d.ts
//#region src/types/RandomGenerator.d.ts
interface RandomGenerator$1 {
  /** Produce a fully independent clone of the current instance */
  clone(): RandomGenerator$1;
  /**
  * Generate next value BUT alters current generator.
  * Values uniform in range -0x8000_0000 (included) to 0x7fff_ffff (included)
  */
  next(): number;
  /** Access to the internal state of a RandomGenerator in a read-only fashion */
  getState(): readonly number[];
} //#endregion
//#endregion
//#region ../../node_modules/.pnpm/pure-rand@8.4.0/node_modules/pure-rand/lib/types/JumpableRandomGenerator.d.ts
//#region src/types/JumpableRandomGenerator.d.ts
interface JumpableRandomGenerator extends RandomGenerator$1 {
  /** Produce a fully independent clone of the current instance */
  clone(): JumpableRandomGenerator;
  /**
  * Jump current generator
  *
  * Move the generator forward by an extremely large number of steps in its sequence.
  * This is typically a number so large that it would be infeasible to reach by repeated `next()` calls.
  */
  jump(): void;
} //#endregion
//#endregion
//#region ../../node_modules/.pnpm/fast-check@4.8.0/node_modules/fast-check/lib/cjs/fast-check.d.ts
//#region src/check/precondition/Pre.d.ts
/**
* Add pre-condition checks inside a property execution
* @param expectTruthy - cancel the run whenever this value is falsy
* @remarks Since 1.3.0
* @public
*/
declare function pre(expectTruthy: boolean): asserts expectTruthy; //#endregion
//#region src/random/generator/RandomGenerator.d.ts
interface RandomGenerator7x {
  clone(): RandomGenerator7x;
  next(): [number, RandomGenerator7x];
  jump?(): RandomGenerator7x;
  unsafeNext(): number;
  unsafeJump?(): void;
  getState(): readonly number[];
}
/**
* Merged type supporting both pure-rand v7 and v8 random generators.
* Keeping compatibility with v7 avoids a breaking API change and a new major version.
* @remarks Since 4.6.0
* @public
*/
type RandomGenerator = RandomGenerator7x | RandomGenerator$1 | JumpableRandomGenerator; //#endregion
//#region src/random/generator/Random.d.ts
/**
* Wrapper around an instance of a `pure-rand`'s random number generator
* offering a simpler interface to deal with random with impure patterns
*
* @public
*/
declare class Random {
  /**
  * Create a mutable random number generator by cloning the passed one and mutate it
  * @param sourceRng - Immutable random generator from pure-rand library, will not be altered (a clone will be)
  */
  constructor(sourceRng: RandomGenerator);
  /**
  * Clone the random number generator
  */
  clone(): Random;
  /**
  * Generate an integer having `bits` random bits
  * @param bits - Number of bits to generate
  * @deprecated Prefer {@link nextInt} with explicit bounds: `nextInt(0, (1 << bits) - 1)`
  */
  next(bits: number): number;
  /**
  * Generate a random boolean
  */
  nextBoolean(): boolean;
  /**
  * Generate a random integer (32 bits)
  * @deprecated Prefer {@link nextInt} with explicit bounds: `nextInt(-2147483648, 2147483647)`
  */
  nextInt(): number;
  /**
  * Generate a random integer between min (included) and max (included)
  * @param min - Minimal integer value
  * @param max - Maximal integer value
  */
  nextInt(min: number, max: number): number;
  /**
  * Generate a random bigint between min (included) and max (included)
  * @param min - Minimal bigint value
  * @param max - Maximal bigint value
  */
  nextBigInt(min: bigint, max: bigint): bigint;
  /**
  * Generate a random floating point number between 0.0 (included) and 1.0 (excluded)
  */
  nextDouble(): number;
  /**
  * Extract the internal state of the internal RandomGenerator backing the current instance of Random
  */
  getState(): readonly number[] | undefined;
} //#endregion
//#region src/stream/Stream.d.ts
/**
* Wrapper around `IterableIterator` interface
* offering a set of helpers to deal with iterations in a simple way
*
* @remarks Since 0.0.7
* @public
*/
declare class Stream<T> implements IterableIterator<T> {
  /** @internal */
  private readonly g;
  /**
  * Create an empty stream of T
  * @remarks Since 0.0.1
  */
  static nil<T>(): Stream<T>;
  /**
  * Create a stream of T from a variable number of elements
  *
  * @param elements - Elements used to create the Stream
  * @remarks Since 2.12.0
  */
  static of<T>(...elements: T[]): Stream<T>;
  /**
  * Create a Stream based on `g`
  * @param g - Underlying data of the Stream
  */
  constructor(g: IterableIterator<T>);
  next(): IteratorResult<T>;
  [Symbol.iterator](): IterableIterator<T>;
  /**
  * Map all elements of the Stream using `f`
  *
  * WARNING: It closes the current stream
  *
  * @param f - Mapper function
  * @remarks Since 0.0.1
  */
  map<U>(f: (v: T) => U): Stream<U>;
  /**
  * Flat map all elements of the Stream using `f`
  *
  * WARNING: It closes the current stream
  *
  * @param f - Mapper function
  * @remarks Since 0.0.1
  */
  flatMap<U>(f: (v: T) => IterableIterator<U>): Stream<U>;
  /**
  * Drop elements from the Stream while `f(element) === true`
  *
  * WARNING: It closes the current stream
  *
  * @param f - Drop condition
  * @remarks Since 0.0.1
  */
  dropWhile(f: (v: T) => boolean): Stream<T>;
  /**
  * Drop `n` first elements of the Stream
  *
  * WARNING: It closes the current stream
  *
  * @param n - Number of elements to drop
  * @remarks Since 0.0.1
  */
  drop(n: number): Stream<T>;
  /**
  * Take elements from the Stream while `f(element) === true`
  *
  * WARNING: It closes the current stream
  *
  * @param f - Take condition
  * @remarks Since 0.0.1
  */
  takeWhile(f: (v: T) => boolean): Stream<T>;
  /**
  * Take `n` first elements of the Stream
  *
  * WARNING: It closes the current stream
  *
  * @param n - Number of elements to take
  * @remarks Since 0.0.1
  */
  take(n: number): Stream<T>;
  /**
  * Filter elements of the Stream
  *
  * WARNING: It closes the current stream
  *
  * @param f - Elements to keep
  * @remarks Since 1.23.0
  */
  filter<U extends T>(f: (v: T) => v is U): Stream<U>;
  /**
  * Filter elements of the Stream
  *
  * WARNING: It closes the current stream
  *
  * @param f - Elements to keep
  * @remarks Since 0.0.1
  */
  filter(f: (v: T) => boolean): Stream<T>;
  /**
  * Check whether all elements of the Stream are successful for `f`
  *
  * WARNING: It closes the current stream
  *
  * @param f - Condition to check
  * @remarks Since 0.0.1
  */
  every(f: (v: T) => boolean): boolean;
  /**
  * Check whether one of the elements of the Stream is successful for `f`
  *
  * WARNING: It closes the current stream
  *
  * @param f - Condition to check
  * @remarks Since 0.0.1
  */
  has(f: (v: T) => boolean): [boolean, T | null];
  /**
  * Join `others` Stream to the current Stream
  *
  * WARNING: It closes the current stream and the other ones (as soon as it iterates over them)
  *
  * @param others - Streams to join to the current Stream
  * @remarks Since 0.0.1
  */
  join(...others: IterableIterator<T>[]): Stream<T>;
  /**
  * Take the `nth` element of the Stream of the last (if it does not exist)
  *
  * WARNING: It closes the current stream
  *
  * @param nth - Position of the element to extract
  * @remarks Since 0.0.12
  */
  getNthOrLast(nth: number): T | null;
}
/**
* Create a Stream based on `g`
*
* @param g - Underlying data of the Stream
*
* @remarks Since 0.0.7
* @public
*/
declare function stream<T>(g: IterableIterator<T>): Stream<T>; //#endregion
//#region src/check/arbitrary/definition/Value.d.ts
/**
* A `Value<T, TShrink = T>` holds an internal value of type `T`
* and its associated context
*
* @remarks Since 3.0.0 (previously called `NextValue` in 2.15.0)
* @public
*/
declare class Value<T> {
  /**
  * State storing the result of hasCloneMethod
  * If `true` the value will be cloned each time it gets accessed
  * @remarks Since 2.15.0
  */
  readonly hasToBeCloned: boolean;
  /**
  * Safe value of the shrinkable
  * Depending on `hasToBeCloned` it will either be `value_` or a clone of it
  * @remarks Since 2.15.0
  */
  readonly value: T;
  /**
  * Internal value of the shrinkable
  * @remarks Since 2.15.0
  */
  readonly value_: T;
  /**
  * Context for the generated value
  * TODO - Do we want to clone it too?
  * @remarks 2.15.0
  */
  readonly context: unknown;
  /**
  * @param value_ - Internal value of the shrinkable
  * @param context - Context associated to the generated value (useful for shrink)
  * @param customGetValue - Limited to internal usages (to ease migration to next), it will be removed on next major
  */
  constructor(value_: T, context: unknown, customGetValue?: () => T);
} //#endregion
//#region src/check/arbitrary/definition/Arbitrary.d.ts
/**
* Abstract class able to generate values on type `T`
*
* The values generated by an instance of Arbitrary can be previewed - with {@link sample} - or classified - with {@link statistics}.
*
* @remarks Since 0.0.7
* @public
*/
declare abstract class Arbitrary<T> {
  /**
  * Generate a value of type `T` along with its context (if any)
  * based on the provided random number generator
  *
  * @param mrng - Random number generator
  * @param biasFactor - If taken into account 1 value over biasFactor must be biased. Either integer value greater or equal to 2 (bias) or undefined (no bias)
  * @returns Random value of type `T` and its context
  *
  * @remarks Since 0.0.1 (return type changed in 3.0.0)
  */
  abstract generate(mrng: Random, biasFactor: number | undefined): Value<T>;
  /**
  * Check if a given value could be pass to `shrink` without providing any context.
  *
  * In general, `canShrinkWithoutContext` is not designed to be called for each `shrink` but rather on very special cases.
  * Its usage must be restricted to `canShrinkWithoutContext` or in the rare* contexts of a `shrink` method being called without
  * any context. In this ill-formed case of `shrink`, `canShrinkWithoutContext` could be used or called if needed.
  *
  * *we fall in that case when fast-check is asked to shrink a value that has been provided manually by the user,
  *  in other words: a value not coming from a call to `generate` or a normal `shrink` with context.
  *
  * @param value - Value to be assessed
  * @returns `true` if and only if the value could have been generated by this instance
  *
  * @remarks Since 3.0.0
  */
  abstract canShrinkWithoutContext(value: unknown): value is T;
  /**
  * Shrink a value of type `T`, may rely on the context previously provided to shrink efficiently
  *
  * Must never be called with possibly invalid values and no context without ensuring that such call is legal
  * by calling `canShrinkWithoutContext` first on the value.
  *
  * @param value - The value to shrink
  * @param context - Its associated context (the one returned by generate) or `undefined` if no context but `canShrinkWithoutContext(value) === true`
  * @returns Stream of shrinks for value based on context (if provided)
  *
  * @remarks Since 3.0.0
  */
  abstract shrink(value: T, context: unknown | undefined): Stream<Value<T>>;
  /**
  * Create another arbitrary by filtering values against `predicate`
  *
  * All the values produced by the resulting arbitrary
  * satisfy `predicate(value) == true`
  *
  * Be aware that using filter may highly impact the time required to generate a valid entry
  *
  * @example
  * ```typescript
  * const integerGenerator: Arbitrary<number> = ...;
  * const evenIntegerGenerator: Arbitrary<number> = integerGenerator.filter(e => e % 2 === 0);
  * // new Arbitrary only keeps even values
  * ```
  *
  * @param refinement - Predicate, to test each produced element. Return true to keep the element, false otherwise
  * @returns New arbitrary filtered using predicate
  *
  * @remarks Since 1.23.0
  */
  filter<U extends T>(refinement: (t: T) => t is U): Arbitrary<U>;
  /**
  * Create another arbitrary by filtering values against `predicate`
  *
  * All the values produced by the resulting arbitrary
  * satisfy `predicate(value) == true`
  *
  * Be aware that using filter may highly impact the time required to generate a valid entry
  *
  * @example
  * ```typescript
  * const integerGenerator: Arbitrary<number> = ...;
  * const evenIntegerGenerator: Arbitrary<number> = integerGenerator.filter(e => e % 2 === 0);
  * // new Arbitrary only keeps even values
  * ```
  *
  * @param predicate - Predicate, to test each produced element. Return true to keep the element, false otherwise
  * @returns New arbitrary filtered using predicate
  *
  * @remarks Since 0.0.1
  */
  filter(predicate: (t: T) => boolean): Arbitrary<T>;
  /**
  * Create another arbitrary by mapping all produced values using the provided `mapper`
  * Values produced by the new arbitrary are the result of applying `mapper` value by value
  *
  * @example
  * ```typescript
  * const rgbChannels: Arbitrary<{r:number,g:number,b:number}> = ...;
  * const color: Arbitrary<string> = rgbChannels.map(ch => `#${(ch.r*65536 + ch.g*256 + ch.b).toString(16).padStart(6, '0')}`);
  * // transform an Arbitrary producing {r,g,b} integers into an Arbitrary of '#rrggbb'
  * ```
  *
  * @param mapper - Map function, to produce a new element based on an old one
  * @param unmapper - Optional unmap function, it will never be used except when shrinking user defined values. Must throw if value is not compatible (since 3.0.0)
  * @returns New arbitrary with mapped elements
  *
  * @remarks Since 0.0.1
  */
  map<U>(mapper: (t: T) => U, unmapper?: (possiblyU: unknown) => T): Arbitrary<U>;
  /**
  * Create another arbitrary by mapping a value from a base Arbirary using the provided `fmapper`
  * Values produced by the new arbitrary are the result of the arbitrary generated by applying `fmapper` to a value
  * @example
  * ```typescript
  * const arrayAndLimitArbitrary = fc.nat().chain((c: number) => fc.tuple( fc.array(fc.nat(c)), fc.constant(c)));
  * ```
  *
  * @param chainer - Chain function, to produce a new Arbitrary using a value from another Arbitrary
  * @returns New arbitrary of new type
  *
  * @remarks Since 1.2.0
  */
  chain<U>(chainer: (t: T) => Arbitrary<U>): Arbitrary<U>;
} //#endregion
//#region src/check/precondition/PreconditionFailure.d.ts
/**
* Error type produced whenever a precondition fails
* @remarks Since 2.2.0
* @public
*/
declare class PreconditionFailure extends Error {
  readonly interruptExecution: boolean;
  constructor(interruptExecution?: boolean);
  static isFailure(err: unknown): err is PreconditionFailure;
} //#endregion
//#region src/check/property/IRawProperty.d.ts
/**
* Represent failures of the property
* @remarks Since 3.0.0
* @public
*/
type PropertyFailure = {
  /**
  * The original error that has been intercepted.
  * Possibly not an instance Error as users can throw anything.
  * @remarks Since 3.0.0
  */
  error: unknown;
};
/**
* Property
*
* A property is the combination of:
* - Arbitraries: how to generate the inputs for the algorithm
* - Predicate: how to confirm the algorithm succeeded?
*
* @remarks Since 1.19.0
* @public
*/
interface IRawProperty<Ts, IsAsync extends boolean = boolean> {
  /**
  * Is the property asynchronous?
  *
  * true in case of asynchronous property, false otherwise
  * @remarks Since 0.0.7
  */
  isAsync(): IsAsync;
  /**
  * Generate values of type Ts
  *
  * @param mrng - Random number generator
  * @param runId - Id of the generation, starting at 0 - if set the generation might be biased
  *
  * @remarks Since 0.0.7 (return type changed in 3.0.0)
  */
  generate(mrng: Random, runId?: number): Value<Ts>;
  /**
  * Shrink value of type Ts
  *
  * @param value - The value to be shrunk, it can be context-less
  *
  * @remarks Since 3.0.0
  */
  shrink(value: Value<Ts>): Stream<Value<Ts>>;
  /**
  * Check the predicate for v
  * @param v - Value of which we want to check the predicate
  * @remarks Since 0.0.7
  */
  run(v: Ts): (IsAsync extends true ? Promise<PreconditionFailure | PropertyFailure | null> : never) | (IsAsync extends false ? PreconditionFailure | PropertyFailure | null : never);
  /**
  * Run before each hook
  * @remarks Since 3.4.0
  */
  runBeforeEach: () => (IsAsync extends true ? Promise<void> : never) | (IsAsync extends false ? void : never);
  /**
  * Run after each hook
  * @remarks Since 3.4.0
  */
  runAfterEach: () => (IsAsync extends true ? Promise<void> : never) | (IsAsync extends false ? void : never);
} //#endregion
//#region src/arbitrary/_internals/helpers/MaxLengthFromMinLength.d.ts
/**
* The size parameter defines how large the generated values could be.
*
* The default in fast-check is 'small' but it could be increased (resp. decreased)
* to ask arbitraries for larger (resp. smaller) values.
*
* @remarks Since 2.22.0
* @public
*/
type Size = "xsmall" | "small" | "medium" | "large" | "xlarge";
/**
* @remarks Since 2.22.0
* @public
*/
type RelativeSize = "-4" | "-3" | "-2" | "-1" | "=" | "+1" | "+2" | "+3" | "+4";
/**
* Superset of {@link Size} to override the default defined for size
* @remarks Since 2.22.0
* @public
*/
type SizeForArbitrary = RelativeSize | Size | "max" | undefined;
/**
* Superset of {@link Size} to override the default defined for size.
* It can either be based on a numeric value manually selected by the user (not recommended)
* or rely on presets based on size (recommended).
*
* This size will be used to infer a bias to limit the depth, used as follow within recursive structures:
* While going deeper, the bias on depth will increase the probability to generate small instances.
*
* When used with {@link Size}, the larger the size the deeper the structure.
* When used with numeric values, the larger the number (floating point number &gt;= 0),
* the deeper the structure. `+0` means extremelly biased depth meaning barely impossible to generate
* deep structures, while `Number.POSITIVE_INFINITY` means "depth has no impact".
*
* Using `max` or `Number.POSITIVE_INFINITY` is fully equivalent.
*
* @remarks Since 2.25.0
* @public
*/
type DepthSize = RelativeSize | Size | "max" | number | undefined; //#endregion
//#region src/check/runner/configuration/RandomType.d.ts
/**
* Random generators automatically recognized by the framework
* without having to pass a builder function
* @remarks Since 2.2.0
* @public
*/
type RandomType = "mersenne" | "congruential" | "congruential32" | "xorshift128plus" | "xoroshiro128plus"; //#endregion
//#region src/check/runner/configuration/VerbosityLevel.d.ts
/**
* Verbosity level
* @remarks Since 1.9.1
* @public
*/
declare enum VerbosityLevel {
  /**
  * Level 0 (default)
  *
  * Minimal reporting:
  * - minimal failing case
  * - error log corresponding to the minimal failing case
  *
  * @remarks Since 1.9.1
  */
  None = 0,
  /**
  * Level 1
  *
  * Failures reporting:
  * - same as `VerbosityLevel.None`
  * - list all the failures encountered during the shrinking process
  *
  * @remarks Since 1.9.1
  */
  Verbose = 1,
  /**
  * Level 2
  *
  * Execution flow reporting:
  * - same as `VerbosityLevel.None`
  * - all runs with their associated status displayed as a tree
  *
  * @remarks Since 1.9.1
  */
  VeryVerbose = 2
} //#endregion
//#region src/check/runner/reporter/ExecutionStatus.d.ts
/**
* Status of the execution of the property
* @remarks Since 1.9.0
* @public
*/
declare enum ExecutionStatus {
  Success = 0,
  Skipped = -1,
  Failure = 1
} //#endregion
//#region src/check/runner/reporter/ExecutionTree.d.ts
/**
* Summary of the execution process
* @remarks Since 1.9.0
* @public
*/
interface ExecutionTree<Ts> {
  /**
  * Status of the property
  * @remarks Since 1.9.0
  */
  status: ExecutionStatus;
  /**
  * Generated value
  * @remarks Since 1.9.0
  */
  value: Ts;
  /**
  * Values derived from this value
  * @remarks Since 1.9.0
  */
  children: ExecutionTree<Ts>[];
} //#endregion
//#region src/check/runner/reporter/RunDetails.d.ts
/**
* Post-run details produced by {@link check}
*
* A failing property can easily detected by checking the `failed` flag of this structure
*
* @remarks Since 0.0.7
* @public
*/
type RunDetails<Ts> = RunDetailsFailureProperty<Ts> | RunDetailsFailureTooManySkips<Ts> | RunDetailsFailureInterrupted<Ts> | RunDetailsSuccess<Ts>;
/**
* Run reported as failed because
* the property failed
*
* Refer to {@link RunDetailsCommon} for more details
*
* @remarks Since 1.25.0
* @public
*/
interface RunDetailsFailureProperty<Ts> extends RunDetailsCommon<Ts> {
  failed: true;
  interrupted: boolean;
  counterexample: Ts;
  counterexamplePath: string;
  errorInstance: unknown;
}
/**
* Run reported as failed because
* too many retries have been attempted to generate valid values
*
* Refer to {@link RunDetailsCommon} for more details
*
* @remarks Since 1.25.0
* @public
*/
interface RunDetailsFailureTooManySkips<Ts> extends RunDetailsCommon<Ts> {
  failed: true;
  interrupted: false;
  counterexample: null;
  counterexamplePath: null;
  errorInstance: null;
}
/**
* Run reported as failed because
* it took too long and thus has been interrupted
*
* Refer to {@link RunDetailsCommon} for more details
*
* @remarks Since 1.25.0
* @public
*/
interface RunDetailsFailureInterrupted<Ts> extends RunDetailsCommon<Ts> {
  failed: true;
  interrupted: true;
  counterexample: null;
  counterexamplePath: null;
  errorInstance: null;
}
/**
* Run reported as success
*
* Refer to {@link RunDetailsCommon} for more details
*
* @remarks Since 1.25.0
* @public
*/
interface RunDetailsSuccess<Ts> extends RunDetailsCommon<Ts> {
  failed: false;
  interrupted: boolean;
  counterexample: null;
  counterexamplePath: null;
  errorInstance: null;
}
/**
* Shared part between variants of RunDetails
* @remarks Since 2.2.0
* @public
*/
interface RunDetailsCommon<Ts> {
  /**
  * Does the property failed during the execution of {@link check}?
  * @remarks Since 0.0.7
  */
  failed: boolean;
  /**
  * Was the execution interrupted?
  * @remarks Since 1.19.0
  */
  interrupted: boolean;
  /**
  * Number of runs
  *
  * - In case of failed property: Number of runs up to the first failure (including the failure run)
  * - Otherwise: Number of successful executions
  *
  * @remarks Since 1.0.0
  */
  numRuns: number;
  /**
  * Number of skipped entries due to failed pre-condition
  *
  * As `numRuns` it only takes into account the skipped values that occured before the first failure.
  * Refer to {@link pre} to add such pre-conditions.
  *
  * @remarks Since 1.3.0
  */
  numSkips: number;
  /**
  * Number of shrinks required to get to the minimal failing case (aka counterexample)
  * @remarks Since 1.0.0
  */
  numShrinks: number;
  /**
  * Seed that have been used by the run
  *
  * It can be forced in {@link assert}, {@link check}, {@link sample} and {@link statistics} using `Parameters`
  * @remarks Since 0.0.7
  */
  seed: number;
  /**
  * In case of failure: the counterexample contains the minimal failing case (first failure after shrinking)
  * @remarks Since 0.0.7
  */
  counterexample: Ts | null;
  /**
  * In case of failure: it contains the error that has been thrown if any
  * @remarks Since 3.0.0
  */
  errorInstance: unknown | null;
  /**
  * In case of failure: path to the counterexample
  *
  * For replay purposes, it can be forced in {@link assert}, {@link check}, {@link sample} and {@link statistics} using `Parameters`
  *
  * @remarks Since 1.0.0
  */
  counterexamplePath: string | null;
  /**
  * List all failures that have occurred during the run
  *
  * You must enable verbose with at least `Verbosity.Verbose` in `Parameters`
  * in order to have values in it
  *
  * @remarks Since 1.1.0
  */
  failures: Ts[];
  /**
  * Execution summary of the run
  *
  * Traces the origin of each value encountered during the test and its execution status.
  * Can help to diagnose shrinking issues.
  *
  * You must enable verbose with at least `Verbosity.Verbose` in `Parameters`
  * in order to have values in it:
  * - Verbose: Only failures
  * - VeryVerbose: Failures, Successes and Skipped
  *
  * @remarks Since 1.9.0
  */
  executionSummary: ExecutionTree<Ts>[];
  /**
  * Verbosity level required by the user
  * @remarks Since 1.9.0
  */
  verbose: VerbosityLevel;
  /**
  * Configuration of the run
  *
  * It includes both local parameters set on {@link check} or {@link assert}
  * and global ones specified using {@link configureGlobal}
  *
  * @remarks Since 1.25.0
  */
  runConfiguration: Parameters$1<Ts>;
} //#endregion
//#region src/check/runner/configuration/Parameters.d.ts
/**
* Customization of the parameters used to run the properties
* @remarks Since 0.0.6
* @public
*/
interface Parameters$1<T = void> {
  /**
  * Initial seed of the generator: `Date.now()` by default
  *
  * It can be forced to replay a failed run.
  *
  * In theory, seeds are supposed to be 32-bit integers.
  * In case of double value, the seed will be rescaled into a valid 32-bit integer (eg.: values between 0 and 1 will be evenly spread into the range of possible seeds).
  *
  * @remarks Since 0.0.6
  */
  seed?: number;
  /**
  * Random number generator: `xorshift128plus` by default
  *
  * Random generator is the core element behind the generation of random values - changing it might directly impact the quality and performances of the generation of random values.
  * It can be one of: 'mersenne', 'congruential', 'congruential32', 'xorshift128plus', 'xoroshiro128plus'
  * Or any function able to build a `RandomGenerator` based on a seed
  *
  * As required since pure-rand v6.0.0, when passing a builder for {@link RandomGenerator},
  * the random number generator must generate values between -0x80000000 and 0x7fffffff.
  *
  * @remarks Since 1.6.0
  */
  randomType?: RandomType | ((seed: number) => RandomGenerator);
  /**
  * Number of runs before success: 100 by default
  * @remarks Since 1.0.0
  */
  numRuns?: number;
  /**
  * Maximal number of skipped values per run
  *
  * Skipped is considered globally, so this value is used to compute maxSkips = maxSkipsPerRun * numRuns.
  * Runner will consider a run to have failed if it skipped maxSkips+1 times before having generated numRuns valid entries.
  *
  * See {@link pre} for more details on pre-conditions
  *
  * @remarks Since 1.3.0
  */
  maxSkipsPerRun?: number;
  /**
  * Maximum time in milliseconds for the predicate to answer: disabled by default
  *
  * WARNING: Only works for async code (see {@link asyncProperty}), will not interrupt a synchronous code.
  * @remarks Since 0.0.11
  */
  timeout?: number;
  /**
  * Skip all runs after a given time limit: disabled by default
  *
  * NOTE: Relies on `Date.now()`.
  *
  * NOTE:
  * Useful to stop too long shrinking processes.
  * Replay capability (see `seed`, `path`) can resume the shrinking.
  *
  * WARNING:
  * It skips runs. Thus test might be marked as failed.
  * Indeed, it might not reached the requested number of successful runs.
  *
  * @remarks Since 1.15.0
  */
  skipAllAfterTimeLimit?: number;
  /**
  * Interrupt test execution after a given time limit: disabled by default
  *
  * NOTE: Relies on `Date.now()`.
  *
  * NOTE:
  * Useful to avoid having too long running processes in your CI.
  * Replay capability (see `seed`, `path`) can still be used if needed.
  *
  * WARNING:
  * If the test got interrupted before any failure occured
  * and before it reached the requested number of runs specified by `numRuns`
  * it will be marked as success. Except if `markInterruptAsFailure` has been set to `true`
  *
  * @remarks Since 1.19.0
  */
  interruptAfterTimeLimit?: number;
  /**
  * Mark interrupted runs as failed runs if preceded by one success or more: disabled by default
  * Interrupted with no success at all always defaults to failure whatever the value of this flag.
  * @remarks Since 1.19.0
  */
  markInterruptAsFailure?: boolean;
  /**
  * Skip runs corresponding to already tried values.
  *
  * WARNING:
  * Discarded runs will be retried. Under the hood they are simple calls to `fc.pre`.
  * In other words, if you ask for 100 runs but your generator can only generate 10 values then the property will fail as 100 runs will never be reached.
  * Contrary to `ignoreEqualValues` you always have the number of runs you requested.
  *
  * NOTE: Relies on `fc.stringify` to check the equality.
  *
  * @remarks Since 2.14.0
  */
  skipEqualValues?: boolean;
  /**
  * Discard runs corresponding to already tried values.
  *
  * WARNING:
  * Discarded runs will not be replaced.
  * In other words, if you ask for 100 runs and have 2 discarded runs you will only have 98 effective runs.
  *
  * NOTE: Relies on `fc.stringify` to check the equality.
  *
  * @remarks Since 2.14.0
  */
  ignoreEqualValues?: boolean;
  /**
  * Way to replay a failing property directly with the counterexample.
  * It can be fed with the counterexamplePath returned by the failing test (requires `seed` too).
  * @remarks Since 1.0.0
  */
  path?: string;
  /**
  * Logger (see {@link statistics}): `console.log` by default
  * @remarks Since 0.0.6
  */
  logger?(v: string): void;
  /**
  * Force the use of unbiased arbitraries: biased by default
  * @remarks Since 1.1.0
  */
  unbiased?: boolean;
  /**
  * Enable verbose mode: {@link VerbosityLevel.None} by default
  *
  * Using `verbose: true` is equivalent to `verbose: VerbosityLevel.Verbose`
  *
  * It can prove very useful to troubleshoot issues.
  * See {@link VerbosityLevel} for more details on each level.
  *
  * @remarks Since 1.1.0
  */
  verbose?: boolean | VerbosityLevel;
  /**
  * Custom values added at the beginning of generated ones
  *
  * It enables users to come with examples they want to test at every run
  *
  * @remarks Since 1.4.0
  */
  examples?: T[];
  /**
  * Stop run on failure
  *
  * It makes the run stop at the first encountered failure without shrinking.
  *
  * When used in complement to `seed` and `path`,
  * it replays only the minimal counterexample.
  *
  * @remarks Since 1.11.0
  */
  endOnFailure?: boolean;
  /**
  * Replace the default reporter handling errors by a custom one
  *
  * Reporter is responsible to throw in case of failure: default one throws whenever `runDetails.failed` is true.
  * But you may want to change this behaviour in yours.
  *
  * Only used when calling {@link assert}
  * Cannot be defined in conjonction with `asyncReporter`
  *
  * @remarks Since 1.25.0
  */
  reporter?: (runDetails: RunDetails<T>) => void;
  /**
  * Replace the default reporter handling errors by a custom one
  *
  * Reporter is responsible to throw in case of failure: default one throws whenever `runDetails.failed` is true.
  * But you may want to change this behaviour in yours.
  *
  * Only used when calling {@link assert}
  * Cannot be defined in conjonction with `reporter`
  * Not compatible with synchronous properties: runner will throw
  *
  * @remarks Since 1.25.0
  */
  asyncReporter?: (runDetails: RunDetails<T>) => Promise<void>;
  /**
  * By default the Error causing the failure of the predicate will not be directly exposed within the message
  * of the Error thown by fast-check. It will be exposed by a cause field attached to the Error.
  *
  * The Error with cause has been supported by Node since 16.14.0 and is properly supported in many test runners.
  *
  * But if the original Error fails to appear within your test runner,
  * Or if you prefer the Error to be included directly as part of the message of the resulted Error,
  * you can toggle this flag and the Error produced by fast-check in case of failure will expose the source Error
  * as part of the message and not as a cause.
  */
  includeErrorInReport?: boolean;
} //#endregion
//#region src/check/runner/configuration/GlobalParameters.d.ts
/**
* Type of legal hook function that can be used in the global parameter `beforeEach` and/or `afterEach`
* @remarks Since 2.3.0
* @public
*/
type GlobalPropertyHookFunction = () => void;
/**
* Type of legal hook function that can be used in the global parameter `asyncBeforeEach` and/or `asyncAfterEach`
* @remarks Since 2.3.0
* @public
*/
type GlobalAsyncPropertyHookFunction = (() => Promise<unknown>) | (() => void);
/**
* Type describing the global overrides
* @remarks Since 1.18.0
* @public
*/
type GlobalParameters = Pick<Parameters$1<unknown>, Exclude<keyof Parameters$1<unknown>, "path" | "examples">> & {
  /**
  * Specify a function that will be called before each execution of a property.
  * It behaves as-if you manually called `beforeEach` method on all the properties you execute with fast-check.
  *
  * The function will be used for both {@link fast-check#property} and {@link fast-check#asyncProperty}.
  * This global override should never be used in conjunction with `asyncBeforeEach`.
  *
  * @remarks Since 2.3.0
  */
  beforeEach?: GlobalPropertyHookFunction;
  /**
  * Specify a function that will be called after each execution of a property.
  * It behaves as-if you manually called `afterEach` method on all the properties you execute with fast-check.
  *
  * The function will be used for both {@link fast-check#property} and {@link fast-check#asyncProperty}.
  * This global override should never be used in conjunction with `asyncAfterEach`.
  *
  * @remarks Since 2.3.0
  */
  afterEach?: GlobalPropertyHookFunction;
  /**
  * Specify a function that will be called before each execution of an asynchronous property.
  * It behaves as-if you manually called `beforeEach` method on all the asynchronous properties you execute with fast-check.
  *
  * The function will be used only for {@link fast-check#asyncProperty}. It makes synchronous properties created by {@link fast-check#property} unable to run.
  * This global override should never be used in conjunction with `beforeEach`.
  *
  * @remarks Since 2.3.0
  */
  asyncBeforeEach?: GlobalAsyncPropertyHookFunction;
  /**
  * Specify a function that will be called after each execution of an asynchronous property.
  * It behaves as-if you manually called `afterEach` method on all the asynchronous properties you execute with fast-check.
  *
  * The function will be used only for {@link fast-check#asyncProperty}. It makes synchronous properties created by {@link fast-check#property} unable to run.
  * This global override should never be used in conjunction with `afterEach`.
  *
  * @remarks Since 2.3.0
  */
  asyncAfterEach?: GlobalAsyncPropertyHookFunction;
  /**
  * Define the base size to be used by arbitraries.
  *
  * By default arbitraries not specifying any size will default to it (except in some cases when used defaultSizeToMaxWhenMaxSpecified is true).
  * For some arbitraries users will want to override the default and either define another size relative to this one,
  * or a fixed one.
  *
  * @defaultValue `"small"`
  * @remarks Since 2.22.0
  */
  baseSize?: Size;
  /**
  * When set to `true` and if the size has not been defined for this precise instance,
  * it will automatically default to `"max"` if the user specified a upper bound for the range
  * (applies to length and to depth).
  *
  * When `false`, the size will be defaulted to `baseSize` even if the user specified
  * a upper bound for the range.
  *
  * @remarks Since 2.22.0
  */
  defaultSizeToMaxWhenMaxSpecified?: boolean;
};
/**
* Define global parameters that will be used by all the runners
*
* @example
* ```typescript
* fc.configureGlobal({ numRuns: 10 });
* //...
* fc.assert(
*   fc.property(
*     fc.nat(), fc.nat(),
*     (a, b) => a + b === b + a
*   ), { seed: 42 }
* ) // equivalent to { numRuns: 10, seed: 42 }
* ```
*
* @param parameters - Global parameters
*
* @remarks Since 1.18.0
* @public
*/
declare function configureGlobal(parameters: GlobalParameters): void;
/**
* Read global parameters that will be used by runners
* @remarks Since 1.18.0
* @public
*/
declare function readConfigureGlobal(): GlobalParameters;
/**
* Reset global parameters
* @remarks Since 1.18.0
* @public
*/
declare function resetConfigureGlobal(): void; //#endregion
//#region src/check/property/AsyncProperty.generic.d.ts
/**
* Type of legal hook function that can be used to call `beforeEach` or `afterEach`
* on a {@link IAsyncPropertyWithHooks}
*
* @remarks Since 2.2.0
* @public
*/
type AsyncPropertyHookFunction = ((previousHookFunction: GlobalAsyncPropertyHookFunction) => Promise<unknown>) | ((previousHookFunction: GlobalAsyncPropertyHookFunction) => void);
/**
* Interface for asynchronous property, see {@link IRawProperty}
* @remarks Since 1.19.0
* @public
*/
interface IAsyncProperty<Ts> extends IRawProperty<Ts, true> {}
/**
* Interface for asynchronous property defining hooks, see {@link IAsyncProperty}
* @remarks Since 2.2.0
* @public
*/
interface IAsyncPropertyWithHooks<Ts> extends IAsyncProperty<Ts> {
  /**
  * Define a function that should be called before all calls to the predicate
  * @param hookFunction - Function to be called
  * @remarks Since 1.6.0
  */
  beforeEach(hookFunction: AsyncPropertyHookFunction): IAsyncPropertyWithHooks<Ts>;
  /**
  * Define a function that should be called after all calls to the predicate
  * @param hookFunction - Function to be called
  * @remarks Since 1.6.0
  */
  afterEach(hookFunction: AsyncPropertyHookFunction): IAsyncPropertyWithHooks<Ts>;
} //#endregion
//#region src/check/property/AsyncProperty.d.ts
/**
* Instantiate a new {@link fast-check#IAsyncProperty}
* @param predicate - Assess the success of the property. Would be considered falsy if it throws or if its output evaluates to false
* @remarks Since 0.0.7
* @public
*/
declare function asyncProperty<Ts extends [unknown, ...unknown[]]>(...args: [...arbitraries: { [K in keyof Ts]: Arbitrary<Ts[K]> }, predicate: (...args: Ts) => Promise<boolean | void>]): IAsyncPropertyWithHooks<Ts>; //#endregion
//#region src/check/property/Property.generic.d.ts
/**
* Type of legal hook function that can be used to call `beforeEach` or `afterEach`
* on a {@link IPropertyWithHooks}
*
* @remarks Since 2.2.0
* @public
*/
type PropertyHookFunction = (globalHookFunction: GlobalPropertyHookFunction) => void;
/**
* Interface for synchronous property, see {@link IRawProperty}
* @remarks Since 1.19.0
* @public
*/
interface IProperty<Ts> extends IRawProperty<Ts, false> {}
/**
* Interface for synchronous property defining hooks, see {@link IProperty}
* @remarks Since 2.2.0
* @public
*/
interface IPropertyWithHooks<Ts> extends IProperty<Ts> {
  /**
  * Define a function that should be called before all calls to the predicate
  * @param invalidHookFunction - Function to be called, please provide a valid hook function
  * @remarks Since 1.6.0
  */
  beforeEach(invalidHookFunction: (hookFunction: GlobalPropertyHookFunction) => Promise<unknown>): "beforeEach expects a synchronous function but was given a function returning a Promise";
  /**
  * Define a function that should be called before all calls to the predicate
  * @param hookFunction - Function to be called
  * @remarks Since 1.6.0
  */
  beforeEach(hookFunction: PropertyHookFunction): IPropertyWithHooks<Ts>;
  /**
  * Define a function that should be called after all calls to the predicate
  * @param invalidHookFunction - Function to be called, please provide a valid hook function
  * @remarks Since 1.6.0
  */
  afterEach(invalidHookFunction: (hookFunction: GlobalPropertyHookFunction) => Promise<unknown>): "afterEach expects a synchronous function but was given a function returning a Promise";
  /**
  * Define a function that should be called after all calls to the predicate
  * @param hookFunction - Function to be called
  * @remarks Since 1.6.0
  */
  afterEach(hookFunction: PropertyHookFunction): IPropertyWithHooks<Ts>;
} //#endregion
//#region src/check/property/Property.d.ts
/**
* Instantiate a new {@link fast-check#IProperty}
* @param predicate - Assess the success of the property. Would be considered falsy if it throws or if its output evaluates to false
* @remarks Since 0.0.1
* @public
*/
declare function property<Ts extends [unknown, ...unknown[]]>(...args: [...arbitraries: { [K in keyof Ts]: Arbitrary<Ts[K]> }, predicate: (...args: Ts) => boolean | void]): IPropertyWithHooks<Ts>; //#endregion
//#region src/check/runner/Runner.d.ts
/**
* Run the property, do not throw contrary to {@link assert}
*
* WARNING: Has to be awaited
*
* @param property - Asynchronous property to be checked
* @param params - Optional parameters to customize the execution
*
* @returns Test status and other useful details
*
* @remarks Since 0.0.7
* @public
*/
declare function check<Ts>(property: IAsyncProperty<Ts>, params?: Parameters$1<Ts>): Promise<RunDetails<Ts>>;
/**
* Run the property, do not throw contrary to {@link assert}
*
* @param property - Synchronous property to be checked
* @param params - Optional parameters to customize the execution
*
* @returns Test status and other useful details
*
* @remarks Since 0.0.1
* @public
*/
declare function check<Ts>(property: IProperty<Ts>, params?: Parameters$1<Ts>): RunDetails<Ts>;
/**
* Run the property, do not throw contrary to {@link assert}
*
* WARNING: Has to be awaited if the property is asynchronous
*
* @param property - Property to be checked
* @param params - Optional parameters to customize the execution
*
* @returns Test status and other useful details
*
* @remarks Since 0.0.7
* @public
*/
declare function check<Ts>(property: IRawProperty<Ts>, params?: Parameters$1<Ts>): Promise<RunDetails<Ts>> | RunDetails<Ts>;
/**
* Run the property, throw in case of failure
*
* It can be called directly from describe/it blocks of Mocha.
* No meaningful results are produced in case of success.
*
* WARNING: Has to be awaited
*
* @param property - Asynchronous property to be checked
* @param params - Optional parameters to customize the execution
*
* @remarks Since 0.0.7
* @public
*/
declare function assert<Ts>(property: IAsyncProperty<Ts>, params?: Parameters$1<Ts>): Promise<void>;
/**
* Run the property, throw in case of failure
*
* It can be called directly from describe/it blocks of Mocha.
* No meaningful results are produced in case of success.
*
* @param property - Synchronous property to be checked
* @param params - Optional parameters to customize the execution
*
* @remarks Since 0.0.1
* @public
*/
declare function assert<Ts>(property: IProperty<Ts>, params?: Parameters$1<Ts>): void;
/**
* Run the property, throw in case of failure
*
* It can be called directly from describe/it blocks of Mocha.
* No meaningful results are produced in case of success.
*
* WARNING: Returns a promise to be awaited if the property is asynchronous
*
* @param property - Synchronous or asynchronous property to be checked
* @param params - Optional parameters to customize the execution
*
* @remarks Since 0.0.7
* @public
*/
declare function assert<Ts>(property: IRawProperty<Ts>, params?: Parameters$1<Ts>): Promise<void> | void; //#endregion
//#region src/check/runner/Sampler.d.ts
/**
* Generate an array containing all the values that would have been generated during {@link assert} or {@link check}
*
* @example
* ```typescript
* fc.sample(fc.nat(), 10); // extract 10 values from fc.nat() Arbitrary
* fc.sample(fc.nat(), {seed: 42}); // extract values from fc.nat() as if we were running fc.assert with seed=42
* ```
*
* @param generator - {@link IProperty} or {@link Arbitrary} to extract the values from
* @param params - Integer representing the number of values to generate or `Parameters` as in {@link assert}
*
* @remarks Since 0.0.6
* @public
*/
declare function sample<Ts>(generator: IRawProperty<Ts> | Arbitrary<Ts>, params?: Parameters$1<Ts> | number): Ts[];
/**
* Gather useful statistics concerning generated values
*
* Print the result in `console.log` or `params.logger` (if defined)
*
* @example
* ```typescript
* fc.statistics(
*     fc.nat(999),
*     v => v < 100 ? 'Less than 100' : 'More or equal to 100',
*     {numRuns: 1000, logger: console.log});
* // Classify 1000 values generated by fc.nat(999) into two categories:
* // - Less than 100
* // - More or equal to 100
* // The output will be sent line by line to the logger
* ```
*
* @param generator - {@link IProperty} or {@link Arbitrary} to extract the values from
* @param classify - Classifier function that can classify the generated value in zero, one or more categories (with free labels)
* @param params - Integer representing the number of values to generate or `Parameters` as in {@link assert}
*
* @remarks Since 0.0.6
* @public
*/
declare function statistics<Ts>(generator: IRawProperty<Ts> | Arbitrary<Ts>, classify: (v: Ts) => string | string[], params?: Parameters$1<Ts> | number): void; //#endregion
//#region src/arbitrary/_internals/builders/GeneratorValueBuilder.d.ts
/**
* Take an arbitrary builder and all its arguments separatly.
* Generate a value out of it.
*
* @remarks Since 3.8.0
* @public
*/
type GeneratorValueFunction = <T, TArgs extends unknown[]>(arb: (...params: TArgs) => Arbitrary<T>, ...args: TArgs) => T;
/**
* The values part is mostly exposed for the purpose of the tests.
* Or if you want to have a custom error formatter for this kind of values.
*
* @remarks Since 3.8.0
* @public
*/
type GeneratorValueMethods = {
  values: () => unknown[];
};
/**
* An instance of {@link GeneratorValue} can be leveraged within predicates themselves to produce extra random values
* while preserving part of the shrinking capabilities on the produced values.
*
* It can be seen as a way to start property based testing within something looking closer from what users will
* think about when thinking about random in tests. But contrary to raw random, it comes with many useful strengths
* such as: ability to re-run the test (seeded), shrinking...
*
* @remarks Since 3.8.0
* @public
*/
type GeneratorValue = GeneratorValueFunction & GeneratorValueMethods; //#endregion
//#region src/arbitrary/gen.d.ts
/**
* Generate values within the test execution itself by leveraging the strength of `gen`
*
* @example
* ```javascript
* fc.assert(
*   fc.property(fc.gen(), gen => {
*     const size = gen(fc.nat, {max: 10});
*     const array = [];
*     for (let index = 0 ; index !== size ; ++index) {
*       array.push(gen(fc.integer));
*     }
*     // Here is an array!
*     // Note: Prefer fc.array(fc.integer(), {maxLength: 10}) if you want to produce such array
*   })
* )
* ```
*
* ⚠️ WARNING:
* While `gen` is easy to use, it may not shrink as well as tailored arbitraries based on `filter` or `map`.
*
* ⚠️ WARNING:
* Additionally it cannot run back the test properly when attempting to replay based on a seed and a path.
* You'll need to limit yourself to the seed and drop the path from the options if you attempt to replay something
* implying it.  More precisely, you may keep the very first part of the path but have to drop anything after the
* first ":".
*
* ⚠️ WARNING:
* It also does not support custom examples.
*
* @remarks Since 3.8.0
* @public
*/
declare function gen(): Arbitrary<GeneratorValue>; //#endregion
//#region src/arbitrary/_internals/helpers/DepthContext.d.ts
/**
* Type used to strongly type instances of depth identifier while keeping internals
* what they contain internally
*
* @remarks Since 2.25.0
* @public
*/
type DepthIdentifier = {} & DepthContext;
/**
* Instance of depth, can be used to alter the depth perceived by an arbitrary
* or to bias your own arbitraries based on the current depth
*
* @remarks Since 2.25.0
* @public
*/
type DepthContext = {
  /**
  * Current depth (starts at 0, continues with 1, 2...).
  * Only made of integer values superior or equal to 0.
  *
  * Remark: Whenever altering the `depth` during a `generate`, please make sure to ALWAYS
  * reset it to its original value before you leave the `generate`. Otherwise the execution
  * will imply side-effects that will potentially impact the following runs and make replay
  * of the issue barely impossible.
  */
  depth: number;
};
/**
* Get back the requested DepthContext
* @remarks Since 2.25.0
* @public
*/
declare function getDepthContextFor(contextMeta: DepthContext | DepthIdentifier | string | undefined): DepthContext;
/**
* Create a new and unique instance of DepthIdentifier
* that can be shared across multiple arbitraries if needed
* @public
*/
declare function createDepthIdentifier(): DepthIdentifier; //#endregion
//#region src/arbitrary/array.d.ts
/**
* Constraints to be applied on {@link array}
* @remarks Since 2.4.0
* @public
*/
interface ArrayConstraints$1 {
  /**
  * Lower bound of the generated array size
  * @defaultValue 0
  * @remarks Since 2.4.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated array size
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.4.0
  */
  maxLength?: number;
  /**
  * Define how large the generated values should be (at max)
  *
  * When used in conjonction with `maxLength`, `size` will be used to define
  * the upper bound of the generated array size while `maxLength` will be used
  * to define and document the general maximal length allowed for this case.
  *
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
  /**
  * When receiving a depth identifier, the arbitrary will impact the depth
  * attached to it to avoid going too deep if it already generated lots of items.
  *
  * In other words, if the number of generated values within the collection is large
  * then the generated items will tend to be less deep to avoid creating structures a lot
  * larger than expected.
  *
  * For the moment, the depth is not taken into account to compute the number of items to
  * define for a precise generate call of the array. Just applied onto eligible items.
  *
  * @remarks Since 2.25.0
  */
  depthIdentifier?: DepthIdentifier | string;
}
/**
* For arrays of values coming from `arb`
*
* @param arb - Arbitrary used to generate the values inside the array
* @param constraints - Constraints to apply when building instances (since 2.4.0)
*
* @remarks Since 0.0.1
* @public
*/
declare function array<T>(arb: Arbitrary<T>, constraints?: ArrayConstraints$1): Arbitrary<T[]>; //#endregion
//#region src/arbitrary/bigInt.d.ts
/**
* Constraints to be applied on {@link bigInt}
* @remarks Since 2.6.0
* @public
*/
interface BigIntConstraints$1 {
  /**
  * Lower bound for the generated bigints (eg.: -5n, 0n, BigInt(Number.MIN_SAFE_INTEGER))
  * @remarks Since 2.6.0
  */
  min?: bigint;
  /**
  * Upper bound for the generated bigints (eg.: -2n, 2147483647n, BigInt(Number.MAX_SAFE_INTEGER))
  * @remarks Since 2.6.0
  */
  max?: bigint;
}
/**
* For bigint
* @remarks Since 1.9.0
* @public
*/
declare function bigInt(): Arbitrary<bigint>;
/**
* For bigint between min (included) and max (included)
*
* @param min - Lower bound for the generated bigints (eg.: -5n, 0n, BigInt(Number.MIN_SAFE_INTEGER))
* @param max - Upper bound for the generated bigints (eg.: -2n, 2147483647n, BigInt(Number.MAX_SAFE_INTEGER))
*
* @remarks Since 1.9.0
* @public
*/
declare function bigInt(min: bigint, max: bigint): Arbitrary<bigint>;
/**
* For bigint between min (included) and max (included)
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 2.6.0
* @public
*/
declare function bigInt(constraints: BigIntConstraints$1): Arbitrary<bigint>;
/**
* For bigint between min (included) and max (included)
*
* @param args - Either min/max bounds as an object or constraints to apply when building instances
*
* @remarks Since 2.6.0
* @public
*/
declare function bigInt(...args: [] | [bigint, bigint] | [BigIntConstraints$1]): Arbitrary<bigint>; //#endregion
//#region src/arbitrary/boolean.d.ts
/**
* For boolean values - `true` or `false`
* @remarks Since 0.0.6
* @public
*/
declare function boolean(): Arbitrary<boolean>; //#endregion
//#region src/arbitrary/falsy.d.ts
/**
* Constraints to be applied on {@link falsy}
* @remarks Since 1.26.0
* @public
*/
interface FalsyContraints {
  /**
  * Enable falsy bigint value
  * @remarks Since 1.26.0
  */
  withBigInt?: boolean;
}
/**
* Typing for values generated by {@link falsy}
* @remarks Since 2.2.0
* @public
*/
type FalsyValue<TConstraints extends FalsyContraints = object> = false | null | 0 | "" | typeof NaN | undefined | (TConstraints extends {
  withBigInt: true;
} ? 0n : never);
/**
* For falsy values:
* - ''
* - 0
* - NaN
* - false
* - null
* - undefined
* - 0n (whenever withBigInt: true)
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 1.26.0
* @public
*/
declare function falsy<TConstraints extends FalsyContraints>(constraints?: TConstraints): Arbitrary<FalsyValue<TConstraints>>; //#endregion
//#region src/arbitrary/constant.d.ts
/**
* For `value`
* @param value - The value to produce
* @remarks Since 0.0.1
* @public
*/
declare function constant<const T>(value: T): Arbitrary<T>; //#endregion
//#region src/arbitrary/constantFrom.d.ts
/**
* For one `...values` values - all equiprobable
*
* **WARNING**: It expects at least one value, otherwise it should throw
*
* @param values - Constant values to be produced (all values shrink to the first one)
*
* @remarks Since 0.0.12
* @public
*/
declare function constantFrom<const T = never>(...values: T[]): Arbitrary<T>;
/**
* For one `...values` values - all equiprobable
*
* **WARNING**: It expects at least one value, otherwise it should throw
*
* @param values - Constant values to be produced (all values shrink to the first one)
*
* @remarks Since 0.0.12
* @public
*/
declare function constantFrom<TArgs extends any[] | [any]>(...values: TArgs): Arbitrary<TArgs[number]>; //#endregion
//#region src/arbitrary/context.d.ts
/**
* Execution context attached to one predicate run
* @remarks Since 2.2.0
* @public
*/
interface ContextValue {
  /**
  * Log execution details during a test.
  * Very helpful when troubleshooting failures
  * @param data - Data to be logged into the current context
  * @remarks Since 1.8.0
  */
  log(data: string): void;
  /**
  * Number of logs already logged into current context
  * @remarks Since 1.8.0
  */
  size(): number;
}
/**
* Produce a {@link ContextValue} instance
* @remarks Since 1.8.0
* @public
*/
declare function context(): Arbitrary<ContextValue>; //#endregion
//#region src/arbitrary/date.d.ts
/**
* Constraints to be applied on {@link date}
* @remarks Since 3.3.0
* @public
*/
interface DateConstraints$1 {
  /**
  * Lower bound of the range (included)
  * @defaultValue new Date(-8640000000000000)
  * @remarks Since 1.17.0
  */
  min?: Date;
  /**
  * Upper bound of the range (included)
  * @defaultValue new Date(8640000000000000)
  * @remarks Since 1.17.0
  */
  max?: Date;
  /**
  * When set to true, no more "Invalid Date" can be generated.
  * @defaultValue false
  * @remarks Since 3.13.0
  */
  noInvalidDate?: boolean;
}
/**
* For date between constraints.min or new Date(-8640000000000000) (included) and constraints.max or new Date(8640000000000000) (included)
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 1.17.0
* @public
*/
declare function date(constraints?: DateConstraints$1): Arbitrary<Date>; //#endregion
//#region src/arbitrary/clone.d.ts
/**
* Type of the value produced by {@link clone}
* @remarks Since 2.5.0
* @public
*/
type CloneValue<T, N extends number, Rest extends T[] = []> = [number] extends [N] ? T[] : Rest["length"] extends N ? Rest : CloneValue<T, N, [T, ...Rest]>;
/**
* Clone the values generated by `arb` in order to produce fully equal values (might not be equal in terms of === or ==)
*
* @param arb - Source arbitrary
* @param numValues - Number of values to produce
*
* @remarks Since 2.5.0
* @public
*/
declare function clone<T, N extends number>(arb: Arbitrary<T>, numValues: N): Arbitrary<CloneValue<T, N>>; //#endregion
//#region src/arbitrary/chainUntil.d.ts
/**
* Build an arbitrary by iteratively chaining arbitraries until the chainer returns undefined.
*
* Starting from a value produced by `startArb`, the `chainer` function is called with the current value
* to produce the next arbitrary. This process repeats until `chainer` returns `undefined`.
* The final value in the chain is the one produced by this arbitrary.
*
* The implementation is fully iterative (non-recursive) and supports shrinking.
*
* @param startArb - The starting arbitrary producing the initial value
* @param chainer - A function called with the current value that returns either the next arbitrary to generate from or undefined to stop the chain
* @returns An arbitrary producing the last value in the chain
*
* @remarks Since 4.8.0
* @public
*/
declare function chainUntil<T>(startArb: Arbitrary<T>, chainer: (prev: T) => Arbitrary<T> | undefined): Arbitrary<T>; //#endregion
//#region src/arbitrary/dictionary.d.ts
/**
* Constraints to be applied on {@link dictionary}
* @remarks Since 2.22.0
* @public
*/
interface DictionaryConstraints {
  /**
  * Lower bound for the number of keys defined into the generated instance
  * @defaultValue 0
  * @remarks Since 2.22.0
  */
  minKeys?: number;
  /**
  * Upper bound for the number of keys defined into the generated instance
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.22.0
  */
  maxKeys?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
  /**
  * Depth identifier can be used to share the current depth between several instances.
  *
  * By default, if not specified, each instance of dictionary will have its own depth.
  * In other words: you can have depth=1 in one while you have depth=100 in another one.
  *
  * @remarks Since 3.15.0
  */
  depthIdentifier?: DepthIdentifier | string;
  /**
  * Do not generate objects with null prototype
  * @defaultValue false
  * @remarks Since 3.13.0
  */
  noNullPrototype?: boolean;
}
/**
* For dictionaries with keys produced by `keyArb` and values from `valueArb`
*
* @param keyArb - Arbitrary used to generate the keys of the object
* @param valueArb - Arbitrary used to generate the values of the object
*
* @remarks Since 1.0.0
* @public
*/
declare function dictionary<T>(keyArb: Arbitrary<string>, valueArb: Arbitrary<T>, constraints?: DictionaryConstraints): Arbitrary<Record<string, T>>;
/**
* For dictionaries with keys produced by `keyArb` and values from `valueArb`
*
* @param keyArb - Arbitrary used to generate the keys of the object
* @param valueArb - Arbitrary used to generate the values of the object
*
* @remarks Since 4.4.0
* @public
*/
declare function dictionary<K extends PropertyKey, V>(keyArb: Arbitrary<K>, valueArb: Arbitrary<V>, constraints?: DictionaryConstraints): Arbitrary<Record<K, V>>; //#endregion
//#region src/arbitrary/emailAddress.d.ts
/**
* Constraints to be applied on {@link emailAddress}
* @remarks Since 2.22.0
* @public
*/
interface EmailAddressConstraints {
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For email address
*
* According to {@link https://www.ietf.org/rfc/rfc2821.txt | RFC 2821},
* {@link https://www.ietf.org/rfc/rfc3696.txt | RFC 3696} and
* {@link https://www.ietf.org/rfc/rfc5322.txt | RFC 5322}
*
* @param constraints - Constraints to apply when building instances (since 2.22.0)
*
* @remarks Since 1.14.0
* @public
*/
declare function emailAddress(constraints?: EmailAddressConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/double.d.ts
/**
* Constraints to be applied on {@link double}
* @remarks Since 2.6.0
* @public
*/
interface DoubleConstraints {
  /**
  * Lower bound for the generated 64-bit floats (included, see minExcluded to exclude it)
  * @defaultValue Number.NEGATIVE_INFINITY, -1.7976931348623157e+308 when noDefaultInfinity is true
  * @remarks Since 2.8.0
  */
  min?: number;
  /**
  * Should the lower bound (aka min) be excluded?
  * Note: Excluding min=Number.NEGATIVE_INFINITY would result into having min set to -Number.MAX_VALUE.
  * @defaultValue false
  * @remarks Since 3.12.0
  */
  minExcluded?: boolean;
  /**
  * Upper bound for the generated 64-bit floats (included, see maxExcluded to exclude it)
  * @defaultValue Number.POSITIVE_INFINITY, 1.7976931348623157e+308 when noDefaultInfinity is true
  * @remarks Since 2.8.0
  */
  max?: number;
  /**
  * Should the upper bound (aka max) be excluded?
  * Note: Excluding max=Number.POSITIVE_INFINITY would result into having max set to Number.MAX_VALUE.
  * @defaultValue false
  * @remarks Since 3.12.0
  */
  maxExcluded?: boolean;
  /**
  * By default, lower and upper bounds are -infinity and +infinity.
  * By setting noDefaultInfinity to true, you move those defaults to minimal and maximal finite values.
  * @defaultValue false
  * @remarks Since 2.8.0
  */
  noDefaultInfinity?: boolean;
  /**
  * When set to true, no more Number.NaN can be generated.
  * @defaultValue false
  * @remarks Since 2.8.0
  */
  noNaN?: boolean;
  /**
  * When set to true, Number.isInteger(value) will be false for any generated value.
  * Note: -infinity and +infinity, or NaN can stil be generated except if you rejected them via another constraint.
  * @defaultValue false
  * @remarks Since 3.18.0
  */
  noInteger?: boolean;
}
/**
* For 64-bit floating point numbers:
* - sign: 1 bit
* - significand: 52 bits
* - exponent: 11 bits
*
* @param constraints - Constraints to apply when building instances (since 2.8.0)
*
* @remarks Since 0.0.6
* @public
*/
declare function double(constraints?: DoubleConstraints): Arbitrary<number>; //#endregion
//#region src/arbitrary/float.d.ts
/**
* Constraints to be applied on {@link float}
* @remarks Since 2.6.0
* @public
*/
interface FloatConstraints {
  /**
  * Lower bound for the generated 32-bit floats (included)
  * @defaultValue Number.NEGATIVE_INFINITY, -3.4028234663852886e+38 when noDefaultInfinity is true
  * @remarks Since 2.8.0
  */
  min?: number;
  /**
  * Should the lower bound (aka min) be excluded?
  * Note: Excluding min=Number.NEGATIVE_INFINITY would result into having min set to -3.4028234663852886e+38.
  * @defaultValue false
  * @remarks Since 3.12.0
  */
  minExcluded?: boolean;
  /**
  * Upper bound for the generated 32-bit floats (included)
  * @defaultValue Number.POSITIVE_INFINITY, 3.4028234663852886e+38 when noDefaultInfinity is true
  * @remarks Since 2.8.0
  */
  max?: number;
  /**
  * Should the upper bound (aka max) be excluded?
  * Note: Excluding max=Number.POSITIVE_INFINITY would result into having max set to 3.4028234663852886e+38.
  * @defaultValue false
  * @remarks Since 3.12.0
  */
  maxExcluded?: boolean;
  /**
  * By default, lower and upper bounds are -infinity and +infinity.
  * By setting noDefaultInfinity to true, you move those defaults to minimal and maximal finite values.
  * @defaultValue false
  * @remarks Since 2.8.0
  */
  noDefaultInfinity?: boolean;
  /**
  * When set to true, no more Number.NaN can be generated.
  * @defaultValue false
  * @remarks Since 2.8.0
  */
  noNaN?: boolean;
  /**
  * When set to true, Number.isInteger(value) will be false for any generated value.
  * Note: -infinity and +infinity, or NaN can stil be generated except if you rejected them via another constraint.
  * @defaultValue false
  * @remarks Since 3.18.0
  */
  noInteger?: boolean;
}
/**
* For 32-bit floating point numbers:
* - sign: 1 bit
* - significand: 23 bits
* - exponent: 8 bits
*
* The smallest non-zero value (in absolute value) that can be represented by such float is: 2 ** -126 * 2 ** -23.
* And the largest one is: 2 ** 127 * (1 + (2 ** 23 - 1) / 2 ** 23).
*
* @param constraints - Constraints to apply when building instances (since 2.8.0)
*
* @remarks Since 0.0.6
* @public
*/
declare function float(constraints?: FloatConstraints): Arbitrary<number>; //#endregion
//#region src/arbitrary/compareBooleanFunc.d.ts
/**
* For comparison boolean functions
*
* A comparison boolean function returns:
* - `true` whenever `a < b`
* - `false` otherwise (ie. `a = b` or `a > b`)
*
* @remarks Since 1.6.0
* @public
*/
declare function compareBooleanFunc<T>(): Arbitrary<(a: T, b: T) => boolean>; //#endregion
//#region src/arbitrary/compareFunc.d.ts
/**
* For comparison functions
*
* A comparison function returns:
* - negative value whenever `a < b`
* - positive value whenever `a > b`
* - zero whenever `a` and `b` are equivalent
*
* Comparison functions are transitive: `a < b and b < c => a < c`
*
* They also satisfy: `a < b <=> b > a` and `a = b <=> b = a`
*
* @remarks Since 1.6.0
* @public
*/
declare function compareFunc<T>(): Arbitrary<(a: T, b: T) => number>; //#endregion
//#region src/arbitrary/func.d.ts
/**
* For pure functions
*
* @param arb - Arbitrary responsible to produce the values
*
* @remarks Since 1.6.0
* @public
*/
declare function func<TArgs extends any[], TOut>(arb: Arbitrary<TOut>): Arbitrary<(...args: TArgs) => TOut>; //#endregion
//#region src/arbitrary/domain.d.ts
/**
* Constraints to be applied on {@link domain}
* @remarks Since 2.22.0
* @public
*/
interface DomainConstraints {
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For domains
* having an extension with at least two lowercase characters
*
* According to {@link https://www.ietf.org/rfc/rfc1034.txt | RFC 1034},
* {@link https://www.ietf.org/rfc/rfc1035.txt | RFC 1035},
* {@link https://www.ietf.org/rfc/rfc1123.txt | RFC 1123} and
* {@link https://url.spec.whatwg.org/ | WHATWG URL Standard}
*
* @param constraints - Constraints to apply when building instances (since 2.22.0)
*
* @remarks Since 1.14.0
* @public
*/
declare function domain(constraints?: DomainConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/integer.d.ts
/**
* Constraints to be applied on {@link integer}
* @remarks Since 2.6.0
* @public
*/
interface IntegerConstraints {
  /**
  * Lower bound for the generated integers (included)
  * @defaultValue -0x80000000
  * @remarks Since 2.6.0
  */
  min?: number;
  /**
  * Upper bound for the generated integers (included)
  * @defaultValue 0x7fffffff
  * @remarks Since 2.6.0
  */
  max?: number;
}
/**
* For integers between min (included) and max (included)
*
* @param constraints - Constraints to apply when building instances (since 2.6.0)
*
* @remarks Since 0.0.1
* @public
*/
declare function integer(constraints?: IntegerConstraints): Arbitrary<number>; //#endregion
//#region src/arbitrary/maxSafeInteger.d.ts
/**
* For integers between Number.MIN_SAFE_INTEGER (included) and Number.MAX_SAFE_INTEGER (included)
* @remarks Since 1.11.0
* @public
*/
declare function maxSafeInteger(): Arbitrary<number>; //#endregion
//#region src/arbitrary/maxSafeNat.d.ts
/**
* For positive integers between 0 (included) and Number.MAX_SAFE_INTEGER (included)
* @remarks Since 1.11.0
* @public
*/
declare function maxSafeNat(): Arbitrary<number>; //#endregion
//#region src/arbitrary/nat.d.ts
/**
* Constraints to be applied on {@link nat}
* @remarks Since 2.6.0
* @public
*/
interface NatConstraints {
  /**
  * Upper bound for the generated postive integers (included)
  * @defaultValue 0x7fffffff
  * @remarks Since 2.6.0
  */
  max?: number;
}
/**
* For positive integers between 0 (included) and 2147483647 (included)
* @remarks Since 0.0.1
* @public
*/
declare function nat(): Arbitrary<number>;
/**
* For positive integers between 0 (included) and max (included)
*
* @param max - Upper bound for the generated integers
*
* @remarks You may prefer to use `fc.nat({max})` instead.
* @remarks Since 0.0.1
* @public
*/
declare function nat(max: number): Arbitrary<number>;
/**
* For positive integers between 0 (included) and max (included)
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 2.6.0
* @public
*/
declare function nat(constraints: NatConstraints): Arbitrary<number>;
/**
* For positive integers between 0 (included) and max (included)
*
* @param arg - Either a maximum number or constraints to apply when building instances
*
* @remarks Since 2.6.0
* @public
*/
declare function nat(arg?: number | NatConstraints): Arbitrary<number>; //#endregion
//#region src/arbitrary/ipV4.d.ts
/**
* For valid IP v4
*
* Following {@link https://tools.ietf.org/html/rfc3986#section-3.2.2 | RFC 3986}
*
* @remarks Since 1.14.0
* @public
*/
declare function ipV4(): Arbitrary<string>; //#endregion
//#region src/arbitrary/ipV4Extended.d.ts
/**
* For valid IP v4 according to WhatWG
*
* Following {@link https://url.spec.whatwg.org/ | WhatWG}, the specification for web-browsers
*
* There is no equivalent for IP v6 according to the {@link https://url.spec.whatwg.org/#concept-ipv6-parser | IP v6 parser}
*
* @remarks Since 1.17.0
* @public
*/
declare function ipV4Extended(): Arbitrary<string>; //#endregion
//#region src/arbitrary/ipV6.d.ts
/**
* For valid IP v6
*
* Following {@link https://tools.ietf.org/html/rfc3986#section-3.2.2 | RFC 3986}
*
* @remarks Since 1.14.0
* @public
*/
declare function ipV6(): Arbitrary<string>; //#endregion
//#region src/arbitrary/letrec.d.ts
/**
* Type of the value produced by {@link letrec}
* @remarks Since 3.0.0
* @public
*/
type LetrecValue<T> = { [K in keyof T]: Arbitrary<T[K]> };
/**
* Strongly typed type for the `tie` function passed by {@link letrec} to the `builder` function we pass to it.
* You may want also want to use its loosely typed version {@link LetrecLooselyTypedTie}.
*
* @remarks Since 3.0.0
* @public
*/
interface LetrecTypedTie<T> {
  <K extends keyof T>(key: K): Arbitrary<T[K]>;
  (key: string): Arbitrary<unknown>;
}
/**
* Strongly typed type for the `builder` function passed to {@link letrec}.
* You may want also want to use its loosely typed version {@link LetrecLooselyTypedBuilder}.
*
* @remarks Since 3.0.0
* @public
*/
type LetrecTypedBuilder<T> = (tie: LetrecTypedTie<T>) => LetrecValue<T>;
/**
* Loosely typed type for the `tie` function passed by {@link letrec} to the `builder` function we pass to it.
* You may want also want to use its strongly typed version {@link LetrecTypedTie}.
*
* @remarks Since 3.0.0
* @public
*/
type LetrecLooselyTypedTie = (key: string) => Arbitrary<unknown>;
/**
* Loosely typed type for the `builder` function passed to {@link letrec}.
* You may want also want to use its strongly typed version {@link LetrecTypedBuilder}.
*
* @remarks Since 3.0.0
* @public
*/
type LetrecLooselyTypedBuilder<T> = (tie: LetrecLooselyTypedTie) => LetrecValue<T>;
/**
* For mutually recursive types
*
* @example
* ```typescript
* type Leaf = number;
* type Node = [Tree, Tree];
* type Tree = Node | Leaf;
* const { tree } = fc.letrec<{ tree: Tree, node: Node, leaf: Leaf }>(tie => ({
*   tree: fc.oneof({depthSize: 'small'}, tie('leaf'), tie('node')),
*   node: fc.tuple(tie('tree'), tie('tree')),
*   leaf: fc.nat()
* }));
* // tree is 50% of node, 50% of leaf
* // the ratio goes in favor of leaves as we go deeper in the tree (thanks to depthSize)
* ```
*
* @param builder - Arbitraries builder based on themselves (through `tie`)
*
* @remarks Since 1.16.0
* @public
*/
declare function letrec<T>(builder: T extends Record<string, unknown> ? LetrecTypedBuilder<T> : never): LetrecValue<T>;
/**
* For mutually recursive types
*
* @example
* ```typescript
* const { tree } = fc.letrec(tie => ({
*   tree: fc.oneof({depthSize: 'small'}, tie('leaf'), tie('node')),
*   node: fc.tuple(tie('tree'), tie('tree')),
*   leaf: fc.nat()
* }));
* // tree is 50% of node, 50% of leaf
* // the ratio goes in favor of leaves as we go deeper in the tree (thanks to depthSize)
* ```
*
* @param builder - Arbitraries builder based on themselves (through `tie`)
*
* @remarks Since 1.16.0
* @public
*/
declare function letrec<T>(builder: LetrecLooselyTypedBuilder<T>): LetrecValue<T>; //#endregion
//#region src/arbitrary/_internals/interfaces/EntityGraphTypes.d.ts
/**
* Defines the shape of a single entity type, where each field is associated with
* an arbitrary that generates values for that field.
*
* @example
* ```typescript
* // Employee entity with firstName and lastName fields
* { firstName: fc.string(), lastName: fc.string() }
* ```
*
* @remarks Since 4.5.0
* @public
*/
type ArbitraryStructure<TFields> = { [TField in keyof TFields]: Arbitrary<TFields[TField]> };
/**
* Defines all entity types and their data fields for {@link entityGraph}.
*
* This is the first argument to {@link entityGraph} and specifies the non-relational properties
* of each entity type. Each key is the name of an entity type and its value defines the
* arbitraries for that entity.
*
* @example
* ```typescript
* {
*   employee: { name: fc.string(), age: fc.nat(100) },
*   team: { name: fc.string(), size: fc.nat(50) }
* }
* ```
*
* @remarks Since 4.5.0
* @public
*/
type Arbitraries<TEntityFields> = { [TEntityName in keyof TEntityFields]: ArbitraryStructure<TEntityFields[TEntityName]> };
/**
* Cardinality of a relationship between entities.
*
* Determines how many target entities can be referenced:
* - `'0-1'`: Optional relationship — references zero or one target entity (value or undefined)
* - `'1'`: Required relationship — always references exactly one target entity
* - `'many'`: Multi-valued relationship — references an array of target entities (may be empty, no duplicates)
* - `'inverse'`: Inverse relationship — automatically computed array of entities that reference this entity through a specified forward relationship
*
* @remarks Since 4.5.0
* @public
*/
type Arity = "0-1" | "1" | "many" | "inverse";
/**
* Defines restrictions on which entities can be targeted by a relationship.
*
* - `'any'`: No restrictions — any entity of the target type can be referenced
* - `'exclusive'`: Each target entity can only be referenced by one relationship (prevents sharing)
* - `'successor'`: Target must appear later in the entity list (prevents cycles)
*
* @defaultValue 'any'
* @remarks Since 4.5.0
* @public
*/
type Strategy = "any" | "exclusive" | "successor";
/**
* Specifies a single relationship between entity types.
*
* A relationship defines how one entity type references another (or itself). This configuration
* determines both the cardinality of the relationship and any restrictions on which entities
* can be referenced.
*
* @example
* ```typescript
* // An employee has an optional manager who is also an employee
* { arity: '0-1', type: 'employee', strategy: 'successor' }
*
* // A team has exactly one department
* { arity: '1', type: 'department' }
*
* // An employee can have multiple competencies
* { arity: 'many', type: 'competency' }
* ```
*
* @remarks Since 4.5.0
* @public
*/
type Relationship<TTypeNames> = {
  /**
  * Cardinality of the relationship — determines how many target entities can be referenced.
  *
  * - `'0-1'`: Optional — produces undefined or a single instance of the target type
  * - `'1'`: Required — always produces a single instance of the target type
  * - `'many'`: Multi-valued — produces an array of target instances (may be empty, contains no duplicates)
  * - `'inverse'`: Inverse — automatically produces an array of entities that reference this entity via the specified forward relationship
  *
  * @remarks Since 4.5.0
  */
  arity: Arity;
  /**
  * The name of the entity type being referenced by this relationship.
  *
  * Must be one of the entity type names defined in the first argument to {@link entityGraph}.
  *
  * @remarks Since 4.5.0
  */
  type: TTypeNames;
} & ({
  arity: Exclude<Arity, "inverse">;
  /**
  * Constrains which target entities are eligible to be referenced.
  *
  * - `'any'`: No restrictions — any entity of the target type can be selected
  * - `'exclusive'`: Each target can only be used once — prevents multiple relationships from referencing the same entity
  * - `'successor'`: Target must appear after the source in the entity array — prevents self-references and cycles
  *
  * @defaultValue 'any'
  * @remarks Since 4.5.0
  */
  strategy?: Strategy;
} | {
  arity: "inverse";
  /**
  * Name of the forward relationship property in the target type that references this entity type.
  * The inverse relationship will contain all entities that reference this entity through that forward relationship.
  *
  * @example
  * ```typescript
  * // If 'employee' has 'team: { arity: "1", type: "team" }'
  * // Then 'team' can have 'members: { arity: "inverse", type: "employee", forwardRelationship: "team" }'
  * ```
  *
  * @remarks Since 4.5.0
  */
  forwardRelationship: string;
});
/**
* Defines all relationships between entity types for {@link entityGraph}.
*
* This is the second argument to {@link entityGraph} and specifies how entities reference each other.
* Each entity type can have zero or more relationship fields, where each field defines a link
* to other entities.
*
* @example
* ```typescript
* {
*   employee: {
*     manager: { arity: '0-1', type: 'employee' },
*     team: { arity: '1', type: 'team' }
*   },
*   team: {}
* }
* ```
*
* @remarks Since 4.5.0
* @public
*/
type EntityRelations<TEntityFields> = { [TEntityName in keyof TEntityFields]: { [TField in string]: Relationship<keyof TEntityFields> } };
type RelationsToValue<TRelations, TValues> = { [TField in keyof TRelations]: TRelations[TField] extends {
  arity: "0-1";
  type: infer TTypeName extends keyof TValues;
} ? TValues[TTypeName] | undefined : TRelations[TField] extends {
  arity: "1";
  type: infer TTypeName extends keyof TValues;
} ? TValues[TTypeName] : TRelations[TField] extends {
  arity: "many";
  type: infer TTypeName extends keyof TValues;
} ? TValues[TTypeName][] : TRelations[TField] extends {
  arity: "inverse";
  type: infer TTypeName extends keyof TValues;
} ? TValues[TTypeName][] : never };
type Prettify$1<T> = { [K in keyof T]: T[K] } & {};
type EntityGraphSingleValue<TEntityFields, TEntityRelations extends EntityRelations<TEntityFields>> = { [TEntityName in keyof TEntityFields]: Prettify$1<TEntityFields[TEntityName] & RelationsToValue<TEntityRelations[TEntityName], EntityGraphSingleValue<TEntityFields, TEntityRelations>>> };
/**
* Type of the values generated by {@link entityGraph}.
*
* The output is an object where each key is an entity type name and each value is an array
* of entities of that type. Each entity contains both its data fields (from arbitraries) and
* relationship fields (from relations), with relationships resolved to actual entity references.
*
* @remarks Since 4.5.0
* @public
*/
type EntityGraphValue<TEntityFields, TEntityRelations extends EntityRelations<TEntityFields>> = { [TEntityName in keyof EntityGraphSingleValue<TEntityFields, TEntityRelations>]: EntityGraphSingleValue<TEntityFields, TEntityRelations>[TEntityName][] }; //#endregion
//#region src/arbitrary/uniqueArray.d.ts
/**
* Shared constraints to be applied on {@link uniqueArray}
* @remarks Since 2.23.0
* @public
*/
type UniqueArraySharedConstraints = {
  /**
  * Lower bound of the generated array size
  * @defaultValue 0
  * @remarks Since 2.23.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated array size
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.23.0
  */
  maxLength?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.23.0
  */
  size?: SizeForArbitrary;
  /**
  * When receiving a depth identifier, the arbitrary will impact the depth
  * attached to it to avoid going too deep if it already generated lots of items.
  *
  * In other words, if the number of generated values within the collection is large
  * then the generated items will tend to be less deep to avoid creating structures a lot
  * larger than expected.
  *
  * For the moment, the depth is not taken into account to compute the number of items to
  * define for a precise generate call of the array. Just applied onto eligible items.
  *
  * @remarks Since 2.25.0
  */
  depthIdentifier?: DepthIdentifier | string;
};
/**
* Constraints implying known and optimized comparison function
* to be applied on {@link uniqueArray}
*
* @remarks Since 2.23.0
* @public
*/
type UniqueArrayConstraintsRecommended<T, U> = UniqueArraySharedConstraints & {
  /**
  * The operator to be used to compare the values after having applied the selector (if any):
  * - SameValue behaves like `Object.is` — {@link https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevalue}
  * - SameValueZero behaves like `Set` or `Map` — {@link https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero}
  * - IsStrictlyEqual behaves like `===` — {@link https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isstrictlyequal}
  * - Fully custom comparison function: it implies performance costs for large arrays
  *
  * @defaultValue 'SameValue'
  * @remarks Since 2.23.0
  */
  comparator?: "SameValue" | "SameValueZero" | "IsStrictlyEqual";
  /**
  * How we should project the values before comparing them together
  * @defaultValue (v =&gt; v)
  * @remarks Since 2.23.0
  */
  selector?: (v: T) => U;
};
/**
* Constraints implying a fully custom comparison function
* to be applied on {@link uniqueArray}
*
* WARNING - Imply an extra performance cost whenever you want to generate large arrays
*
* @remarks Since 2.23.0
* @public
*/
type UniqueArrayConstraintsCustomCompare<T> = UniqueArraySharedConstraints & {
  /**
  * The operator to be used to compare the values after having applied the selector (if any)
  * @remarks Since 2.23.0
  */
  comparator: (a: T, b: T) => boolean;
  /**
  * How we should project the values before comparing them together
  * @remarks Since 2.23.0
  */
  selector?: undefined;
};
/**
* Constraints implying fully custom comparison function and selector
* to be applied on {@link uniqueArray}
*
* WARNING - Imply an extra performance cost whenever you want to generate large arrays
*
* @remarks Since 2.23.0
* @public
*/
type UniqueArrayConstraintsCustomCompareSelect<T, U> = UniqueArraySharedConstraints & {
  /**
  * The operator to be used to compare the values after having applied the selector (if any)
  * @remarks Since 2.23.0
  */
  comparator: (a: U, b: U) => boolean;
  /**
  * How we should project the values before comparing them together
  * @remarks Since 2.23.0
  */
  selector: (v: T) => U;
};
/**
* Constraints implying known and optimized comparison function
* to be applied on {@link uniqueArray}
*
* The defaults relies on the defaults specified by {@link UniqueArrayConstraintsRecommended}
*
* @remarks Since 2.23.0
* @public
*/
type UniqueArrayConstraints<T, U> = UniqueArrayConstraintsRecommended<T, U> | UniqueArrayConstraintsCustomCompare<T> | UniqueArrayConstraintsCustomCompareSelect<T, U>;
/**
* For arrays of unique values coming from `arb`
*
* @param arb - Arbitrary used to generate the values inside the array
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 2.23.0
* @public
*/
declare function uniqueArray<T, U>(arb: Arbitrary<T>, constraints?: UniqueArrayConstraintsRecommended<T, U>): Arbitrary<T[]>;
/**
* For arrays of unique values coming from `arb`
*
* @param arb - Arbitrary used to generate the values inside the array
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 2.23.0
* @public
*/
declare function uniqueArray<T>(arb: Arbitrary<T>, constraints: UniqueArrayConstraintsCustomCompare<T>): Arbitrary<T[]>;
/**
* For arrays of unique values coming from `arb`
*
* @param arb - Arbitrary used to generate the values inside the array
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 2.23.0
* @public
*/
declare function uniqueArray<T, U>(arb: Arbitrary<T>, constraints: UniqueArrayConstraintsCustomCompareSelect<T, U>): Arbitrary<T[]>;
/**
* For arrays of unique values coming from `arb`
*
* @param arb - Arbitrary used to generate the values inside the array
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 2.23.0
* @public
*/
declare function uniqueArray<T, U>(arb: Arbitrary<T>, constraints: UniqueArrayConstraints<T, U>): Arbitrary<T[]>; //#endregion
//#region src/arbitrary/entityGraph.d.ts
/**
* Constraints to be applied on {@link entityGraph}
* @remarks Since 4.5.0
* @public
*/
type EntityGraphContraints<TEntityFields> = {
  /**
  * Controls the minimum number of entities generated for each entity type in the initial pool.
  *
  * The initial pool defines the baseline set of entities that are created before any relationships
  * are established. Other entities may be created later to satisfy relationship requirements.
  *
  * @example
  * ```typescript
  * // Ensure at least 2 employees and at most 5 teams in the initial pool
  * // But possibly more than 5 teams at the end
  * { initialPoolConstraints: { employee: { minLength: 2 }, team: { maxLength: 5 } } }
  * ```
  *
  * @defaultValue When unspecified, defaults from {@link array} are used for each entity type
  * @remarks Since 4.5.0
  */
  initialPoolConstraints?: { [EntityName in keyof TEntityFields]?: ArrayConstraints$1 };
  /**
  * Defines uniqueness criteria for entities of each type to prevent duplicate values.
  *
  * The selector function extracts a key from each entity. Entities with identical keys
  * (compared using `Object.is`) are considered duplicates and only one instance will be kept.
  *
  * @example
  * ```typescript
  * // Ensure employees have unique names
  * { unicityConstraints: { employee: (emp) => emp.name } }
  * ```
  *
  * @defaultValue All entities are considered unique (no deduplication is performed)
  * @remarks Since 4.5.0
  */
  unicityConstraints?: { [EntityName in keyof TEntityFields]?: UniqueArrayConstraintsRecommended<TEntityFields[EntityName], unknown>["selector"] };
  /**
  * Do not generate values with null prototype
  * @defaultValue false
  * @remarks Since 4.5.0
  */
  noNullPrototype?: boolean;
};
/**
* Generates interconnected entities with relationships based on a schema definition.
*
* This arbitrary creates structured data where entities can reference each other through defined
* relationships. The generated values automatically include links between entities, making it
* ideal for testing graph structures, relational data, or interconnected object models.
*
* The output is an object where each key corresponds to an entity type and the value is an array
* of entities of that type. Entities contain both their data fields and relationship links.
*
* @example
* ```typescript
* // Generate a simple directed graph where nodes link to other nodes
* fc.entityGraph(
*   { node: { id: fc.stringMatching(/^[A-Z][a-z]*$/) } },
*   { node: { linkTo: { arity: 'many', type: 'node' } } },
* )
* // Produces: { node: [{ id: "Abc", linkTo: [<node#1>, <node#0>] }, ...] }
* ```
*
* @example
* ```typescript
* // Generate employees with managers and teams
* fc.entityGraph(
*   {
*     employee: { name: fc.string() },
*     team: { name: fc.string() }
*   },
*   {
*     employee: {
*       manager: { arity: '0-1', type: 'employee' },  // Optional manager
*       team: { arity: '1', type: 'team' }           // Required team
*     },
*     team: {}
*   }
* )
* ```
*
* @param arbitraries - Defines the data fields for each entity type (non-relational properties)
* @param relations - Defines how entities reference each other (relational properties)
* @param constraints - Optional configuration to customize generation behavior
*
* @remarks Since 4.5.0
* @public
*/
declare function entityGraph<TEntityFields, TEntityRelations extends EntityRelations<TEntityFields>>(arbitraries: Arbitraries<TEntityFields>, relations: TEntityRelations, constraints?: EntityGraphContraints<TEntityFields>): Arbitrary<EntityGraphValue<TEntityFields, TEntityRelations>>; //#endregion
//#region src/arbitrary/lorem.d.ts
/**
* Constraints to be applied on {@link lorem}
* @remarks Since 2.5.0
* @public
*/
interface LoremConstraints {
  /**
  * Maximal number of entities:
  * - maximal number of words in case mode is 'words'
  * - maximal number of sentences in case mode is 'sentences'
  *
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.5.0
  */
  maxCount?: number;
  /**
  * Type of strings that should be produced by {@link lorem}:
  * - words: multiple words
  * - sentences: multiple sentences
  *
  * @defaultValue 'words'
  * @remarks Since 2.5.0
  */
  mode?: "words" | "sentences";
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
}
/**
* For lorem ipsum string of words or sentences with maximal number of words or sentences
*
* @param constraints - Constraints to be applied onto the generated value (since 2.5.0)
*
* @remarks Since 0.0.1
* @public
*/
declare function lorem(constraints?: LoremConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/map.d.ts
/**
* Constraints to be applied on {@link map}
* @remarks Since 4.4.0
* @public
*/
interface MapConstraints {
  /**
  * Lower bound for the number of entries defined into the generated instance
  * @defaultValue 0
  * @remarks Since 4.4.0
  */
  minKeys?: number;
  /**
  * Upper bound for the number of entries defined into the generated instance
  * @defaultValue 0x7fffffff
  * @remarks Since 4.4.0
  */
  maxKeys?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 4.4.0
  */
  size?: SizeForArbitrary;
  /**
  * Depth identifier can be used to share the current depth between several instances.
  *
  * By default, if not specified, each instance of map will have its own depth.
  * In other words: you can have depth=1 in one while you have depth=100 in another one.
  *
  * @remarks Since 4.4.0
  */
  depthIdentifier?: DepthIdentifier | string;
}
/**
* For Maps with keys produced by `keyArb` and values from `valueArb`
*
* @param keyArb - Arbitrary used to generate the keys of the Map
* @param valueArb - Arbitrary used to generate the values of the Map
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 4.4.0
* @public
*/
declare function map<K, V>(keyArb: Arbitrary<K>, valueArb: Arbitrary<V>, constraints?: MapConstraints): Arbitrary<Map<K, V>>; //#endregion
//#region src/arbitrary/mapToConstant.d.ts
/**
* Generate non-contiguous ranges of values
* by mapping integer values to constant
*
* @param options - Builders to be called to generate the values
*
* @example
* ```
* // generate alphanumeric values (a-z0-9)
* mapToConstant(
*   { num: 26, build: v => String.fromCharCode(v + 0x61) },
*   { num: 10, build: v => String.fromCharCode(v + 0x30) },
* )
* ```
*
* @remarks Since 1.14.0
* @public
*/
declare function mapToConstant<T>(...entries: {
  num: number;
  build: (idInGroup: number) => T;
}[]): Arbitrary<T>; //#endregion
//#region src/arbitrary/memo.d.ts
/**
* Output type for {@link memo}
* @remarks Since 1.16.0
* @public
*/
type Memo<T> = (maxDepth?: number) => Arbitrary<T>;
/**
* For mutually recursive types
*
* @example
* ```typescript
* // tree is 1 / 3 of node, 2 / 3 of leaf
* const tree: fc.Memo<Tree> = fc.memo(n => fc.oneof(node(n), leaf(), leaf()));
* const node: fc.Memo<Tree> = fc.memo(n => {
*   if (n <= 1) return fc.record({ left: leaf(), right: leaf() });
*   return fc.record({ left: tree(), right: tree() }); // tree() is equivalent to tree(n-1)
* });
* const leaf = fc.nat;
* ```
*
* @param builder - Arbitrary builder taken the maximal depth allowed as input (parameter `n`)
*
* @remarks Since 1.16.0
* @public
*/
declare function memo<T>(builder: (maxDepth: number) => Arbitrary<T>): Memo<T>; //#endregion
//#region src/arbitrary/mixedCase.d.ts
/**
* Constraints to be applied on {@link mixedCase}
* @remarks Since 1.17.0
* @public
*/
interface MixedCaseConstraints {
  /**
  * Transform a character to its upper and/or lower case version
  * @defaultValue try `toUpperCase` on the received code-point, if no effect try `toLowerCase`
  * @remarks Since 1.17.0
  */
  toggleCase?: (rawChar: string) => string;
  /**
  * In order to be fully reversable (only in case you want to shrink user definable values)
  * you should provide a function taking a string containing possibly toggled items and returning its
  * untoggled version.
  */
  untoggleAll?: (toggledString: string) => string;
}
/**
* Randomly switch the case of characters generated by `stringArb` (upper/lower)
*
* WARNING:
* Require bigint support.
* Under-the-hood the arbitrary relies on bigint to compute the flags that should be toggled or not.
*
* @param stringArb - Arbitrary able to build string values
* @param constraints - Constraints to be applied when computing upper/lower case version
*
* @remarks Since 1.17.0
* @public
*/
declare function mixedCase(stringArb: Arbitrary<string>, constraints?: MixedCaseConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/_shared/StringSharedConstraints.d.ts
/**
* Constraints to be applied on arbitraries for strings
* @remarks Since 2.4.0
* @public
*/
interface StringSharedConstraints {
  /**
  * Lower bound of the generated string length (included)
  * @defaultValue 0
  * @remarks Since 2.4.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated string length (included)
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.4.0
  */
  maxLength?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
} //#endregion
//#region src/arbitrary/string.d.ts
/**
* Constraints to be applied on arbitrary {@link string}
* @remarks Since 3.22.0
* @public
*/
type StringConstraints$1 = StringSharedConstraints & {
  /**
  * A string results from the join between several unitary strings produced by the Arbitrary instance defined by `unit`.
  * The `minLength` and `maxLength` refers to the number of these units composing the string. In other words it does not have to be confound with `.length` on an instance of string.
  *
  * A unit can either be a fully custom Arbitrary or one of the pre-defined options:
  * - `'grapheme'` - Any printable grapheme as defined by the Unicode standard. This unit includes graphemes that may:
  *   - Span multiple code points (e.g., `'\u{0061}\u{0300}'`)
  *   - Consist of multiple characters (e.g., `'\u{1f431}'`)
  *   - Include non-European and non-ASCII characters.
  *   - **Note:** Graphemes produced by this unit are designed to remain visually distinct when joined together.
  *   - **Note:** We are relying on the specifications of Unicode 15.
  * - `'grapheme-composite'` - Any printable grapheme limited to a single code point. This option produces graphemes limited to a single code point.
  *   - **Note:** Graphemes produced by this unit are designed to remain visually distinct when joined together.
  *   - **Note:** We are relying on the specifications of Unicode 15.
  * - `'grapheme-ascii'` - Any printable ASCII character.
  * - `'binary'` - Any possible code point (except half surrogate pairs), regardless of how it may combine with subsequent code points in the produced string. This unit produces a single code point within the full Unicode range (0000-10FFFF).
  * - `'binary-ascii'` - Any possible ASCII character, including control characters. This unit produces any code point in the range 0000-00FF.
  *
  * @defaultValue 'grapheme-ascii'
  * @remarks Since 3.22.0
  */
  unit?: "grapheme" | "grapheme-composite" | "grapheme-ascii" | "binary" | "binary-ascii" | Arbitrary<string>;
};
/**
* For strings of {@link char}
*
* @param constraints - Constraints to apply when building instances (since 2.4.0)
*
* @remarks Since 0.0.1
* @public
*/
declare function string(constraints?: StringConstraints$1): Arbitrary<string>; //#endregion
//#region src/arbitrary/_internals/helpers/QualifiedObjectConstraints.d.ts
/**
* Constraints for {@link anything} and {@link object}
* @public
*/
interface ObjectConstraints {
  /**
  * Limit the depth of the object by increasing the probability to generate simple values (defined via values)
  * as we go deeper in the object.
  * @remarks Since 2.20.0
  */
  depthSize?: DepthSize;
  /**
  * Maximal depth allowed
  * @defaultValue Number.POSITIVE_INFINITY — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 0.0.7
  */
  maxDepth?: number;
  /**
  * Maximal number of keys
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 1.13.0
  */
  maxKeys?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
  /**
  * Arbitrary for keys
  * @defaultValue {@link string}
  * @remarks Since 0.0.7
  */
  key?: Arbitrary<string>;
  /**
  * Arbitrary for values
  * @defaultValue {@link boolean}, {@link integer}, {@link double}, {@link string}, null, undefined, Number.NaN, +0, -0, Number.EPSILON, Number.MIN_VALUE, Number.MAX_VALUE, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY
  * @remarks Since 0.0.7
  */
  values?: Arbitrary<unknown>[];
  /**
  * Also generate boxed versions of values
  * @defaultValue false
  * @remarks Since 1.11.0
  */
  withBoxedValues?: boolean;
  /**
  * Also generate Set
  * @defaultValue false
  * @remarks Since 1.11.0
  */
  withSet?: boolean;
  /**
  * Also generate Map
  * @defaultValue false
  * @remarks Since 1.11.0
  */
  withMap?: boolean;
  /**
  * Also generate string representations of object instances
  * @defaultValue false
  * @remarks Since 1.17.0
  */
  withObjectString?: boolean;
  /**
  * Also generate object with null prototype
  * @defaultValue false
  * @remarks Since 1.23.0
  */
  withNullPrototype?: boolean;
  /**
  * Also generate BigInt
  * @defaultValue false
  * @remarks Since 1.26.0
  */
  withBigInt?: boolean;
  /**
  * Also generate Date
  * @defaultValue false
  * @remarks Since 2.5.0
  */
  withDate?: boolean;
  /**
  * Also generate typed arrays in: (Uint|Int)(8|16|32)Array and Float(32|64)Array
  * Remark: no typed arrays made of bigint
  * @defaultValue false
  * @remarks Since 2.9.0
  */
  withTypedArray?: boolean;
  /**
  * Also generate sparse arrays (arrays with holes)
  * @defaultValue false
  * @remarks Since 2.13.0
  */
  withSparseArray?: boolean;
  /**
  * Replace the arbitrary of strings defaulted for key and values by one able to generate unicode strings with non-ascii characters.
  * If you override key and/or values constraint, this flag will not apply to your override.
  * @deprecated Prefer using `stringUnit` to customize the kind of strings that will be generated by default.
  * @defaultValue false
  * @remarks Since 3.19.0
  */
  withUnicodeString?: boolean;
  /**
  * Replace the default unit for strings.
  * @defaultValue undefined
  * @remarks Since 3.23.0
  */
  stringUnit?: StringConstraints$1["unit"];
} //#endregion
//#region src/arbitrary/object.d.ts
/**
* For any objects
*
* You may use {@link sample} to preview the values that will be generated
*
* @example
* ```javascript
* {}, {k: [{}, 1, 2]}
* ```
*
* @remarks Since 0.0.7
* @public
*/
declare function object(): Arbitrary<Record<string, unknown>>;
/**
* For any objects following the constraints defined by `settings`
*
* You may use {@link sample} to preview the values that will be generated
*
* @example
* ```javascript
* {}, {k: [{}, 1, 2]}
* ```
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 0.0.7
* @public
*/
declare function object(constraints: ObjectConstraints): Arbitrary<Record<string, unknown>>; //#endregion
//#region src/arbitrary/_internals/helpers/JsonConstraintsBuilder.d.ts
/**
* Shared constraints for:
* - {@link json},
* - {@link jsonValue},
*
* @remarks Since 2.5.0
* @public
*/
interface JsonSharedConstraints {
  /**
  * Limit the depth of the object by increasing the probability to generate simple values (defined via values)
  * as we go deeper in the object.
  *
  * @remarks Since 2.20.0
  */
  depthSize?: DepthSize;
  /**
  * Maximal depth allowed
  * @defaultValue Number.POSITIVE_INFINITY — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.5.0
  */
  maxDepth?: number;
  /**
  * Only generate instances having keys and values made of ascii strings (when true)
  * @deprecated Prefer using `stringUnit` to customize the kind of strings that will be generated by default.
  * @defaultValue true
  * @remarks Since 3.19.0
  */
  noUnicodeString?: boolean;
  /**
  * Replace the default unit for strings.
  * @defaultValue undefined
  * @remarks Since 3.23.0
  */
  stringUnit?: StringConstraints$1["unit"];
}
/**
* Typings for a Json array
* @remarks Since 2.20.0
* @public
*/
type JsonArray = Array<JsonValue>;
/**
* Typings for a Json object
* @remarks Since 2.20.0
* @public
*/
type JsonObject = { [key in string]?: JsonValue };
/**
* Typings for a Json value
* @remarks Since 2.20.0
* @public
*/
type JsonValue = boolean | number | string | null | JsonArray | JsonObject; //#endregion
//#region src/arbitrary/json.d.ts
/**
* For any JSON strings
*
* Keys and string values rely on {@link string}
*
* @param constraints - Constraints to be applied onto the generated instance (since 2.5.0)
*
* @remarks Since 0.0.7
* @public
*/
declare function json(constraints?: JsonSharedConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/anything.d.ts
/**
* For any type of values
*
* You may use {@link sample} to preview the values that will be generated
*
* @example
* ```javascript
* null, undefined, 42, 6.5, 'Hello', {}, {k: [{}, 1, 2]}
* ```
*
* @remarks Since 0.0.7
* @public
*/
declare function anything(): Arbitrary<unknown>;
/**
* For any type of values following the constraints defined by `settings`
*
* You may use {@link sample} to preview the values that will be generated
*
* @example
* ```javascript
* null, undefined, 42, 6.5, 'Hello', {}, {k: [{}, 1, 2]}
* ```
*
* @example
* ```typescript
* // Using custom settings
* fc.anything({
*     key: fc.string(),
*     values: [fc.integer(10,20), fc.constant(42)],
*     maxDepth: 2
* });
* // Can build entries such as:
* // - 19
* // - [{"2":12,"k":15,"A":42}]
* // - {"4":[19,13,14,14,42,11,20,11],"6":42,"7":16,"L":10,"'":[20,11],"e":[42,20,42,14,13,17]}
* // - [42,42,42]...
* ```
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 0.0.7
* @public
*/
declare function anything(constraints: ObjectConstraints): Arbitrary<unknown>; //#endregion
//#region src/arbitrary/jsonValue.d.ts
/**
* For any JSON compliant values
*
* Keys and string values rely on {@link string}
*
* As `JSON.parse` preserves `-0`, `jsonValue` can also have `-0` as a value.
* `jsonValue` must be seen as: any value that could have been built by doing a `JSON.parse` on a given string.
*
* @param constraints - Constraints to be applied onto the generated instance
*
* @remarks Since 2.20.0
* @public
*/
declare function jsonValue(constraints?: JsonSharedConstraints): Arbitrary<JsonValue>; //#endregion
//#region src/arbitrary/oneof.d.ts
/**
* Conjonction of a weight and an arbitrary used by {@link oneof}
* in order to generate values
*
* @remarks Since 1.18.0
* @public
*/
interface WeightedArbitrary<T> {
  /**
  * Weight to be applied when selecting which arbitrary should be used
  * @remarks Since 0.0.7
  */
  weight: number;
  /**
  * Instance of Arbitrary
  * @remarks Since 0.0.7
  */
  arbitrary: Arbitrary<T>;
}
/**
* Either an `Arbitrary<T>` or a `WeightedArbitrary<T>`
* @remarks Since 3.0.0
* @public
*/
type MaybeWeightedArbitrary<T> = Arbitrary<T> | WeightedArbitrary<T>;
/**
* Infer the type of the Arbitrary produced by {@link oneof}
* given the type of the source arbitraries
*
* @remarks Since 2.2.0
* @public
*/
type OneOfValue<Ts extends MaybeWeightedArbitrary<unknown>[]> = { [K in keyof Ts]: Ts[K] extends MaybeWeightedArbitrary<infer U> ? U : never }[number];
/**
* Constraints to be applied on {@link oneof}
* @remarks Since 2.14.0
* @public
*/
type OneOfConstraints = {
  /**
  * When set to true, the shrinker of oneof will try to check if the first arbitrary
  * could have been used to discover an issue. It allows to shrink trees.
  *
  * Warning: First arbitrary must be the one resulting in the smallest structures
  * for usages in deep tree-like structures.
  *
  * @defaultValue false
  * @remarks Since 2.14.0
  */
  withCrossShrink?: boolean;
  /**
  * While going deeper and deeper within a recursive structure (see {@link letrec}),
  * this factor will be used to increase the probability to generate instances
  * of the first passed arbitrary.
  *
  * @remarks Since 2.14.0
  */
  depthSize?: DepthSize;
  /**
  * Maximal authorized depth.
  * Once this depth has been reached only the first arbitrary will be used.
  *
  * @defaultValue Number.POSITIVE_INFINITY — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.14.0
  */
  maxDepth?: number;
  /**
  * Depth identifier can be used to share the current depth between several instances.
  *
  * By default, if not specified, each instance of oneof will have its own depth.
  * In other words: you can have depth=1 in one while you have depth=100 in another one.
  *
  * @remarks Since 2.14.0
  */
  depthIdentifier?: DepthIdentifier | string;
};
/**
* For one of the values generated by `...arbs` - with all `...arbs` equiprobable
*
* **WARNING**: It expects at least one arbitrary
*
* @param arbs - Arbitraries that might be called to produce a value
*
* @remarks Since 0.0.1
* @public
*/
declare function oneof<Ts extends MaybeWeightedArbitrary<unknown>[]>(...arbs: Ts): Arbitrary<OneOfValue<Ts>>;
/**
* For one of the values generated by `...arbs` - with all `...arbs` equiprobable
*
* **WARNING**: It expects at least one arbitrary
*
* @param constraints - Constraints to be applied when generating the values
* @param arbs - Arbitraries that might be called to produce a value
*
* @remarks Since 2.14.0
* @public
*/
declare function oneof<Ts extends MaybeWeightedArbitrary<unknown>[]>(constraints: OneOfConstraints, ...arbs: Ts): Arbitrary<OneOfValue<Ts>>; //#endregion
//#region src/arbitrary/option.d.ts
/**
* Constraints to be applied on {@link option}
* @remarks Since 2.2.0
* @public
*/
interface OptionConstraints<TNil = null> {
  /**
  * The probability to build a nil value is of `1 / freq`.
  * @defaultValue 6
  * @remarks Since 1.17.0
  */
  freq?: number;
  /**
  * The nil value
  * @defaultValue null
  * @remarks Since 1.17.0
  */
  nil?: TNil;
  /**
  * While going deeper and deeper within a recursive structure (see {@link letrec}),
  * this factor will be used to increase the probability to generate nil.
  *
  * @remarks Since 2.14.0
  */
  depthSize?: DepthSize;
  /**
  * Maximal authorized depth. Once this depth has been reached only nil will be used.
  * @defaultValue Number.POSITIVE_INFINITY — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.14.0
  */
  maxDepth?: number;
  /**
  * Depth identifier can be used to share the current depth between several instances.
  *
  * By default, if not specified, each instance of option will have its own depth.
  * In other words: you can have depth=1 in one while you have depth=100 in another one.
  *
  * @remarks Since 2.14.0
  */
  depthIdentifier?: DepthIdentifier | string;
}
/**
* For either nil or a value coming from `arb` with custom frequency
*
* @param arb - Arbitrary that will be called to generate a non nil value
* @param constraints - Constraints on the option(since 1.17.0)
*
* @remarks Since 0.0.6
* @public
*/
declare function option<T, TNil = null>(arb: Arbitrary<T>, constraints?: OptionConstraints<TNil>): Arbitrary<T | TNil>; //#endregion
//#region src/arbitrary/record.d.ts
type Prettify<T> = { [K in keyof T]: T[K] } & {};
/**
* Constraints to be applied on {@link record}
* @remarks Since 0.0.12
* @public
*/
type RecordConstraints<T = unknown> = {
  /**
  * List keys that should never be deleted.
  *
  * Remark:
  * You might need to use an explicit typing in case you need to declare symbols as required (not needed when required keys are simple strings).
  * With something like `{ requiredKeys: [mySymbol1, 'a'] as [typeof mySymbol1, 'a'] }` when both `mySymbol1` and `a` are required.
  *
  * @defaultValue Array containing all keys of recordModel
  * @remarks Since 2.11.0
  */
  requiredKeys?: T[];
  /**
  * Do not generate records with null prototype
  * @defaultValue false
  * @remarks Since 3.13.0
  */
  noNullPrototype?: boolean;
};
/**
* Infer the type of the Arbitrary produced by record
* given the type of the source arbitrary and constraints to be applied
*
* @remarks Since 2.2.0
* @public
*/
type RecordValue<T, K> = Prettify<Partial<T> & Pick<T, K & keyof T>>;
/**
* For records following the `recordModel` schema
*
* @example
* ```typescript
* record({ x: someArbitraryInt, y: someArbitraryInt }, {requiredKeys: []}): Arbitrary<{x?:number,y?:number}>
* // merge two integer arbitraries to produce a {x, y}, {x}, {y} or {} record
* ```
*
* @param recordModel - Schema of the record
* @param constraints - Contraints on the generated record
*
* @remarks Since 0.0.12
* @public
*/
declare function record<T, K extends keyof T = keyof T>(model: { [K in keyof T]: Arbitrary<T[K]> }, constraints?: RecordConstraints<K>): Arbitrary<RecordValue<T, K>>; //#endregion
//#region src/arbitrary/set.d.ts
/**
* Constraints to be applied on {@link set}
* @remarks Since 4.4.0
* @public
*/
type SetConstraints = {
  /**
  * Lower bound of the generated set size
  * @defaultValue 0
  * @remarks Since 4.4.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated set size
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 4.4.0
  */
  maxLength?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 4.4.0
  */
  size?: SizeForArbitrary;
  /**
  * When receiving a depth identifier, the arbitrary will impact the depth
  * attached to it to avoid going too deep if it already generated lots of items.
  *
  * In other words, if the number of generated values within the collection is large
  * then the generated items will tend to be less deep to avoid creating structures a lot
  * larger than expected.
  *
  * For the moment, the depth is not taken into account to compute the number of items to
  * define for a precise generate call of the set. Just applied onto eligible items.
  *
  * @remarks Since 4.4.0
  */
  depthIdentifier?: DepthIdentifier | string;
};
/**
* For sets of values coming from `arb`
*
* All the values in the set are unique. Comparison of values relies on `SameValueZero`
* which is the same comparison algorithm used by `Set`.
*
* @param arb - Arbitrary used to generate the values inside the set
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 4.4.0
* @public
*/
declare function set<T>(arb: Arbitrary<T>, constraints?: SetConstraints): Arbitrary<Set<T>>; //#endregion
//#region src/arbitrary/infiniteStream.d.ts
/**
* Constraints to be applied on {@link infiniteStream}
* @remarks Since 4.3.0
* @public
*/
interface InfiniteStreamConstraints {
  /**
  * Do not save items emitted by this arbitrary and print count instead.
  * Recommended for very large tests.
  *
  * @defaultValue false
  */
  noHistory?: boolean;
}
/**
* Produce an infinite stream of values
*
* WARNING: By default, infiniteStream remembers all values it has ever
* generated. This causes unbounded memory growth during large tests.
* Set noHistory to disable.
*
* WARNING: Requires Object.assign
*
* @param arb - Arbitrary used to generate the values
* @param constraints - Constraints to apply when building instances (since 4.3.0)
*
* @remarks Since 1.8.0
* @public
*/
declare function infiniteStream<T>(arb: Arbitrary<T>, constraints?: InfiniteStreamConstraints): Arbitrary<Stream<T>>; //#endregion
//#region src/arbitrary/base64String.d.ts
/**
* For base64 strings
*
* A base64 string will always have a length multiple of 4 (padded with =)
*
* @param constraints - Constraints to apply when building instances (since 2.4.0)
*
* @remarks Since 0.0.1
* @public
*/
declare function base64String(constraints?: StringSharedConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/subarray.d.ts
/**
* Constraints to be applied on {@link subarray}
* @remarks Since 2.4.0
* @public
*/
interface SubarrayConstraints {
  /**
  * Lower bound of the generated subarray size (included)
  * @defaultValue 0
  * @remarks Since 2.4.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated subarray size (included)
  * @defaultValue The length of the original array itself
  * @remarks Since 2.4.0
  */
  maxLength?: number;
}
/**
* For subarrays of `originalArray` (keeps ordering)
*
* @param originalArray - Original array
* @param constraints - Constraints to apply when building instances (since 2.4.0)
*
* @remarks Since 1.5.0
* @public
*/
declare function subarray<T>(originalArray: T[], constraints?: SubarrayConstraints): Arbitrary<T[]>; //#endregion
//#region src/arbitrary/shuffledSubarray.d.ts
/**
* Constraints to be applied on {@link shuffledSubarray}
* @remarks Since 2.18.0
* @public
*/
interface ShuffledSubarrayConstraints {
  /**
  * Lower bound of the generated subarray size (included)
  * @defaultValue 0
  * @remarks Since 2.4.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated subarray size (included)
  * @defaultValue The length of the original array itself
  * @remarks Since 2.4.0
  */
  maxLength?: number;
}
/**
* For subarrays of `originalArray`
*
* @param originalArray - Original array
* @param constraints - Constraints to apply when building instances (since 2.4.0)
*
* @remarks Since 1.5.0
* @public
*/
declare function shuffledSubarray<T>(originalArray: T[], constraints?: ShuffledSubarrayConstraints): Arbitrary<T[]>; //#endregion
//#region src/arbitrary/tuple.d.ts
/**
* For tuples produced using the provided `arbs`
*
* @param arbs - Ordered list of arbitraries
*
* @remarks Since 0.0.1
* @public
*/
declare function tuple<Ts extends unknown[]>(...arbs: { [K in keyof Ts]: Arbitrary<Ts[K]> }): Arbitrary<Ts>; //#endregion
//#region src/arbitrary/ulid.d.ts
/**
* For ulid
*
* According to {@link https://github.com/ulid/spec | ulid spec}
*
* No mixed case, only upper case digits (0-9A-Z except for: I,L,O,U)
*
* @remarks Since 3.11.0
* @public
*/
declare function ulid(): Arbitrary<string>; //#endregion
//#region src/arbitrary/uuid.d.ts
/**
* Constraints to be applied on {@link uuid}
* @remarks Since 3.21.0
* @public
*/
interface UuidConstraints {
  /**
  * Define accepted versions in the [1-15] according to {@link https://datatracker.ietf.org/doc/html/rfc9562#name-version-field | RFC 9562}
  * @defaultValue [1,2,3,4,5,6,7,8]
  * @remarks Since 3.21.0
  */
  version?: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15) | (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15)[];
}
/**
* For UUID from v1 to v5
*
* According to {@link https://tools.ietf.org/html/rfc4122 | RFC 4122}
*
* No mixed case, only lower case digits (0-9a-f)
*
* @remarks Since 1.17.0
* @public
*/
declare function uuid(constraints?: UuidConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/webAuthority.d.ts
/**
* Constraints to be applied on {@link webAuthority}
* @remarks Since 1.14.0
* @public
*/
interface WebAuthorityConstraints {
  /**
  * Enable IPv4 in host
  * @defaultValue false
  * @remarks Since 1.14.0
  */
  withIPv4?: boolean;
  /**
  * Enable IPv6 in host
  * @defaultValue false
  * @remarks Since 1.14.0
  */
  withIPv6?: boolean;
  /**
  * Enable extended IPv4 format
  * @defaultValue false
  * @remarks Since 1.17.0
  */
  withIPv4Extended?: boolean;
  /**
  * Enable user information prefix
  * @defaultValue false
  * @remarks Since 1.14.0
  */
  withUserInfo?: boolean;
  /**
  * Enable port suffix
  * @defaultValue false
  * @remarks Since 1.14.0
  */
  withPort?: boolean;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For web authority
*
* According to {@link https://www.ietf.org/rfc/rfc3986.txt | RFC 3986} - `authority = [ userinfo "@" ] host [ ":" port ]`
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 1.14.0
* @public
*/
declare function webAuthority(constraints?: WebAuthorityConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/webFragments.d.ts
/**
* Constraints to be applied on {@link webFragments}
* @remarks Since 2.22.0
* @public
*/
interface WebFragmentsConstraints {
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For fragments of an URI (web included)
*
* According to {@link https://www.ietf.org/rfc/rfc3986.txt | RFC 3986}
*
* eg.: In the url `https://domain/plop?page=1#hello=1&world=2`, `?hello=1&world=2` are query parameters
*
* @param constraints - Constraints to apply when building instances (since 2.22.0)
*
* @remarks Since 1.14.0
* @public
*/
declare function webFragments(constraints?: WebFragmentsConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/webPath.d.ts
/**
* Constraints to be applied on {@link webPath}
* @remarks Since 3.3.0
* @public
*/
interface WebPathConstraints {
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 3.3.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For web path
*
* According to {@link https://www.ietf.org/rfc/rfc3986.txt | RFC 3986} and
* {@link https://url.spec.whatwg.org/ | WHATWG URL Standard}
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 3.3.0
* @public
*/
declare function webPath(constraints?: WebPathConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/webQueryParameters.d.ts
/**
* Constraints to be applied on {@link webQueryParameters}
* @remarks Since 2.22.0
* @public
*/
interface WebQueryParametersConstraints {
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For query parameters of an URI (web included)
*
* According to {@link https://www.ietf.org/rfc/rfc3986.txt | RFC 3986}
*
* eg.: In the url `https://domain/plop/?hello=1&world=2`, `?hello=1&world=2` are query parameters
*
* @param constraints - Constraints to apply when building instances (since 2.22.0)
*
* @remarks Since 1.14.0
* @public
*/
declare function webQueryParameters(constraints?: WebQueryParametersConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/webSegment.d.ts
/**
* Constraints to be applied on {@link webSegment}
* @remarks Since 2.22.0
* @public
*/
interface WebSegmentConstraints {
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For internal segment of an URI (web included)
*
* According to {@link https://www.ietf.org/rfc/rfc3986.txt | RFC 3986}
*
* eg.: In the url `https://github.com/dubzzz/fast-check/`, `dubzzz` and `fast-check` are segments
*
* @param constraints - Constraints to apply when building instances (since 2.22.0)
*
* @remarks Since 1.14.0
* @public
*/
declare function webSegment(constraints?: WebSegmentConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/webUrl.d.ts
/**
* Constraints to be applied on {@link webUrl}
* @remarks Since 1.14.0
* @public
*/
interface WebUrlConstraints {
  /**
  * Enforce specific schemes, eg.: http, https
  * @defaultValue ['http', 'https']
  * @remarks Since 1.14.0
  */
  validSchemes?: string[];
  /**
  * Settings for {@link webAuthority}
  * @defaultValue &#123;&#125;
  * @remarks Since 1.14.0
  */
  authoritySettings?: WebAuthorityConstraints;
  /**
  * Enable query parameters in the generated url
  * @defaultValue false
  * @remarks Since 1.14.0
  */
  withQueryParameters?: boolean;
  /**
  * Enable fragments in the generated url
  * @defaultValue false
  * @remarks Since 1.14.0
  */
  withFragments?: boolean;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: Exclude<SizeForArbitrary, "max">;
}
/**
* For web url
*
* According to {@link https://www.ietf.org/rfc/rfc3986.txt | RFC 3986} and
* {@link https://url.spec.whatwg.org/ | WHATWG URL Standard}
*
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 1.14.0
* @public
*/
declare function webUrl(constraints?: WebUrlConstraints): Arbitrary<string>; //#endregion
//#region src/check/model/command/ICommand.d.ts
/**
* Interface that should be implemented in order to define a command
* @remarks Since 1.5.0
* @public
*/
interface ICommand<Model extends object, Real, RunResult, CheckAsync extends boolean = false> {
  /**
  * Check if the model is in the right state to apply the command
  *
  * WARNING: does not change the model
  *
  * @param m - Model, simplified or schematic representation of real system
  *
  * @remarks Since 1.5.0
  */
  check(m: Readonly<Model>): CheckAsync extends false ? boolean : Promise<boolean>;
  /**
  * Receive the non-updated model and the real or system under test.
  * Perform the checks post-execution - Throw in case of invalid state.
  * Update the model accordingly
  *
  * @param m - Model, simplified or schematic representation of real system
  * @param r - Sytem under test
  *
  * @remarks Since 1.5.0
  */
  run(m: Model, r: Real): RunResult;
  /**
  * Name of the command
  * @remarks Since 1.5.0
  */
  toString(): string;
} //#endregion
//#region src/check/model/command/AsyncCommand.d.ts
/**
* Interface that should be implemented in order to define
* an asynchronous command
*
* @remarks Since 1.5.0
* @public
*/
interface AsyncCommand<Model extends object, Real, CheckAsync extends boolean = false> extends ICommand<Model, Real, Promise<void>, CheckAsync> {} //#endregion
//#region src/check/model/command/Command.d.ts
/**
* Interface that should be implemented in order to define
* a synchronous command
*
* @remarks Since 1.5.0
* @public
*/
interface Command<Model extends object, Real> extends ICommand<Model, Real, void> {} //#endregion
//#region src/check/model/commands/CommandsContraints.d.ts
/**
* Parameters for {@link commands}
* @remarks Since 2.2.0
* @public
*/
interface CommandsContraints {
  /**
  * Maximal number of commands to generate per run
  *
  * You probably want to use `size` instead.
  *
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 1.11.0
  */
  maxCommands?: number;
  /**
  * Define how large the generated values (number of commands) should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
  /**
  * Do not show replayPath in the output
  * @defaultValue false
  * @remarks Since 1.11.0
  */
  disableReplayLog?: boolean;
  /**
  * Hint for replay purposes only
  *
  * Should be used in conjonction with `{ seed, path }` of {@link assert}
  *
  * @remarks Since 1.11.0
  */
  replayPath?: string;
} //#endregion
//#region src/arbitrary/commands.d.ts
/**
* For arrays of {@link AsyncCommand} to be executed by {@link asyncModelRun}
*
* This implementation comes with a shrinker adapted for commands.
* It should shrink more efficiently than {@link array} for {@link AsyncCommand} arrays.
*
* @param commandArbs - Arbitraries responsible to build commands
* @param constraints - Constraints to be applied when generating the commands (since 1.11.0)
*
* @remarks Since 1.5.0
* @public
*/
declare function commands<Model extends object, Real, CheckAsync extends boolean>(commandArbs: Arbitrary<AsyncCommand<Model, Real, CheckAsync>>[], constraints?: CommandsContraints): Arbitrary<Iterable<AsyncCommand<Model, Real, CheckAsync>>>;
/**
* For arrays of {@link Command} to be executed by {@link modelRun}
*
* This implementation comes with a shrinker adapted for commands.
* It should shrink more efficiently than {@link array} for {@link Command} arrays.
*
* @param commandArbs - Arbitraries responsible to build commands
* @param constraints - Constraints to be applied when generating the commands (since 1.11.0)
*
* @remarks Since 1.5.0
* @public
*/
declare function commands<Model extends object, Real>(commandArbs: Arbitrary<Command<Model, Real>>[], constraints?: CommandsContraints): Arbitrary<Iterable<Command<Model, Real>>>; //#endregion
//#region src/arbitrary/_internals/interfaces/Scheduler.d.ts
/**
* Function responsible to run the passed function and surround it with whatever needed.
* The name has been inspired from the `act` function coming with React.
*
* This wrapper function is not supposed to throw. The received function f will never throw.
*
* Wrapping order in the following:
*
* - global act defined on `fc.scheduler` wraps wait level one
* - wait act defined on `s.waitX` wraps local one
* - local act defined on `s.scheduleX(...)` wraps the trigger function
*
* @remarks Since 3.9.0
* @public
*/
type SchedulerAct = (f: () => Promise<void>) => Promise<void>;
/**
* Instance able to reschedule the ordering of promises for a given app
* @remarks Since 1.20.0
* @public
*/
interface Scheduler<TMetaData = unknown> {
  /**
  * Wrap a new task using the Scheduler
  * @remarks Since 1.20.0
  */
  schedule: <T>(task: Promise<T>, label?: string, metadata?: TMetaData, customAct?: SchedulerAct) => Promise<T>;
  /**
  * Automatically wrap function output using the Scheduler
  * @remarks Since 1.20.0
  */
  scheduleFunction: <TArgs extends any[], T>(asyncFunction: (...args: TArgs) => Promise<T>, customAct?: SchedulerAct) => (...args: TArgs) => Promise<T>;
  /**
  * Schedule a sequence of Promise to be executed sequencially.
  * Items within the sequence might be interleaved by other scheduled operations.
  *
  * Please note that whenever an item from the sequence has started,
  * the scheduler will wait until its end before moving to another scheduled task.
  *
  * A handle is returned by the function in order to monitor the state of the sequence.
  * Sequence will be marked:
  * - done if all the promises have been executed properly
  * - faulty if one of the promises within the sequence throws
  *
  * @remarks Since 1.20.0
  */
  scheduleSequence(sequenceBuilders: SchedulerSequenceItem<TMetaData>[], customAct?: SchedulerAct): {
    done: boolean;
    faulty: boolean;
    task: Promise<{
      done: boolean;
      faulty: boolean;
    }>;
  };
  /**
  * Count of pending scheduled tasks
  * @remarks Since 1.20.0
  */
  count(): number;
  /**
  * Wait one scheduled task to be executed
  * @throws Whenever there is no task scheduled
  * @remarks Since 1.20.0
  * @deprecated Use `waitNext(1)` instead, it comes with a more predictable behavior
  */
  waitOne: (customAct?: SchedulerAct) => Promise<void>;
  /**
  * Wait all scheduled tasks,
  * including the ones that might be created by one of the resolved task
  * @remarks Since 1.20.0
  * @deprecated Use `waitIdle()` instead, it comes with a more predictable behavior awaiting all scheduled and reachable tasks to be completed
  */
  waitAll: (customAct?: SchedulerAct) => Promise<void>;
  /**
  * Wait and schedule exactly `count` scheduled tasks.
  * @remarks Since 4.2.0
  */
  waitNext: (count: number, customAct?: SchedulerAct) => Promise<void>;
  /**
  * Wait until the scheduler becomes idle: all scheduled and reachable tasks have completed.
  *
  * It will include tasks scheduled by other tasks, recursively.
  *
  * Note: Tasks triggered by uncontrolled sources (like `fetch` or external events) cannot be detected
  * or awaited and may lead to incomplete waits.
  *
  * If you want to wait for a precise event to happen you should rather opt for `waitFor` or `waitNext`
  * given they offer you a more granular control on what you are exactly waiting for.
  *
  * @remarks Since 4.2.0
  */
  waitIdle: (customAct?: SchedulerAct) => Promise<void>;
  /**
  * Wait as many scheduled tasks as need to resolve the received Promise
  *
  * Some tests frameworks like `supertest` are not triggering calls to subsequent queries in a synchronous way,
  * some are waiting an explicit call to `then` to trigger them (either synchronously or asynchronously)...
  * As a consequence, none of `waitOne` or `waitAll` cannot wait for them out-of-the-box.
  *
  * This helper is responsible to wait as many scheduled tasks as needed (but the bare minimal) to get
  * `unscheduledTask` resolved. Once resolved it returns its output either success or failure.
  *
  * Be aware that while this helper will wait eveything to be ready for `unscheduledTask` to resolve,
  * having uncontrolled tasks triggering stuff required for `unscheduledTask` might be a source a uncontrollable
  * and not reproducible randomness as those triggers cannot be handled and scheduled by fast-check.
  *
  * @remarks Since 2.24.0
  */
  waitFor: <T>(unscheduledTask: Promise<T>, customAct?: SchedulerAct) => Promise<T>;
  /**
  * Produce an array containing all the scheduled tasks so far with their execution status.
  * If the task has been executed, it includes a string representation of the associated output or error produced by the task if any.
  *
  * Tasks will be returned in the order they get executed by the scheduler.
  *
  * @remarks Since 1.25.0
  */
  report: () => SchedulerReportItem<TMetaData>[];
}
/**
* Define an item to be passed to `scheduleSequence`
* @remarks Since 1.20.0
* @public
*/
type SchedulerSequenceItem<TMetaData = unknown> = {
  /**
  * Builder to start the task
  * @remarks Since 1.20.0
  */
  builder: () => Promise<any>;
  /**
  * Label
  * @remarks Since 1.20.0
  */
  label: string;
  /**
  * Metadata to be attached into logs
  * @remarks Since 1.25.0
  */
  metadata?: TMetaData;
} | (() => Promise<any>);
/**
* Describe a task for the report produced by the scheduler
* @remarks Since 1.25.0
* @public
*/
interface SchedulerReportItem<TMetaData = unknown> {
  /**
  * Execution status for this task
  * - resolved: task released by the scheduler and successful
  * - rejected: task released by the scheduler but with errors
  * - pending:  task still pending in the scheduler, not released yet
  *
  * @remarks Since 1.25.0
  */
  status: "resolved" | "rejected" | "pending";
  /**
  * How was this task scheduled?
  * - promise: schedule
  * - function: scheduleFunction
  * - sequence: scheduleSequence
  *
  * @remarks Since 1.25.0
  */
  schedulingType: "promise" | "function" | "sequence";
  /**
  * Incremental id for the task, first received task has taskId = 1
  * @remarks Since 1.25.0
  */
  taskId: number;
  /**
  * Label of the task
  * @remarks Since 1.25.0
  */
  label: string;
  /**
  * Metadata linked when scheduling the task
  * @remarks Since 1.25.0
  */
  metadata?: TMetaData;
  /**
  * Stringified version of the output or error computed using fc.stringify
  * @remarks Since 1.25.0
  */
  outputValue?: string;
} //#endregion
//#region src/arbitrary/scheduler.d.ts
/**
* Constraints to be applied on {@link scheduler}
* @remarks Since 2.2.0
* @public
*/
interface SchedulerConstraints {
  /**
  * Ensure that all scheduled tasks will be executed in the right context (for instance it can be the `act` of React)
  * @remarks Since 1.21.0
  */
  act: (f: () => Promise<void>) => Promise<unknown>;
}
/**
* For scheduler of promises
* @remarks Since 1.20.0
* @public
*/
declare function scheduler<TMetaData = unknown>(constraints?: SchedulerConstraints): Arbitrary<Scheduler<TMetaData>>;
/**
* For custom scheduler with predefined resolution order
*
* Ordering is defined by using a template string like the one generated in case of failure of a {@link scheduler}
*
* It may be something like:
*
* @example
* ```typescript
* fc.schedulerFor()`
*   -> [task\${2}] promise pending
*   -> [task\${3}] promise pending
*   -> [task\${1}] promise pending
* `
* ```
*
* Or more generally:
* ```typescript
* fc.schedulerFor()`
*   This scheduler will resolve task ${2} first
*   followed by ${3} and only then task ${1}
* `
* ```
*
* WARNING:
* Custom scheduler will
* neither check that all the referred promises have been scheduled
* nor that they resolved with the same status and value.
*
*
* WARNING:
* If one the promises is wrongly defined it will fail - for instance asking to resolve 5 while 5 does not exist.
*
* @remarks Since 1.25.0
* @public
*/
declare function schedulerFor<TMetaData = unknown>(constraints?: SchedulerConstraints): (_strs: TemplateStringsArray, ...ordering: number[]) => Scheduler<TMetaData>;
/**
* For custom scheduler with predefined resolution order
*
* WARNING:
* Custom scheduler will not check that all the referred promises have been scheduled.
*
*
* WARNING:
* If one the promises is wrongly defined it will fail - for instance asking to resolve 5 while 5 does not exist.
*
* @param customOrdering - Array defining in which order the promises will be resolved.
* Id of the promises start at 1. 1 means first scheduled promise, 2 second scheduled promise and so on.
*
* @remarks Since 1.25.0
* @public
*/
declare function schedulerFor<TMetaData = unknown>(customOrdering: number[], constraints?: SchedulerConstraints): Scheduler<TMetaData>; //#endregion
//#region src/check/model/ModelRunner.d.ts
/**
* Synchronous definition of model and real
* @remarks Since 2.2.0
* @public
*/
type ModelRunSetup<Model, Real> = () => {
  model: Model;
  real: Real;
};
/**
* Asynchronous definition of model and real
* @remarks Since 2.2.0
* @public
*/
type ModelRunAsyncSetup<Model, Real> = () => Promise<{
  model: Model;
  real: Real;
}>;
/**
* Run synchronous commands over a `Model` and the `Real` system
*
* Throw in case of inconsistency
*
* @param s - Initial state provider
* @param cmds - Synchronous commands to be executed
*
* @remarks Since 1.5.0
* @public
*/
declare function modelRun<Model extends object, Real, InitialModel extends Model>(s: ModelRunSetup<InitialModel, Real>, cmds: Iterable<Command<Model, Real>>): void;
/**
* Run asynchronous commands over a `Model` and the `Real` system
*
* Throw in case of inconsistency
*
* @param s - Initial state provider
* @param cmds - Asynchronous commands to be executed
*
* @remarks Since 1.5.0
* @public
*/
declare function asyncModelRun<Model extends object, Real, CheckAsync extends boolean, InitialModel extends Model>(s: ModelRunSetup<InitialModel, Real> | ModelRunAsyncSetup<InitialModel, Real>, cmds: Iterable<AsyncCommand<Model, Real, CheckAsync>>): Promise<void>;
/**
* Run asynchronous and scheduled commands over a `Model` and the `Real` system
*
* Throw in case of inconsistency
*
* @param scheduler - Scheduler
* @param s - Initial state provider
* @param cmds - Asynchronous commands to be executed
*
* @remarks Since 1.24.0
* @public
*/
declare function scheduledModelRun<Model extends object, Real, CheckAsync extends boolean, InitialModel extends Model>(scheduler: Scheduler, s: ModelRunSetup<InitialModel, Real> | ModelRunAsyncSetup<InitialModel, Real>, cmds: Iterable<AsyncCommand<Model, Real, CheckAsync>>): Promise<void>; //#endregion
//#region src/check/symbols.d.ts
/**
* Generated instances having a method [cloneMethod]
* will be automatically cloned whenever necessary
*
* This is pretty useful for statefull generated values.
* For instance, whenever you use a Stream you directly impact it.
* Implementing [cloneMethod] on the generated Stream would force
* the framework to clone it whenever it has to re-use it
* (mainly required for chrinking process)
*
* @remarks Since 1.8.0
* @public
*/
declare const cloneMethod: unique symbol;
/**
* Object instance that should be cloned from one generation/shrink to another
* @remarks Since 2.15.0
* @public
*/
interface WithCloneMethod<T> {
  [cloneMethod]: () => T;
}
/**
* Check if an instance has to be clone
* @remarks Since 2.15.0
* @public
*/
declare function hasCloneMethod<T>(instance: T | WithCloneMethod<T>): instance is WithCloneMethod<T>;
/**
* Clone an instance if needed
* @remarks Since 2.15.0
* @public
*/
declare function cloneIfNeeded<T>(instance: T): T; //#endregion
//#region src/utils/hash.d.ts
/**
* CRC-32 based hash function
*
* Used internally by fast-check in {@link func}, {@link compareFunc} or even {@link compareBooleanFunc}.
*
* @param repr - String value to be hashed
*
* @remarks Since 2.1.0
* @public
*/
declare function hash(repr: string): number; //#endregion
//#region src/utils/stringify.d.ts
/**
* Use this symbol to define a custom serializer for your instances.
* Serializer must be a function returning a string (see {@link WithToStringMethod}).
*
* @remarks Since 2.17.0
* @public
*/
declare const toStringMethod: unique symbol;
/**
* Interface to implement for {@link toStringMethod}
*
* @remarks Since 2.17.0
* @public
*/
type WithToStringMethod = {
  [toStringMethod]: () => string;
};
/**
* Check if an instance implements {@link WithToStringMethod}
*
* @remarks Since 2.17.0
* @public
*/
declare function hasToStringMethod<T>(instance: T): instance is T & WithToStringMethod;
/**
* Use this symbol to define a custom serializer for your instances.
* Serializer must be a function returning a promise of string (see {@link WithAsyncToStringMethod}).
*
* Please note that:
* 1. It will only be useful for asynchronous properties.
* 2. It has to return barely instantly.
*
* @remarks Since 2.17.0
* @public
*/
declare const asyncToStringMethod: unique symbol;
/**
* Interface to implement for {@link asyncToStringMethod}
*
* @remarks Since 2.17.0
* @public
*/
type WithAsyncToStringMethod = {
  [asyncToStringMethod]: () => Promise<string>;
};
/**
* Check if an instance implements {@link WithAsyncToStringMethod}
*
* @remarks Since 2.17.0
* @public
*/
declare function hasAsyncToStringMethod<T>(instance: T): instance is T & WithAsyncToStringMethod;
/**
* Convert any value to its fast-check string representation
*
* @param value - Value to be converted into a string
*
* @remarks Since 1.15.0
* @public
*/
declare function stringify<Ts>(value: Ts): string;
/**
* Convert any value to its fast-check string representation
*
* This asynchronous version is also able to dig into the status of Promise
*
* @param value - Value to be converted into a string
*
* @remarks Since 2.17.0
* @public
*/
declare function asyncStringify<Ts>(value: Ts): Promise<string>; //#endregion
//#region src/check/runner/utils/RunDetailsFormatter.d.ts
/**
* Format output of {@link check} using the default error reporting of {@link assert}
*
* Produce a string containing the formated error in case of failed run,
* undefined otherwise.
*
* @remarks Since 1.25.0
* @public
*/
declare function defaultReportMessage<Ts>(out: RunDetails<Ts> & {
  failed: false;
}): undefined;
/**
* Format output of {@link check} using the default error reporting of {@link assert}
*
* Produce a string containing the formated error in case of failed run,
* undefined otherwise.
*
* @remarks Since 1.25.0
* @public
*/
declare function defaultReportMessage<Ts>(out: RunDetails<Ts> & {
  failed: true;
}): string;
/**
* Format output of {@link check} using the default error reporting of {@link assert}
*
* Produce a string containing the formated error in case of failed run,
* undefined otherwise.
*
* @remarks Since 1.25.0
* @public
*/
declare function defaultReportMessage<Ts>(out: RunDetails<Ts>): string | undefined;
/**
* Format output of {@link check} using the default error reporting of {@link assert}
*
* Produce a string containing the formated error in case of failed run,
* undefined otherwise.
*
* @remarks Since 2.17.0
* @public
*/
declare function asyncDefaultReportMessage<Ts>(out: RunDetails<Ts> & {
  failed: false;
}): Promise<undefined>;
/**
* Format output of {@link check} using the default error reporting of {@link assert}
*
* Produce a string containing the formated error in case of failed run,
* undefined otherwise.
*
* @remarks Since 2.17.0
* @public
*/
declare function asyncDefaultReportMessage<Ts>(out: RunDetails<Ts> & {
  failed: true;
}): Promise<string>;
/**
* Format output of {@link check} using the default error reporting of {@link assert}
*
* Produce a string containing the formated error in case of failed run,
* undefined otherwise.
*
* @remarks Since 2.17.0
* @public
*/
declare function asyncDefaultReportMessage<Ts>(out: RunDetails<Ts>): Promise<string | undefined>; //#endregion
//#region src/arbitrary/_internals/builders/TypedIntArrayArbitraryBuilder.d.ts
/**
* Constraints to be applied on typed arrays for integer values
* @remarks Since 2.9.0
* @public
*/
type IntArrayConstraints = {
  /**
  * Lower bound of the generated array size
  * @defaultValue 0
  * @remarks Since 2.9.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated array size
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.9.0
  */
  maxLength?: number;
  /**
  * Lower bound for the generated int (included)
  * @defaultValue smallest possible value for this type
  * @remarks Since 2.9.0
  */
  min?: number;
  /**
  * Upper bound for the generated int (included)
  * @defaultValue highest possible value for this type
  * @remarks Since 2.9.0
  */
  max?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
};
/**
* Constraints to be applied on typed arrays for big int values
* @remarks Since 3.0.0
* @public
*/
type BigIntArrayConstraints = {
  /**
  * Lower bound of the generated array size
  * @defaultValue 0
  * @remarks Since 3.0.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated array size
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 3.0.0
  */
  maxLength?: number;
  /**
  * Lower bound for the generated int (included)
  * @defaultValue smallest possible value for this type
  * @remarks Since 3.0.0
  */
  min?: bigint;
  /**
  * Upper bound for the generated int (included)
  * @defaultValue highest possible value for this type
  * @remarks Since 3.0.0
  */
  max?: bigint;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 3.0.0
  */
  size?: SizeForArbitrary;
}; //#endregion
//#region src/arbitrary/int8Array.d.ts
/**
* For Int8Array
* @remarks Since 2.9.0
* @public
*/
declare function int8Array(constraints?: IntArrayConstraints): Arbitrary<Int8Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/int16Array.d.ts
/**
* For Int16Array
* @remarks Since 2.9.0
* @public
*/
declare function int16Array(constraints?: IntArrayConstraints): Arbitrary<Int16Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/int32Array.d.ts
/**
* For Int32Array
* @remarks Since 2.9.0
* @public
*/
declare function int32Array(constraints?: IntArrayConstraints): Arbitrary<Int32Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/uint8Array.d.ts
/**
* For Uint8Array
* @remarks Since 2.9.0
* @public
*/
declare function uint8Array(constraints?: IntArrayConstraints): Arbitrary<Uint8Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/uint8ClampedArray.d.ts
/**
* For Uint8ClampedArray
* @remarks Since 2.9.0
* @public
*/
declare function uint8ClampedArray(constraints?: IntArrayConstraints): Arbitrary<Uint8ClampedArray<ArrayBuffer>>; //#endregion
//#region src/arbitrary/uint16Array.d.ts
/**
* For Uint16Array
* @remarks Since 2.9.0
* @public
*/
declare function uint16Array(constraints?: IntArrayConstraints): Arbitrary<Uint16Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/uint32Array.d.ts
/**
* For Uint32Array
* @remarks Since 2.9.0
* @public
*/
declare function uint32Array(constraints?: IntArrayConstraints): Arbitrary<Uint32Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/float32Array.d.ts
/**
* Constraints to be applied on {@link float32Array}
* @remarks Since 2.9.0
* @public
*/
type Float32ArrayConstraints = {
  /**
  * Lower bound of the generated array size
  * @defaultValue 0
  * @remarks Since 2.9.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated array size
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.9.0
  */
  maxLength?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
} & FloatConstraints;
/**
* For Float32Array
* @remarks Since 2.9.0
* @public
*/
declare function float32Array(constraints?: Float32ArrayConstraints): Arbitrary<Float32Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/float64Array.d.ts
/**
* Constraints to be applied on {@link float64Array}
* @remarks Since 2.9.0
* @public
*/
type Float64ArrayConstraints = {
  /**
  * Lower bound of the generated array size
  * @defaultValue 0
  * @remarks Since 2.9.0
  */
  minLength?: number;
  /**
  * Upper bound of the generated array size
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.9.0
  */
  maxLength?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
} & DoubleConstraints;
/**
* For Float64Array
* @remarks Since 2.9.0
* @public
*/
declare function float64Array(constraints?: Float64ArrayConstraints): Arbitrary<Float64Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/sparseArray.d.ts
/**
* Constraints to be applied on {@link sparseArray}
* @remarks Since 2.13.0
* @public
*/
interface SparseArrayConstraints {
  /**
  * Upper bound of the generated array size (maximal size: 4294967295)
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.13.0
  */
  maxLength?: number;
  /**
  * Lower bound of the number of non-hole elements
  * @defaultValue 0
  * @remarks Since 2.13.0
  */
  minNumElements?: number;
  /**
  * Upper bound of the number of non-hole elements
  * @defaultValue 0x7fffffff — _defaulting seen as "max non specified" when `defaultSizeToMaxWhenMaxSpecified=true`_
  * @remarks Since 2.13.0
  */
  maxNumElements?: number;
  /**
  * When enabled, all generated arrays will either be the empty array or end by a non-hole
  * @defaultValue false
  * @remarks Since 2.13.0
  */
  noTrailingHole?: boolean;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 2.22.0
  */
  size?: SizeForArbitrary;
  /**
  * When receiving a depth identifier, the arbitrary will impact the depth
  * attached to it to avoid going too deep if it already generated lots of items.
  *
  * In other words, if the number of generated values within the collection is large
  * then the generated items will tend to be less deep to avoid creating structures a lot
  * larger than expected.
  *
  * For the moment, the depth is not taken into account to compute the number of items to
  * define for a precise generate call of the array. Just applied onto eligible items.
  *
  * @remarks Since 2.25.0
  */
  depthIdentifier?: DepthIdentifier | string;
}
/**
* For sparse arrays of values coming from `arb`
* @param arb - Arbitrary used to generate the values inside the sparse array
* @param constraints - Constraints to apply when building instances
* @remarks Since 2.13.0
* @public
*/
declare function sparseArray<T>(arb: Arbitrary<T>, constraints?: SparseArrayConstraints): Arbitrary<T[]>; //#endregion
//#region src/arbitrary/bigInt64Array.d.ts
/**
* For BigInt64Array
* @remarks Since 3.0.0
* @public
*/
declare function bigInt64Array(constraints?: BigIntArrayConstraints): Arbitrary<BigInt64Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/bigUint64Array.d.ts
/**
* For BigUint64Array
* @remarks Since 3.0.0
* @public
*/
declare function bigUint64Array(constraints?: BigIntArrayConstraints): Arbitrary<BigUint64Array<ArrayBuffer>>; //#endregion
//#region src/arbitrary/stringMatching.d.ts
/**
* Constraints to be applied on the arbitrary {@link stringMatching}
* @remarks Since 3.10.0
* @public
*/
type StringMatchingConstraints = {
  /**
  * Upper bound of the generated string length (included)
  * @defaultValue 0x7fffffff
  * @remarks Since 4.6.0
  */
  maxLength?: number;
  /**
  * Define how large the generated values should be (at max)
  * @remarks Since 3.10.0
  */
  size?: SizeForArbitrary;
};
/**
* For strings matching the provided regex
*
* @param regex - Arbitrary able to generate random strings (possibly multiple characters)
* @param constraints - Constraints to apply when building instances
*
* @remarks Since 3.10.0
* @public
*/
declare function stringMatching(regex: RegExp, constraints?: StringMatchingConstraints): Arbitrary<string>; //#endregion
//#region src/arbitrary/noShrink.d.ts
/**
* Build an arbitrary without shrinking capabilities.
*
* NOTE:
* In most cases, users should avoid disabling shrinking capabilities.
* If the concern is the shrinking process taking too long or being unnecessary in CI environments,
* consider using alternatives like `endOnFailure` or `interruptAfterTimeLimit` instead.
*
* @param arb - The original arbitrary used for generating values. This arbitrary remains unchanged, but its shrinking capabilities will not be included in the new arbitrary.
*
* @remarks Since 3.20.0
* @public
*/
declare function noShrink<T>(arb: Arbitrary<T>): Arbitrary<T>; //#endregion
//#region src/arbitrary/noBias.d.ts
/**
* Build an arbitrary without any bias.
*
* The produced instance wraps the source one and ensures the bias factor will always be passed to undefined meaning bias will be deactivated.
* All the rest stays unchanged.
*
* @param arb - The original arbitrary used for generating values. This arbitrary remains unchanged.
*
* @remarks Since 3.20.0
* @public
*/
declare function noBias<T>(arb: Arbitrary<T>): Arbitrary<T>; //#endregion
//#region src/arbitrary/limitShrink.d.ts
/**
* Create another Arbitrary with a limited (or capped) number of shrink values
*
* @example
* ```typescript
* const dataGenerator: Arbitrary<string> = ...;
* const limitedShrinkableDataGenerator: Arbitrary<string> = fc.limitShrink(dataGenerator, 10);
* // up to 10 shrunk values could be extracted from the resulting arbitrary
* ```
*
* NOTE: Although limiting the shrinking capabilities can speed up your CI when failures occur, we do not recommend this approach.
* Instead, if you want to reduce the shrinking time for automated jobs or local runs, consider using `endOnFailure` or `interruptAfterTimeLimit`.
*
* @param arbitrary - Instance of arbitrary responsible to generate and shrink values
* @param maxShrinks - Maximal number of shrunk values that can be pulled from the resulting arbitrary
*
* @returns Create another arbitrary with limited number of shrink values
* @remarks Since 3.20.0
* @public
*/
declare function limitShrink<T>(arbitrary: Arbitrary<T>, maxShrinks: number): Arbitrary<T>;
/** @public */
/**
* Type of module (commonjs or module)
* @remarks Since 1.22.0
* @public
*/
declare const __type: string;
/**
* Version of fast-check used by your project (eg.: "4.8.0")
* @remarks Since 1.22.0
* @public
*/
declare const __version: string;
/**
* Commit hash of the current code (eg.: "c0da76fbcf6470339ad7bb2f0dfcebee06ede56c")
* @remarks Since 2.7.0
* @public
*/
declare const __commitHash: string; //#endregion
declare namespace FastCheck_d_exports {
  export { Arbitrary, ArrayConstraints$1 as ArrayConstraints, AsyncCommand, AsyncPropertyHookFunction, BigIntArrayConstraints, BigIntConstraints$1 as BigIntConstraints, CloneValue, Command, CommandsContraints, ContextValue, DateConstraints$1 as DateConstraints, DepthContext, DepthIdentifier, DepthSize, DictionaryConstraints, DomainConstraints, DoubleConstraints, EmailAddressConstraints, Arbitraries as EntityGraphArbitraries, EntityGraphContraints, EntityRelations as EntityGraphRelations, EntityGraphValue, ExecutionStatus, ExecutionTree, FalsyContraints, FalsyValue, Float32ArrayConstraints, Float64ArrayConstraints, FloatConstraints, GeneratorValue, GlobalAsyncPropertyHookFunction, GlobalParameters, GlobalPropertyHookFunction, IAsyncProperty, IAsyncPropertyWithHooks, ICommand, IProperty, IPropertyWithHooks, IRawProperty, IntArrayConstraints, IntegerConstraints, JsonSharedConstraints, JsonValue, LetrecLooselyTypedBuilder, LetrecLooselyTypedTie, LetrecTypedBuilder, LetrecTypedTie, LetrecValue, LoremConstraints, MapConstraints, MaybeWeightedArbitrary, Memo, MixedCaseConstraints, ModelRunAsyncSetup, ModelRunSetup, NatConstraints, ObjectConstraints, OneOfConstraints, OneOfValue, OptionConstraints, Parameters$1 as Parameters, PreconditionFailure, PropertyFailure, PropertyHookFunction, Random, RandomGenerator, RandomType, RecordConstraints, RecordValue, RunDetails, RunDetailsCommon, RunDetailsFailureInterrupted, RunDetailsFailureProperty, RunDetailsFailureTooManySkips, RunDetailsSuccess, Scheduler, SchedulerAct, SchedulerConstraints, SchedulerReportItem, SchedulerSequenceItem, SetConstraints, ShuffledSubarrayConstraints, Size, SizeForArbitrary, SparseArrayConstraints, Stream, StringConstraints$1 as StringConstraints, StringMatchingConstraints, StringSharedConstraints, SubarrayConstraints, UniqueArrayConstraints, UniqueArrayConstraintsCustomCompare, UniqueArrayConstraintsCustomCompareSelect, UniqueArrayConstraintsRecommended, UniqueArraySharedConstraints, UuidConstraints, Value, VerbosityLevel, WebAuthorityConstraints, WebFragmentsConstraints, WebPathConstraints, WebQueryParametersConstraints, WebSegmentConstraints, WebUrlConstraints, WeightedArbitrary, WithAsyncToStringMethod, WithCloneMethod, WithToStringMethod, __commitHash, __type, __version, anything, array, assert, asyncDefaultReportMessage, asyncModelRun, asyncProperty, asyncStringify, asyncToStringMethod, base64String, bigInt, bigInt64Array, bigUint64Array, boolean, chainUntil, check, clone, cloneIfNeeded, cloneMethod, commands, compareBooleanFunc, compareFunc, configureGlobal, constant, constantFrom, context, createDepthIdentifier, date, defaultReportMessage, dictionary, domain, double, emailAddress, entityGraph, falsy, float, float32Array, float64Array, func, gen, getDepthContextFor, hasAsyncToStringMethod, hasCloneMethod, hasToStringMethod, hash, infiniteStream, int16Array, int32Array, int8Array, integer, ipV4, ipV4Extended, ipV6, json, jsonValue, letrec, limitShrink, lorem, map, mapToConstant, maxSafeInteger, maxSafeNat, memo, mixedCase, modelRun, nat, noBias, noShrink, object, oneof, option, pre, property, readConfigureGlobal, record, resetConfigureGlobal, sample, scheduledModelRun, scheduler, schedulerFor, set, shuffledSubarray, sparseArray, statistics, stream, string, stringMatching, stringify, subarray, toStringMethod, tuple, uint16Array, uint32Array, uint8Array, uint8ClampedArray, ulid, uniqueArray, uuid, webAuthority, webFragments, webPath, webQueryParameters, webSegment, webUrl };
}
//#endregion
//#region ../../node_modules/.pnpm/effect@4.0.0-beta.70/node_modules/effect/dist/Schema.d.ts
declare const TypeId = "~effect/Schema/Schema";
/**
 * Whether a schema field is required or optional within a struct.
 *
 * @see {@link optionalKey} — mark a struct field as optional
 * @see {@link optional} — mark a struct field as optional with `| undefined`
 *
 * @category models
 * @since 4.0.0
 */
type Optionality = "required" | "optional";
/**
 * Whether a schema field is readonly or mutable within a struct.
 *
 * @see {@link mutableKey} — mark a struct field as mutable
 *
 * @category models
 * @since 4.0.0
 */
type Mutability = "readonly" | "mutable";
/**
 * Whether a schema field has a constructor default value.
 *
 * @see {@link withConstructorDefault} — add a default to a schema field
 * @see {@link tag} — creates a literal field with a constructor default
 *
 * @category models
 * @since 4.0.0
 */
type ConstructorDefault = "no-default" | "with-default";
/**
 * Options for `makeEffect`, `make`, and Class constructors.
 *
 * **When to use**
 *
 * - Pass `disableChecks: true` to skip validation when you trust the data.
 * - Pass `parseOptions` to control error reporting behavior.
 *
 * @see {@link Bottom.makeEffect}
 * @see {@link Bottom.make}
 *
 * @category models
 * @since 3.13.4
 */
interface MakeOptions {
  /**
   * The parse options to use for the schema.
   */
  readonly parseOptions?: ParseOptions | undefined;
  /**
   * Whether to disable validation for the schema.
   */
  readonly disableChecks?: boolean | undefined;
}
/**
 * The fully-parameterized base interface for all schemas. Exposes all 14 type
 * parameters controlling type inference, mutability, optionality, services,
 * and transformation behavior.
 *
 * **When to use**
 *
 * - You are writing advanced generic schema utilities or performing schema
 *   introspection.
 * - In user code, prefer {@link Schema}, {@link Codec}, {@link Decoder}, or
 *   {@link Encoder} instead.
 *
 * @see {@link Top} — the existential "any schema" type (erased type params)
 * @see {@link Schema} — tracks only the decoded Type
 * @see {@link Codec} — tracks Type + Encoded
 *
 * @category models
 * @since 4.0.0
 */
interface Bottom<out T, out E, out RD, out RE, out Ast extends AST, out Rebuild extends Top, out TypeMakeIn = T, out Iso = T, in out TypeParameters extends ReadonlyArray<Top> = readonly [], out TypeMake = TypeMakeIn, out TypeMutability extends Mutability = "readonly", out TypeOptionality extends Optionality = "required", out TypeConstructorDefault extends ConstructorDefault = "no-default", out EncodedMutability extends Mutability = "readonly", out EncodedOptionality extends Optionality = "required"> extends Pipeable {
  readonly [TypeId]: typeof TypeId;
  readonly "ast": Ast;
  readonly "Rebuild": Rebuild;
  readonly "~type.parameters": TypeParameters;
  readonly "Type": T;
  readonly "Encoded": E;
  readonly "DecodingServices": RD;
  readonly "EncodingServices": RE;
  readonly "~type.make.in": TypeMakeIn;
  readonly "~type.make": TypeMake;
  readonly "~type.constructor.default": TypeConstructorDefault;
  readonly "Iso": Iso;
  readonly "~type.mutability": TypeMutability;
  readonly "~type.optionality": TypeOptionality;
  readonly "~encoded.mutability": EncodedMutability;
  readonly "~encoded.optionality": EncodedOptionality;
  annotate(annotations: Annotations.Bottom<this["Type"], this["~type.parameters"]>): this["Rebuild"];
  annotateKey(annotations: Annotations.Key<this["Type"]>): this["Rebuild"];
  check(...checks: readonly [Check<this["Type"]>, ...Array<Check<this["Type"]>>]): this["Rebuild"];
  rebuild(ast: this["ast"]): this["Rebuild"];
  /**
   * Constructs a value from the make input representation.
   */
  make(input: this["~type.make.in"], options?: MakeOptions): this["Type"];
  makeOption(input: this["~type.make.in"], options?: MakeOptions): Option<this["Type"]>;
  makeEffect(input: this["~type.make.in"], options?: MakeOptions): Effect<this["Type"], SchemaError>;
}
/**
 * The schema type returned by {@link declareConstructor}, tracking the decoded
 * type `T`, the encoded type `E`, and the list of type-parameter schemas
 * `TypeParameters`.
 *
 * @category constructors
 * @since 4.0.0
 */
interface declareConstructor<T, E, TypeParameters extends ReadonlyArray<Top>, Iso = T> extends Bottom<T, E, TypeParameters[number]["DecodingServices"], TypeParameters[number]["EncodingServices"], Declaration, declareConstructor<T, E, TypeParameters, Iso>, T, Iso, TypeParameters> {}
/**
 * Creates a schema for a **parametric** type (a generic container such as
 * `Array<A>`, `Option<A>`, etc.) by accepting a list of type-parameter schemas
 * and a decoder factory.
 *
 * **Details**
 *
 * The outer call `declareConstructor<T, E, Iso>()` fixes the decoded type `T`,
 * the encoded type `E`, and the optional iso type. The inner call receives:
 * - `typeParameters` — the concrete schemas for each type variable
 * - `run` — a factory that, given resolved codecs for each type parameter,
 *   returns a parsing function `(u, ast, options) => Effect<T, Issue>`
 * - `annotations` — optional metadata
 *
 * @see {@link declare} for creating schemas for non-parametric types.
 *
 * **Example** (Schema for a parametric `Box<A>` type)
 *
 * ```ts
 * import { Effect, Option, Schema, SchemaIssue as Issue, SchemaParser } from "effect"
 *
 * interface Box<A> {
 *   readonly value: A
 * }
 *
 * const isBox = (u: unknown): u is Box<unknown> =>
 *   typeof u === "object" && u !== null && "value" in u
 *
 * const Box = <A extends Schema.Top>(item: A) =>
 *   Schema.declareConstructor<Box<A["Type"]>, Box<A["Encoded"]>>()(
 *     [item],
 *     ([itemCodec]) =>
 *       (u, ast, options) => {
 *         if (!isBox(u)) {
 *           return Effect.fail(new Issue.InvalidType(ast, Option.some(u)))
 *         }
 *         return Effect.map(
 *           SchemaParser.decodeUnknownEffect(itemCodec)(u.value, options),
 *           (value) => ({ value })
 *         )
 *       }
 *   )
 *
 * const schema = Box(Schema.Number)
 * ```
 *
 * @category constructors
 * @since 4.0.0
 */
declare function declareConstructor<T, E = T, Iso = T>(): <const TypeParameters extends ReadonlyArray<Top>>(typeParameters: TypeParameters, run: (typeParameters: { readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Type"], TypeParameters[K]["Encoded"]> }) => (u: unknown, self: Declaration, options: ParseOptions) => Effect<T, Issue>, annotations?: Annotations.Declaration<T, TypeParameters>) => declareConstructor<T, E, TypeParameters, Iso>;
/**
 * The existential "any schema" type — all type parameters are erased to `unknown`.
 *
 * **Details**
 *
 * Use `Top` as a constraint when writing generic utilities that must accept *any*
 * schema regardless of its `Type`, `Encoded`, or service requirements. It is the
 * widest possible schema type and therefore gives you the least static information.
 *
 * In user code prefer the narrower interfaces:
 * - {@link Schema}`<T>` — when you only care about the decoded type
 * - {@link Codec}`<T, E, RD, RE>` — when you need the encoded type and service requirements
 * - {@link Decoder}`<T, RD>` — for decode-only APIs
 * - {@link Encoder}`<E, RE>` — for encode-only APIs
 *
 * @category models
 * @since 4.0.0
 */
interface Top extends Bottom<unknown, unknown, unknown, unknown, AST, Top, unknown, unknown, any, // this is because TypeParameters is invariant
unknown, Mutability, Optionality, ConstructorDefault, Mutability, Optionality> {}
/**
 * Namespace of type-level helpers for {@link Schema}.
 *
 * @since 3.10.0
 */
declare namespace Schema {
  /**
   * Extracts the decoded `Type` from a schema.
   *
   * **Example** (Extracting the decoded type)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })
   * type Person = Schema.Schema.Type<typeof Person>
   * // { readonly name: string; readonly age: number }
   * ```
   *
   * @category utility types
   * @since 3.10.0
   */
  type Type<S> = S extends Top ? S["Type"] : never;
}
/**
 * A typed view of a schema that tracks only the decoded (output) type `T`.
 *
 * **Details**
 *
 * Use `Schema<T>` as a constraint when you want to accept "any schema that
 * decodes to `T`" and do not need to know or constrain the encoded
 * representation, required services, or any other type parameters.
 *
 * This is a structural interface — concrete schema values are produced by the
 * constructors in this module (e.g. {@link Struct}, {@link String}, {@link Number}).
 * When you also need the encoded type or service requirements, use {@link Codec}.
 *
 * **Example** (Function that accepts any schema decoding to `string`)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * declare function print(schema: Schema.Schema<string>): void
 *
 * print(Schema.String)            // ok
 * print(Schema.NonEmptyString)    // ok
 * ```
 *
 * @see {@link Codec} — also tracks Encoded, DecodingServices, EncodingServices
 * @see {@link Schema.Type} — extract the decoded type at the type level
 *
 * @category models
 * @since 3.10.0
 */
interface Schema<out T> extends Top {
  readonly "Type": T;
  readonly "Rebuild": Schema<T>;
}
/**
 * Namespace of type-level helpers for {@link Codec}.
 *
 * @since 4.0.0
 */
declare namespace Codec {
  /**
   * Extracts the encoded (`Encoded`) type from a schema.
   *
   * **Example** (Extracting the encoded type)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const schema = Schema.NumberFromString
   * type Enc = Schema.Codec.Encoded<typeof schema>
   * // string
   * ```
   *
   * @category utility types
   * @since 3.10.0
   */
  type Encoded<S> = S extends Top ? S["Encoded"] : never;
  /**
   * Extracts the Effect services required during *decoding* from a schema.
   *
   * **Example** (Checking decoding service requirements)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const schema = Schema.String
   * type RD = Schema.Codec.DecodingServices<typeof schema>
   * // never
   * ```
   *
   * @category utility types
   * @since 4.0.0
   */
  type DecodingServices<S> = S extends Top ? S["DecodingServices"] : never;
  /**
   * Extracts the Effect services required during *encoding* from a schema.
   *
   * **Example** (Checking encoding service requirements)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const schema = Schema.String
   * type RE = Schema.Codec.EncodingServices<typeof schema>
   * // never
   * ```
   *
   * @category utility types
   * @since 4.0.0
   */
  type EncodingServices<S> = S extends Top ? S["EncodingServices"] : never;
}
/**
 * A schema that tracks the decoded type `T`, the encoded type `E`, and the
 * Effect services required during decoding (`RD`) and encoding (`RE`).
 *
 * **Details**
 *
 * Use `Codec<T, E, RD, RE>` when you need to preserve full type information
 * about a schema — both what it decodes to and what it serializes from/to.
 * Most concrete schemas produced by this module implement `Codec`.
 *
 * For APIs that only need one direction, prefer the narrower views:
 * - {@link Decoder}`<T, RD>` — decode-only
 * - {@link Encoder}`<E, RE>` — encode-only
 * - {@link Schema}`<T>` — type-only (no encoded representation)
 *
 * **Example** (Accepting a codec that decodes to `number` from `string`)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * declare function serialize<T>(codec: Schema.Codec<T, string>): string
 *
 * serialize(Schema.NumberFromString) // ok — decodes number, encoded as string
 * ```
 *
 * @see {@link Codec.Encoded} — extract the encoded type
 * @see {@link Codec.DecodingServices} — extract required decoding services
 * @see {@link Codec.EncodingServices} — extract required encoding services
 * @see {@link revealCodec} — helper to make TypeScript infer the full Codec type
 *
 * @category models
 * @since 4.0.0
 */
interface Codec<out T, out E = T, out RD = never, out RE = never> extends Schema<T> {
  readonly "Encoded": E;
  readonly "DecodingServices": RD;
  readonly "EncodingServices": RE;
  readonly "Rebuild": Codec<T, E, RD, RE>;
}
/**
 * Represents a schema for a single literal value.
 *
 * @see {@link Literal} for the constructor function.
 * @category models
 * @since 3.10.0
 */
interface Literal$1<L extends LiteralValue> extends Bottom<L, L, never, never, Literal$2, Literal$1<L>> {
  readonly literal: L;
  transform<L2 extends LiteralValue>(to: L2): decodeTo<Literal$1<L2>, Literal$1<L>>;
}
/**
 * Creates a schema for a single literal value (string, number, bigint, boolean, or null).
 *
 * **Example** (String literal)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * const schema = Schema.Literal("hello")
 * // Type: Schema.Literal<"hello">
 * ```
 *
 * @see {@link Literals} for a schema that represents a union of literals.
 * @see {@link tag} for a schema that represents a literal value that can be
 * used as a discriminator field in tagged unions and has a constructor default.
 * @category constructors
 * @since 3.10.0
 */
declare function Literal$1<L extends LiteralValue>(literal: L): Literal$1<L>;
/**
 * Schema for the `unknown` type. Accepts any value without validation.
 *
 * @see {@link Unknown} for the schema value.
 * @category models
 * @since 3.10.0
 */
interface Unknown extends Bottom<unknown, unknown, never, never, Unknown$1, Unknown> {}
/**
 * Schema for the `unknown` type. Accepts any value without validation.
 *
 * @see {@link Any} for the `any` variant.
 * @category schemas
 * @since 3.10.0
 */
declare const Unknown: Unknown;
/**
 * Schema for `string` values.
 *
 * @see {@link String} for the schema value.
 * @category models
 * @since 4.0.0
 */
interface String extends Bottom<string, string, never, never, String$1, String> {}
/**
 * Schema for `string` values. Validates that the input is `typeof` `"string"`.
 *
 * @category schemas
 * @since 4.0.0
 */
declare const String: String;
/**
 * Schema for `number` values, including `NaN`, `Infinity`, and `-Infinity`.
 *
 * @see {@link Number} for the schema value.
 * @category models
 * @since 4.0.0
 */
interface Number extends Bottom<number, number, never, never, Number$1, Number> {}
/**
 * Schema for `number` values, including `NaN`, `Infinity`, and `-Infinity`.
 *
 * **Details**
 *
 * Default JSON serializer:
 *
 * - Finite numbers are serialized as numbers.
 * - Non-finite values are serialized as strings (`"NaN"`, `"Infinity"`, `"-Infinity"`).
 *
 * @see {@link Finite} for a schema that excludes non-finite values.
 * @category schemas
 * @since 4.0.0
 */
declare const Number: Number;
/**
 * Schema for `symbol` values.
 *
 * @see {@link Symbol} for the schema value.
 * @category models
 * @since 4.0.0
 */
interface Symbol$1 extends Bottom<symbol, symbol, never, never, Symbol$2, Symbol$1> {}
/**
 * Schema for `symbol` values. Validates that the input is `typeof` `"symbol"`.
 *
 * @see {@link UniqueSymbol} for a schema that matches a specific symbol.
 * @category schemas
 * @since 4.0.0
 */
declare const Symbol$1: Symbol$1;
/**
 * Namespace for struct field type utilities.
 *
 * **Details**
 *
 * These types compute the decoded `Type`, encoded `Encoded`, and constructor
 * input `MakeIn` of a {@link Struct} from its field map, handling optional,
 * mutable, and other field modifiers automatically.
 *
 * - `Struct.Fields` — constraint for the field map object
 * - `Struct.Type<F>` — decoded type of the struct
 * - `Struct.Encoded<F>` — encoded type of the struct
 * - `Struct.MakeIn<F>` — constructor input (optional/defaulted fields may be omitted)
 * - `Struct.DecodingServices<F>` / `Struct.EncodingServices<F>` — required services
 *
 * @since 3.10.0
 */
declare namespace Struct {
  /**
   * Constraint for a struct field map: an object whose values are schemas.
   *
   * @category utility types
   * @since 3.10.0
   */
  type Fields = {
    readonly [x: PropertyKey$1]: Top;
  };
  type TypeOptionalKeys<Fields extends Struct.Fields> = { [K in keyof Fields]: Fields[K] extends {
    readonly "~type.optionality": "optional";
  } ? K : never }[keyof Fields];
  type TypeMutableKeys<Fields extends Struct.Fields> = { [K in keyof Fields]: Fields[K] extends {
    readonly "~type.mutability": "mutable";
  } ? K : never }[keyof Fields];
  type Type_<F extends Fields, O extends keyof F = TypeOptionalKeys<F>, M extends keyof F = TypeMutableKeys<F>> = { readonly [K in keyof F as K extends M | O ? never : K]: F[K]["Type"] } & { readonly [K in keyof F as K extends O ? K extends M ? never : K : never]?: F[K]["Type"] } & { -readonly [K in keyof F as K extends M ? K extends O ? never : K : never]: F[K]["Type"] } & { -readonly [K in keyof F as K extends M & O ? K : never]?: F[K]["Type"] };
  /**
   * Computes the decoded object type for a struct field map.
   *
   * **Details**
   *
   * Field schemas contribute their decoded `Type`. `optionalKey` and `optional`
   * produce optional properties, while `mutableKey` produces writable properties.
   *
   * @category utility types
   * @since 3.10.0
   */
  type Type<F extends Fields> = Simplify<Type_<F>>;
  type Iso_<F extends Fields, O extends keyof F = TypeOptionalKeys<F>, M extends keyof F = TypeMutableKeys<F>> = { readonly [K in keyof F as K extends M | O ? never : K]: F[K]["Iso"] } & { readonly [K in keyof F as K extends O ? K extends M ? never : K : never]?: F[K]["Iso"] } & { -readonly [K in keyof F as K extends M ? K extends O ? never : K : never]: F[K]["Iso"] } & { -readonly [K in keyof F as K extends M & O ? K : never]?: F[K]["Iso"] };
  /**
   * Computes the iso object type for a struct field map from each field schema's
   * `Iso` type.
   *
   * **Details**
   *
   * The resulting property optionality and mutability follow the same field
   * modifiers used by `Struct.Type`.
   *
   * @category utility types
   * @since 4.0.0
   */
  type Iso<F extends Fields> = Simplify<Iso_<F>>;
  type EncodedOptionalKeys<Fields extends Struct.Fields> = { [K in keyof Fields]: Fields[K] extends {
    readonly "~encoded.optionality": "optional";
  } ? K : never }[keyof Fields];
  type EncodedMutableKeys<Fields extends Struct.Fields> = { [K in keyof Fields]: Fields[K] extends {
    readonly "~encoded.mutability": "mutable";
  } ? K : never }[keyof Fields];
  type Encoded_<F extends Fields, O extends keyof F = EncodedOptionalKeys<F>, M extends keyof F = EncodedMutableKeys<F>> = { readonly [K in keyof F as K extends M | O ? never : K]: F[K]["Encoded"] } & { readonly [K in keyof F as K extends O ? K extends M ? never : K : never]?: F[K]["Encoded"] } & { -readonly [K in keyof F as K extends M ? K extends O ? never : K : never]: F[K]["Encoded"] } & { -readonly [K in keyof F as K extends M & O ? K : never]?: F[K]["Encoded"] };
  /**
   * Computes the encoded object type for a struct field map.
   *
   * **Details**
   *
   * Field schemas contribute their `Encoded` type. Encoded-side optionality and
   * mutability modifiers determine whether properties are optional or writable in
   * the encoded shape.
   *
   * @category utility types
   * @since 3.10.0
   */
  type Encoded<F extends Fields> = Simplify<Encoded_<F>>;
  /**
   * Union of all decoding service requirements needed by the schemas in a struct
   * field map.
   *
   * @category utility types
   * @since 4.0.0
   */
  type DecodingServices<F extends Fields> = { readonly [K in keyof F]: F[K]["DecodingServices"] }[keyof F];
  /**
   * Union of all encoding service requirements needed by the schemas in a struct
   * field map.
   *
   * @category utility types
   * @since 4.0.0
   */
  type EncodingServices<F extends Fields> = { readonly [K in keyof F]: F[K]["EncodingServices"] }[keyof F];
  type TypeConstructorDefaultedKeys<Fields extends Struct.Fields> = { [K in keyof Fields]: Fields[K] extends {
    readonly "~type.constructor.default": "with-default";
  } ? K : never }[keyof Fields];
  type MakeIn_<F extends Fields, O = TypeOptionalKeys<F> | TypeConstructorDefaultedKeys<F>> = { readonly [K in keyof F as K extends O ? never : K]: F[K]["~type.make"] } & { readonly [K in keyof F as K extends O ? K : never]?: F[K]["~type.make"] };
  /**
   * Computes the input object type accepted when constructing a struct value.
   *
   * **Details**
   *
   * Required fields use each field schema's `~type.make` input. Fields marked
   * optional or with a constructor default may be omitted.
   *
   * @category utility types
   * @since 4.0.0
   */
  type MakeIn<F extends Fields> = Simplify<MakeIn_<F>>;
}
/**
 * Schema type returned by `Schema.Struct` for an object with a fixed set of
 * schema-defined fields.
 *
 * **Details**
 *
 * The `fields` property exposes the original field map for reuse, and
 * `mapFields` creates a new struct schema by transforming that field map.
 *
 * @category models
 * @since 3.10.0
 */
interface Struct<Fields extends Struct.Fields> extends Bottom<Struct.Type<Fields>, Struct.Encoded<Fields>, Struct.DecodingServices<Fields>, Struct.EncodingServices<Fields>, Objects$1, Struct<Fields>, Struct.MakeIn<Fields>, Struct.Iso<Fields>> {
  /**
   * The field definitions of this struct. Spread them into a new struct to
   * reuse fields across schemas.
   *
   * **Example** (Reusing fields across structs)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const Timestamped = Schema.Struct({
   *   createdAt: Schema.Date,
   *   updatedAt: Schema.Date
   * })
   *
   * const User = Schema.Struct({
   *   ...Timestamped.fields,
   *   name: Schema.String,
   *   email: Schema.String
   * })
   * ```
   */
  readonly fields: Fields;
  /**
   * Returns a new struct with the fields modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original union. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapFields<To extends Struct.Fields>(f: (fields: Fields) => To, options?: {
    readonly unsafePreserveChecks?: boolean | undefined;
  } | undefined): Struct<Simplify<Readonly<To>>>;
}
/**
 * Defines a struct schema from a map of field schemas.
 *
 * **Details**
 *
 * Each field value is a schema. Use {@link optionalKey} or {@link optional} to
 * mark fields as optional, and {@link mutableKey} to mark them as mutable.
 *
 * The resulting schema's `Type` is a readonly object type with the fields'
 * decoded types. The `Encoded` form mirrors the field schemas' encoded types.
 *
 * **Example** (Basic struct)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * const Person = Schema.Struct({
 *   name: Schema.String,
 *   age: Schema.Number,
 *   email: Schema.optionalKey(Schema.String)
 * })
 *
 * // { readonly name: string; readonly age: number; readonly email?: string }
 * type Person = typeof Person.Type
 *
 * const alice = Schema.decodeUnknownSync(Person)({ name: "Alice", age: 30 })
 * console.log(alice)
 * // { name: 'Alice', age: 30 }
 * ```
 *
 * @category constructors
 * @since 3.10.0
 */
declare function Struct<const Fields extends Struct.Fields>(fields: Fields): Struct<Fields>;
/**
 * Schema interface produced by `Schema.Array` for readonly arrays.
 *
 * **Details**
 *
 * The decoded type is `ReadonlyArray<S["Type"]>`, the encoded type is
 * `ReadonlyArray<S["Encoded"]>`, and the element schema is available as
 * `schema`.
 *
 * @category models
 * @since 4.0.0
 */
interface $Array<S extends Top> extends Bottom<ReadonlyArray<S["Type"]>, ReadonlyArray<S["Encoded"]>, S["DecodingServices"], S["EncodingServices"], Arrays, $Array<S>, ReadonlyArray<S["~type.make"]>, ReadonlyArray<S["Iso"]>> {
  readonly schema: S;
}
/**
 * Companion type for a union of multiple schemas. Produced by {@link Union}.
 *
 * @category models
 * @since 3.10.0
 */
interface Union<Members extends ReadonlyArray<Top>> extends Bottom<{ [K in keyof Members]: Members[K]["Type"] }[number], { [K in keyof Members]: Members[K]["Encoded"] }[number], { [K in keyof Members]: Members[K]["DecodingServices"] }[number], { [K in keyof Members]: Members[K]["EncodingServices"] }[number], Union$1<{ [K in keyof Members]: Members[K]["ast"] }[number]>, Union<Members>, { [K in keyof Members]: Members[K]["~type.make"] }[number], { [K in keyof Members]: Members[K]["Iso"] }[number]> {
  readonly members: Members;
  /**
   * Returns a new union with the members modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original union. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapMembers<To extends ReadonlyArray<Top>>(f: (members: Members) => To, options?: {
    readonly unsafePreserveChecks?: boolean | undefined;
  } | undefined): Union<Simplify<Readonly<To>>>;
}
/**
 * Creates a union schema from an array of member schemas. Members are tested in
 * order; the first match is returned.
 *
 * **Details**
 *
 * Optionally, specify `mode`:
 * - `"anyOf"` (default) — matches if any member matches.
 * - `"oneOf"` — matches if exactly one member matches.
 *
 * **Example** (String or number union)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * const schema = Schema.Union([Schema.String, Schema.Number])
 *
 * Schema.decodeUnknownSync(schema)("hello") // "hello"
 * Schema.decodeUnknownSync(schema)(42)       // 42
 * ```
 *
 * @category constructors
 * @since 3.10.0
 */
declare function Union<const Members extends ReadonlyArray<Top>>(members: Members, options?: {
  mode?: "anyOf" | "oneOf";
}): Union<Members>;
/**
 * Represents a union schema of multiple literal values.
 *
 * @see {@link Literals} for the constructor function.
 * @category models
 * @since 4.0.0
 */
interface Literals<L extends ReadonlyArray<LiteralValue>> extends Bottom<L[number], L[number], never, never, Union$1<Literal$2>, Literals<L>> {
  readonly literals: L;
  readonly members: { readonly [K in keyof L]: Literal$1<L[K]> };
  /**
   * Map over the members of the union.
   */
  mapMembers<To extends ReadonlyArray<Top>>(f: (members: this["members"]) => To): Union<Simplify<Readonly<To>>>;
  pick<const L2 extends ReadonlyArray<L[number]>>(literals: L2): Literals<L2>;
  transform<const L2 extends { readonly [I in keyof L]: LiteralValue }>(to: L2): Union<{ [I in keyof L]: decodeTo<Literal$1<L2[I]>, Literal$1<L[I]>> }>;
}
/**
 * Creates a union schema from an array of literal values.
 *
 * **Example** (Status codes)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * const schema = Schema.Literals(["active", "inactive", "pending"])
 * // accepts "active", "inactive", or "pending"
 * ```
 *
 * @see {@link Literal} for a schema that represents a single literal.
 * @category constructors
 * @since 4.0.0
 */
declare function Literals<const L extends ReadonlyArray<LiteralValue>>(literals: L): Literals<L>;
/**
 * Schema type produced by `decodeTo` when a custom transformation composes a
 * `From` schema with a `To` schema.
 *
 * **Details**
 *
 * `Type` is `To["Type"]` and `Encoded` is `From["Encoded"]`. Decoding services
 * are `To["DecodingServices"] | From["DecodingServices"] | RD`; encoding
 * services are `To["EncodingServices"] | From["EncodingServices"] | RE`.
 *
 * @see {@link compose} for the passthrough (no transformation) variant
 * @category transforming
 * @since 4.0.0
 */
interface decodeTo<To extends Top, From extends Top, RD = never, RE = never> extends Bottom<To["Type"], From["Encoded"], To["DecodingServices"] | From["DecodingServices"] | RD, To["EncodingServices"] | From["EncodingServices"] | RE, To["ast"], decodeTo<To, From, RD, RE>, To["~type.make.in"], To["Iso"], To["~type.parameters"], To["~type.make"], To["~type.mutability"], To["~type.optionality"], To["~type.constructor.default"], From["~encoded.mutability"], From["~encoded.optionality"]> {
  readonly from: From;
  readonly to: To;
}
/**
 * The type produced by {@link decodeTo} when called without a custom transformation (passthrough composition).
 *
 * **Details**
 *
 * Equivalent to {@link decodeTo} with `RD = never` and `RE = never`, meaning the schemas
 * are composed using their natural encoding/decoding chain.
 *
 * @see {@link decodeTo} for the transformation variant
 * @category transforming
 * @since 3.10.0
 */
interface compose<To extends Top, From extends Top> extends decodeTo<To, From> {}
/**
 * Creates a schema that transforms from a source schema to a target schema.
 *
 * **Details**
 *
 * This is a curried function: call it with the target schema `to` (and optionally a transformation),
 * then call the returned function with the source schema `from`. The resulting schema decodes from
 * `From["Encoded"]` to `To["Type"]` and encodes from `To["Type"]` back to `From["Encoded"]`.
 *
 * Key guarantees:
 * - Resulting schema has `Type = To["Type"]` and `Encoded = From["Encoded"]`
 * - When `transformation` is omitted, uses `Transformation.passthrough()` (schema composition)
 * - Combines decoding/encoding services from both `from` and `to` schemas
 * - Transformation `decode` maps `From["Type"]` → `To["Encoded"]` (used during encoding)
 * - Transformation `encode` maps `To["Encoded"]` → `From["Type"]` (used during decoding)
 *
 * Common mistakes:
 * - **Direction confusion**: Remember `to` is the target (what you decode TO), `from` is the source (what you decode FROM)
 * - **Currying**: This is curried - must use pipe: `from.pipe(Schema.decodeTo(to))`
 * - **Transformation direction**: `decode` goes `From["Type"]` → `To["Encoded"]`, `encode` goes `To["Encoded"]` → `From["Type"]`
 * - **Passthrough assumption**: Without transformation, schemas must satisfy `To["Encoded"] === From["Type"]` or use passthrough helpers
 * - **Service dependencies**: Resulting schema requires services from both schemas; use `Schema.provideService` if needed
 *
 * **Example** (String to Number with transformation)
 *
 * ```ts
 * import { Schema, SchemaGetter } from "effect"
 *
 * const NumberFromString = Schema.String.pipe(
 *   Schema.decodeTo(
 *     Schema.Number,
 *     {
 *       decode: SchemaGetter.transform((s) => Number(s)),
 *       encode: SchemaGetter.transform((n) => String(n))
 *     }
 *   )
 * )
 *
 * const result = Schema.decodeUnknownSync(NumberFromString)("123")
 * // result: 123
 * ```
 *
 * @category transforming
 * @since 4.0.0
 */
declare function decodeTo<To extends Top>(to: To): <From extends Top>(from: From) => compose<To, From>;
declare function decodeTo<To extends Top, From extends Top, RD = never, RE = never>(to: To, transformation: {
  readonly decode: Getter<NoInfer<To["Encoded"]>, NoInfer<From["Type"]>, RD>;
  readonly encode: Getter<NoInfer<From["Type"]>, NoInfer<To["Encoded"]>, RE>;
}): (from: From) => decodeTo<To, From, RD, RE>;
/**
 * Constraint used to ensure a schema field does not already have a constructor default.
 *
 * **Details**
 *
 * Only schemas that satisfy this constraint can be passed to {@link withConstructorDefault}.
 *
 * @category models
 * @since 4.0.0
 */
interface WithoutConstructorDefault {
  readonly "~type.constructor.default": "no-default";
}
/**
 * Schema type returned by `withConstructorDefault` after attaching a default used
 * by constructor helpers.
 *
 * **Details**
 *
 * The default affects `make` and related constructor helpers only; decoding and
 * encoding still use the original schema behavior. The schema is marked as
 * already having a constructor default so another constructor default cannot be
 * added.
 *
 * @see {@link withConstructorDefault} for the constructor
 * @category constructors
 * @since 3.10.0
 */
interface withConstructorDefault<S extends Top & WithoutConstructorDefault> extends Bottom<S["Type"], S["Encoded"], S["DecodingServices"], S["EncodingServices"], S["ast"], withConstructorDefault<S>, S["~type.make.in"], S["Iso"], S["~type.parameters"], S["~type.make"], S["~type.mutability"], S["~type.optionality"], "with-default", S["~encoded.mutability"], S["~encoded.optionality"]> {
  readonly schema: S;
}
/**
 * Attaches a constructor default value to a schema field.
 *
 * **Details**
 *
 * Constructor defaults are applied only during `make*`, not during decoding or
 * encoding.
 *
 * **Example** (Optional field with a static default)
 *
 * ```ts
 * import { Effect, Schema } from "effect"
 *
 * const MySchema = Schema.Struct({
 *   name: Schema.String.pipe(
 *     Schema.optionalKey,
 *     Schema.withConstructorDefault(Effect.succeed("anonymous"))
 *   )
 * })
 *
 * const value = MySchema.make({})
 * // value: { name: "anonymous" }
 * ```
 *
 * @category constructors
 * @since 3.10.0
 */
declare function withConstructorDefault<S extends Top & WithoutConstructorDefault>(defaultValue: Effect<S["~type.make.in"], SchemaError>): (schema: S) => withConstructorDefault<S>;
/**
 * The type produced by {@link tag} — a literal schema with a constructor default.
 *
 * **Details**
 *
 * Used as the type of the `_tag` field in {@link TaggedStruct} and related helpers.
 *
 * @see {@link tag} for the constructor
 * @category constructors
 * @since 3.10.0
 */
interface tag<Tag extends LiteralValue> extends withConstructorDefault<Literal$1<Tag>> {}
/**
 * Combines a {@link Literal} schema with {@link withConstructorDefault}, making it ideal
 * for discriminator fields in tagged unions. When constructing via `make`, the
 * `_tag` field can be omitted and will be filled automatically.
 *
 * **Example** (Discriminated union tag)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * const A = Schema.Struct({ _tag: Schema.tag("A"), value: Schema.Number })
 *
 * // _tag is optional in make, auto-filled to "A"
 * const a = A.make({ value: 42 })
 * // a: { _tag: "A", value: 42 }
 * ```
 *
 * @see {@link tagDefaultOmit} to also omit the tag during encoding
 * @see {@link TaggedStruct} for a shorthand that adds `_tag` automatically
 * @category constructors
 * @since 3.10.0
 */
declare function tag<Tag extends LiteralValue>(literal: Tag): tag<Tag>;
/**
 * The type produced by {@link TaggedStruct} — a {@link Struct} with an extra `_tag` field of type {@link tag}.
 *
 * @see {@link TaggedStruct} for the constructor
 * @category models
 * @since 3.10.0
 */
type TaggedStruct<Tag extends LiteralValue, Fields extends Struct.Fields> = Struct<Simplify<{
  readonly _tag: tag<Tag>;
} & Fields>>;
/**
 * A tagged struct is a struct that includes a `_tag` field. This field is used
 * to identify the specific variant of the object, which is especially useful
 * when working with union types.
 *
 * **Details**
 *
 * When using the `make` method, the `_tag` field is optional and will be
 * added automatically. However, when decoding or encoding, the `_tag` field
 * must be present in the input.
 *
 * **Example** (Tagged struct as a shorthand for a struct with a `_tag` field)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * // Defines a struct with a fixed `_tag` field
 * const tagged = Schema.TaggedStruct("A", {
 *   a: Schema.String
 * })
 *
 * // This is the same as writing:
 * const equivalent = Schema.Struct({
 *   _tag: Schema.tag("A"),
 *   a: Schema.String
 * })
 * ```
 *
 * **Example** (Accessing the literal value of the tag)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * const tagged = Schema.TaggedStruct("A", {
 *   a: Schema.String
 * })
 *
 * // literal: "A"
 * const literal = tagged.fields._tag.schema.literal
 * ```
 *
 * @category constructors
 * @since 3.10.0
 */
declare function TaggedStruct<const Tag extends LiteralValue, const Fields extends Struct.Fields>(value: Tag, fields: Fields): TaggedStruct<Tag, Fields>;
/**
 * Type-level representation of the `Finite` number schema, which rejects `NaN`,
 * `Infinity`, and `-Infinity`.
 *
 * @category Number
 * @since 3.10.0
 */
interface Finite extends Number {
  readonly "Rebuild": Finite;
}
/**
 * A schema for finite numbers, rejecting `NaN`, `Infinity`, and `-Infinity`.
 *
 * @category Number
 * @since 3.10.0
 */
declare const Finite: Finite;
/**
 * A union schema for property keys accepted by Effect schemas: finite `number`,
 * `symbol`, or `string`.
 *
 * @category PropertyKey
 * @since 4.0.0
 */
declare const PropertyKey$1: Union<readonly [Finite, Symbol$1, String]>;
/**
 * Interface for schema-backed classes created with {@link Class}.
 *
 * **Details**
 *
 * A `Class` is a TypeScript class whose constructor validates its input
 * against a {@link Struct} schema. Instances are always structurally valid.
 *
 * The interface exposes the schema's `fields`, an `identifier` string, and
 * helpers such as `mapFields`, `annotate`, `check`, and `extend`.
 *
 * @category models
 * @since 3.10.0
 */
interface Class<Self, S extends Top & {
  readonly fields: Struct.Fields;
}, Inherited> extends Bottom<Self, S["Encoded"], S["DecodingServices"], S["EncodingServices"], Declaration, decodeTo<declareConstructor<Self, S["Encoded"], readonly [S], S["Iso"]>, S>, RequiredKeys<S["~type.make.in"]> extends never ? void | S["~type.make.in"] : S["~type.make.in"], S["Iso"], readonly [S], Self, S["~type.mutability"], S["~type.optionality"], S["~type.constructor.default"], S["~encoded.mutability"], S["~encoded.optionality"]> {
  new (...args: {} extends S["~type.make.in"] ? [props?: S["~type.make.in"], options?: MakeOptions] : [props: S["~type.make.in"], options?: MakeOptions]): S["Type"] & Inherited;
  readonly identifier: string;
  readonly fields: S["fields"];
  /**
   * Returns a new struct with the fields modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original struct. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapFields<To extends Struct.Fields>(f: (fields: S["fields"]) => To, options?: {
    readonly unsafePreserveChecks?: boolean | undefined;
  } | undefined): Struct<Simplify<Readonly<To>>>;
  extend<Extended = never, Static = {}, Brand = {}>(identifier: string): <NewFields extends Struct.Fields>(fields: NewFields, annotations?: Annotations.Declaration<Extended, readonly [Struct<Simplify<Assign<S["fields"], NewFields>>>]>) => [Extended] extends [never] ? MissingSelfGeneric<"Base.extend"> : InheritStaticMembers<Class<Extended, Struct<Simplify<Assign<S["fields"], NewFields>>>, Self & Brand>, Static>;
}
type InheritStaticMembers<C, Static> = C & Pick<Static, Exclude<keyof Static, keyof C>>;
type MissingSelfGeneric<Usage extends string> = `Missing \`Self\` generic - use \`class Self extends ${Usage}<Self>(...)\``;
/**
 * Creates a schema-backed class whose constructor validates input against a
 * {@link Struct} schema. Construction throws a {@link SchemaError} on invalid
 * input (unless `disableChecks` is set in the options).
 *
 * **Details**
 *
 * Pass the desired class type as the first type parameter. The second optional
 * type parameter can be used to add nominal brands.
 *
 * **Example** (Basic class)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * class Person extends Schema.Class<Person>("Person")({
 *   name: Schema.String,
 *   age: Schema.Number
 * }) {}
 *
 * const alice = new Person({ name: "Alice", age: 30 })
 * console.log(alice.name) // "Alice"
 * console.log(`${alice}`) // "Person({ name: Alice, age: 30 })"
 * ```
 *
 * **Example** (Extending a class)
 *
 * ```ts
 * import { Schema } from "effect"
 *
 * class Animal extends Schema.Class<Animal>("Animal")({
 *   name: Schema.String
 * }) {}
 *
 * class Dog extends Animal.extend<Dog>("Dog")({
 *   breed: Schema.String
 * }) {}
 *
 * const dog = new Dog({ name: "Rex", breed: "Labrador" })
 * console.log(dog.name) // "Rex"
 * console.log(dog.breed) // "Labrador"
 * ```
 *
 * @category constructors
 * @since 3.10.0
 */
declare const Class: {
  /**
   * Creates a schema-backed class whose constructor validates input against a
   * {@link Struct} schema. Construction throws a {@link SchemaError} on invalid
   * input (unless `disableChecks` is set in the options).
   *
   * **Details**
   *
   * Pass the desired class type as the first type parameter. The second optional
   * type parameter can be used to add nominal brands.
   *
   * **Example** (Basic class)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * class Person extends Schema.Class<Person>("Person")({
   *   name: Schema.String,
   *   age: Schema.Number
   * }) {}
   *
   * const alice = new Person({ name: "Alice", age: 30 })
   * console.log(alice.name) // "Alice"
   * console.log(`${alice}`) // "Person({ name: Alice, age: 30 })"
   * ```
   *
   * **Example** (Extending a class)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * class Animal extends Schema.Class<Animal>("Animal")({
   *   name: Schema.String
   * }) {}
   *
   * class Dog extends Animal.extend<Dog>("Dog")({
   *   breed: Schema.String
   * }) {}
   *
   * const dog = new Dog({ name: "Rex", breed: "Labrador" })
   * console.log(dog.name) // "Rex"
   * console.log(dog.breed) // "Labrador"
   * ```
   *
   * @category constructors
   * @since 3.10.0
   */
  <Self = never, Brand = {}>(identifier: string): {
    /**
     * Creates a schema-backed class whose constructor validates input against a
     * {@link Struct} schema. Construction throws a {@link SchemaError} on invalid
     * input (unless `disableChecks` is set in the options).
     *
     * **Details**
     *
     * Pass the desired class type as the first type parameter. The second optional
     * type parameter can be used to add nominal brands.
     *
     * **Example** (Basic class)
     *
     * ```ts
     * import { Schema } from "effect"
     *
     * class Person extends Schema.Class<Person>("Person")({
     *   name: Schema.String,
     *   age: Schema.Number
     * }) {}
     *
     * const alice = new Person({ name: "Alice", age: 30 })
     * console.log(alice.name) // "Alice"
     * console.log(`${alice}`) // "Person({ name: Alice, age: 30 })"
     * ```
     *
     * **Example** (Extending a class)
     *
     * ```ts
     * import { Schema } from "effect"
     *
     * class Animal extends Schema.Class<Animal>("Animal")({
     *   name: Schema.String
     * }) {}
     *
     * class Dog extends Animal.extend<Dog>("Dog")({
     *   breed: Schema.String
     * }) {}
     *
     * const dog = new Dog({ name: "Rex", breed: "Labrador" })
     * console.log(dog.name) // "Rex"
     * console.log(dog.breed) // "Labrador"
     * ```
     *
     * @category constructors
     * @since 3.10.0
     */
    <const Fields extends Struct.Fields>(fields: Fields, annotations?: Annotations.Declaration<Self, readonly [Struct<Fields>]>): [Self] extends [never] ? MissingSelfGeneric<"Schema.Class"> : Class<Self, Struct<Fields>, Brand>;
    /**
     * Creates a schema-backed class whose constructor validates input against a
     * {@link Struct} schema. Construction throws a {@link SchemaError} on invalid
     * input (unless `disableChecks` is set in the options).
     *
     * **Details**
     *
     * Pass the desired class type as the first type parameter. The second optional
     * type parameter can be used to add nominal brands.
     *
     * **Example** (Basic class)
     *
     * ```ts
     * import { Schema } from "effect"
     *
     * class Person extends Schema.Class<Person>("Person")({
     *   name: Schema.String,
     *   age: Schema.Number
     * }) {}
     *
     * const alice = new Person({ name: "Alice", age: 30 })
     * console.log(alice.name) // "Alice"
     * console.log(`${alice}`) // "Person({ name: Alice, age: 30 })"
     * ```
     *
     * **Example** (Extending a class)
     *
     * ```ts
     * import { Schema } from "effect"
     *
     * class Animal extends Schema.Class<Animal>("Animal")({
     *   name: Schema.String
     * }) {}
     *
     * class Dog extends Animal.extend<Dog>("Dog")({
     *   breed: Schema.String
     * }) {}
     *
     * const dog = new Dog({ name: "Rex", breed: "Labrador" })
     * console.log(dog.name) // "Rex"
     * console.log(dog.breed) // "Labrador"
     * ```
     *
     * @category constructors
     * @since 3.10.0
     */
    <S extends Struct<Struct.Fields>>(schema: S, annotations?: Annotations.Declaration<Self, readonly [S]>): [Self] extends [never] ? MissingSelfGeneric<"Schema.Class"> : Class<Self, S, Brand>;
  };
};
/**
 * The `Annotations` namespace groups all annotation interfaces used to attach
 * metadata to schemas. Annotations control documentation, validation messages,
 * JSON Schema generation, equivalence, arbitrary generation, and more.
 *
 * **Details**
 *
 * Use {@link resolveAnnotations} to read the annotations attached to a schema at
 * runtime.
 *
 * @since 3.10.0
 */
declare namespace Annotations {
  /**
   * This interface is used to define the annotations that can be attached to a
   * schema. You can extend this interface to define your own annotations.
   *
   * **Details**
   *
   * Note that both a missing key or `undefined` is used to indicate that the
   * annotation is not present.
   *
   * This means that can remove any annotation by setting it to `undefined`.
   *
   * **Example** (Defining your own annotations)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * // Extend the Annotations interface with a custom `version` annotation
   * declare module "effect/Schema" {
   *   namespace Annotations {
   *     interface Annotations {
   *       readonly version?:
   *         | readonly [major: number, minor: number, patch: number]
   *         | undefined
   *     }
   *   }
   * }
   *
   * // The `version` annotation is now recognized by the TypeScript compiler
   * const schema = Schema.String.annotate({ version: [1, 2, 0] })
   *
   * // const version: readonly [major: number, minor: number, patch: number] | undefined
   * const version = Schema.resolveAnnotations(schema)?.["version"]
   *
   * if (version) {
   *   // Access individual parts of the version
   *   console.log(version[1])
   *   // Output: 2
   * }
   * ```
   *
   * @category models
   * @since 3.10.0
   */
  interface Annotations {
    readonly [x: string]: unknown;
  }
  /**
   * Annotations shared by all schema nodes. These map to common JSON Schema /
   * OpenAPI fields: `title`, `description`, `format`, etc.
   *
   * @category models
   * @since 4.0.0
   */
  interface Augment extends Annotations {
    /**
     * Human-readable description of what a value is expected to satisfy.
     *
     * **Details**
     *
     * For filter and refinement failures, the default formatter uses
     * `message` first, then `expected`, and finally falls back to `<filter>`.
     *
     * Use this to name a failed filter in the default message:
     * `Expected <expected>, got <actual>`.
     */
    readonly expected?: string | undefined;
    readonly title?: string | undefined;
    readonly description?: string | undefined;
    readonly documentation?: string | undefined;
    readonly readOnly?: boolean | undefined;
    readonly writeOnly?: boolean | undefined;
    readonly format?: string | undefined;
    readonly contentEncoding?: string | undefined;
    readonly contentMediaType?: string | undefined;
  }
  /**
   * Extends {@link Augment} with type-parametric `default` and `examples` fields.
   *
   * @category models
   * @since 4.0.0
   */
  interface Documentation<T> extends Augment {
    readonly default?: T | undefined;
    readonly examples?: ReadonlyArray<T> | undefined;
  }
  /**
   * Annotations for struct property schemas. Extends {@link Documentation}
   * with an optional `messageMissingKey` to override the error message when
   * the property key is absent during decoding.
   *
   * @category models
   * @since 4.0.0
   */
  interface Key<T> extends Documentation<T> {
    /**
     * The message to use when a key is missing.
     */
    readonly messageMissingKey?: string | undefined;
  }
  /**
   * Base annotations shared by all composite schema nodes. Extends
   * {@link Documentation} with error messages, branding, parse options, and
   * arbitrary generation hooks. {@link Declaration} and other annotation
   * interfaces build on top of this.
   *
   * @category models
   * @since 4.0.0
   */
  interface Bottom<T, TypeParameters extends ReadonlyArray<Top>> extends Documentation<T> {
    /**
     * Complete message to use when this schema node reports an issue.
     *
     * **Details**
     *
     * This replaces the default message for matching issue types instead of
     * only changing the expected label. For a filter or refinement failure,
     * annotate the filter with `message` to replace the whole filter failure
     * message, or `expected` to keep the default
     * `Expected <expected>, got <actual>` shape.
     */
    readonly message?: string | undefined;
    /**
     * The message to use when a key is unexpected.
     */
    readonly messageUnexpectedKey?: string | undefined;
    /**
     * Stable identifier for this schema node.
     *
     * **Details**
     *
     * Identifiers are used by schema tooling, including JSON Schema
     * generation, to name references. The default formatter also uses
     * `identifier` as the expected label for type-level failures, such as
     * `Expected UserId, got null`.
     *
     * `identifier` does not name a failed filter or refinement. If the base
     * type matches and a filter fails, put `expected` or `message` on the
     * filter/refinement instead.
     */
    readonly identifier?: string | undefined;
    readonly parseOptions?: ParseOptions | undefined;
    /**
     * Optional metadata used to identify or extend the filter with custom data.
     */
    readonly meta?: Meta | undefined;
    /**
     * Accumulated brands when multiple brands are added with `Schema.brand`.
     */
    readonly brands?: ReadonlyArray<string> | undefined;
    readonly toArbitrary?: ToArbitrary.Declaration<T, TypeParameters> | undefined;
  }
  /**
   * Helpers for projecting declaration type-parameter schemas into decoded or
   * encoded codec arrays used by annotation hooks.
   *
   * @since 4.0.0
   */
  namespace TypeParameters {
    /**
     * Maps declaration type-parameter schemas to codecs for their decoded `Type`
     * values.
     *
     * @category utility types
     * @since 3.10.0
     */
    type Type<TypeParameters extends ReadonlyArray<Top>> = { readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Type"]> };
    /**
     * Maps declaration type-parameter schemas to codecs for their `Encoded` values.
     *
     * @category utility types
     * @since 3.10.0
     */
    type Encoded<TypeParameters extends ReadonlyArray<Top>> = { readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Encoded"]> };
  }
  /**
   * Full annotation set for `Declaration` schema nodes — used when defining
   * custom, opaque schema types via `Schema.declare`. Extends {@link Bottom}
   * with optional codec, arbitrary, equivalence, and formatter hooks so that
   * derived capabilities (JSON encoding, property testing, etc.) can be
   * provided for the custom type.
   *
   * @category models
   * @since 4.0.0
   */
  interface Declaration<T, TypeParameters extends ReadonlyArray<Top> = readonly []> extends Bottom<T, TypeParameters> {
    readonly toCodec?: ((typeParameters: TypeParameters.Encoded<TypeParameters>) => Link) | undefined;
    readonly toCodecJson?: ((typeParameters: TypeParameters.Encoded<TypeParameters>) => Link) | undefined;
    readonly toCodecIso?: ((typeParameters: TypeParameters.Type<TypeParameters>) => Link) | undefined;
    readonly toArbitrary?: ToArbitrary.Declaration<T, TypeParameters> | undefined;
    readonly toEquivalence?: ToEquivalence.Declaration<T, TypeParameters> | undefined;
    readonly toFormatter?: ToFormatter.Declaration<T, TypeParameters> | undefined;
    readonly typeConstructor?: {
      readonly _tag: string;
    } | undefined;
    readonly generation?: {
      readonly runtime: string;
      readonly Type: string;
      readonly Encoded?: string | undefined;
      readonly importDeclaration?: string | undefined;
    } | undefined;
  }
  /**
   * Annotations for filter schema nodes (created via `Schema.filter`). Extends
   * {@link Augment} with an optional error message, identifier, and metadata.
   * Filters are intentionally non-parametric to keep them covariant.
   *
   * @category models
   * @since 3.10.0
   */
  interface Filter extends Augment {
    /**
     * Complete message to use when this filter or refinement fails.
     *
     * **Details**
     *
     * The default formatter checks filter annotations in this order:
     * `message`, then `expected`, then `<filter>`.
     */
    readonly message?: string | undefined;
    /**
     * Stable identifier for the schema after this filter is attached.
     *
     * **Details**
     *
     * This can affect schema tooling such as JSON Schema generation and
     * type-level failures before the filter runs, but it does not name the
     * failed filter itself. For filter failure messages, use `expected` or
     * `message`.
     */
    readonly identifier?: string | undefined;
    /**
     * Optional metadata used to identify or extend the filter with custom data.
     */
    readonly meta?: Meta | undefined;
    readonly toArbitraryConstraint?: ToArbitrary.Constraint | undefined;
    /**
     * Marks the filter as *structural*, meaning it applies to the shape or
     * structure of the container (e.g., array length, object keys) rather than
     * the contents.
     *
     * **Details**
     *
     * Example: `minLength` on an array is a structural filter.
     */
    readonly "~structural"?: boolean | undefined;
  }
  /**
   * Types used by arbitrary-derivation annotations to configure `toArbitrary`
   * hooks and carry merged fast-check constraints.
   *
   * @since 4.0.0
   */
  namespace ToArbitrary {
    /**
     * fast-check string constraints plus optional regular-expression pattern strings
     * used when deriving string arbitraries from schema checks.
     *
     * @category models
     * @since 4.0.0
     */
    interface StringConstraints extends StringSharedConstraints {
      readonly patterns?: readonly [string, ...Array<string>];
    }
    /**
     * fast-check floating-point constraints plus `isInteger`, which switches
     * derived number arbitraries to integer generation.
     *
     * @category models
     * @since 4.0.0
     */
    interface NumberConstraints extends FloatConstraints {
      readonly isInteger?: boolean;
    }
    /**
     * fast-check bigint constraints used when deriving arbitraries for bigint
     * schemas.
     *
     * @category models
     * @since 4.0.0
     */
    interface BigIntConstraints extends BigIntConstraints$1 {}
    /**
     * fast-check array constraints plus an optional comparator used when deriving
     * unique-array arbitraries.
     *
     * @category models
     * @since 4.0.0
     */
    interface ArrayConstraints extends ArrayConstraints$1 {
      readonly comparator?: (a: any, b: any) => boolean;
    }
    /**
     * fast-check date constraints used when deriving arbitraries for `Date` and
     * DateTime schemas.
     *
     * @category models
     * @since 4.0.0
     */
    interface DateConstraints extends DateConstraints$1 {}
    /**
     * Grouped arbitrary-generation constraints accumulated from schema checks and
     * passed to `toArbitrary` derivation.
     *
     * @category models
     * @since 4.0.0
     */
    interface Constraint {
      readonly string?: StringConstraints | undefined;
      readonly number?: NumberConstraints | undefined;
      readonly bigint?: BigIntConstraints | undefined;
      readonly array?: ArrayConstraints | undefined;
      readonly date?: DateConstraints | undefined;
    }
    /**
     * Context passed to arbitrary-derivation hooks, including accumulated
     * constraints and an `isSuspend` flag used to limit recursion for suspended
     * schemas.
     *
     * @category models
     * @since 3.10.0
     */
    interface Context {
      /**
       * This flag is set to `true` when the current schema is a suspend. The goal
       * is to avoid infinite recursion when generating arbitrary values for
       * suspends, so implementations should try to avoid excessive recursion.
       */
      readonly isSuspend?: boolean | undefined;
      readonly constraints?: ToArbitrary.Constraint | undefined;
    }
    /**
     * Hook signature for declaration schema arbitrary annotations.
     *
     * **Details**
     *
     * Given arbitraries for any type parameters, returns a function that receives the
     * fast-check module and derivation context and produces an arbitrary for `T`.
     *
     * @category models
     * @since 4.0.0
     */
    interface Declaration<T, TypeParameters extends ReadonlyArray<Top>> {
      (typeParameters: { readonly [K in keyof TypeParameters]: Arbitrary<TypeParameters[K]["Type"]> }): (fc: typeof FastCheck_d_exports, context: Context) => Arbitrary<T>;
    }
  }
  /**
   * Types used by formatter annotations to customize formatter derivation for
   * declaration schemas.
   *
   * @since 4.0.0
   */
  namespace ToFormatter {
    /**
     * Hook signature for declaration schema formatter annotations.
     *
     * **Details**
     *
     * Given formatters for any type parameters, returns a formatter for `T`.
     *
     * @category models
     * @since 4.0.0
     */
    interface Declaration<T, TypeParameters extends ReadonlyArray<Top>> {
      (typeParameters: { readonly [K in keyof TypeParameters]: Formatter<TypeParameters[K]["Type"]> }): Formatter<T>;
    }
  }
  /**
   * Types used by equivalence annotations to customize equivalence derivation for
   * declaration schemas.
   *
   * @since 4.0.0
   */
  namespace ToEquivalence {
    /**
     * Hook signature for declaration schema equivalence annotations.
     *
     * **Details**
     *
     * Given equivalences for any type parameters, returns an `Equivalence` for `T`.
     *
     * @category models
     * @since 4.0.0
     */
    interface Declaration<T, TypeParameters extends ReadonlyArray<Top>> {
      (typeParameters: { readonly [K in keyof TypeParameters]: Equivalence<TypeParameters[K]["Type"]> }): Equivalence<T>;
    }
  }
  /**
   * Annotations that can be attached to schema issues.
   *
   * **Details**
   *
   * The optional `message` field overrides the default issue message.
   *
   * @category models
   * @since 4.0.0
   */
  interface Issue extends Annotations {
    readonly message?: string | undefined;
  }
  /**
   * Registry of metadata payloads emitted by built-in schema filters and checks.
   *
   * **Details**
   *
   * Do not augment this interface with custom metadata; extend `MetaDefinitions`
   * instead.
   *
   * @category models
   * @since 4.0.0
   */
  interface BuiltInMetaDefinitions {
    readonly isStringFinite: {
      readonly _tag: "isStringFinite";
      readonly regExp: globalThis.RegExp;
    };
    readonly isStringBigInt: {
      readonly _tag: "isStringBigInt";
      readonly regExp: globalThis.RegExp;
    };
    readonly isStringSymbol: {
      readonly _tag: "isStringSymbol";
      readonly regExp: globalThis.RegExp;
    };
    readonly isMinLength: {
      readonly _tag: "isMinLength";
      readonly minLength: number;
    };
    readonly isMaxLength: {
      readonly _tag: "isMaxLength";
      readonly maxLength: number;
    };
    readonly isLengthBetween: {
      readonly _tag: "isLengthBetween";
      readonly minimum: number;
      readonly maximum: number;
    };
    readonly isPattern: {
      readonly _tag: "isPattern";
      readonly regExp: globalThis.RegExp;
    };
    readonly isTrimmed: {
      readonly _tag: "isTrimmed";
      readonly regExp: globalThis.RegExp;
    };
    readonly isUUID: {
      readonly _tag: "isUUID";
      readonly regExp: globalThis.RegExp;
      readonly version: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined;
    };
    readonly isULID: {
      readonly _tag: "isULID";
      readonly regExp: globalThis.RegExp;
    };
    readonly isBase64: {
      readonly _tag: "isBase64";
      readonly regExp: globalThis.RegExp;
    };
    readonly isBase64Url: {
      readonly _tag: "isBase64Url";
      readonly regExp: globalThis.RegExp;
    };
    readonly isStartsWith: {
      readonly _tag: "isStartsWith";
      readonly startsWith: string;
      readonly regExp: globalThis.RegExp;
    };
    readonly isEndsWith: {
      readonly _tag: "isEndsWith";
      readonly endsWith: string;
      readonly regExp: globalThis.RegExp;
    };
    readonly isIncludes: {
      readonly _tag: "isIncludes";
      readonly includes: string;
      readonly regExp: globalThis.RegExp;
    };
    readonly isUppercased: {
      readonly _tag: "isUppercased";
      readonly regExp: globalThis.RegExp;
    };
    readonly isLowercased: {
      readonly _tag: "isLowercased";
      readonly regExp: globalThis.RegExp;
    };
    readonly isCapitalized: {
      readonly _tag: "isCapitalized";
      readonly regExp: globalThis.RegExp;
    };
    readonly isUncapitalized: {
      readonly _tag: "isUncapitalized";
      readonly regExp: globalThis.RegExp;
    };
    readonly isFinite: {
      readonly _tag: "isFinite";
    };
    readonly isInt: {
      readonly _tag: "isInt";
    };
    readonly isMultipleOf: {
      readonly _tag: "isMultipleOf";
      readonly divisor: number;
    };
    readonly isGreaterThan: {
      readonly _tag: "isGreaterThan";
      readonly exclusiveMinimum: number;
    };
    readonly isGreaterThanOrEqualTo: {
      readonly _tag: "isGreaterThanOrEqualTo";
      readonly minimum: number;
    };
    readonly isLessThan: {
      readonly _tag: "isLessThan";
      readonly exclusiveMaximum: number;
    };
    readonly isLessThanOrEqualTo: {
      readonly _tag: "isLessThanOrEqualTo";
      readonly maximum: number;
    };
    readonly isBetween: {
      readonly _tag: "isBetween";
      readonly minimum: number;
      readonly maximum: number;
      readonly exclusiveMinimum?: boolean | undefined;
      readonly exclusiveMaximum?: boolean | undefined;
    };
    readonly isGreaterThanBigInt: {
      readonly _tag: "isGreaterThanBigInt";
      readonly exclusiveMinimum: bigint;
    };
    readonly isGreaterThanOrEqualToBigInt: {
      readonly _tag: "isGreaterThanOrEqualToBigInt";
      readonly minimum: bigint;
    };
    readonly isLessThanBigInt: {
      readonly _tag: "isLessThanBigInt";
      readonly exclusiveMaximum: bigint;
    };
    readonly isLessThanOrEqualToBigInt: {
      readonly _tag: "isLessThanOrEqualToBigInt";
      readonly maximum: bigint;
    };
    readonly isBetweenBigInt: {
      readonly _tag: "isBetweenBigInt";
      readonly minimum: bigint;
      readonly maximum: bigint;
      readonly exclusiveMinimum?: boolean | undefined;
      readonly exclusiveMaximum?: boolean | undefined;
    };
    readonly isDateValid: {
      readonly _tag: "isDateValid";
    };
    readonly isGreaterThanDate: {
      readonly _tag: "isGreaterThanDate";
      readonly exclusiveMinimum: globalThis.Date;
    };
    readonly isGreaterThanOrEqualToDate: {
      readonly _tag: "isGreaterThanOrEqualToDate";
      readonly minimum: globalThis.Date;
    };
    readonly isLessThanDate: {
      readonly _tag: "isLessThanDate";
      readonly exclusiveMaximum: globalThis.Date;
    };
    readonly isLessThanOrEqualToDate: {
      readonly _tag: "isLessThanOrEqualToDate";
      readonly maximum: globalThis.Date;
    };
    readonly isBetweenDate: {
      readonly _tag: "isBetweenDate";
      readonly minimum: globalThis.Date;
      readonly maximum: globalThis.Date;
      readonly exclusiveMinimum?: boolean | undefined;
      readonly exclusiveMaximum?: boolean | undefined;
    };
    readonly isMinProperties: {
      readonly _tag: "isMinProperties";
      readonly minProperties: number;
    };
    readonly isMaxProperties: {
      readonly _tag: "isMaxProperties";
      readonly maxProperties: number;
    };
    readonly isPropertiesLengthBetween: {
      readonly _tag: "isPropertiesLengthBetween";
      readonly minimum: number;
      readonly maximum: number;
    };
    readonly isPropertyNames: {
      readonly _tag: "isPropertyNames";
      readonly propertyNames: AST;
    };
    readonly isUnique: {
      readonly _tag: "isUnique";
    };
    readonly isMinSize: {
      readonly _tag: "isMinSize";
      readonly minSize: number;
    };
    readonly isMaxSize: {
      readonly _tag: "isMaxSize";
      readonly maxSize: number;
    };
    readonly isSizeBetween: {
      readonly _tag: "isSizeBetween";
      readonly minimum: number;
      readonly maximum: number;
    };
  }
  /**
   * Union of all metadata payloads defined by `BuiltInMetaDefinitions`.
   *
   * @category utility types
   * @since 4.0.0
   */
  type BuiltInMeta = BuiltInMetaDefinitions[keyof BuiltInMetaDefinitions];
  /**
   * Augmentable registry of schema filter metadata payloads.
   *
   * **Details**
   *
   * Extend this interface to add custom values accepted by annotation `meta`
   * fields.
   *
   * @category models
   * @since 4.0.0
   */
  interface MetaDefinitions extends BuiltInMetaDefinitions {}
  /**
   * Union of built-in and user-augmented schema filter metadata payloads.
   *
   * @category utility types
   * @since 4.0.0
   */
  type Meta = MetaDefinitions[keyof MetaDefinitions];
}
//#endregion
//#region ../../node_modules/.pnpm/@typescript-eslint+types@8.59.3/node_modules/@typescript-eslint/types/dist/generated/ast-spec.d.ts
declare type Accessibility = 'private' | 'protected' | 'public';
declare type AccessorProperty = AccessorPropertyComputedName | AccessorPropertyNonComputedName;
declare interface AccessorPropertyComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.AccessorProperty;
}
declare interface AccessorPropertyNonComputedName extends PropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.AccessorProperty;
}
declare interface ArrayExpression extends BaseNode {
  type: AST_NODE_TYPES.ArrayExpression;
  /**
   * an element will be `null` in the case of a sparse array: `[1, ,3]`
   */
  elements: (Expression | SpreadElement | null)[];
}
declare interface ArrayPattern extends BaseNode {
  type: AST_NODE_TYPES.ArrayPattern;
  decorators: Decorator[];
  elements: (DestructuringPattern | null)[];
  optional: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface ArrowFunctionExpression extends BaseNode {
  type: AST_NODE_TYPES.ArrowFunctionExpression;
  async: boolean;
  body: BlockStatement | Expression;
  expression: boolean;
  generator: false;
  id: null;
  params: Parameter[];
  returnType: TSTypeAnnotation | undefined;
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface AssignmentExpression extends BaseNode {
  type: AST_NODE_TYPES.AssignmentExpression;
  left: Expression;
  operator: ValueOf<AssignmentOperatorToText>;
  right: Expression;
}
declare interface AssignmentOperatorToText {
  [SyntaxKind.AmpersandAmpersandEqualsToken]: '&&=';
  [SyntaxKind.AmpersandEqualsToken]: '&=';
  [SyntaxKind.AsteriskAsteriskEqualsToken]: '**=';
  [SyntaxKind.AsteriskEqualsToken]: '*=';
  [SyntaxKind.BarBarEqualsToken]: '||=';
  [SyntaxKind.BarEqualsToken]: '|=';
  [SyntaxKind.CaretEqualsToken]: '^=';
  [SyntaxKind.EqualsToken]: '=';
  [SyntaxKind.GreaterThanGreaterThanEqualsToken]: '>>=';
  [SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken]: '>>>=';
  [SyntaxKind.LessThanLessThanEqualsToken]: '<<=';
  [SyntaxKind.MinusEqualsToken]: '-=';
  [SyntaxKind.PercentEqualsToken]: '%=';
  [SyntaxKind.PlusEqualsToken]: '+=';
  [SyntaxKind.QuestionQuestionEqualsToken]: '??=';
  [SyntaxKind.SlashEqualsToken]: '/=';
}
declare interface AssignmentPattern extends BaseNode {
  type: AST_NODE_TYPES.AssignmentPattern;
  decorators: Decorator[];
  left: BindingName;
  optional: boolean;
  right: Expression;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare enum AST_NODE_TYPES {
  AccessorProperty = "AccessorProperty",
  ArrayExpression = "ArrayExpression",
  ArrayPattern = "ArrayPattern",
  ArrowFunctionExpression = "ArrowFunctionExpression",
  AssignmentExpression = "AssignmentExpression",
  AssignmentPattern = "AssignmentPattern",
  AwaitExpression = "AwaitExpression",
  BinaryExpression = "BinaryExpression",
  BlockStatement = "BlockStatement",
  BreakStatement = "BreakStatement",
  CallExpression = "CallExpression",
  CatchClause = "CatchClause",
  ChainExpression = "ChainExpression",
  ClassBody = "ClassBody",
  ClassDeclaration = "ClassDeclaration",
  ClassExpression = "ClassExpression",
  ConditionalExpression = "ConditionalExpression",
  ContinueStatement = "ContinueStatement",
  DebuggerStatement = "DebuggerStatement",
  Decorator = "Decorator",
  DoWhileStatement = "DoWhileStatement",
  EmptyStatement = "EmptyStatement",
  ExportAllDeclaration = "ExportAllDeclaration",
  ExportDefaultDeclaration = "ExportDefaultDeclaration",
  ExportNamedDeclaration = "ExportNamedDeclaration",
  ExportSpecifier = "ExportSpecifier",
  ExpressionStatement = "ExpressionStatement",
  ForInStatement = "ForInStatement",
  ForOfStatement = "ForOfStatement",
  ForStatement = "ForStatement",
  FunctionDeclaration = "FunctionDeclaration",
  FunctionExpression = "FunctionExpression",
  Identifier = "Identifier",
  IfStatement = "IfStatement",
  ImportAttribute = "ImportAttribute",
  ImportDeclaration = "ImportDeclaration",
  ImportDefaultSpecifier = "ImportDefaultSpecifier",
  ImportExpression = "ImportExpression",
  ImportNamespaceSpecifier = "ImportNamespaceSpecifier",
  ImportSpecifier = "ImportSpecifier",
  JSXAttribute = "JSXAttribute",
  JSXClosingElement = "JSXClosingElement",
  JSXClosingFragment = "JSXClosingFragment",
  JSXElement = "JSXElement",
  JSXEmptyExpression = "JSXEmptyExpression",
  JSXExpressionContainer = "JSXExpressionContainer",
  JSXFragment = "JSXFragment",
  JSXIdentifier = "JSXIdentifier",
  JSXMemberExpression = "JSXMemberExpression",
  JSXNamespacedName = "JSXNamespacedName",
  JSXOpeningElement = "JSXOpeningElement",
  JSXOpeningFragment = "JSXOpeningFragment",
  JSXSpreadAttribute = "JSXSpreadAttribute",
  JSXSpreadChild = "JSXSpreadChild",
  JSXText = "JSXText",
  LabeledStatement = "LabeledStatement",
  Literal = "Literal",
  LogicalExpression = "LogicalExpression",
  MemberExpression = "MemberExpression",
  MetaProperty = "MetaProperty",
  MethodDefinition = "MethodDefinition",
  NewExpression = "NewExpression",
  ObjectExpression = "ObjectExpression",
  ObjectPattern = "ObjectPattern",
  PrivateIdentifier = "PrivateIdentifier",
  Program = "Program",
  Property = "Property",
  PropertyDefinition = "PropertyDefinition",
  RestElement = "RestElement",
  ReturnStatement = "ReturnStatement",
  SequenceExpression = "SequenceExpression",
  SpreadElement = "SpreadElement",
  StaticBlock = "StaticBlock",
  Super = "Super",
  SwitchCase = "SwitchCase",
  SwitchStatement = "SwitchStatement",
  TaggedTemplateExpression = "TaggedTemplateExpression",
  TemplateElement = "TemplateElement",
  TemplateLiteral = "TemplateLiteral",
  ThisExpression = "ThisExpression",
  ThrowStatement = "ThrowStatement",
  TryStatement = "TryStatement",
  UnaryExpression = "UnaryExpression",
  UpdateExpression = "UpdateExpression",
  VariableDeclaration = "VariableDeclaration",
  VariableDeclarator = "VariableDeclarator",
  WhileStatement = "WhileStatement",
  WithStatement = "WithStatement",
  YieldExpression = "YieldExpression",
  TSAbstractAccessorProperty = "TSAbstractAccessorProperty",
  TSAbstractKeyword = "TSAbstractKeyword",
  TSAbstractMethodDefinition = "TSAbstractMethodDefinition",
  TSAbstractPropertyDefinition = "TSAbstractPropertyDefinition",
  TSAnyKeyword = "TSAnyKeyword",
  TSArrayType = "TSArrayType",
  TSAsExpression = "TSAsExpression",
  TSAsyncKeyword = "TSAsyncKeyword",
  TSBigIntKeyword = "TSBigIntKeyword",
  TSBooleanKeyword = "TSBooleanKeyword",
  TSCallSignatureDeclaration = "TSCallSignatureDeclaration",
  TSClassImplements = "TSClassImplements",
  TSConditionalType = "TSConditionalType",
  TSConstructorType = "TSConstructorType",
  TSConstructSignatureDeclaration = "TSConstructSignatureDeclaration",
  TSDeclareFunction = "TSDeclareFunction",
  TSDeclareKeyword = "TSDeclareKeyword",
  TSEmptyBodyFunctionExpression = "TSEmptyBodyFunctionExpression",
  TSEnumBody = "TSEnumBody",
  TSEnumDeclaration = "TSEnumDeclaration",
  TSEnumMember = "TSEnumMember",
  TSExportAssignment = "TSExportAssignment",
  TSExportKeyword = "TSExportKeyword",
  TSExternalModuleReference = "TSExternalModuleReference",
  TSFunctionType = "TSFunctionType",
  TSImportEqualsDeclaration = "TSImportEqualsDeclaration",
  TSImportType = "TSImportType",
  TSIndexedAccessType = "TSIndexedAccessType",
  TSIndexSignature = "TSIndexSignature",
  TSInferType = "TSInferType",
  TSInstantiationExpression = "TSInstantiationExpression",
  TSInterfaceBody = "TSInterfaceBody",
  TSInterfaceDeclaration = "TSInterfaceDeclaration",
  TSInterfaceHeritage = "TSInterfaceHeritage",
  TSIntersectionType = "TSIntersectionType",
  TSIntrinsicKeyword = "TSIntrinsicKeyword",
  TSLiteralType = "TSLiteralType",
  TSMappedType = "TSMappedType",
  TSMethodSignature = "TSMethodSignature",
  TSModuleBlock = "TSModuleBlock",
  TSModuleDeclaration = "TSModuleDeclaration",
  TSNamedTupleMember = "TSNamedTupleMember",
  TSNamespaceExportDeclaration = "TSNamespaceExportDeclaration",
  TSNeverKeyword = "TSNeverKeyword",
  TSNonNullExpression = "TSNonNullExpression",
  TSNullKeyword = "TSNullKeyword",
  TSNumberKeyword = "TSNumberKeyword",
  TSObjectKeyword = "TSObjectKeyword",
  TSOptionalType = "TSOptionalType",
  TSParameterProperty = "TSParameterProperty",
  TSPrivateKeyword = "TSPrivateKeyword",
  TSPropertySignature = "TSPropertySignature",
  TSProtectedKeyword = "TSProtectedKeyword",
  TSPublicKeyword = "TSPublicKeyword",
  TSQualifiedName = "TSQualifiedName",
  TSReadonlyKeyword = "TSReadonlyKeyword",
  TSRestType = "TSRestType",
  TSSatisfiesExpression = "TSSatisfiesExpression",
  TSStaticKeyword = "TSStaticKeyword",
  TSStringKeyword = "TSStringKeyword",
  TSSymbolKeyword = "TSSymbolKeyword",
  TSTemplateLiteralType = "TSTemplateLiteralType",
  TSThisType = "TSThisType",
  TSTupleType = "TSTupleType",
  TSTypeAliasDeclaration = "TSTypeAliasDeclaration",
  TSTypeAnnotation = "TSTypeAnnotation",
  TSTypeAssertion = "TSTypeAssertion",
  TSTypeLiteral = "TSTypeLiteral",
  TSTypeOperator = "TSTypeOperator",
  TSTypeParameter = "TSTypeParameter",
  TSTypeParameterDeclaration = "TSTypeParameterDeclaration",
  TSTypeParameterInstantiation = "TSTypeParameterInstantiation",
  TSTypePredicate = "TSTypePredicate",
  TSTypeQuery = "TSTypeQuery",
  TSTypeReference = "TSTypeReference",
  TSUndefinedKeyword = "TSUndefinedKeyword",
  TSUnionType = "TSUnionType",
  TSUnknownKeyword = "TSUnknownKeyword",
  TSVoidKeyword = "TSVoidKeyword"
}
declare enum AST_TOKEN_TYPES {
  Boolean = "Boolean",
  Identifier = "Identifier",
  JSXIdentifier = "JSXIdentifier",
  PrivateIdentifier = "PrivateIdentifier",
  JSXText = "JSXText",
  Keyword = "Keyword",
  Null = "Null",
  Numeric = "Numeric",
  Punctuator = "Punctuator",
  RegularExpression = "RegularExpression",
  String = "String",
  Template = "Template",
  Block = "Block",
  Line = "Line"
}
declare interface AwaitExpression extends BaseNode {
  type: AST_NODE_TYPES.AwaitExpression;
  argument: Expression;
}
declare interface BaseNode extends NodeOrTokenData {
  type: AST_NODE_TYPES;
}
declare interface BaseToken extends NodeOrTokenData {
  type: AST_TOKEN_TYPES;
  value: string;
}
declare interface BigIntLiteral extends LiteralBase {
  bigint: string;
  value: bigint | null;
}
declare type BinaryExpression = PrivateInExpression | SymmetricBinaryExpression;
declare interface BinaryOperatorToText {
  [SyntaxKind.AmpersandAmpersandToken]: '&&';
  [SyntaxKind.AmpersandToken]: '&';
  [SyntaxKind.AsteriskAsteriskToken]: '**';
  [SyntaxKind.AsteriskToken]: '*';
  [SyntaxKind.BarBarToken]: '||';
  [SyntaxKind.BarToken]: '|';
  [SyntaxKind.CaretToken]: '^';
  [SyntaxKind.EqualsEqualsEqualsToken]: '===';
  [SyntaxKind.EqualsEqualsToken]: '==';
  [SyntaxKind.ExclamationEqualsEqualsToken]: '!==';
  [SyntaxKind.ExclamationEqualsToken]: '!=';
  [SyntaxKind.GreaterThanEqualsToken]: '>=';
  [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: '>>>';
  [SyntaxKind.GreaterThanGreaterThanToken]: '>>';
  [SyntaxKind.GreaterThanToken]: '>';
  [SyntaxKind.InKeyword]: 'in';
  [SyntaxKind.InstanceOfKeyword]: 'instanceof';
  [SyntaxKind.LessThanEqualsToken]: '<=';
  [SyntaxKind.LessThanLessThanToken]: '<<';
  [SyntaxKind.LessThanToken]: '<';
  [SyntaxKind.MinusToken]: '-';
  [SyntaxKind.PercentToken]: '%';
  [SyntaxKind.PlusToken]: '+';
  [SyntaxKind.SlashToken]: '/';
}
declare type BindingName = BindingPattern | Identifier;
declare type BindingPattern = ArrayPattern | ObjectPattern;
declare interface BlockComment extends BaseToken {
  type: AST_TOKEN_TYPES.Block;
}
declare interface BlockStatement extends BaseNode {
  type: AST_NODE_TYPES.BlockStatement;
  body: Statement[];
}
declare interface BooleanLiteral extends LiteralBase {
  raw: 'false' | 'true';
  value: boolean;
}
declare interface BooleanToken extends BaseToken {
  type: AST_TOKEN_TYPES.Boolean;
}
declare interface BreakStatement extends BaseNode {
  type: AST_NODE_TYPES.BreakStatement;
  label: Identifier | null;
}
declare interface CallExpression extends BaseNode {
  type: AST_NODE_TYPES.CallExpression;
  arguments: CallExpressionArgument[];
  callee: Expression;
  optional: boolean;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare type CallExpressionArgument = Expression | SpreadElement;
declare interface CatchClause extends BaseNode {
  type: AST_NODE_TYPES.CatchClause;
  body: BlockStatement;
  param: BindingName | null;
}
declare type ChainElement = CallExpression | MemberExpression | TSNonNullExpression;
declare interface ChainExpression extends BaseNode {
  type: AST_NODE_TYPES.ChainExpression;
  expression: ChainElement;
}
declare interface ClassBase extends BaseNode {
  /**
   * Whether the class is an abstract class.
   * @example
   * ```ts
   * abstract class Foo {}
   * ```
   */
  abstract: boolean;
  /**
   * The class body.
   */
  body: ClassBody;
  /**
   * Whether the class has been `declare`d:
   * @example
   * ```ts
   * declare class Foo {}
   * ```
   */
  declare: boolean;
  /**
   * The decorators declared for the class.
   * @example
   * ```ts
   * @deco
   * class Foo {}
   * ```
   */
  decorators: Decorator[];
  /**
   * The class's name.
   * - For a `ClassExpression` this may be `null` if the name is omitted.
   * - For a `ClassDeclaration` this may be `null` if and only if the parent is
   *   an `ExportDefaultDeclaration`.
   */
  id: Identifier | null;
  /**
   * The implemented interfaces for the class.
   */
  implements: TSClassImplements[];
  /**
   * The super class this class extends.
   */
  superClass: LeftHandSideExpression | null;
  /**
   * The generic type parameters passed to the superClass.
   */
  superTypeArguments: TSTypeParameterInstantiation | undefined;
  /**
   * The generic type parameters declared for the class.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface ClassBody extends BaseNode {
  type: AST_NODE_TYPES.ClassBody;
  body: ClassElement[];
}
declare type ClassDeclaration = ClassDeclarationWithName | ClassDeclarationWithOptionalName;
declare interface ClassDeclarationBase extends ClassBase {
  type: AST_NODE_TYPES.ClassDeclaration;
}
/**
 * A normal class declaration:
 * ```
 * class A {}
 * ```
 */
declare interface ClassDeclarationWithName extends ClassDeclarationBase {
  id: Identifier;
}
/**
 * Default-exported class declarations have optional names:
 * ```
 * export default class {}
 * ```
 */
declare interface ClassDeclarationWithOptionalName extends ClassDeclarationBase {
  id: Identifier | null;
}
declare type ClassElement = AccessorProperty | MethodDefinition | PropertyDefinition | StaticBlock | TSAbstractAccessorProperty | TSAbstractMethodDefinition | TSAbstractPropertyDefinition | TSIndexSignature;
declare interface ClassExpression extends ClassBase {
  type: AST_NODE_TYPES.ClassExpression;
  abstract: false;
  declare: false;
}
declare interface ClassMethodDefinitionNonComputedNameBase extends MethodDefinitionBase {
  computed: false;
  key: ClassPropertyNameNonComputed;
}
declare interface ClassPropertyDefinitionNonComputedNameBase extends PropertyDefinitionBase {
  computed: false;
  key: ClassPropertyNameNonComputed;
}
declare type ClassPropertyNameNonComputed = PrivateIdentifier | PropertyNameNonComputed;
declare type Comment = BlockComment | LineComment;
declare interface ConditionalExpression extends BaseNode {
  type: AST_NODE_TYPES.ConditionalExpression;
  alternate: Expression;
  consequent: Expression;
  test: Expression;
}
declare interface ConstDeclaration extends LetOrConstOrVarDeclarationBase {
  /**
   * In a `declare const` declaration, the declarators may have initializers, but
   * not definite assignment assertions. Each declarator cannot have both an
   * initializer and a type annotation.
   *
   * Even if the declaration has no `declare`, it may still be ambient and have
   * no initializer.
   */
  declarations: VariableDeclaratorMaybeInit[];
  kind: 'const';
}
declare interface ContinueStatement extends BaseNode {
  type: AST_NODE_TYPES.ContinueStatement;
  label: Identifier | null;
}
declare interface DebuggerStatement extends BaseNode {
  type: AST_NODE_TYPES.DebuggerStatement;
}
declare interface Decorator extends BaseNode {
  type: AST_NODE_TYPES.Decorator;
  expression: LeftHandSideExpression;
}
declare type DefaultExportDeclarations = ClassDeclarationWithOptionalName | Expression | FunctionDeclarationWithName | FunctionDeclarationWithOptionalName | TSDeclareFunction | TSEnumDeclaration | TSInterfaceDeclaration | TSModuleDeclaration | TSTypeAliasDeclaration | VariableDeclaration;
declare type DestructuringPattern = ArrayPattern | AssignmentPattern | Identifier | MemberExpression | ObjectPattern | RestElement;
declare interface DoWhileStatement extends BaseNode {
  type: AST_NODE_TYPES.DoWhileStatement;
  body: Statement;
  test: Expression;
}
declare interface EmptyStatement extends BaseNode {
  type: AST_NODE_TYPES.EmptyStatement;
}
declare type EntityName$1 = Identifier | ThisExpression | TSQualifiedName;
declare interface ExportAllDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ExportAllDeclaration;
  /**
   * The assertions declared for the export.
   * @example
   * ```ts
   * export * from 'mod' assert \{ type: 'json' \};
   * ```
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * The attributes declared for the export.
   * @example
   * ```ts
   * export * from 'mod' with \{ type: 'json' \};
   * ```
   */
  attributes: ImportAttribute[];
  /**
   * The name for the exported items (`as X`). `null` if no name is assigned.
   */
  exported: Identifier | null;
  /**
   * The kind of the export.
   */
  exportKind: ExportKind;
  /**
   * The source module being exported from.
   */
  source: StringLiteral;
}
declare type ExportAndImportKind = 'type' | 'value';
declare interface ExportDefaultDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ExportDefaultDeclaration;
  /**
   * The declaration being exported.
   */
  declaration: DefaultExportDeclarations;
  /**
   * The kind of the export. Always `value` for default exports.
   */
  exportKind: 'value';
}
declare type ExportKind = ExportAndImportKind;
declare type ExportNamedDeclaration = ExportNamedDeclarationWithoutSourceWithMultiple | ExportNamedDeclarationWithoutSourceWithSingle | ExportNamedDeclarationWithSource;
declare interface ExportNamedDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.ExportNamedDeclaration;
  /**
   * The assertions declared for the export.
   * @example
   * ```ts
   * export { foo } from 'mod' assert \{ type: 'json' \};
   * ```
   * This will be an empty array if `source` is `null`
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * The attributes declared for the export.
   * @example
   * ```ts
   * export { foo } from 'mod' with \{ type: 'json' \};
   * ```
   * This will be an empty array if `source` is `null`
   */
  attributes: ImportAttribute[];
  /**
   * The exported declaration.
   * @example
   * ```ts
   * export const x = 1;
   * ```
   * This will be `null` if `source` is not `null`, or if there are `specifiers`
   */
  declaration: NamedExportDeclarations | null;
  /**
   * The kind of the export.
   */
  exportKind: ExportKind;
  /**
   * The source module being exported from.
   */
  source: StringLiteral | null;
  /**
   * The specifiers being exported.
   * @example
   * ```ts
   * export { a, b };
   * ```
   * This will be an empty array if `declaration` is not `null`
   */
  specifiers: ExportSpecifier[];
}
/**
 * Exporting names from the current module.
 * ```
 * export {};
 * export { a, b };
 * ```
 */
declare interface ExportNamedDeclarationWithoutSourceWithMultiple extends ExportNamedDeclarationBase {
  /**
   * This will always be an empty array.
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * This will always be an empty array.
   */
  attributes: ImportAttribute[];
  declaration: null;
  source: null;
  specifiers: ExportSpecifierWithIdentifierLocal[];
}
/**
 * Exporting a single named declaration.
 * ```
 * export const x = 1;
 * ```
 */
declare interface ExportNamedDeclarationWithoutSourceWithSingle extends ExportNamedDeclarationBase {
  /**
   * This will always be an empty array.
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * This will always be an empty array.
   */
  attributes: ImportAttribute[];
  declaration: NamedExportDeclarations;
  source: null;
  /**
   * This will always be an empty array.
   */
  specifiers: ExportSpecifierWithIdentifierLocal[];
}
/**
 * Export names from another module.
 * ```
 * export { a, b } from 'mod';
 * ```
 */
declare interface ExportNamedDeclarationWithSource extends ExportNamedDeclarationBase {
  declaration: null;
  source: StringLiteral;
}
declare type ExportSpecifier = ExportSpecifierWithIdentifierLocal | ExportSpecifierWithStringOrLiteralLocal;
declare interface ExportSpecifierBase extends BaseNode {
  type: AST_NODE_TYPES.ExportSpecifier;
  exported: Identifier | StringLiteral;
  exportKind: ExportKind;
  local: Identifier | StringLiteral;
}
declare interface ExportSpecifierWithIdentifierLocal extends ExportSpecifierBase {
  local: Identifier;
}
declare interface ExportSpecifierWithStringOrLiteralLocal extends ExportSpecifierBase {
  local: Identifier | StringLiteral;
}
declare type Expression = ArrayExpression | ArrayPattern | ArrowFunctionExpression | AssignmentExpression | AwaitExpression | BinaryExpression | CallExpression | ChainExpression | ClassExpression | ConditionalExpression | FunctionExpression | Identifier | ImportExpression | JSXElement | JSXFragment | LiteralExpression | LogicalExpression | MemberExpression | MetaProperty | NewExpression | ObjectExpression | ObjectPattern | SequenceExpression | Super | TaggedTemplateExpression | TemplateLiteral | ThisExpression | TSAsExpression | TSInstantiationExpression | TSNonNullExpression | TSSatisfiesExpression | TSTypeAssertion | UnaryExpression | UpdateExpression | YieldExpression;
declare interface ExpressionStatement extends BaseNode {
  type: AST_NODE_TYPES.ExpressionStatement;
  directive: string | undefined;
  expression: Expression;
}
declare type ForInitialiser = Expression | LetOrConstOrVarDeclaration;
declare interface ForInStatement extends BaseNode {
  type: AST_NODE_TYPES.ForInStatement;
  body: Statement;
  left: ForInitialiser;
  right: Expression;
}
declare type ForOfInitialiser = Expression | LetOrConstOrVarDeclaration | UsingInForOfDeclaration;
declare interface ForOfStatement extends BaseNode {
  type: AST_NODE_TYPES.ForOfStatement;
  await: boolean;
  body: Statement;
  left: ForOfInitialiser;
  right: Expression;
}
declare interface ForStatement extends BaseNode {
  type: AST_NODE_TYPES.ForStatement;
  body: Statement;
  init: Expression | ForInitialiser | null;
  test: Expression | null;
  update: Expression | null;
}
declare interface FunctionBase extends BaseNode {
  /**
   * Whether the function is async:
   * ```
   * async function foo() {}
   * const x = async function () {}
   * const x = async () => {}
   * ```
   */
  async: boolean;
  /**
   * The body of the function.
   * - For an `ArrowFunctionExpression` this may be an `Expression` or `BlockStatement`.
   * - For a `FunctionDeclaration` or `FunctionExpression` this is always a `BlockStatement`.
   * - For a `TSDeclareFunction` this is always `undefined`.
   * - For a `TSEmptyBodyFunctionExpression` this is always `null`.
   */
  body: BlockStatement | Expression | null | undefined;
  /**
   * This is only `true` if and only if the node is a `TSDeclareFunction` and it has `declare`:
   * ```
   * declare function foo() {}
   * ```
   */
  declare: boolean;
  /**
   * This is only ever `true` if and only the node is an `ArrowFunctionExpression` and the body
   * is an expression:
   * ```
   * (() => 1)
   * ```
   */
  expression: boolean;
  /**
   * Whether the function is a generator function:
   * ```
   * function *foo() {}
   * const x = function *() {}
   * ```
   * This is always `false` for arrow functions as they cannot be generators.
   */
  generator: boolean;
  /**
   * The function's name.
   * - For an `ArrowFunctionExpression` this is always `null`.
   * - For a `FunctionExpression` this may be `null` if the name is omitted.
   * - For a `FunctionDeclaration` or `TSDeclareFunction` this may be `null` if
   *   and only if the parent is an `ExportDefaultDeclaration`.
   */
  id: Identifier | null;
  /**
   * The list of parameters declared for the function.
   */
  params: Parameter[];
  /**
   * The return type annotation for the function.
   */
  returnType: TSTypeAnnotation | undefined;
  /**
   * The generic type parameter declaration for the function.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare type FunctionDeclaration = FunctionDeclarationWithName | FunctionDeclarationWithOptionalName;
declare interface FunctionDeclarationBase extends FunctionBase {
  type: AST_NODE_TYPES.FunctionDeclaration;
  body: BlockStatement;
  declare: false;
  expression: false;
}
/**
 * A normal function declaration:
 * ```
 * function f() {}
 * ```
 */
declare interface FunctionDeclarationWithName extends FunctionDeclarationBase {
  id: Identifier;
}
/**
 * Default-exported function declarations have optional names:
 * ```
 * export default function () {}
 * ```
 */
declare interface FunctionDeclarationWithOptionalName extends FunctionDeclarationBase {
  id: Identifier | null;
}
declare interface FunctionExpression extends FunctionBase {
  type: AST_NODE_TYPES.FunctionExpression;
  body: BlockStatement;
  expression: false;
}
declare type FunctionLike = ArrowFunctionExpression | FunctionDeclaration | FunctionExpression | TSDeclareFunction | TSEmptyBodyFunctionExpression;
declare interface Identifier extends BaseNode {
  type: AST_NODE_TYPES.Identifier;
  decorators: Decorator[];
  name: string;
  optional: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface IdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.Identifier;
}
declare interface IfStatement extends BaseNode {
  type: AST_NODE_TYPES.IfStatement;
  alternate: Statement | null;
  consequent: Statement;
  test: Expression;
}
declare interface ImportAttribute extends BaseNode {
  type: AST_NODE_TYPES.ImportAttribute;
  key: Identifier | Literal;
  value: Literal;
}
declare type ImportClause = ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier;
declare interface ImportDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ImportDeclaration;
  /**
   * The assertions declared for the export.
   * @example
   * ```ts
   * import * from 'mod' assert \{ type: 'json' \};
   * ```
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * The attributes declared for the export.
   * @example
   * ```ts
   * import * from 'mod' with \{ type: 'json' \};
   * ```
   */
  attributes: ImportAttribute[];
  /**
   * The kind of the import.
   */
  importKind: ImportKind;
  /**
   * The source module being imported from.
   */
  source: StringLiteral;
  /**
   * The specifiers being imported.
   * If this is an empty array then either there are no specifiers:
   * ```
   * import {} from 'mod';
   * ```
   * Or it is a side-effect import:
   * ```
   * import 'mod';
   * ```
   */
  specifiers: ImportClause[];
}
declare interface ImportDefaultSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportDefaultSpecifier;
  local: Identifier;
}
declare interface ImportExpression extends BaseNode {
  type: AST_NODE_TYPES.ImportExpression;
  /**
   * The attributes declared for the dynamic import.
   * @example
   * ```ts
   * import('mod', \{ assert: \{ type: 'json' \} \});
   * ```
   * @deprecated Replaced with {@link `options`}.
   */
  attributes: Expression | null;
  /**
   * The options bag declared for the dynamic import.
   * @example
   * ```ts
   * import('mod', \{ assert: \{ type: 'json' \} \});
   * ```
   */
  options: Expression | null;
  source: Expression;
}
declare type ImportKind = ExportAndImportKind;
declare interface ImportNamespaceSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportNamespaceSpecifier;
  local: Identifier;
}
declare interface ImportSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportSpecifier;
  imported: Identifier | StringLiteral;
  importKind: ImportKind;
  local: Identifier;
}
declare interface JSXAttribute extends BaseNode {
  type: AST_NODE_TYPES.JSXAttribute;
  name: JSXIdentifier | JSXNamespacedName;
  value: JSXElement | JSXExpression | Literal | null;
}
declare type JSXChild = JSXElement | JSXExpression | JSXFragment | JSXText;
declare interface JSXClosingElement extends BaseNode {
  type: AST_NODE_TYPES.JSXClosingElement;
  name: JSXTagNameExpression;
}
declare interface JSXClosingFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXClosingFragment;
}
declare interface JSXElement extends BaseNode {
  type: AST_NODE_TYPES.JSXElement;
  children: JSXChild[];
  closingElement: JSXClosingElement | null;
  openingElement: JSXOpeningElement;
}
declare interface JSXEmptyExpression extends BaseNode {
  type: AST_NODE_TYPES.JSXEmptyExpression;
}
declare type JSXExpression = JSXExpressionContainer | JSXSpreadChild;
declare interface JSXExpressionContainer extends BaseNode {
  type: AST_NODE_TYPES.JSXExpressionContainer;
  expression: Expression | JSXEmptyExpression;
}
declare interface JSXFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXFragment;
  children: JSXChild[];
  closingFragment: JSXClosingFragment;
  openingFragment: JSXOpeningFragment;
}
declare interface JSXIdentifier extends BaseNode {
  type: AST_NODE_TYPES.JSXIdentifier;
  name: string;
}
declare interface JSXIdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.JSXIdentifier;
}
declare interface JSXMemberExpression extends BaseNode {
  type: AST_NODE_TYPES.JSXMemberExpression;
  object: JSXTagNameExpression;
  property: JSXIdentifier;
}
declare interface JSXNamespacedName extends BaseNode {
  type: AST_NODE_TYPES.JSXNamespacedName;
  name: JSXIdentifier;
  namespace: JSXIdentifier;
}
declare interface JSXOpeningElement extends BaseNode {
  type: AST_NODE_TYPES.JSXOpeningElement;
  attributes: (JSXAttribute | JSXSpreadAttribute)[];
  name: JSXTagNameExpression;
  selfClosing: boolean;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare interface JSXOpeningFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXOpeningFragment;
}
declare interface JSXSpreadAttribute extends BaseNode {
  type: AST_NODE_TYPES.JSXSpreadAttribute;
  argument: Expression;
}
declare interface JSXSpreadChild extends BaseNode {
  type: AST_NODE_TYPES.JSXSpreadChild;
  expression: Expression | JSXEmptyExpression;
}
declare type JSXTagNameExpression = JSXIdentifier | JSXMemberExpression | JSXNamespacedName;
declare interface JSXText extends BaseNode {
  type: AST_NODE_TYPES.JSXText;
  raw: string;
  value: string;
}
declare interface JSXTextToken extends BaseToken {
  type: AST_TOKEN_TYPES.JSXText;
}
declare interface KeywordToken extends BaseToken {
  type: AST_TOKEN_TYPES.Keyword;
}
declare interface LabeledStatement extends BaseNode {
  type: AST_NODE_TYPES.LabeledStatement;
  body: Statement;
  label: Identifier;
}
declare type LeftHandSideExpression = ArrayExpression | ArrayPattern | ArrowFunctionExpression | CallExpression | ClassExpression | FunctionExpression | Identifier | JSXElement | JSXFragment | LiteralExpression | MemberExpression | MetaProperty | ObjectExpression | ObjectPattern | SequenceExpression | Super | TaggedTemplateExpression | ThisExpression | TSAsExpression | TSNonNullExpression | TSTypeAssertion;
declare type LetOrConstOrVarDeclaration = ConstDeclaration | LetOrVarDeclaredDeclaration | LetOrVarNonDeclaredDeclaration;
declare interface LetOrConstOrVarDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclaration;
  /**
   * The variables declared by this declaration.
   * Always non-empty.
   * @example
   * ```ts
   * let x;
   * let y, z;
   * ```
   */
  declarations: LetOrConstOrVarDeclarator[];
  /**
   * Whether the declaration is `declare`d
   * @example
   * ```ts
   * declare const x = 1;
   * ```
   */
  declare: boolean;
  /**
   * The keyword used to declare the variable(s)
   * @example
   * ```ts
   * const x = 1;
   * let y = 2;
   * var z = 3;
   * ```
   */
  kind: 'const' | 'let' | 'var';
}
declare type LetOrConstOrVarDeclarator = VariableDeclaratorDefiniteAssignment | VariableDeclaratorMaybeInit | VariableDeclaratorNoInit;
declare interface LetOrVarDeclaredDeclaration extends LetOrConstOrVarDeclarationBase {
  /**
   * In a `declare let` declaration, the declarators must not have definite assignment
   * assertions or initializers.
   *
   * @example
   * ```ts
   * using x = 1;
   * using y =1, z = 2;
   * ```
   */
  declarations: VariableDeclaratorNoInit[];
  declare: true;
  kind: 'let' | 'var';
}
declare interface LetOrVarNonDeclaredDeclaration extends LetOrConstOrVarDeclarationBase {
  /**
   * In a `let`/`var` declaration, the declarators may have definite assignment
   * assertions or initializers, but not both.
   */
  declarations: (VariableDeclaratorDefiniteAssignment | VariableDeclaratorMaybeInit)[];
  declare: false;
  kind: 'let' | 'var';
}
declare interface LineComment extends BaseToken {
  type: AST_TOKEN_TYPES.Line;
}
declare type Literal = BigIntLiteral | BooleanLiteral | NullLiteral | NumberLiteral | RegExpLiteral | StringLiteral;
declare interface LiteralBase extends BaseNode {
  type: AST_NODE_TYPES.Literal;
  raw: string;
  value: bigint | boolean | number | string | RegExp | null;
}
declare type LiteralExpression = Literal | TemplateLiteral;
declare interface LogicalExpression extends BaseNode {
  type: AST_NODE_TYPES.LogicalExpression;
  left: Expression;
  operator: '&&' | '??' | '||';
  right: Expression;
}
declare type MemberExpression = MemberExpressionComputedName | MemberExpressionNonComputedName;
declare interface MemberExpressionBase extends BaseNode {
  computed: boolean;
  object: Expression;
  optional: boolean;
  property: Expression | Identifier | PrivateIdentifier;
}
declare interface MemberExpressionComputedName extends MemberExpressionBase {
  type: AST_NODE_TYPES.MemberExpression;
  computed: true;
  property: Expression;
}
declare interface MemberExpressionNonComputedName extends MemberExpressionBase {
  type: AST_NODE_TYPES.MemberExpression;
  computed: false;
  property: Identifier | PrivateIdentifier;
}
declare interface MetaProperty extends BaseNode {
  type: AST_NODE_TYPES.MetaProperty;
  meta: Identifier;
  property: Identifier;
}
declare type MethodDefinition = MethodDefinitionComputedName | MethodDefinitionNonComputedName;
/** this should not be directly used - instead use MethodDefinitionComputedNameBase or MethodDefinitionNonComputedNameBase */
declare interface MethodDefinitionBase extends BaseNode {
  accessibility: Accessibility | undefined;
  computed: boolean;
  decorators: Decorator[];
  key: PropertyName;
  kind: 'constructor' | 'get' | 'method' | 'set';
  optional: boolean;
  override: boolean;
  static: boolean;
  value: FunctionExpression | TSEmptyBodyFunctionExpression;
}
declare interface MethodDefinitionComputedName extends MethodDefinitionComputedNameBase {
  type: AST_NODE_TYPES.MethodDefinition;
}
declare interface MethodDefinitionComputedNameBase extends MethodDefinitionBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface MethodDefinitionNonComputedName extends ClassMethodDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.MethodDefinition;
}
declare interface MethodDefinitionNonComputedNameBase extends MethodDefinitionBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare type NamedExportDeclarations = ClassDeclarationWithName | ClassDeclarationWithOptionalName | FunctionDeclarationWithName | FunctionDeclarationWithOptionalName | TSDeclareFunction | TSEnumDeclaration | TSImportEqualsDeclaration | TSInterfaceDeclaration | TSModuleDeclaration | TSTypeAliasDeclaration | VariableDeclaration;
declare interface NewExpression extends BaseNode {
  type: AST_NODE_TYPES.NewExpression;
  arguments: CallExpressionArgument[];
  callee: Expression;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare type Node = AccessorProperty | ArrayExpression | ArrayPattern | ArrowFunctionExpression | AssignmentExpression | AssignmentPattern | AwaitExpression | BinaryExpression | BlockStatement | BreakStatement | CallExpression | CatchClause | ChainExpression | ClassBody | ClassDeclaration | ClassExpression | ConditionalExpression | ContinueStatement | DebuggerStatement | Decorator | DoWhileStatement | EmptyStatement | ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ExportSpecifier | ExpressionStatement | ForInStatement | ForOfStatement | ForStatement | FunctionDeclaration | FunctionExpression | Identifier | IfStatement | ImportAttribute | ImportDeclaration | ImportDefaultSpecifier | ImportExpression | ImportNamespaceSpecifier | ImportSpecifier | JSXAttribute | JSXClosingElement | JSXClosingFragment | JSXElement | JSXEmptyExpression | JSXExpressionContainer | JSXFragment | JSXIdentifier | JSXMemberExpression | JSXNamespacedName | JSXOpeningElement | JSXOpeningFragment | JSXSpreadAttribute | JSXSpreadChild | JSXText | LabeledStatement | Literal | LogicalExpression | MemberExpression | MetaProperty | MethodDefinition | NewExpression | ObjectExpression | ObjectPattern | PrivateIdentifier | Program | Property | PropertyDefinition | RestElement | ReturnStatement | SequenceExpression | SpreadElement | StaticBlock | Super | SwitchCase | SwitchStatement | TaggedTemplateExpression | TemplateElement | TemplateLiteral | ThisExpression | ThrowStatement | TryStatement | TSAbstractAccessorProperty | TSAbstractKeyword | TSAbstractMethodDefinition | TSAbstractPropertyDefinition | TSAnyKeyword | TSArrayType | TSAsExpression | TSAsyncKeyword | TSBigIntKeyword | TSBooleanKeyword | TSCallSignatureDeclaration | TSClassImplements | TSConditionalType | TSConstructorType | TSConstructSignatureDeclaration | TSDeclareFunction | TSDeclareKeyword | TSEmptyBodyFunctionExpression | TSEnumBody | TSEnumDeclaration | TSEnumMember | TSExportAssignment | TSExportKeyword | TSExternalModuleReference | TSFunctionType | TSImportEqualsDeclaration | TSImportType | TSIndexedAccessType | TSIndexSignature | TSInferType | TSInstantiationExpression | TSInterfaceBody | TSInterfaceDeclaration | TSInterfaceHeritage | TSIntersectionType | TSIntrinsicKeyword | TSLiteralType | TSMappedType | TSMethodSignature | TSModuleBlock | TSModuleDeclaration | TSNamedTupleMember | TSNamespaceExportDeclaration | TSNeverKeyword | TSNonNullExpression | TSNullKeyword | TSNumberKeyword | TSObjectKeyword | TSOptionalType | TSParameterProperty | TSPrivateKeyword | TSPropertySignature | TSProtectedKeyword | TSPublicKeyword | TSQualifiedName | TSReadonlyKeyword | TSRestType | TSSatisfiesExpression | TSStaticKeyword | TSStringKeyword | TSSymbolKeyword | TSTemplateLiteralType | TSThisType | TSTupleType | TSTypeAliasDeclaration | TSTypeAnnotation | TSTypeAssertion | TSTypeLiteral | TSTypeOperator | TSTypeParameter | TSTypeParameterDeclaration | TSTypeParameterInstantiation | TSTypePredicate | TSTypeQuery | TSTypeReference | TSUndefinedKeyword | TSUnionType | TSUnknownKeyword | TSVoidKeyword | UnaryExpression | UpdateExpression | VariableDeclaration | VariableDeclarator | WhileStatement | WithStatement | YieldExpression;
declare interface NodeOrTokenData {
  type: string;
  /**
   * The source location information of the node.
   *
   * The loc property is defined as nullable by ESTree, but ESLint requires this property.
   */
  loc: SourceLocation;
  range: Range;
}
declare interface NullLiteral extends LiteralBase {
  raw: 'null';
  value: null;
}
declare interface NullToken extends BaseToken {
  type: AST_TOKEN_TYPES.Null;
}
declare interface NumberLiteral extends LiteralBase {
  value: number;
}
declare interface NumericToken extends BaseToken {
  type: AST_TOKEN_TYPES.Numeric;
}
declare interface ObjectExpression extends BaseNode {
  type: AST_NODE_TYPES.ObjectExpression;
  properties: ObjectLiteralElement[];
}
declare type ObjectLiteralElement = Property | SpreadElement;
declare interface ObjectPattern extends BaseNode {
  type: AST_NODE_TYPES.ObjectPattern;
  decorators: Decorator[];
  optional: boolean;
  properties: (Property | RestElement)[];
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare type Parameter = ArrayPattern | AssignmentPattern | Identifier | ObjectPattern | RestElement | TSParameterProperty;
declare type ParameterPropertyParameter = (AssignmentPattern & {
  left: Identifier;
}) | Identifier;
declare interface Position {
  /**
   * Column number on the line (0-indexed)
   */
  column: number;
  /**
   * Line number (1-indexed)
   */
  line: number;
}
declare interface PrivateIdentifier extends BaseNode {
  type: AST_NODE_TYPES.PrivateIdentifier;
  name: string;
}
declare interface PrivateIdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.PrivateIdentifier;
}
declare interface PrivateInExpression extends BaseNode {
  type: AST_NODE_TYPES.BinaryExpression;
  left: PrivateIdentifier;
  operator: 'in';
  right: Expression;
}
declare interface Program extends NodeOrTokenData {
  type: AST_NODE_TYPES.Program;
  body: ProgramStatement[];
  comments: Comment[] | undefined;
  sourceType: 'module' | 'script';
  tokens: Token[] | undefined;
}
declare type ProgramStatement = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ImportDeclaration | Statement | TSImportEqualsDeclaration | TSNamespaceExportDeclaration;
declare type Property = PropertyComputedName | PropertyNonComputedName;
declare interface PropertyBase extends BaseNode {
  type: AST_NODE_TYPES.Property;
  computed: boolean;
  key: PropertyName;
  kind: 'get' | 'init' | 'set';
  method: boolean;
  optional: boolean;
  shorthand: boolean;
  value: AssignmentPattern | BindingName | Expression | TSEmptyBodyFunctionExpression;
}
declare interface PropertyComputedName extends PropertyBase {
  computed: true;
  key: PropertyNameComputed;
}
declare type PropertyDefinition = PropertyDefinitionComputedName | PropertyDefinitionNonComputedName;
declare interface PropertyDefinitionBase extends BaseNode {
  accessibility: Accessibility | undefined;
  computed: boolean;
  declare: boolean;
  decorators: Decorator[];
  definite: boolean;
  key: PropertyName;
  optional: boolean;
  override: boolean;
  readonly: boolean;
  static: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
  value: Expression | null;
}
declare interface PropertyDefinitionComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.PropertyDefinition;
}
declare interface PropertyDefinitionComputedNameBase extends PropertyDefinitionBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface PropertyDefinitionNonComputedName extends ClassPropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.PropertyDefinition;
}
declare interface PropertyDefinitionNonComputedNameBase extends PropertyDefinitionBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare type PropertyName = ClassPropertyNameNonComputed | PropertyNameComputed | PropertyNameNonComputed;
declare type PropertyNameComputed = Expression;
declare type PropertyNameNonComputed = Identifier | NumberLiteral | StringLiteral;
declare interface PropertyNonComputedName extends PropertyBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare interface PunctuatorToken extends BaseToken {
  type: AST_TOKEN_TYPES.Punctuator;
  value: ValueOf<PunctuatorTokenToText>;
}
declare interface PunctuatorTokenToText extends AssignmentOperatorToText {
  [SyntaxKind.AmpersandAmpersandToken]: '&&';
  [SyntaxKind.AmpersandToken]: '&';
  [SyntaxKind.AsteriskAsteriskToken]: '**';
  [SyntaxKind.AsteriskToken]: '*';
  [SyntaxKind.AtToken]: '@';
  [SyntaxKind.BacktickToken]: '`';
  [SyntaxKind.BarBarToken]: '||';
  [SyntaxKind.BarToken]: '|';
  [SyntaxKind.CaretToken]: '^';
  [SyntaxKind.CloseBraceToken]: '}';
  [SyntaxKind.CloseBracketToken]: ']';
  [SyntaxKind.CloseParenToken]: ')';
  [SyntaxKind.ColonToken]: ':';
  [SyntaxKind.CommaToken]: ',';
  [SyntaxKind.DotDotDotToken]: '...';
  [SyntaxKind.DotToken]: '.';
  [SyntaxKind.EqualsEqualsEqualsToken]: '===';
  [SyntaxKind.EqualsEqualsToken]: '==';
  [SyntaxKind.EqualsGreaterThanToken]: '=>';
  [SyntaxKind.ExclamationEqualsEqualsToken]: '!==';
  [SyntaxKind.ExclamationEqualsToken]: '!=';
  [SyntaxKind.ExclamationToken]: '!';
  [SyntaxKind.GreaterThanEqualsToken]: '>=';
  [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: '>>>';
  [SyntaxKind.GreaterThanGreaterThanToken]: '>>';
  [SyntaxKind.GreaterThanToken]: '>';
  [SyntaxKind.HashToken]: '#';
  [SyntaxKind.LessThanEqualsToken]: '<=';
  [SyntaxKind.LessThanLessThanToken]: '<<';
  [SyntaxKind.LessThanSlashToken]: '</';
  [SyntaxKind.LessThanToken]: '<';
  [SyntaxKind.MinusMinusToken]: '--';
  [SyntaxKind.MinusToken]: '-';
  [SyntaxKind.OpenBraceToken]: '{';
  [SyntaxKind.OpenBracketToken]: '[';
  [SyntaxKind.OpenParenToken]: '(';
  [SyntaxKind.PercentToken]: '%';
  [SyntaxKind.PlusPlusToken]: '++';
  [SyntaxKind.PlusToken]: '+';
  [SyntaxKind.QuestionDotToken]: '?.';
  [SyntaxKind.QuestionQuestionToken]: '??';
  [SyntaxKind.QuestionToken]: '?';
  [SyntaxKind.SemicolonToken]: ';';
  [SyntaxKind.SlashToken]: '/';
  [SyntaxKind.TildeToken]: '~';
}
/**
 * An array of two numbers.
 * Both numbers are a 0-based index which is the position in the array of source code characters.
 * The first is the start position of the node, the second is the end position of the node.
 */
declare type Range = [number, number];
declare interface RegExpLiteral extends LiteralBase {
  regex: {
    flags: string;
    pattern: string;
  };
  value: RegExp | null;
}
declare interface RegularExpressionToken extends BaseToken {
  type: AST_TOKEN_TYPES.RegularExpression;
  regex: {
    flags: string;
    pattern: string;
  };
}
declare interface RestElement extends BaseNode {
  type: AST_NODE_TYPES.RestElement;
  argument: DestructuringPattern;
  decorators: Decorator[];
  optional: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
  value: AssignmentPattern | undefined;
}
declare interface ReturnStatement extends BaseNode {
  type: AST_NODE_TYPES.ReturnStatement;
  argument: Expression | null;
}
declare interface SequenceExpression extends BaseNode {
  type: AST_NODE_TYPES.SequenceExpression;
  expressions: Expression[];
}
declare interface SourceLocation {
  /**
   * The position of the first character after the parsed source region
   */
  end: Position;
  /**
   * The position of the first character of the parsed source region
   */
  start: Position;
}
declare interface SpreadElement extends BaseNode {
  type: AST_NODE_TYPES.SpreadElement;
  argument: Expression;
}
declare type Statement = BlockStatement | BreakStatement | ClassDeclarationWithName | ContinueStatement | DebuggerStatement | DoWhileStatement | EmptyStatement | ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ExpressionStatement | ForInStatement | ForOfStatement | ForStatement | FunctionDeclarationWithName | IfStatement | ImportDeclaration | LabeledStatement | ReturnStatement | SwitchStatement | ThrowStatement | TryStatement | TSDeclareFunction | TSEnumDeclaration | TSExportAssignment | TSImportEqualsDeclaration | TSInterfaceDeclaration | TSModuleDeclaration | TSNamespaceExportDeclaration | TSTypeAliasDeclaration | VariableDeclaration | WhileStatement | WithStatement;
declare interface StaticBlock extends BaseNode {
  type: AST_NODE_TYPES.StaticBlock;
  body: Statement[];
}
declare interface StringLiteral extends LiteralBase {
  value: string;
}
declare interface StringToken extends BaseToken {
  type: AST_TOKEN_TYPES.String;
}
declare interface Super extends BaseNode {
  type: AST_NODE_TYPES.Super;
}
declare interface SwitchCase extends BaseNode {
  type: AST_NODE_TYPES.SwitchCase;
  consequent: Statement[];
  test: Expression | null;
}
declare interface SwitchStatement extends BaseNode {
  type: AST_NODE_TYPES.SwitchStatement;
  cases: SwitchCase[];
  discriminant: Expression;
}
declare interface SymmetricBinaryExpression extends BaseNode {
  type: AST_NODE_TYPES.BinaryExpression;
  left: Expression;
  operator: ValueOf<BinaryOperatorToText>;
  right: Expression;
}
declare interface TaggedTemplateExpression extends BaseNode {
  type: AST_NODE_TYPES.TaggedTemplateExpression;
  quasi: TemplateLiteral;
  tag: Expression;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare interface TemplateElement extends BaseNode {
  type: AST_NODE_TYPES.TemplateElement;
  tail: boolean;
  value: {
    cooked: string | null;
    raw: string;
  };
}
declare interface TemplateLiteral extends BaseNode {
  type: AST_NODE_TYPES.TemplateLiteral;
  expressions: Expression[];
  quasis: TemplateElement[];
}
declare interface TemplateToken extends BaseToken {
  type: AST_TOKEN_TYPES.Template;
}
declare interface ThisExpression extends BaseNode {
  type: AST_NODE_TYPES.ThisExpression;
}
declare interface ThrowStatement extends BaseNode {
  type: AST_NODE_TYPES.ThrowStatement;
  argument: Expression;
}
declare type Token = BooleanToken | Comment | IdentifierToken | JSXIdentifierToken | JSXTextToken | KeywordToken | NullToken | NumericToken | PrivateIdentifierToken | PunctuatorToken | RegularExpressionToken | StringToken | TemplateToken;
declare interface TryStatement extends BaseNode {
  type: AST_NODE_TYPES.TryStatement;
  block: BlockStatement;
  finalizer: BlockStatement | null;
  handler: CatchClause | null;
}
declare type TSAbstractAccessorProperty = TSAbstractAccessorPropertyComputedName | TSAbstractAccessorPropertyNonComputedName;
declare interface TSAbstractAccessorPropertyComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractAccessorProperty;
  value: null;
}
declare interface TSAbstractAccessorPropertyNonComputedName extends PropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractAccessorProperty;
  value: null;
}
declare interface TSAbstractKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAbstractKeyword;
}
declare type TSAbstractMethodDefinition = TSAbstractMethodDefinitionComputedName | TSAbstractMethodDefinitionNonComputedName;
declare interface TSAbstractMethodDefinitionComputedName extends MethodDefinitionComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractMethodDefinition;
}
declare interface TSAbstractMethodDefinitionNonComputedName extends MethodDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractMethodDefinition;
}
declare type TSAbstractPropertyDefinition = TSAbstractPropertyDefinitionComputedName | TSAbstractPropertyDefinitionNonComputedName;
declare interface TSAbstractPropertyDefinitionComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractPropertyDefinition;
  value: null;
}
declare interface TSAbstractPropertyDefinitionNonComputedName extends PropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractPropertyDefinition;
  value: null;
}
declare interface TSAnyKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAnyKeyword;
}
declare interface TSArrayType extends BaseNode {
  type: AST_NODE_TYPES.TSArrayType;
  elementType: TypeNode;
}
declare interface TSAsExpression extends BaseNode {
  type: AST_NODE_TYPES.TSAsExpression;
  expression: Expression;
  typeAnnotation: TypeNode;
}
declare interface TSAsyncKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAsyncKeyword;
}
declare interface TSBigIntKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSBigIntKeyword;
}
declare interface TSBooleanKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSBooleanKeyword;
}
declare interface TSCallSignatureDeclaration extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSCallSignatureDeclaration;
}
declare interface TSClassImplements extends TSHeritageBase {
  type: AST_NODE_TYPES.TSClassImplements;
}
declare interface TSConditionalType extends BaseNode {
  type: AST_NODE_TYPES.TSConditionalType;
  checkType: TypeNode;
  extendsType: TypeNode;
  falseType: TypeNode;
  trueType: TypeNode;
}
declare interface TSConstructorType extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSConstructorType;
  abstract: boolean;
}
declare interface TSConstructSignatureDeclaration extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSConstructSignatureDeclaration;
}
declare type TSDeclareFunction = TSDeclareFunctionNoDeclare | TSDeclareFunctionWithDeclare;
declare interface TSDeclareFunctionBase extends FunctionBase {
  type: AST_NODE_TYPES.TSDeclareFunction;
  /**
   * TS1183: An implementation cannot be declared in ambient contexts.
   */
  body: undefined;
  /**
   * Whether the declaration has `declare` modifier.
   */
  declare: boolean;
  expression: false;
}
/**
 * Function declaration without the `declare` keyword:
 * ```
 * function foo(): void;
 * ```
 * This can either be an overload signature or a declaration in an ambient context
 * (e.g. `declare module`)
 */
declare interface TSDeclareFunctionNoDeclare extends TSDeclareFunctionBase {
  declare: false;
  /**
   * - TS1221: Generators are not allowed in an ambient context.
   * - TS1222: An overload signature cannot be declared as a generator.
   */
  generator: false;
}
/**
 * Function declaration with the `declare` keyword:
 * ```
 * declare function foo(): void;
 * ```
 */
declare interface TSDeclareFunctionWithDeclare extends TSDeclareFunctionBase {
  /**
   * TS1040: 'async' modifier cannot be used in an ambient context.
   */
  async: false;
  declare: true;
  /**
   * TS1221: Generators are not allowed in an ambient context.
   */
  generator: false;
}
declare interface TSDeclareKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSDeclareKeyword;
}
declare interface TSEmptyBodyFunctionExpression extends FunctionBase {
  type: AST_NODE_TYPES.TSEmptyBodyFunctionExpression;
  body: null;
  id: null;
}
declare interface TSEnumBody extends BaseNode {
  type: AST_NODE_TYPES.TSEnumBody;
  members: TSEnumMember[];
}
declare interface TSEnumDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSEnumDeclaration;
  /**
   * The body of the enum.
   */
  body: TSEnumBody;
  /**
   * Whether this is a `const` enum.
   * @example
   * ```ts
   * const enum Foo {}
   * ```
   */
  const: boolean;
  /**
   * Whether this is a `declare`d enum.
   * @example
   * ```ts
   * declare enum Foo {}
   * ```
   */
  declare: boolean;
  /**
   * The enum name.
   */
  id: Identifier;
  /**
   * The enum members.
   * @deprecated Use {@link body} instead.
   */
  members: TSEnumMember[];
}
declare interface TSEnumMember extends BaseNode {
  type: AST_NODE_TYPES.TSEnumMember;
  id: Identifier | StringLiteral;
  initializer: Expression | undefined;
  /**
   * @deprecated the enum member is always non-computed.
   */
  computed: boolean;
}
declare interface TSExportAssignment extends BaseNode {
  type: AST_NODE_TYPES.TSExportAssignment;
  expression: Expression;
}
declare interface TSExportKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSExportKeyword;
}
declare interface TSExternalModuleReference extends BaseNode {
  type: AST_NODE_TYPES.TSExternalModuleReference;
  expression: StringLiteral;
}
declare interface TSFunctionSignatureBase extends BaseNode {
  params: Parameter[];
  returnType: TSTypeAnnotation | undefined;
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSFunctionType extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSFunctionType;
}
declare interface TSHeritageBase extends BaseNode {
  expression: Expression;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare type TSImportEqualsDeclaration = TSImportEqualsNamespaceDeclaration | TSImportEqualsRequireDeclaration;
declare interface TSImportEqualsDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.TSImportEqualsDeclaration;
  /**
   * The locally imported name.
   */
  id: Identifier;
  /**
   * The kind of the import. Always `'value'` unless `moduleReference` is a
   * `TSExternalModuleReference`.
   */
  importKind: ImportKind;
  /**
   * The value being aliased.
   * @example
   * ```ts
   * import F1 = A;
   * import F2 = A.B.C;
   * import F3 = require('mod');
   * ```
   */
  moduleReference: Identifier | TSExternalModuleReference | TSQualifiedName;
}
declare interface TSImportEqualsNamespaceDeclaration extends TSImportEqualsDeclarationBase {
  /**
   * The kind of the import.
   */
  importKind: 'value';
  /**
   * The value being aliased.
   * ```
   * import F1 = A;
   * import F2 = A.B.C;
   * ```
   */
  moduleReference: Identifier | TSQualifiedName;
}
declare interface TSImportEqualsRequireDeclaration extends TSImportEqualsDeclarationBase {
  /**
   * The kind of the import.
   */
  importKind: ImportKind;
  /**
   * The value being aliased.
   * ```
   * import F3 = require('mod');
   * ```
   */
  moduleReference: TSExternalModuleReference;
}
declare interface TSImportType extends BaseNode {
  type: AST_NODE_TYPES.TSImportType;
  /** @deprecated Use {@link `source`} instead. */
  argument: TypeNode;
  options: ObjectExpression | null;
  qualifier: EntityName$1 | null;
  source: StringLiteral;
  typeArguments: TSTypeParameterInstantiation | null;
}
declare interface TSIndexedAccessType extends BaseNode {
  type: AST_NODE_TYPES.TSIndexedAccessType;
  indexType: TypeNode;
  objectType: TypeNode;
}
declare interface TSIndexSignature extends BaseNode {
  type: AST_NODE_TYPES.TSIndexSignature;
  accessibility: Accessibility | undefined;
  parameters: Parameter[];
  readonly: boolean;
  static: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface TSInferType extends BaseNode {
  type: AST_NODE_TYPES.TSInferType;
  typeParameter: TSTypeParameter;
}
declare interface TSInstantiationExpression extends BaseNode {
  type: AST_NODE_TYPES.TSInstantiationExpression;
  expression: Expression;
  typeArguments: TSTypeParameterInstantiation;
}
declare interface TSInterfaceBody extends BaseNode {
  type: AST_NODE_TYPES.TSInterfaceBody;
  body: TypeElement[];
}
declare interface TSInterfaceDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSInterfaceDeclaration;
  /**
   * The body of the interface
   */
  body: TSInterfaceBody;
  /**
   * Whether the interface was `declare`d
   */
  declare: boolean;
  /**
   * The types this interface `extends`
   */
  extends: TSInterfaceHeritage[];
  /**
   * The name of this interface
   */
  id: Identifier;
  /**
   * The generic type parameters declared for the interface. Empty declaration
   * (`<>`) is different from no declaration.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSInterfaceHeritage extends TSHeritageBase {
  type: AST_NODE_TYPES.TSInterfaceHeritage;
}
declare interface TSIntersectionType extends BaseNode {
  type: AST_NODE_TYPES.TSIntersectionType;
  types: TypeNode[];
}
declare interface TSIntrinsicKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSIntrinsicKeyword;
}
declare interface TSLiteralType extends BaseNode {
  type: AST_NODE_TYPES.TSLiteralType;
  literal: Exclude<LiteralExpression, NullLiteral | RegExpLiteral> | UnaryExpressionMinus | UnaryExpressionPlus;
}
declare interface TSMappedType extends BaseNode {
  type: AST_NODE_TYPES.TSMappedType;
  constraint: TypeNode;
  key: Identifier;
  nameType: TypeNode | null;
  optional: boolean | '+' | '-' | undefined;
  readonly: boolean | '+' | '-' | undefined;
  typeAnnotation: TypeNode | undefined;
  /** @deprecated Use {@link `constraint`} and {@link `key`} instead. */
  typeParameter: TSTypeParameter;
}
declare type TSMethodSignature = TSMethodSignatureComputedName | TSMethodSignatureNonComputedName;
declare interface TSMethodSignatureBase extends BaseNode {
  type: AST_NODE_TYPES.TSMethodSignature;
  accessibility: Accessibility | undefined;
  computed: boolean;
  key: PropertyName;
  kind: 'get' | 'method' | 'set';
  optional: boolean;
  params: Parameter[];
  readonly: boolean;
  returnType: TSTypeAnnotation | undefined;
  static: boolean;
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSMethodSignatureComputedName extends TSMethodSignatureBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface TSMethodSignatureNonComputedName extends TSMethodSignatureBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare interface TSModuleBlock extends BaseNode {
  type: AST_NODE_TYPES.TSModuleBlock;
  body: ProgramStatement[];
}
declare type TSModuleDeclaration = TSModuleDeclarationGlobal | TSModuleDeclarationModule | TSModuleDeclarationNamespace;
declare interface TSModuleDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.TSModuleDeclaration;
  /**
   * The body of the module.
   * This can only be `undefined` for the code `declare module 'mod';`
   */
  body?: TSModuleBlock;
  /**
   * Whether the module is `declare`d
   * @example
   * ```ts
   * declare namespace F {}
   * ```
   */
  declare: boolean;
  /**
   * Whether this is a global declaration
   * @example
   * ```ts
   * declare global {}
   * ```
   *
   * @deprecated Use {@link kind} instead
   */
  global: boolean;
  /**
   * The name of the module
   * ```
   * namespace A {}
   * namespace A.B.C {}
   * module 'a' {}
   * ```
   */
  id: Identifier | Literal | TSQualifiedName;
  /**
   * The keyword used to define this module declaration
   * @example
   * ```ts
   * namespace Foo {}
   * ^^^^^^^^^
   *
   * module 'foo' {}
   * ^^^^^^
   *
   * global {}
   * ^^^^^^
   * ```
   */
  kind: TSModuleDeclarationKind;
}
declare interface TSModuleDeclarationGlobal extends TSModuleDeclarationBase {
  body: TSModuleBlock;
  /**
   * This will always be an Identifier with name `global`
   */
  id: Identifier;
  kind: 'global';
}
declare type TSModuleDeclarationKind = 'global' | 'module' | 'namespace';
declare type TSModuleDeclarationModule = TSModuleDeclarationModuleWithIdentifierId | TSModuleDeclarationModuleWithStringId;
declare interface TSModuleDeclarationModuleBase extends TSModuleDeclarationBase {
  kind: 'module';
}
/**
 * The legacy module declaration, replaced with namespace declarations.
 * ```
 * module A {}
 * ```
 */
declare interface TSModuleDeclarationModuleWithIdentifierId extends TSModuleDeclarationModuleBase {
  body: TSModuleBlock;
  id: Identifier;
  kind: 'module';
}
declare type TSModuleDeclarationModuleWithStringId = TSModuleDeclarationModuleWithStringIdDeclared | TSModuleDeclarationModuleWithStringIdNotDeclared;
/**
 * A string module declaration that is declared:
 * ```
 * declare module 'foo' {}
 * declare module 'foo';
 * ```
 */
declare interface TSModuleDeclarationModuleWithStringIdDeclared extends TSModuleDeclarationModuleBase {
  body?: TSModuleBlock;
  declare: true;
  id: StringLiteral;
  kind: 'module';
}
/**
 * A string module declaration that is not declared:
 * ```
 * module 'foo' {}
 * ```
 */
declare interface TSModuleDeclarationModuleWithStringIdNotDeclared extends TSModuleDeclarationModuleBase {
  body: TSModuleBlock;
  declare: false;
  id: StringLiteral;
  kind: 'module';
}
declare interface TSModuleDeclarationNamespace extends TSModuleDeclarationBase {
  body: TSModuleBlock;
  id: Identifier | TSQualifiedName;
  kind: 'namespace';
}
declare interface TSNamedTupleMember extends BaseNode {
  type: AST_NODE_TYPES.TSNamedTupleMember;
  elementType: TypeNode;
  label: Identifier;
  optional: boolean;
}
/**
 * For the following declaration:
 * ```
 * export as namespace X;
 * ```
 */
declare interface TSNamespaceExportDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSNamespaceExportDeclaration;
  /**
   * The name of the global variable that's exported as namespace
   */
  id: Identifier;
}
declare interface TSNeverKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNeverKeyword;
}
declare interface TSNonNullExpression extends BaseNode {
  type: AST_NODE_TYPES.TSNonNullExpression;
  expression: Expression;
}
declare interface TSNullKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNullKeyword;
}
declare interface TSNumberKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNumberKeyword;
}
declare interface TSObjectKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSObjectKeyword;
}
declare interface TSOptionalType extends BaseNode {
  type: AST_NODE_TYPES.TSOptionalType;
  typeAnnotation: TypeNode;
}
declare interface TSParameterProperty extends BaseNode {
  type: AST_NODE_TYPES.TSParameterProperty;
  accessibility: Accessibility | undefined;
  decorators: Decorator[];
  override: boolean;
  parameter: ParameterPropertyParameter;
  readonly: boolean;
  static: boolean;
}
declare interface TSPrivateKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSPrivateKeyword;
}
declare type TSPropertySignature = TSPropertySignatureComputedName | TSPropertySignatureNonComputedName;
declare interface TSPropertySignatureBase extends BaseNode {
  type: AST_NODE_TYPES.TSPropertySignature;
  accessibility: Accessibility | undefined;
  computed: boolean;
  key: PropertyName;
  optional: boolean;
  readonly: boolean;
  static: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface TSPropertySignatureComputedName extends TSPropertySignatureBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface TSPropertySignatureNonComputedName extends TSPropertySignatureBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare interface TSProtectedKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSProtectedKeyword;
}
declare interface TSPublicKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSPublicKeyword;
}
declare interface TSQualifiedName extends BaseNode {
  type: AST_NODE_TYPES.TSQualifiedName;
  left: EntityName$1;
  right: Identifier;
}
declare interface TSReadonlyKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSReadonlyKeyword;
}
declare interface TSRestType extends BaseNode {
  type: AST_NODE_TYPES.TSRestType;
  typeAnnotation: TypeNode;
}
declare interface TSSatisfiesExpression extends BaseNode {
  type: AST_NODE_TYPES.TSSatisfiesExpression;
  expression: Expression;
  typeAnnotation: TypeNode;
}
declare interface TSStaticKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSStaticKeyword;
}
declare interface TSStringKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSStringKeyword;
}
declare interface TSSymbolKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSSymbolKeyword;
}
declare interface TSTemplateLiteralType extends BaseNode {
  type: AST_NODE_TYPES.TSTemplateLiteralType;
  quasis: TemplateElement[];
  types: TypeNode[];
}
declare interface TSThisType extends BaseNode {
  type: AST_NODE_TYPES.TSThisType;
}
declare interface TSTupleType extends BaseNode {
  type: AST_NODE_TYPES.TSTupleType;
  elementTypes: TypeNode[];
}
declare interface TSTypeAliasDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAliasDeclaration;
  /**
   * Whether the type was `declare`d.
   * @example
   * ```ts
   * declare type T = 1;
   * ```
   */
  declare: boolean;
  /**
   * The name of the type.
   */
  id: Identifier;
  /**
   * The "value" (type) of the declaration
   */
  typeAnnotation: TypeNode;
  /**
   * The generic type parameters declared for the type. Empty declaration
   * (`<>`) is different from no declaration.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSTypeAnnotation extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAnnotation;
  typeAnnotation: TypeNode;
}
declare interface TSTypeAssertion extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAssertion;
  expression: Expression;
  typeAnnotation: TypeNode;
}
declare interface TSTypeLiteral extends BaseNode {
  type: AST_NODE_TYPES.TSTypeLiteral;
  members: TypeElement[];
}
declare interface TSTypeOperator extends BaseNode {
  type: AST_NODE_TYPES.TSTypeOperator;
  operator: 'keyof' | 'readonly' | 'unique';
  typeAnnotation: TypeNode | undefined;
}
declare interface TSTypeParameter extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameter;
  const: boolean;
  constraint: TypeNode | undefined;
  default: TypeNode | undefined;
  in: boolean;
  name: Identifier;
  out: boolean;
}
declare interface TSTypeParameterDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameterDeclaration;
  params: TSTypeParameter[];
}
declare interface TSTypeParameterInstantiation extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameterInstantiation;
  params: TypeNode[];
}
declare interface TSTypePredicate extends BaseNode {
  type: AST_NODE_TYPES.TSTypePredicate;
  asserts: boolean;
  parameterName: Identifier | TSThisType;
  typeAnnotation: TSTypeAnnotation | null;
}
declare interface TSTypeQuery extends BaseNode {
  type: AST_NODE_TYPES.TSTypeQuery;
  exprName: EntityName$1 | TSImportType;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare interface TSTypeReference extends BaseNode {
  type: AST_NODE_TYPES.TSTypeReference;
  typeArguments: TSTypeParameterInstantiation | undefined;
  typeName: EntityName$1;
}
declare interface TSUndefinedKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSUndefinedKeyword;
}
declare interface TSUnionType extends BaseNode {
  type: AST_NODE_TYPES.TSUnionType;
  types: TypeNode[];
}
declare interface TSUnknownKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSUnknownKeyword;
}
declare interface TSVoidKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSVoidKeyword;
}
declare type TypeElement = TSCallSignatureDeclaration | TSConstructSignatureDeclaration | TSIndexSignature | TSMethodSignature | TSPropertySignature;
declare type TypeNode = TSAbstractKeyword | TSAnyKeyword | TSArrayType | TSAsyncKeyword | TSBigIntKeyword | TSBooleanKeyword | TSConditionalType | TSConstructorType | TSDeclareKeyword | TSExportKeyword | TSFunctionType | TSImportType | TSIndexedAccessType | TSInferType | TSIntersectionType | TSIntrinsicKeyword | TSLiteralType | TSMappedType | TSNamedTupleMember | TSNeverKeyword | TSNullKeyword | TSNumberKeyword | TSObjectKeyword | TSOptionalType | TSPrivateKeyword | TSProtectedKeyword | TSPublicKeyword | TSQualifiedName | TSReadonlyKeyword | TSRestType | TSStaticKeyword | TSStringKeyword | TSSymbolKeyword | TSTemplateLiteralType | TSThisType | TSTupleType | TSTypeLiteral | TSTypeOperator | TSTypePredicate | TSTypeQuery | TSTypeReference | TSUndefinedKeyword | TSUnionType | TSUnknownKeyword | TSVoidKeyword;
declare type UnaryExpression = UnaryExpressionBitwiseNot | UnaryExpressionDelete | UnaryExpressionMinus | UnaryExpressionNot | UnaryExpressionPlus | UnaryExpressionTypeof | UnaryExpressionVoid;
declare interface UnaryExpressionBase extends BaseNode {
  argument: Expression;
  operator: string;
  prefix: boolean;
}
declare type UnaryExpressionBitwiseNot = UnaryExpressionSpecific<'~'>;
declare type UnaryExpressionDelete = UnaryExpressionSpecific<'delete'>;
declare type UnaryExpressionMinus = UnaryExpressionSpecific<'-'>;
declare type UnaryExpressionNot = UnaryExpressionSpecific<'!'>;
declare type UnaryExpressionPlus = UnaryExpressionSpecific<'+'>;
declare interface UnaryExpressionSpecific<T extends string> extends UnaryExpressionBase {
  type: AST_NODE_TYPES.UnaryExpression;
  operator: T;
}
declare type UnaryExpressionTypeof = UnaryExpressionSpecific<'typeof'>;
declare type UnaryExpressionVoid = UnaryExpressionSpecific<'void'>;
declare interface UpdateExpression extends UnaryExpressionBase {
  type: AST_NODE_TYPES.UpdateExpression;
  operator: '++' | '--';
}
declare type UsingDeclaration = UsingInForOfDeclaration | UsingInNormalContextDeclaration;
declare interface UsingDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclaration;
  /**
   * This value will always be `false`
   * because 'declare' modifier cannot appear on a 'using' declaration.
   */
  declare: false;
  /**
   * The keyword used to declare the variable(s)
   * @example
   * ```ts
   * using x = 1;
   * await using y = 2;
   * ```
   */
  kind: 'await using' | 'using';
}
declare type UsingDeclarator = UsingInForOfDeclarator | UsingInNormalContextDeclarator;
declare interface UsingInForOfDeclaration extends UsingDeclarationBase {
  /**
   * The variables declared by this declaration.
   * Always has exactly one element.
   * @example
   * ```ts
   * for (using x of y) {}
   * ```
   */
  declarations: [UsingInForOfDeclarator];
}
declare interface UsingInForOfDeclarator extends VariableDeclaratorBase {
  definite: false;
  id: Identifier;
  init: null;
}
declare interface UsingInNormalContextDeclaration extends UsingDeclarationBase {
  /**
   * The variables declared by this declaration.
   * Always non-empty.
   * @example
   * ```ts
   * using x = 1;
   * using y = 1, z = 2;
   * ```
   */
  declarations: UsingInNormalContextDeclarator[];
}
declare interface UsingInNormalContextDeclarator extends VariableDeclaratorBase {
  definite: false;
  id: Identifier;
  init: Expression;
}
declare type ValueOf<T> = T[keyof T];
declare type VariableDeclaration = LetOrConstOrVarDeclaration | UsingDeclaration;
declare type VariableDeclarator = LetOrConstOrVarDeclarator | UsingDeclarator;
declare interface VariableDeclaratorBase extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclarator;
  /**
   * Whether there's definite assignment assertion (`let x!: number`).
   * If `true`, then: `id` must be an identifier with a type annotation,
   * `init` must be `null`, and the declarator must be a `var`/`let` declarator.
   */
  definite: boolean;
  /**
   * The name(s) of the variable(s).
   */
  id: BindingName;
  /**
   * The initializer expression of the variable. Must be present for `const` unless
   * in a `declare const`.
   */
  init: Expression | null;
}
declare interface VariableDeclaratorDefiniteAssignment extends VariableDeclaratorBase {
  definite: true;
  /**
   * The name of the variable. Must have a type annotation.
   */
  id: Identifier;
  init: null;
}
declare interface VariableDeclaratorMaybeInit extends VariableDeclaratorBase {
  definite: false;
}
declare interface VariableDeclaratorNoInit extends VariableDeclaratorBase {
  definite: false;
  init: null;
}
declare interface WhileStatement extends BaseNode {
  type: AST_NODE_TYPES.WhileStatement;
  body: Statement;
  test: Expression;
}
declare interface WithStatement extends BaseNode {
  type: AST_NODE_TYPES.WithStatement;
  body: Statement;
  object: Expression;
}
declare interface YieldExpression extends BaseNode {
  type: AST_NODE_TYPES.YieldExpression;
  argument: Expression | null;
  delegate: boolean;
}
//#endregion
//#region ../../node_modules/.pnpm/@typescript-eslint+types@8.59.3/node_modules/@typescript-eslint/types/dist/ts-estree.d.ts
declare module './generated/ast-spec' {
  interface BaseNode {
    parent: Node;
  }
  interface Program {
    /**
     * @remarks This never-used property exists only as a convenience for code that tries to access node parents repeatedly.
     */
    parent?: never;
  }
  interface AccessorPropertyComputedName {
    parent: ClassBody;
  }
  interface AccessorPropertyNonComputedName {
    parent: ClassBody;
  }
  interface TSAbstractAccessorPropertyComputedName {
    parent: ClassBody;
  }
  interface TSAbstractAccessorPropertyNonComputedName {
    parent: ClassBody;
  }
  interface VariableDeclaratorDefiniteAssignment {
    parent: VariableDeclaration;
  }
  interface VariableDeclaratorMaybeInit {
    parent: VariableDeclaration;
  }
  interface VariableDeclaratorNoInit {
    parent: VariableDeclaration;
  }
  interface UsingInForOfDeclarator {
    parent: VariableDeclaration;
  }
  interface UsingInNormalContextDeclarator {
    parent: VariableDeclaration;
  }
  interface CatchClause {
    parent: TryStatement;
  }
  interface ClassBody {
    parent: ClassDeclaration | ClassExpression;
  }
  interface ImportAttribute {
    parent: ExportAllDeclaration | ExportNamedDeclaration | ImportDeclaration | TSImportType;
  }
  interface ImportDefaultSpecifier {
    parent: ImportDeclaration;
  }
  interface ImportNamespaceSpecifier {
    parent: ImportDeclaration;
  }
  interface ImportSpecifier {
    parent: ExportAllDeclaration | ExportNamedDeclaration | ImportDeclaration;
  }
  interface ExportDefaultDeclaration {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface ExportNamedDeclarationWithoutSourceWithMultiple {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface ExportNamedDeclarationWithoutSourceWithSingle {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface ExportNamedDeclarationWithSource {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface FunctionDeclarationWithName {
    parent: BlockStatement | ExportDefaultDeclaration | ExportNamedDeclaration | Program;
  }
  interface FunctionDeclarationWithOptionalName {
    parent: ExportDefaultDeclaration;
  }
  interface JSXAttribute {
    parent: JSXOpeningElement;
  }
  interface JSXClosingElement {
    parent: JSXElement;
  }
  interface JSXClosingFragment {
    parent: JSXFragment;
  }
  interface JSXOpeningElement {
    parent: JSXElement;
  }
  interface JSXOpeningFragment {
    parent: JSXFragment;
  }
  interface JSXSpreadAttribute {
    parent: JSXOpeningElement;
  }
  interface MethodDefinitionComputedName {
    parent: ClassBody;
  }
  interface MethodDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface TSAbstractMethodDefinitionComputedName {
    parent: ClassBody;
  }
  interface TSAbstractMethodDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface PropertyComputedName {
    parent: ObjectExpression | ObjectPattern;
  }
  interface PropertyNonComputedName {
    parent: ObjectExpression | ObjectPattern;
  }
  interface PropertyDefinitionComputedName {
    parent: ClassBody;
  }
  interface PropertyDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface TSAbstractPropertyDefinitionComputedName {
    parent: ClassBody;
  }
  interface TSAbstractPropertyDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface SpreadElement {
    parent: ArrayExpression | CallExpression | NewExpression | ObjectExpression;
  }
  interface StaticBlock {
    parent: ClassBody;
  }
  interface SwitchCase {
    parent: SwitchStatement;
  }
  interface TemplateElement {
    parent: TemplateLiteral | TSTemplateLiteralType;
  }
  interface TSCallSignatureDeclaration {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSConstructSignatureDeclaration {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSClassImplements {
    parent: ClassDeclaration | ClassExpression;
  }
  interface TSEnumBody {
    parent: TSEnumDeclaration;
  }
  interface TSEnumMember {
    parent: TSEnumBody;
  }
  interface TSIndexSignature {
    parent: ClassBody | TSInterfaceBody | TSTypeLiteral;
  }
  interface TSInterfaceBody {
    parent: TSInterfaceDeclaration;
  }
  interface TSInterfaceHeritage {
    parent: TSInterfaceBody;
  }
  interface TSMethodSignatureComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSMethodSignatureNonComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSModuleBlock {
    parent: TSModuleDeclaration;
  }
  interface TSParameterProperty {
    parent: FunctionLike;
  }
  interface TSPropertySignatureComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSPropertySignatureNonComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSTypeParameter {
    parent: TSInferType | TSMappedType | TSTypeParameterDeclaration;
  }
  interface ExportSpecifierWithIdentifierLocal {
    parent: ExportNamedDeclaration;
  }
  interface ExportSpecifierWithStringOrLiteralLocal {
    parent: ExportNamedDeclaration;
  }
}
//#endregion
//#region ../core/dist/index.d.ts
//#region src/types/config.d.ts
/**
 * Severity threshold at which a scan blocks CI (exits non-zero). Controlled
 * by `blocking` / `--blocking` (default `"error"`):
 *
 * - `"error"` — block when an `"error"`-severity diagnostic reaches the
 *   `ciFailure` surface. The default.
 * - `"warning"` — block on any diagnostic (warnings included).
 * - `"none"` — never block; the scan is advisory (still reports + scores).
 */
type BlockingLevel = "error" | "warning" | "none";
/**
 * How much of the project a scan looks at and reports on — the single knob the
 * CLI `--scope` flag, the GitHub Action `scope` input, and this config field
 * all share. Ordered widest to narrowest:
 *
 * - `"full"` — whole project, every issue (the default). Whole-project checks
 *   (dead-code, environment, supply-chain) run only at this scope.
 * - `"files"` — only the files changed vs the base, with ALL issues in them
 *   (no compare-to-main). What `--staged` and an uncommitted `--diff` do today.
 * - `"changed"` — only issues the change INTRODUCED vs the base (the baseline
 *   delta). What `--diff <base>` and the action's `scope: changed` do today.
 * - `"lines"` — only issues on the lines the change actually touched.
 */
type ScopeValue = "full" | "files" | "changed" | "lines";
interface ReactDoctorIgnoreOverride {
  /** Glob patterns the override applies to (e.g. `["src/legacy/**"]`). */
  files: string[];
  /**
   * Rule keys to suppress for the matched files. Omit (or leave empty) to
   * suppress every rule for those files.
   */
  rules?: string[];
}
interface ReactDoctorIgnoreConfig {
  /**
   * Fully-qualified rule keys (`"<plugin>/<rule>"`) whose diagnostics are
   * dropped AFTER linting. The rule still runs; its findings are filtered
   * out. To stop a rule from running at all, set it to `"off"` in the
   * top-level `rules` map instead. Prefer `react-doctor rules disable
   * <rule>` to edit this safely.
   */
  rules?: string[];
  /**
   * Glob patterns whose files are excluded from scanning entirely (matched
   * against paths relative to the scanned directory).
   */
  files?: string[];
  /** Per-path rule suppressions — narrower than the top-level `rules`/`files`. */
  overrides?: ReactDoctorIgnoreOverride[];
  /**
   * Behavioral tags whose rules are disabled BEFORE linting, skipping a
   * whole family at once (e.g. `["design", "test-noise", "migration-hint"]`).
   * Prefer `react-doctor rules ignore-tag <tag>` to edit this safely.
   */
  tags?: string[];
}
/**
 * Discrete output channels a diagnostic can flow through after a scan.
 * Each surface is filtered independently so a rule can be visible
 * locally but excluded from PR comments, the score, or the CI gate:
 *
 * - `cli` — local terminal output from `react-doctor` (`printDiagnostics`).
 * - `prComment` — diagnostics destined for a sticky pull-request
 *   summary comment. Selected by running the CLI with `--pr-comment`
 *   (sets `outputSurface: "prComment"`).
 * - `score` — diagnostics shipped to the React Doctor score API
 *   (or counted toward local score calculations).
 * - `ciFailure` — diagnostics that count toward the CI exit-code gate.
 *   react-doctor blocks (exits non-zero) when a diagnostic at or above the
 *   `blocking` threshold reaches this surface (default: `"error"`). A
 *   diagnostic excluded from this surface never fails the build,
 *   regardless of severity.
 *
 * Defaults: design rules (tag `"design"`) are excluded from `prComment`,
 * `score`, and `ciFailure` so style cleanup doesn't dilute meaningful
 * React findings. They remain in `cli` so locally-running developers
 * still see the suggestion when they touch the file.
 */
type DiagnosticSurface = "cli" | "prComment" | "score" | "ciFailure";
/**
 * Severity value accepted by the top-level `rules` and `categories`
 * config fields. Exactly the same form ESLint and oxlint accept:
 * `"off"` skips registration entirely (the rule never runs and
 * never enters any surface); `"error"` / `"warn"` change the rule's
 * registered severity.
 *
 * For visibility-only adjustments (silence on PR comments but keep
 * on CLI / score), prefer `surfaces` instead — severity applies
 * before lint runs and is the most aggressive control.
 */
type RuleSeverityOverride = "error" | "warn" | "off";
/**
 * Internal shape consumed by `resolveRuleSeverityOverride` and
 * `buildDiagnosticPipeline`. Assembled at runtime from the top-level
 * `rules` and `categories` fields on `ReactDoctorConfig`. Per-rule
 * wins over per-category when both match the same diagnostic.
 */
/**
 * Closed set of severity buckets. Spelled out (rather than
 * `Record<string, …>`) so an unknown/typo'd bucket key is a type error
 * instead of a silent no-op.
 */
interface SeverityBuckets {
  "compiler-cleanup"?: RuleSeverityOverride;
}
interface SurfaceControls {
  /**
   * Tag names whose diagnostics should be force-included on the surface,
   * even if a default or category-level exclusion would otherwise drop
   * them. Include wins over exclude when both apply to the same rule.
   */
  includeTags?: string[];
  /**
   * Tag names whose diagnostics should be excluded from the surface.
   * Use this to silence whole rule families (e.g. `["design"]`,
   * `["test-noise"]`) for a single channel without touching others.
   */
  excludeTags?: string[];
  /** Category names (e.g. `"Maintainability"`) to force-include. */
  includeCategories?: string[];
  /** Category names (e.g. `"Maintainability"`) to exclude. */
  excludeCategories?: string[];
  /**
   * Fully-qualified rule keys (`"<plugin>/<rule>"`, e.g.
   * `"react-doctor/design-no-redundant-size-axes"`) to force-include.
   */
  includeRules?: string[];
  /** Fully-qualified rule keys to exclude from this surface. */
  excludeRules?: string[];
}
/**
 * Configuration for the Socket.dev supply-chain score check (the
 * `SupplyChain` service). Runs by default; set `enabled: false` to opt out
 * (it performs one network request per direct dependency).
 *
 * Mirrors how Socket Firewall's free tier (`sfw`) works: each direct
 * dependency's PURL is looked up against Socket's keyless
 * `firewall-api.socket.dev/purl/<purl>` endpoint, which returns per-axis
 * scores (0–100 once normalized). A dependency whose worst security axis
 * (supply chain or vulnerability) scores below `minScore` produces a
 * diagnostic; at the default `severity: "error"` it fails the scan
 * (non-zero CI exit), the same way an error-severity lint finding does.
 */
interface SupplyChainConfig {
  /**
   * Whether to run the Socket supply-chain score check. Default: `true`.
   * Set to `false` to opt out — the check performs one network request per
   * direct dependency. It is always skipped in `--diff` / `--staged` mode
   * and in editor scans regardless of this setting.
   */
  enabled?: boolean;
  /**
   * Minimum acceptable Socket score on a 0–100 scale. A direct dependency
   * whose worst Socket *security* axis — supply chain or vulnerability — is
   * below this is flagged; the quality / maintenance / license axes never
   * gate. Default: `50`. Values outside `0..100` are clamped.
   */
  minScore?: number;
  /**
   * Severity for a below-threshold dependency. `"error"` (default) fails
   * the scan at the standard `blocking: "error"` gate; `"warning"` keeps
   * the finding advisory.
   */
  severity?: "error" | "warning";
  /**
   * Whether to score `devDependencies` in addition to `dependencies`.
   * Default: `true`.
   */
  includeDevDependencies?: boolean;
}
interface ReactDoctorConfig {
  $schema?: string;
  ignore?: ReactDoctorIgnoreConfig;
  lint?: boolean;
  /**
   * Socket.dev supply-chain score gate. Runs by default; set
   * `supplyChain: { enabled: false }` to opt out. See {@link SupplyChainConfig}.
   * Every direct dependency is scored against Socket's free PURL endpoint and
   * a low score fails the scan (at the default `severity: "error"`).
   */
  supplyChain?: SupplyChainConfig;
  /**
   * Whether to run dead-code analysis (via `deslop-js`) alongside lint.
   * Reports unused files, unused exports, unused dependencies, and
   * circular imports under the "Maintainability" category. Default: `true`.
   * Always skipped in `--diff` / `--staged` modes because reachability
   * is a whole-project property.
   */
  deadCode?: boolean;
  verbose?: boolean;
  /**
   * Whether to surface `"warning"`-severity diagnostics. Default: `true`
   * — every warning reaches every surface (CLI, PR comment, score, the
   * CI gate). Warnings only flip the exit code when `blocking` is set to
   * `"warning"`; at the default `"error"` threshold they stay advisory.
   *
   * Set to `false` to surface only `"error"`-severity findings. This is the
   * master toggle and runs after per-rule / per-category severity
   * overrides: a rule the user explicitly restamps to `"warn"` (via
   * `rules` / `categories`) still shows even when `warnings` is `false`.
   */
  warnings?: boolean;
  /**
   * Scan scope. Defaults to `"full"`. See `ScopeValue` for the four values.
   * The CLI `--scope` flag and the GitHub Action `scope` input set the same
   * thing; flags win over config.
   */
  scope?: ScopeValue;
  /**
   * Base git ref the `"files"` / `"changed"` / `"lines"` scopes compare
   * against. Auto-detected from the default branch / merge-base when unset.
   * The reserved value `"parent"` auto-detects the branch the current branch
   * forked from (nearest merge-base) — handy for stacked branches — and
   * falls back to the default branch when none is found.
   */
  base?: string;
  /**
   * @deprecated Use `scope` instead. Still honored as an alias when `scope`
   * is unset: `diff: "<base>"` / `diff: true` → `scope: "changed"`,
   * `diff: false` → `scope: "full"`. Using it emits a one-time deprecation
   * warning. Prefer `scope` (+ `base`).
   */
  diff?: boolean | string;
  /**
   * Severity threshold at which the scan blocks CI (exits non-zero).
   * Default: `"error"` — only `"error"`-severity diagnostics on the
   * `ciFailure` surface fail the build. Set to `"warning"` to also block
   * on warnings, or `"none"` to keep the scan advisory (it still reports
   * findings and a score, but always exits `0`).
   *
   * The GitHub Action exposes the same control as its `blocking`
   * input, and the CLI as `--blocking <level>`. Flags win over config.
   */
  blocking?: BlockingLevel;
  /**
   * @deprecated Renamed to `blocking` (same values + default). Still
   * honored as an alias when `blocking` is unset, but using it emits a
   * one-time deprecation warning. Prefer `blocking`.
   */
  failOn?: BlockingLevel;
  customRulesOnly?: boolean;
  share?: boolean;
  noScore?: boolean;
  /**
   * Redirect react-doctor at a different project directory than the one
   * it was invoked against. Resolved relative to the location of the
   * config file that declared this field (NOT relative to the CWD), so
   * the redirect is stable no matter where the CLI / `diagnose()` is
   * run from. Absolute paths are used as-is.
   *
   * Typical use: a monorepo root holds the only `doctor.config.*`
   * (so editor tooling and child commands all find it), but the React
   * app lives in `apps/web`. Setting `"rootDir": "apps/web"` makes
   * every invocation that loads this config scan that subproject
   * without anyone needing to `cd` first or pass an explicit path.
   *
   * Ignored if the resolved path does not exist or is not a directory
   * (a warning is emitted and react-doctor falls back to the originally
   * requested directory).
   */
  rootDir?: string;
  /**
   * Projects to scan and score separately — the config-file equivalent of
   * the CLI `--project` flag, for repos that always want per-module scoring
   * (e.g. a monorepo dashboard tracking each module's score daily) without
   * passing the flag on every run.
   *
   * Entries resolve exactly like `--project` values: workspace package
   * names (or directory basenames) first, then directory paths relative to
   * the scanned root. `"*"` selects every discovered workspace project.
   * Invalid entries fail the run with the same error as the flag.
   *
   * Precedence: an explicit `--project` flag overrides this list. Only the
   * config at the invocation root is consulted — `projects` inside a
   * module's own config is ignored (modules can't redirect the scan).
   */
  projects?: string[];
  textComponents?: string[];
  /**
   * Names of components that safely route string-only children through a
   * React Native `<Text>` internally (e.g. `heroui-native`'s `Button`,
   * which stringifies its children and renders them through a
   * `ButtonLabel` → `Text`). For listed components, `rn-no-raw-text`
   * is suppressed ONLY when the wrapper's children are entirely
   * stringifiable (no nested JSX elements). A wrapper with mixed
   * children — e.g. `<Button>Save<Icon /></Button>` — still reports,
   * because the wrapper can't safely route raw text alongside a
   * sibling JSX element.
   *
   * Use this instead of `textComponents` when the component is not
   * itself a text element but is known to wrap its string children
   * in one. `textComponents` is the broader escape hatch and
   * suppresses regardless of sibling content.
   */
  rawTextWrapperComponents?: string[];
  /**
   * Project-level allowlist of function names that the
   * `server-auth-actions` rule treats as an auth check at the top of
   * a server action. Names are accepted whether called as a bare
   * identifier (`myAuthGuard()`) or as the final property of a
   * member call (`ctx.myAuthGuard()`); unlike the built-in default
   * list, user-provided names are treated as distinctive and never
   * subject to receiver-object disambiguation.
   *
   * Common guard conventions are already recognized automatically
   * (`requireAdmin`, `ensureSignedIn`, `getCurrentUser`, `hasRole`, …),
   * so this is only needed for domain-specific guards whose names carry
   * no auth noun — e.g. a project-local `requireWorkspaceMember`.
   */
  serverAuthFunctionNames?: string[];
  /**
   * Whether to respect inline `// eslint-disable*`, `// oxlint-disable*`,
   * and `// react-doctor-disable*` comments in source files. Default: `true`.
   *
   * File-level ignores (`.gitignore`, `.eslintignore`, `.oxlintignore`,
   * `.prettierignore`, `.gitattributes` `linguist-vendored` /
   * `linguist-generated`) are ALWAYS honored regardless of this option
   * — they typically point at vendored or generated code that
   * genuinely shouldn't be linted at all.
   *
   * Set to `false` for "audit mode": every inline suppression is
   * neutralized so react-doctor reports every diagnostic regardless
   * of historical hide-comments.
   */
  respectInlineDisables?: boolean;
  /**
   * Whether to merge the user's existing JSON oxlint / eslint config
   * (`.oxlintrc.json` or `.eslintrc.json`) into the generated scan via
   * oxlint's `extends` field, so diagnostics from those rules count
   * toward the react-doctor score. Default: `true`.
   *
   * Detection runs at the scanned directory and walks up to the
   * nearest project boundary (`.git` directory or monorepo root).
   * The first match wins, with `.oxlintrc.json` preferred over
   * `.eslintrc.json`.
   *
   * Only JSON-format configs are supported because oxlint's `extends`
   * cannot evaluate JS/TS configs. Flat configs (`eslint.config.js`),
   * legacy JS configs (`.eslintrc.js`), and TypeScript oxlint configs
   * (`oxlint.config.ts`) are silently skipped.
   *
   * Category-level enables in the user's config (`"categories": { ... }`)
   * are NOT honored — react-doctor explicitly disables every oxlint
   * category to keep the scan scoped to its curated rule surface, and
   * local config wins over `extends`. Use rule-level severities to
   * fold rules into the score.
   *
   * Set to `false` to scan only react-doctor's curated rule set.
   */
  adoptExistingLintConfig?: boolean;
  /**
   * Per-surface include/exclude controls. Each `DiagnosticSurface` is
   * resolved independently against rule tags, category, and id so a
   * single rule can be visible locally yet hidden from PR comments,
   * neutralized from the score, and excluded from the CI gate — all
   * without touching the rule's severity or activation.
   *
   * Defaults (applied before user overrides):
   *
   * - `prComment` excludes tag `"design"`
   * - `score` excludes tag `"design"`
   * - `ciFailure` excludes tag `"design"`
   *
   * Pass any controls block (even an empty `{}`) to keep the default
   * exclusions; the user's include/exclude entries layer on top.
   * Include entries always win over exclude entries — handy for
   * promoting a single high-signal `design-*` rule back into the
   * score or PR-comment surface.
   */
  surfaces?: Partial<Record<DiagnosticSurface, SurfaceControls>>;
  /**
   * Per-rule severity map — the exact ESLint / oxlint top-level
   * `rules` field. Keys are fully-qualified rule keys
   * (`"<plugin>/<rule>"`, e.g. `"react-doctor/no-array-index-as-key"`),
   * values are `"error" | "warn" | "off"`.
   *
   * `"off"` skips registration in the generated lint config so the
   * rule never runs; `"error"` / `"warn"` re-stamp the registered
   * severity and the post-lint diagnostic, so downstream consumers
   * (the CI gate, the score, the printed list) all see the
   * user-chosen severity.
   *
   * For visibility-only changes (silence on PR comments but keep on
   * CLI / score), prefer `surfaces` instead. Most specific control
   * wins: `rules` > `categories` > `tags`.
   *
   * ```json
   * { "rules": { "react-doctor/no-array-index-as-key": "error" } }
   * ```
   */
  rules?: Record<string, RuleSeverityOverride>;
  /**
   * Per-category severity map. Mirrors oxlint's top-level
   * `categories` field, but keyed by React Doctor's five user-facing
   * buckets: `"Security"`, `"Bugs"`, `"Performance"`,
   * `"Accessibility"`, `"Maintainability"`.
   *
   * ```json
   * { "categories": { "Maintainability": "off", "Performance": "warn" } }
   * ```
   *
   * To silence a whole tag-defined rule family (e.g. `"design"`,
   * `"test-noise"`, `"migration-hint"`) that doesn't align with a
   * single category, use `ignore.tags` instead.
   */
  categories?: Record<string, RuleSeverityOverride>;
  /**
   * Per-bucket severity map. Buckets are curated rule families with a
   * shared gating story (not categories). Today the only bucket is
   * `"compiler-cleanup"`: the redundant-memoization rule
   * (`react-compiler-no-manual-memoization`) that ships as a warning once
   * React Compiler is detected. Set it to `"error"` to re-enable strictness.
   *
   * ```json
   * { "buckets": { "compiler-cleanup": "error" } }
   * ```
   *
   * A per-rule override in `rules` still wins over a bucket entry.
   */
  buckets?: SeverityBuckets;
  /**
   * User-defined oxlint plugins to load alongside the built-in
   * `react-doctor` plugin. Each entry is either:
   *
   * - A **relative path** to a JS / TS file (resolved relative to
   *   the directory of the config file that declared it — NOT the
   *   CWD), e.g. `"./lint/my-rules.js"`.
   * - An **npm package name**, e.g. `"react-doctor-plugin-team-conventions"`.
   *
   * The module must default-export an oxlint-shaped plugin:
   * `{ meta: { name: string }, rules: Record<string, HostRule> }`.
   * Use `defineRule` from `oxlint-plugin-react-doctor` for the
   * cleanest authoring shape — see CONTRIBUTING.md → "Writing a
   * custom plugin" for the full template.
   *
   * Rules from a user plugin are **opt-in by default**: a rule
   * doesn't run unless `rules: { "<plugin-name>/<rule>": "warn" | "error" }`
   * explicitly enables it. (Mirrors how `defaultEnabled: false`
   * rules behave in the built-in plugin.) Once enabled, the rule
   * flows through every react-doctor surface (CLI / PR comment /
   * score / CI gate) the same as a built-in rule.
   *
   * ```json
   * {
   *   "plugins": [
   *     "./lint/my-team-rules.js",
   *     "react-doctor-plugin-shopify-conventions"
   *   ],
   *   "rules": {
   *     "my-team-rules/no-bare-fetch": "error",
   *     "shopify-conventions/use-polaris-tokens": "warn"
   *   }
   * }
   * ```
   */
  plugins?: string[];
} //#endregion
//#region src/types/diagnostic.d.ts
/**
 * A secondary source location attached to a diagnostic (oxlint's
 * non-primary labels). Editors render these as
 * `Diagnostic.relatedInformation` so a user can jump from, say, a
 * `no-derived-state` finding to the originating prop declaration.
 * Positions mirror `Diagnostic` semantics: `line` / `column` are
 * 1-indexed, and `offset` / `length` are UTF-8 byte spans from oxlint
 * when available (preferred for precise ranges).
 */
interface DiagnosticRelatedLocation {
  filePath: string;
  line: number;
  column: number;
  offset?: number;
  length?: number;
  endLine?: number;
  endColumn?: number;
  message: string;
}
type DiagnosticFileContext = "test" | "story" | "production";
interface Diagnostic {
  filePath: string;
  plugin: string;
  rule: string;
  severity: "error" | "warning";
  title?: string;
  message: string;
  help: string;
  url?: string;
  line: number;
  column: number;
  /**
   * UTF-8 byte offset of the diagnostic's primary span start, straight
   * from oxlint's label span. Optional because environment / dead-code
   * diagnostics carry no source span. Editors (LSP) convert this into a
   * precise range via the in-memory document; non-editor consumers can
   * ignore it.
   */
  offset?: number;
  /** UTF-8 byte length of the primary span (pairs with `offset`). */
  length?: number;
  /** 1-indexed end line of the primary span, when derivable. */
  endLine?: number;
  /** 1-indexed end column of the primary span, when derivable. */
  endColumn?: number;
  category: string;
  /**
   * Set when the file never ships to users (`"test"` / `"story"`), so
   * renderers can label the site instead of implying production impact.
   * Omitted for production files (the default).
   */
  fileContext?: Exclude<DiagnosticFileContext, "production">;
  suppressionHint?: string;
  /** Secondary source locations (oxlint's non-primary labels). */
  relatedLocations?: DiagnosticRelatedLocation[];
  /**
   * Stable id shared by every finding that a single fix resolves together —
   * e.g. four `useEffect`s that reset state on one prop change all clear with
   * one `key` prop. Set only when ≥2 findings share a root cause; absent for
   * standalone findings. A consumer that turns findings into work items should
   * group by it so one fix reads as one task, not N. Presentation-only and
   * score-neutral — the score never reads it.
   */
  fixGroupId?: string;
}
//#endregion
//#region src/types/project-info.d.ts
type Framework = "nextjs" | "vite" | "cra" | "remix" | "gatsby" | "expo" | "react-native" | "tanstack-start" | "preact" | "unknown";
interface ProjectInfo {
  rootDirectory: string;
  projectName: string;
  reactVersion: string | null;
  reactMajorVersion: number | null;
  tailwindVersion: string | null;
  zodVersion: string | null;
  /** Parsed major from `zodVersion`, or `null` when absent/unparseable. Mirrors `reactMajorVersion`. */
  zodMajorVersion: number | null;
  framework: Framework;
  hasTypeScript: boolean;
  hasReactCompiler: boolean;
  hasTanStackQuery: boolean;
  /**
   * The declared `preact` version spec, or `null` when Preact isn't a
   * dependency. Parallels `reactVersion` so a React-compatible runtime is
   * modeled the same way React is. Drives the `preact` capability in
   * `buildCapabilities` (which gates every `preact-*` rule) — keyed off
   * this rather than `framework` because the dominant Preact setup
   * (Preact-on-Vite) classifies as `framework: "vite"` but still needs
   * Preact rules to fire.
   */
  preactVersion: string | null;
  /** Parsed major from `preactVersion`, or `null` when absent/unparseable. Mirrors `reactMajorVersion`. */
  preactMajorVersion: number | null;
  /**
   * `true` when the project (or any of its workspace packages) declares
   * React Native or Expo as a dependency. Enables the `react-native`
   * capability — and therefore every `rn-*` rule — even on web-rooted
   * monorepos where the entry-point `package.json` is Next / Vite /
   * Remix but a sibling workspace (`apps/mobile`, `packages/native-ui`)
   * targets React Native. The file-level package-boundary check in
   * `oxlint-plugin-react-doctor` still keeps the rules silent on the
   * web workspaces.
   *
   * `false` collapses the gate to the legacy "framework is RN" behavior
   * — no `rn-*` rules load for the project at all.
   */
  hasReactNativeWorkspace: boolean;
  nextjsVersion: string | null;
  nextjsMajorVersion: number | null;
  /**
   * The declared `expo` package version spec (e.g. `"~51.0.0"`), looked up
   * in the project or any of its workspace packages, or `null` when `expo`
   * isn't a dependency. Doubles as react-doctor's "is this an Expo project?"
   * signal (`expoVersion !== null`) and its SDK-version source — the `expo`
   * major tracks the Expo SDK release one-to-one — paralleling how
   * `reactVersion` models the React runtime.
   *
   * Keyed off the dependency rather than `framework === "expo"` because
   * `detectFramework` returns the first matching package, so a project
   * declaring both `expo` and a web bundler (`vite` / `next`) classifies as
   * the web framework yet is still an Expo project. Drives the `expo`
   * capability in `buildCapabilities` (which gates every Expo-specific
   * rule) and the ported expo-doctor checks.
   */
  expoVersion: string | null;
  /**
   * The declared `@shopify/flash-list` package version spec, or `null` when
   * absent. FlashList v2 removed the need for `estimatedItemSize`, so this
   * lets the RN list sizing rule stay scoped to versions where the prop is
   * still useful.
   */
  shopifyFlashListVersion: string | null;
  /** Parsed major from `shopifyFlashListVersion`, or `null` when absent/unparseable. */
  shopifyFlashListMajorVersion: number | null;
  /**
   * `true` when the project (or any of its workspace packages) declares
   * `react-native-reanimated`. Lets diagnostics surface reanimated's
   * Compiler-compatible `.get()` / `.set()` accessors only where they
   * apply, instead of on every React Native project.
   */
  hasReanimated: boolean;
  /**
   * `true` when the project's `tsconfig.json` `compilerOptions.target` or
   * `compilerOptions.lib` indicates the output environment predates ES2023
   * (e.g. `target: "es2022"` or `lib: ["es2022"]`). Drives the `pre-es2023`
   * capability in `buildCapabilities` so rules recommending ES2023-only
   * methods (`toSorted`, `toReversed`, `toSpliced`, `with`, etc.) are
   * silenced on projects that would get a type error or runtime crash.
   * `false` when no tsconfig is found, when the target is ES2023+, or when
   * the config is unparseable — the safe default is to keep the rule active.
   */
  isPreES2023Target: boolean;
  sourceFileCount: number;
}
//#endregion
//#region src/types/score.d.ts
type RuleTier = "P0" | "P1" | "P2" | "P3";
interface RulePriority {
  readonly priority: number | null;
  readonly tier: RuleTier;
}
interface ScoreResult {
  score: number;
  label: string;
  readonly rules?: Readonly<Record<string, RulePriority>>;
} //#endregion
//#region src/types/diagnose.d.ts
interface DiagnoseOptions {
  lint?: boolean;
  /** See `ReactDoctorConfig.deadCode`. Ignored in diff mode. */
  deadCode?: boolean;
  verbose?: boolean;
  includePaths?: string[];
  /**
   * Per-call override for `ReactDoctorConfig.respectInlineDisables`.
   * See that field's docs for the full contract.
   */
  respectInlineDisables?: boolean;
  /**
   * Per-call override for `ReactDoctorConfig.warnings`. See that field's
   * docs — `"warning"`-severity diagnostics surface by default unless this
   * (or the config) opts out via `false`.
   */
  warnings?: boolean;
}
interface DiagnoseResult {
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  /**
   * Checks that did not run to completion (e.g. `"dead-code"` when the
   * `deslop-js` native binding crashed). Empty when everything ran.
   * Mirrors `InspectResult.skippedChecks`.
   */
  skippedChecks: string[];
  /** See `InspectResult.skippedCheckReasons`. */
  skippedCheckReasons?: Record<string, string>;
  project: ProjectInfo;
  elapsedMilliseconds: number;
}
/**
 * A single project to scan as part of a `diagnose({ projects })` batch.
 * Scan options (`deadCode`, `lint`, etc.) are flat on the entry and
 * layer on top of the global defaults — omitted fields fall through.
 */
interface ProjectDefinition extends DiagnoseOptions {
  directory: string;
  /**
   * Per-project config overrides, layered additively (see
   * `mergeReactDoctorConfigs`) on top of the project's on-disk
   * `doctor.config.*` and the batch-level `DiagnoseProjectsInput.config`
   * — so disabling one rule here keeps every base rule intact.
   */
  config?: ReactDoctorConfig;
}
interface ProjectResultOk extends DiagnoseResult {
  ok: true;
  directory: string;
}
interface ProjectResultError {
  ok: false;
  directory: string;
  error: Error;
}
type ProjectResult = ProjectResultOk | ProjectResultError;
interface DiagnoseProjectsInput extends DiagnoseOptions {
  projects: ProjectDefinition[];
  /**
   * Config overrides applied to every project in the batch, layered
   * additively (see `mergeReactDoctorConfigs`) between each project's
   * on-disk `doctor.config.*` and its `ProjectDefinition.config` — one
   * base rule set for the batch, overridden per project only where needed.
   */
  config?: ReactDoctorConfig;
  /**
   * Maximum number of projects to scan concurrently. Defaults to
   * `DEFAULT_PROJECT_SCAN_CONCURRENCY` (4) — each project scan fans out
   * its own lint workers, so the batch is bounded rather than fully
   * parallel. Set to `1` for sequential execution. Values below 1 are
   * clamped to 1.
   */
  concurrency?: number;
}
interface DiagnoseProjectsResult {
  projects: ProjectResult[];
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  elapsedMilliseconds: number;
} //#endregion
//#region src/types/handle-error.d.ts
//#endregion
//#region src/types/inspect.d.ts
interface InspectResult {
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  skippedChecks: string[];
  /**
   * Human-readable explanation for each entry in `skippedChecks`. Keyed
   * by check name (e.g. `"lint"`). Optional so existing consumers that
   * only read `skippedChecks` keep working unchanged — but JSON output
   * and CI integrations should prefer this for diagnostic clarity
   * (e.g. distinguishing "oxlint native binding missing" from "oxlint
   * spawn timed out on a large project").
   */
  skippedCheckReasons?: Record<string, string>;
  project: ProjectInfo;
  elapsedMilliseconds: number;
  /**
   * Number of files the scan reported. Distinct from
   * `project.sourceFileCount` in diff / staged mode (where only changed
   * files are scanned). Optional so non-orchestrator constructors keep
   * working; the multi-project summary falls back to
   * `project.sourceFileCount` when absent.
   */
  scannedFileCount?: number;
  /**
   * Absolute paths of every file the scan considered. Lets the
   * multi-project summary count UNIQUE files across projects instead of
   * summing per-project counts, which double-counts shared files when one
   * workspace package's tree is nested inside another's.
   */
  scannedFilePaths?: ReadonlyArray<string>;
  /**
   * Wall-clock duration of the scan phase, in milliseconds. Distinct
   * from `elapsedMilliseconds` (which spans the full `inspect()` call
   * including score fetch + rendering). Used by the multi-project
   * summary to report combined scan time.
   */
  scanElapsedMilliseconds?: number;
  /**
   * Per-file lint cache outcome: files served from cache, and total files
   * considered. Both absent when the cache was off or bypassed (audit mode,
   * adopted `extends`, user plugins). The CLI projects these onto the Sentry
   * wide event as `lintCacheHitRatio`.
   */
  lintCacheHitFileCount?: number | null;
  lintCacheTotalFileCount?: number | null;
  /**
   * Present only for a baseline run (`InspectOptions.baseline` set). The
   * `diagnostics` above are then the *introduced* findings only; this
   * carries the comparison totals for Codecov-style delta reporting.
   */
  baselineDelta?: {
    /** The commit the base content was read from (resolved merge-base). */baseRef: string; /** Findings present at base but gone at head — resolved by the change. */
    fixedCount: number; /** Total findings at base (over the same files), for context. */
    baseTotalCount: number;
  };
}
/**
 * Options accepted by `inspect()`. Mixes two concern groups; ordered
 * here in the source to make the split visible to future readers:
 *
 *   - **Engine inputs** (`lint`, `deadCode`, `includePaths`,
 *     `configOverride`, `respectInlineDisables`) — flow into
 *     `runInspect`'s `InspectInput` and shape what the engine
 *     actually does.
 *   - **Rendering / orchestration knobs** (`scoreOnly`, `noScore`,
 *     `silent`, `verbose`, `outputSurface`, `isCi`) — consumed by
 *     the public-API shell to decide what to print, which surface
 *     to filter for, and whether to mark the run as CI-originated.
 *
 * A full type split was investigated as the plan's T4 follow-up but
 * deferred — every call site builds the union anyway, so the gain
 * was purely documentary. Grouping the fields here captures the
 * same intent without churning a published-API type.
 */
interface DiffInfo {
  /**
   * `null` when `HEAD` is detached (e.g. GitHub Actions `pull_request`
   * runs that check out `refs/pull/N/merge`). The diff itself still
   * resolves via `git merge-base <base> HEAD`; callers should render
   * this case as `"(detached HEAD)"` or similar.
   */
  currentBranch: string | null;
  baseBranch: string;
  /**
   * Resolved base commit SHA, when known (the GitHub Action forwards
   * `pull_request.base.sha`). Preferred over `baseBranch` for baseline
   * merge-base resolution because a branch name often doesn't resolve in a
   * shallow PR checkout, whereas the fetched SHA always does.
   */
  baseSha?: string;
  /**
   * The commit the changed-file diff was computed against (see
   * `GitDiffSelection.diffBaseRef`). Baseline mode reads base content from
   * here so a two-dot `A..B` range reads from `A` directly instead of being
   * incorrectly merge-based with HEAD.
   */
  diffBaseRef?: string;
  changedFiles: string[];
  isCurrentChanges?: boolean;
}
type JsonReportMode = "full" | "diff" | "staged" | "baseline";
interface JsonReportBaselineInfo {
  /** Resolved base commit (merge-base) the head was compared against. */
  baseRef: string;
  /** Count of introduced findings (equals `summary.totalDiagnosticCount`). */
  newCount: number;
  /** Count of findings the change resolved (present at base, gone at head). */
  fixedCount: number;
  /** Total findings at base over the same files, for context. */
  baseTotalCount: number;
}
interface JsonReportDiffInfo {
  baseBranch: string;
  /** `null` when `HEAD` is detached — see `DiffInfo.currentBranch`. */
  currentBranch: string | null;
  changedFileCount: number;
  isCurrentChanges: boolean;
}
interface JsonReportProjectEntry {
  directory: string;
  project: ProjectInfo;
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  skippedChecks: string[];
  /** Human-readable explanation per skipped check. See `InspectResult.skippedCheckReasons`. */
  skippedCheckReasons?: Record<string, string>;
  /**
   * Number of source files this scan's linter examined. In diff / changed
   * mode it's the count of changed React-eligible files (`.tsx`/`.jsx` plus
   * framework entry files); in a full scan it's the whole source tree. `0`
   * in a diff scan means the changed files held nothing React Doctor lints —
   * the GitHub Action reads that as "nothing to report" (skips the PR comment;
   * the commit status says "skipped"). Optional: absent on reports from
   * constructors that don't track it (e.g. `toJsonReport`).
   */
  scannedFileCount?: number;
  elapsedMilliseconds: number;
}
interface JsonReportSummary {
  errorCount: number;
  warningCount: number;
  affectedFileCount: number;
  totalDiagnosticCount: number;
  score: number | null;
  scoreLabel: string | null;
}
interface JsonReportError {
  message: string;
  name: string;
  chain: string[];
  /**
   * Sentry event id for the crash, when the run reported one (CLI crash
   * path in CI). Lets the GitHub Action surface a quotable reference so a
   * failed scan can be traced back to its Sentry event. `null` for expected
   * user errors and synthetic fallbacks that never hit Sentry.
   */
  sentryEventId?: string | null;
}
interface JsonReportV1$1 {
  schemaVersion: 1;
  version: string;
  ok: boolean;
  directory: string;
  mode: JsonReportMode;
  diff: JsonReportDiffInfo | null;
  projects: JsonReportProjectEntry[];
  /**
   * Flattened across `projects[].diagnostics` for convenience. Equivalent to
   * `projects.flatMap((project) => project.diagnostics)`.
   */
  diagnostics: Diagnostic[];
  summary: JsonReportSummary;
  elapsedMilliseconds: number;
  error: JsonReportError | null;
}
/**
 * Baseline (PR-introduced-issues-only) report. Structurally a superset of v1
 * — every v1 field is present with identical meaning, so consumers that only
 * read `summary` / `diagnostics` / `ok` work unchanged — plus a `baseline`
 * block and `mode: "baseline"`. Here `diagnostics` (and `summary`'s counts)
 * are the *introduced* findings only; `summary.score` is still the head
 * scan's project-health score. New consumers branch on `schemaVersion === 2`.
 */
interface JsonReportV2 extends Omit<JsonReportV1$1, "schemaVersion"> {
  schemaVersion: 2;
  baseline: JsonReportBaselineInfo;
}
type JsonReport = JsonReportV1$1 | JsonReportV2; //#endregion
//#region src/types/prompts.d.ts
//#endregion
//#region src/project-info/errors.d.ts
/**
 * Narrow errors raised by the project-discovery helpers
 * (`discoverProject` / `resolveDiagnoseTarget` / `readPackageJson`).
 *
 * These extend `Error` directly — they are NOT the tagged
 * `ReactDoctorError` from `../errors.js` (that one wraps every
 * runtime-pipeline failure as a `Schema.TaggedErrorClass` for
 * `Effect.catchReasons` dispatch). The split is intentional:
 *
 * - Discovery happens BEFORE the Effect runtime takes over — at the
 *   `diagnose()` / CLI entry point — and throws plain JS exceptions
 *   so callers can `try/catch` without an Effect-layer-aware
 *   `instanceof` check.
 * - The Project service (`services/project.ts → translateProjectInfoError`)
 *   translates each of these into the equivalent tagged-error
 *   `reason` before re-raising inside the Effect pipeline, so the
 *   runtime never sees a non-tagged failure.
 *
 * If you're inside the Effect runtime, use the tagged
 * `ReactDoctorError` from `../errors.js` instead.
 */
/**
 * Distinguishes the two situations that both surface as "no project here", so
 * the rendered message matches reality:
 *
 * - `no-project` (default): the path exists but has no React project — no
 *   `package.json` at the root and no discoverable nested React subproject.
 * - `missing-path`: the resolved scan target does not exist on disk at all
 *   (a typo, a stale temp path, a monorepo subdir that isn't present). The
 *   generic "expected a package.json" guidance is misleading here, so point
 *   at the missing path instead.
 */
interface ProjectNotFoundOptions extends ErrorOptions {
  readonly kind?: "no-project" | "missing-path";
}
declare class ProjectNotFoundError extends Error {
  readonly name = "ProjectNotFoundError";
  readonly directory: string;
  readonly kind: "no-project" | "missing-path";
  constructor(directory: string, options?: ProjectNotFoundOptions);
}
declare class NoReactDependencyError extends Error {
  readonly name = "NoReactDependencyError";
  readonly directory: string;
  constructor(directory: string, options?: ErrorOptions);
}
declare class PackageJsonNotFoundError extends Error {
  readonly name = "PackageJsonNotFoundError";
  readonly directory: string;
  constructor(directory: string, options?: ErrorOptions);
}
declare class NotADirectoryError extends Error {
  readonly name = "NotADirectoryError";
  readonly resolvedPath: string;
  constructor(resolvedPath: string, options?: ErrorOptions);
}
declare class AmbiguousProjectError extends Error {
  readonly name = "AmbiguousProjectError";
  readonly directory: string;
  readonly candidates: readonly string[];
  constructor(directory: string, candidates: readonly string[], options?: ErrorOptions);
}
declare const isProjectDiscoveryError: (value: unknown) => value is ProjectNotFoundError | NoReactDependencyError | PackageJsonNotFoundError | NotADirectoryError | AmbiguousProjectError; //#endregion
//#region src/project-info/utils/is-directory.d.ts
//#endregion
//#region src/errors.d.ts
declare const OxlintUnavailable_base: Class<OxlintUnavailable, TaggedStruct<"OxlintUnavailable", {
  readonly kind: Literals<readonly ["binary-not-found", "native-binding-missing"]>;
  readonly detail: String;
}>, YieldableError>;
declare class OxlintUnavailable extends OxlintUnavailable_base {
  get message(): string;
}
declare const OxlintBatchExceeded_base: Class<OxlintBatchExceeded, TaggedStruct<"OxlintBatchExceeded", {
  readonly kind: Literals<readonly ["timeout", "output-too-large", "oom", "killed"]>;
  readonly detail: String;
}>, YieldableError>;
declare class OxlintBatchExceeded extends OxlintBatchExceeded_base {
  get message(): string;
}
declare const ScanDeadlineExceeded_base: Class<ScanDeadlineExceeded, TaggedStruct<"ScanDeadlineExceeded", {
  readonly detail: String;
}>, YieldableError>;
declare class ScanDeadlineExceeded extends ScanDeadlineExceeded_base {
  get message(): string;
}
declare const OxlintSpawnFailed_base: Class<OxlintSpawnFailed, TaggedStruct<"OxlintSpawnFailed", {
  readonly cause: Unknown;
}>, YieldableError>;
declare class OxlintSpawnFailed extends OxlintSpawnFailed_base {
  get message(): string;
}
declare const OxlintOutputUnparseable_base: Class<OxlintOutputUnparseable, TaggedStruct<"OxlintOutputUnparseable", {
  readonly preview: String;
}>, YieldableError>;
declare class OxlintOutputUnparseable extends OxlintOutputUnparseable_base {
  get message(): string;
}
declare const ConfigParseFailed_base: Class<ConfigParseFailed, TaggedStruct<"ConfigParseFailed", {
  readonly path: String;
  readonly cause: Unknown;
}>, YieldableError>;
declare class ConfigParseFailed extends ConfigParseFailed_base {
  get message(): string;
}
declare const ProjectNotFound_base: Class<ProjectNotFound, TaggedStruct<"ProjectNotFound", {
  readonly directory: String;
}>, YieldableError>;
declare class ProjectNotFound extends ProjectNotFound_base {
  get message(): string;
}
declare const NoReactDependency_base: Class<NoReactDependency, TaggedStruct<"NoReactDependency", {
  readonly directory: String;
}>, YieldableError>;
declare class NoReactDependency extends NoReactDependency_base {
  get message(): string;
}
declare const AmbiguousProject_base: Class<AmbiguousProject, TaggedStruct<"AmbiguousProject", {
  readonly directory: String;
  readonly candidates: $Array<String>;
}>, YieldableError>;
declare class AmbiguousProject extends AmbiguousProject_base {
  get message(): string;
}
declare const DeadCodeAnalysisFailed_base: Class<DeadCodeAnalysisFailed, TaggedStruct<"DeadCodeAnalysisFailed", {
  readonly cause: Unknown;
}>, YieldableError>;
declare class DeadCodeAnalysisFailed extends DeadCodeAnalysisFailed_base {
  get message(): string;
}
declare const GitInvocationFailed_base: Class<GitInvocationFailed, TaggedStruct<"GitInvocationFailed", {
  readonly args: $Array<String>;
  readonly directory: String;
  readonly cause: Unknown;
}>, YieldableError>;
declare class GitInvocationFailed extends GitInvocationFailed_base {
  get message(): string;
}
declare const GitBaseBranchMissing_base: Class<GitBaseBranchMissing, TaggedStruct<"GitBaseBranchMissing", {
  readonly branch: String;
}>, YieldableError>;
declare class GitBaseBranchMissing extends GitBaseBranchMissing_base {
  get message(): string;
}
declare const GitBaseBranchInvalid_base: Class<GitBaseBranchInvalid, TaggedStruct<"GitBaseBranchInvalid", {
  readonly detail: String;
}>, YieldableError>;
declare class GitBaseBranchInvalid extends GitBaseBranchInvalid_base {
  get message(): string;
}
declare const ReactDoctorError_base: Class<ReactDoctorError, TaggedStruct<"ReactDoctorError", {
  readonly reason: Union<readonly [typeof OxlintUnavailable, typeof OxlintBatchExceeded, typeof ScanDeadlineExceeded, typeof OxlintSpawnFailed, typeof OxlintOutputUnparseable, typeof ConfigParseFailed, typeof ProjectNotFound, typeof NoReactDependency, typeof AmbiguousProject, typeof DeadCodeAnalysisFailed, typeof GitInvocationFailed, typeof GitBaseBranchMissing, typeof GitBaseBranchInvalid]>;
}>, YieldableError>;
declare class ReactDoctorError extends ReactDoctorError_base {
  get message(): string;
}
declare const isReactDoctorError: (error: unknown) => error is ReactDoctorError;
/**
 * Tagged-reason → legacy thrown-class boundary shared by every public
 * shell (`inspect()` in `react-doctor`, `diagnose()` in `@react-doctor/api`).
 *
 * `Effect.catchReasons` dispatches on the tagged-error sub-channel
 * without manual `instanceof` checks. Each handler converts a tagged
 * reason into the historical thrown class advertised by the legacy
 * public-API contract (via `Effect.die`, which `Effect.runPromise`
 * re-throws unchanged). The `orElse` branch re-`die`s the original
 * `ReactDoctorError` instance so advanced callers can still narrow on
 * `error.reason._tag` while grep-stderr users keep the same
 * `error.message` they always saw.
 *
 * Adding a new legacy thrown class is a one-line change on the
 * `Effect.catchReasons` map — both shells pick it up automatically.
 */
//#endregion
//#region src/build-json-report-error.d.ts
interface BuildJsonReportErrorInput {
  version: string;
  directory: string;
  error: unknown;
  elapsedMilliseconds: number;
  mode?: JsonReportMode;
  /** Sentry event id for the crash, when the run reported one. */
  sentryEventId?: string | null;
}
declare const buildJsonReportError: (input: BuildJsonReportErrorInput) => JsonReport; //#endregion
//#region src/build-json-report.d.ts
interface BuildJsonReportInput {
  version: string;
  directory: string;
  mode: JsonReportMode;
  diff: DiffInfo | null;
  scans: Array<{
    directory: string;
    result: InspectResult;
  }>;
  totalElapsedMilliseconds: number;
  /**
   * Present for a baseline run — `scans[].result.diagnostics` are then the
   * introduced findings only. Emits a `schemaVersion: 2` report with the
   * delta totals and `mode: "baseline"`.
   */
  baseline?: {
    baseRef: string;
    fixedCount: number;
    baseTotalCount: number;
  };
}
declare const buildJsonReport: (input: BuildJsonReportInput) => JsonReport; //#endregion
//#region src/build-skipped-checks.d.ts
//#endregion
//#region src/get-diff-files.d.ts
/**
 * Programmatic façade over `Git.diffSelection`. Async because the
 * Git service runs through Effect's `ChildProcess` (true subprocess
 * spawn, not `spawnSync`).
 *
 * Failures propagate as the tagged `ReactDoctorError` (rejected by
 * `Effect.runPromise`) rather than being flattened into a plain
 * `Error`. The message is unchanged — `ReactDoctorError.message`
 * defers to `reason.message` — so message-matching callers keep
 * working, while the CLI can now dispatch on `error.reason._tag` to
 * render diff-base mistakes (`GitBaseBranchInvalid` /
 * `GitBaseBranchMissing`) as clean user errors instead of crashes.
 */
declare const getDiffInfo: (directory: string, explicitBaseBranch?: string, options?: {
  readonly useParentBranch?: boolean;
}) => Promise<DiffInfo | null>;
declare const filterSourceFiles: (filePaths: string[]) => string[];
/**
 * Programmatic façade over `Git.changedLineRanges` (the `lines` scope). Diffs
 * `files` with `--unified=0` against `baseRef` (or the index when `cached`),
 * returning per-file changed line ranges relative to `directory`. Returns
 * `null` when the ranges can't be computed (git unavailable / unsafe ref /
 * non-zero exit) so the caller degrades to file-level scope; an empty array
 * means git succeeded but the files added no lines.
 */
//#endregion
//#region src/summarize-diagnostics.d.ts
declare const summarizeDiagnostics: (diagnostics: Diagnostic[], worstScore?: number | null, worstScoreLabel?: string | null) => JsonReportSummary; //#endregion
//#region src/validate-config-types.d.ts
//#endregion
//#region src/utils/define-config.d.ts
/**
 * Identity helper for authoring a typed `doctor.config.{ts,js,mjs,cjs}`.
 * Gives editor autocomplete and type-checking for the config object without
 * an explicit `satisfies ReactDoctorConfig` annotation; returns the config
 * untouched so the loader sees the same plain object either way.
 */
declare const defineConfig: (config: ReactDoctorConfig) => ReactDoctorConfig; //#endregion
//#region src/utils/group-by.d.ts
//#endregion
//#region ../api/dist/index.d.ts
//#region src/diagnose.d.ts
interface Diagnose {
  /** Scan a single project directory and return diagnostics + score. */
  (directory: string, options?: DiagnoseOptions): Promise<DiagnoseResult>;
  /**
   * Scan multiple projects in parallel — each through the same pipeline as
   * the single-directory form — and return per-project results plus an
   * aggregate worst-of score. A failing project (e.g. no `package.json`)
   * comes back with `ok: false` instead of aborting the batch. Per-project
   * `config` layers on the batch `config`, which layers on each project's
   * on-disk config (see `mergeReactDoctorConfigs`).
   */
  (input: DiagnoseProjectsInput): Promise<DiagnoseProjectsResult>;
}
declare const diagnose: Diagnose; //#endregion
//#endregion
//#region src/index.d.ts
declare const clearCaches: () => void;
interface ToJsonReportOptions {
  version: string;
  directory?: string;
  mode?: JsonReportMode;
}
declare const toJsonReport: (result: DiagnoseResult, options: ToJsonReportOptions) => JsonReport;
//#endregion
export { AmbiguousProjectError, type DiagnoseOptions, type DiagnoseProjectsInput, type DiagnoseProjectsResult, type DiagnoseResult, type Diagnostic, type DiffInfo, type JsonReport, type JsonReportDiffInfo, type JsonReportError, type JsonReportMode, type JsonReportProjectEntry, type JsonReportSummary, NoReactDependencyError, NotADirectoryError, PackageJsonNotFoundError, type ProjectDefinition, type ProjectInfo, ProjectNotFoundError, type ProjectResult, type ProjectResultError, type ProjectResultOk, type ReactDoctorConfig, ReactDoctorError, type ScoreResult, buildJsonReport, buildJsonReportError, clearCaches, defineConfig, diagnose, filterSourceFiles, getDiffInfo, isProjectDiscoveryError, isReactDoctorError, summarizeDiagnostics, toJsonReport };
//# sourceMappingURL=index.d.ts.map