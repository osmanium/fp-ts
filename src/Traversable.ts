/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results.
 * - `sequence` runs the actions _contained_ in a data structure, and accumulates the results.
 *
 * The `traverse` and `sequence` functions should be compatible in the following sense:
 *
 * - `traverse(A)(xs, f) = sequence(A)(A.map(xs, f))`
 * - `sequence(A)(xs) = traverse(A)(xs, identity)`
 *
 * where `A` is an `Applicative` instance
 *
 * `Traversable` instances should also be compatible with the corresponding `Foldable` instances, in the following sense:
 *
 * ```ts
 * import { getApplicative, make } from 'fp-ts/lib/Const'
 *
 * const A = getApplicative(M)
 *
 * foldMap(M)(xs, f) = traverse(A)(xs, a => make(f(a)))
 * ```
 *
 * where `M` is a `Monoid` instance
 *
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import {
  Foldable,
  Foldable1,
  Foldable2,
  Foldable2C,
  Foldable3,
  FoldableComposition,
  FoldableComposition11,
  getFoldableComposition
} from './Foldable'
import {
  Functor,
  Functor1,
  Functor2,
  Functor2C,
  Functor3,
  FunctorComposition,
  FunctorComposition11,
  getFunctorComposition
} from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { pipe } from './function'

/**
 * @since 3.0.0
 */
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}

/**
 * @since 3.0.0
 */
export interface Traversable1<T extends URIS> extends Functor1<T>, Foldable1<T> {
  readonly traverse: Traverse1<T>
  readonly sequence: Sequence1<T>
}

/**
 * @since 3.0.0
 */
export interface Traversable2<T extends URIS2> extends Functor2<T>, Foldable2<T> {
  readonly traverse: Traverse2<T>
  readonly sequence: Sequence2<T>
}

/**
 * @since 3.0.0
 */
export interface Traversable2C<T extends URIS2, TL> extends Functor2C<T, TL>, Foldable2C<T, TL> {
  readonly traverse: Traverse2C<T, TL>
  readonly sequence: Sequence2C<T, TL>
}

/**
 * @since 3.0.0
 */
export interface Traversable3<T extends URIS3> extends Functor3<T>, Foldable3<T> {
  readonly traverse: Traverse3<T>
  readonly sequence: Sequence3<T>
}

/**
 * @since 3.0.0
 */
export interface Traverse<T> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => (ta: HKT<T, A>) => Kind3<F, FR, FE, HKT<T, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, FR, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => (ta: HKT<T, A>) => Kind3<F, FR, FE, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: HKT<T, A>) => Kind2<F, FE, HKT<T, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: HKT<T, A>) => Kind2<F, FE, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: HKT<T, A>) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: HKT<T, A>) => HKT<F, HKT<T, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => (ta: Kind<T, A>) => Kind3<F, FR, FE, Kind<T, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, FR, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => (ta: Kind<T, A>) => Kind3<F, FR, FE, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind<T, A>) => Kind2<F, FE, Kind<T, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind<T, A>) => Kind2<F, FE, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind<T, A>) => HKT<F, Kind<T, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, FR, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <TE>(ta: Kind2<T, TE, A>) => HKT<F, Kind2<T, TE, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse2C<T extends URIS2, TE> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => (ta: Kind2<T, TE, A>) => Kind3<F, FR, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind2<T, TE, A>) => HKT<F, Kind2<T, TE, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind2<F, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <R, TE>(ta: Kind3<T, R, TE, A>) => Kind2<F, FE, Kind3<T, R, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <R, TE>(ta: Kind3<T, R, TE, A>) => Kind<F, Kind3<T, R, TE, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, B>
  ) => <R, TE>(ta: Kind3<T, R, TE, A>) => HKT<F, Kind3<T, R, TE, B>>
}

/**
 * @since 3.0.0
 */
export interface Sequence<T> {
  <F extends URIS3>(F: Applicative3<F>): <FR, FE, A>(ta: HKT<T, Kind3<F, FR, FE, A>>) => Kind3<F, FR, FE, HKT<T, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <FR, A>(ta: HKT<T, Kind3<F, FR, E, A>>) => Kind3<F, FR, E, HKT<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FE, A>(ta: HKT<T, Kind2<F, FE, A>>) => Kind2<F, FE, HKT<T, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A>(ta: HKT<T, Kind2<F, FE, A>>) => Kind2<F, FE, HKT<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: HKT<T, Kind<F, A>>) => Kind<F, HKT<T, A>>
  <F>(F: Applicative<F>): <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
}

/**
 * @since 3.0.0
 */
export interface Sequence1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FR, FE, A>(ta: Kind<T, Kind3<F, FR, FE, A>>) => Kind3<F, FR, FE, Kind<T, A>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <R, A>(ta: Kind<T, Kind3<F, R, FE, A>>) => Kind3<F, R, FE, Kind<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FE, A>(ta: Kind<T, Kind2<F, FE, A>>) => Kind2<F, FE, Kind<T, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A>(ta: Kind<T, Kind2<F, FE, A>>) => Kind2<F, FE, Kind<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Kind<T, Kind<F, A>>) => Kind<F, Kind<T, A>>
  <F>(F: Applicative<F>): <A>(ta: Kind<T, HKT<F, A>>) => HKT<F, Kind<T, A>>
}

/**
 * @since 3.0.0
 */
export interface Sequence2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TE, FR, FE, A>(
    ta: Kind2<T, TE, Kind3<F, FR, FE, A>>
  ) => Kind3<F, FR, FE, Kind2<T, TE, A>>
  <F extends URIS2>(F: Applicative2<F>): <TE, FE, A>(ta: Kind2<T, TE, Kind2<F, FE, A>>) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TE, A>(
    ta: Kind2<T, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS>(F: Applicative1<F>): <TE, A>(ta: Kind2<T, TE, Kind<F, A>>) => Kind<F, Kind2<T, TE, A>>
  <F>(F: Applicative<F>): <TE, A>(ta: Kind2<T, TE, HKT<F, A>>) => HKT<F, Kind2<T, TE, A>>
}

/**
 * @since 3.0.0
 */
export interface Sequence2C<T extends URIS2, TE> {
  <F extends URIS3>(F: Applicative3<F>): <FR, FE, A>(
    ta: Kind2<T, TE, Kind3<F, FR, FE, A>>
  ) => Kind3<F, FR, FE, Kind2<T, TE, A>>
  <F extends URIS2>(F: Applicative2<F>): <FE, A>(ta: Kind2<T, TE, Kind2<F, FE, A>>) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A>(
    ta: Kind2<T, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Kind2<T, TE, Kind<F, A>>) => Kind<F, Kind2<T, TE, A>>
  <F>(F: Applicative<F>): <A>(ta: Kind2<T, TE, HKT<F, A>>) => HKT<F, Kind2<T, TE, A>>
}

/**
 * @since 3.0.0
 */
export interface Sequence3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TR, TE, FR, FE, A>(
    ta: Kind3<T, TR, TE, Kind3<F, FR, FE, A>>
  ) => Kind3<F, FR, FE, Kind3<T, TR, TE, A>>
  <F extends URIS2>(F: Applicative2<F>): <TR, TE, FE, A>(
    ta: Kind3<T, TR, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind3<T, TR, TE, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TR, TE, A>(
    ta: Kind3<T, TR, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind3<T, TR, TE, A>>
  <F extends URIS>(F: Applicative1<F>): <TR, TE, A>(ta: Kind3<T, TR, TE, Kind<F, A>>) => Kind<F, Kind3<T, TR, TE, A>>
  <F>(F: Applicative<F>): <TR, TE, A>(ta: Kind3<T, TR, TE, HKT<F, A>>) => HKT<F, Kind3<T, TR, TE, A>>
}

/**
 * @since 3.0.0
 */
export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(f: (a: A) => HKT<H, B>) => (fga: HKT<F, HKT<G, A>>) => HKT<H, HKT<F, HKT<G, B>>>
  readonly sequence: <H>(H: Applicative<H>) => <A>(fga: HKT<F, HKT<G, HKT<H, A>>>) => HKT<H, HKT<F, HKT<G, A>>>
}

/**
 * @since 3.0.0
 */
export interface TraverseComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <R, E, A, B>(
    f: (a: A) => Kind3<H, R, E, B>
  ) => (fga: Kind<F, Kind<G, A>>) => Kind3<H, R, E, Kind<F, Kind<G, B>>>
  <H extends URIS2>(H: Applicative2<H>): <E, A, B>(
    f: (a: A) => Kind2<H, E, B>
  ) => (fga: Kind<F, Kind<G, A>>) => Kind2<H, E, Kind<F, Kind<G, B>>>
  <H extends URIS2, E>(H: Applicative2C<H, E>): <A, B>(
    f: (a: A) => Kind2<H, E, B>
  ) => (fga: Kind<F, Kind<G, A>>) => Kind2<H, E, Kind<F, Kind<G, B>>>
  <H extends URIS>(H: Applicative1<H>): <A, B>(
    f: (a: A) => Kind<H, B>
  ) => (fga: Kind<F, Kind<G, A>>) => Kind<H, Kind<F, Kind<G, B>>>
  <H>(H: Applicative<H>): <A, B>(f: (a: A) => HKT<H, B>) => (fga: Kind<F, Kind<G, A>>) => HKT<H, Kind<F, Kind<G, B>>>
}

/**
 * @since 3.0.0
 */
export interface SequenceComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <R, E, A>(
    fga: Kind<F, Kind<G, Kind3<H, R, E, A>>>
  ) => Kind3<H, R, E, Kind<F, Kind<G, A>>>
  <H extends URIS2>(H: Applicative2<H>): <E, A>(
    fga: Kind<F, Kind<G, Kind2<H, E, A>>>
  ) => Kind2<H, E, Kind<F, Kind<G, A>>>
  <H extends URIS2, E>(H: Applicative2C<H, E>): <A>(
    fga: Kind<F, Kind<G, Kind2<H, E, A>>>
  ) => Kind2<H, E, Kind<F, Kind<G, A>>>
  <H extends URIS>(H: Applicative1<H>): <A>(fga: Kind<F, Kind<G, Kind<H, A>>>) => Kind<H, Kind<F, Kind<G, A>>>
  <H>(H: Applicative<H>): <A>(fga: Kind<F, Kind<G, HKT<H, A>>>) => HKT<H, Kind<F, Kind<G, A>>>
}

/**
 * @since 3.0.0
 */
export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: TraverseComposition11<F, G>
  readonly sequence: SequenceComposition11<F, G>
}

/**
 * Returns the composition of two traversables
 *
 * @example
 * import { array } from 'fp-ts/lib/Array'
 * import { io } from 'fp-ts/lib/IO'
 * import { none, option, some } from 'fp-ts/lib/Option'
 * import { getTraversableComposition } from 'fp-ts/lib/Traversable'
 *
 * const T = getTraversableComposition(array, option)
 * const state: Record<string, number | undefined> = {
 *   a: 1,
 *   b: 2
 * }
 * const read = (s: string) => () => state[s]
 * const x = T.sequence(io)([some(read('a')), none, some(read('b')), some(read('c'))])
 * assert.deepStrictEqual(x(), [some(1), none, some(2), some(undefined)])
 *
 * @since 3.0.0
 */
export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable1<F>,
  G: Traversable1<G>
): TraversableComposition11<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    ...getFoldableComposition(F, G),
    traverse: (H) => {
      const traverseF = F.traverse(H)
      const traverseG = G.traverse(H)
      return (f) => traverseF((ga) => pipe(ga, traverseG(f)))
    },
    sequence: (H) => {
      const sequenceF = F.sequence(H)
      const sequenceG = G.sequence(H)
      return (fgha) => sequenceF(pipe(fgha, F.map(sequenceG)))
    }
  }
}
