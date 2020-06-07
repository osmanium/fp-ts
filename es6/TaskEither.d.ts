/**
 * `TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative2, Applicative2C } from './Applicative'
import { Apply2 } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import { Filterable2C } from './Filterable'
import { Lazy, Predicate, Refinement } from './function'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import Either = E.Either
import Task = T.Task
/**
 * @since 2.0.0
 */
export declare const URI = 'TaskEither'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskEither<E, A>
  }
}
/**
 * @since 2.0.0
 */
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
/**
 * @since 2.0.0
 */
export declare const left: <E = never, A = never>(e: E) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const right: <E = never, A = never>(a: A) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare function rightIO<E = never, A = never>(ma: IO<A>): TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare function leftIO<E = never, A = never>(me: IO<E>): TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const rightTask: <E = never, A = never>(ma: Task<A>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const leftTask: <E = never, A = never>(me: Task<E>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const fold: <E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>
) => (ma: TaskEither<E, A>) => Task<B>
/**
 * @since 2.0.0
 */
export declare const getOrElse: <E, A>(onLeft: (e: E) => Task<A>) => (ma: TaskEither<E, A>) => Task<A>
/**
 * @since 2.6.0
 */
export declare const getOrElseW: <E, B>(onLeft: (e: E) => Task<B>) => <A>(ma: TaskEither<E, A>) => Task<A | B>
/**
 * @since 2.0.0
 */
export declare const orElse: <E, A, M>(onLeft: (e: E) => TaskEither<M, A>) => (ma: TaskEither<E, A>) => TaskEither<M, A>
/**
 * @since 2.0.0
 */
export declare const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<TaskEither<E, A>>
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * @example
 * import { left, right } from 'fp-ts/lib/Either'
 * import { tryCatch } from 'fp-ts/lib/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @since 2.0.0
 */
export declare function tryCatch<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A>
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export declare function bracket<E, A, B>(
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: Either<E, B>) => TaskEither<E, void>
): TaskEither<E, B>
/**
 * Convert a node style callback function to one returning a `TaskEither`
 *
 * **Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
 * behaviour, add an explicit type annotation
 *
 * ```ts
 * // readFile admits multiple overloadings
 *
 * // const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
 * const readFile = taskify(fs.readFile)
 *
 * const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
 *   fs.readFile
 * )
 * ```
 *
 * @example
 * import { taskify } from 'fp-ts/lib/TaskEither'
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * assert.strictEqual(stat.length, 0)
 *
 * @since 2.0.0
 */
export declare function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>
export declare function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => TaskEither<L, R>
export declare function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => TaskEither<L, R>
export declare function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export declare function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export declare function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>
/**
 * @since 3.0.0
 */
export declare function getTaskValidationApplicative<E>(S: Semigroup<E>): Applicative2C<URI, E>
/**
 * @since 3.0.0
 */
export declare function getTaskValidationAlt<E>(S: Semigroup<E>): Alt2C<URI, E>
/**
 * @since 2.1.0
 */
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
/**
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => TaskEither<E, B>
/**
 * @since 2.4.0
 */
export declare function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B>
/**
 * @since 2.4.0
 */
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (...a: A) => TaskEither<E, B>
/**
 * @since 2.4.0
 */
export declare function chainIOEitherK<E, A, B>(f: (a: A) => IOEither<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B>
/**
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @since 2.5.0
 */
export declare function tryCatchK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Promise<B>,
  onRejected: (reason: unknown) => E
): (...a: A) => TaskEither<E, B>
/**
 * @since 2.0.0
 */
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A>
}
/**
 * @since 2.0.0
 */
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>
}
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
/**
 * @since 3.0.0
 */
export declare const functorTaskEither: Functor2<URI>
/**
 * @since 2.0.0
 */
export declare const ap: <E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
/**
 * @since 3.0.0
 */
export declare const applyTaskEither: Apply2<URI>
/**
 * @since 2.0.0
 */
export declare const apFirst: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const apSecond: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, B>
/**
 * @since 3.0.0
 */
export declare const applicativeTaskEitherPar: Applicative2<URI>
/**
 * @since 2.0.0
 */
export declare const applicativeTaskEitherSeq: Applicative2<URI>
/**
 * @since 2.0.0
 */
export declare const chain: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
/**
 * @since 3.0.0
 */
export declare const monadTaskEither: Monad2<URI>
/**
 * @since 2.6.0
 */
export declare const chainW: <D, A, B>(
  f: (a: A) => TaskEither<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B>
/**
 * @since 2.6.1
 */
export declare const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B>
/**
 * @since 2.6.1
 */
export declare const chainIOEitherKW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B>
/**
 * @since 2.0.0
 */
export declare const chainFirst: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const flatten: <E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A>
/**
 * @since 2.0.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskEither<E, A>) => TaskEither<G, B>
/**
 * @since 2.0.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskEither<E, A>) => TaskEither<G, A>
/**
 * @since 3.0.0
 */
export declare const bifunctorTaskEither: Bifunctor2<URI>
/**
 * @since 2.0.0
 */
export declare const alt: <E, A>(that: () => TaskEither<E, A>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
/**
 * @since 3.0.0
 */
export declare const altTaskEither: Alt2<URI>
/**
 * @since 3.0.0
 */
export declare const monadIOTaskEither: MonadIO2<URI>
/**
 * @since 3.0.0
 */
export declare const monadTaskTaskEither: MonadTask2<URI>
/**
 * @since 3.0.0
 */
export declare const monadThrowTaskEither: MonadThrow2<URI>