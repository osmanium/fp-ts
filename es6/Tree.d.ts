/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = Array<Tree<A>>
 * ```
 *
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative3, Applicative3C, Applicative2, Applicative2C } from './Applicative'
import { Apply1 } from './Apply'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { Functor1 } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
/**
 * @since 2.0.0
 */
export declare const URI = 'Tree'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Tree<A>
  }
}
/**
 * @since 2.0.0
 */
export declare type Forest<A> = ReadonlyArray<Tree<A>>
/**
 * @since 2.0.0
 */
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}
/**
 * @since 2.0.0
 */
export declare function make<A>(value: A, forest?: Forest<A>): Tree<A>
/**
 * @since 2.0.0
 */
export declare function getShow<A>(S: Show<A>): Show<Tree<A>>
/**
 * @since 2.0.0
 */
export declare function getEq<A>(E: Eq<A>): Eq<Tree<A>>
/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 2.0.0
 */
export declare function drawForest(forest: Forest<string>): string
/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree } from 'fp-ts/lib/Tree'
 *
 * const fa = make('a', [
 *   make('b'),
 *   make('c'),
 *   make('d', [make('e'), make('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 2.0.0
 */
export declare function drawTree(tree: Tree<string>): string
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
export declare function unfoldTree<A, B>(b: B, f: (b: B) => readonly [A, ReadonlyArray<B>]): Tree<A>
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
export declare function unfoldForest<A, B>(bs: ReadonlyArray<B>, f: (b: B) => readonly [A, ReadonlyArray<B>]): Forest<A>
/**
 * Monadic tree builder, in depth-first order
 *
 * @since 2.0.0
 */
export declare function unfoldTreeM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <R, E, A, B>(b: B, f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <R, A, B>(b: B, f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <E, A, B>(b: B, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <A, B>(b: B, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <A, B>(b: B, f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => Kind<M, Tree<A>>
export declare function unfoldTreeM<M>(
  M: Monad<M> & Applicative<M>
): <A, B>(b: B, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => HKT<M, Tree<A>>
/**
 * Monadic forest builder, in depth-first order
 *
 * @since 2.0.0
 */
export declare function unfoldForestM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <R, E, A, B>(
  bs: ReadonlyArray<B>,
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <R, A, B>(
  bs: ReadonlyArray<B>,
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <R, E, B>(bs: ReadonlyArray<B>, f: (b: B) => Kind2<M, R, readonly [E, ReadonlyArray<B>]>) => Kind2<M, R, Forest<E>>
export declare function unfoldForestM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <A, B>(bs: ReadonlyArray<B>, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Forest<A>>
export declare function unfoldForestM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <A, B>(bs: ReadonlyArray<B>, f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => Kind<M, Forest<A>>
export declare function unfoldForestM<M>(
  M: Monad<M> & Applicative<M>
): <A, B>(bs: ReadonlyArray<B>, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => HKT<M, Forest<A>>
/**
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, fa: Tree<A>) => boolean
/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 *
 * @example
 * import { fold, make } from 'fp-ts/lib/Tree'
 *
 * const t = make(1, [make(2), make(3)])
 *
 * const sum = (as: ReadonlyArray<number>) => as.reduce((a, acc) => a + acc, 0)
 *
 * // Sum the values in a tree:
 * assert.deepStrictEqual(fold((a: number, bs: ReadonlyArray<number>) => a + sum(bs))(t), 6)
 *
 * // Find the maximum value in the tree:
 * assert.deepStrictEqual(fold((a: number, bs: ReadonlyArray<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t), 3)
 *
 * // Count the number of leaves in the tree:
 * assert.deepStrictEqual(fold((_: number, bs: ReadonlyArray<number>) => (bs.length === 0 ? 1 : sum(bs)))(t), 2)
 *
 * @since 2.6.0
 */
export declare function fold<A, B>(f: (a: A, bs: ReadonlyArray<B>) => B): (tree: Tree<A>) => B
/**
 * @since 2.0.0
 */
export declare const ap: <A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
/**
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<A>
/**
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<B>
/**
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B>
/**
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<A>
/**
 * @since 2.0.0
 */
export declare const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B>
/**
 * @since 2.0.0
 */
export declare const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>>
/**
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A>
/**
 * @since 2.0.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B>
/**
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B
/**
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B
/**
 * @since 2.6.2
 */
export declare const extract: <A>(wa: Tree<A>) => A
/**
 * @since 3.0.0
 */
export declare const traverse: Traversable1<URI>['traverse']
/**
 * @since 3.0.0
 */
export declare const sequence: Traversable1<URI>['sequence']
/**
 * @since 3.0.0
 */
export declare const functorTree: Functor1<URI>
/**
 * @since 3.0.0
 */
export declare const applyTree: Apply1<URI>
/**
 * @since 3.0.0
 */
export declare const applicativeTree: Applicative1<URI>
/**
 * @since 3.0.0
 */
export declare const monadTree: Monad1<URI>
/**
 * @since 3.0.0
 */
export declare const foldableTree: Foldable1<URI>
/**
 * @since 3.0.0
 */
export declare const traversableTree: Traversable1<URI>
/**
 * @since 3.0.0
 */
export declare const extendTree: Extend1<URI>
/**
 * @since 3.0.0
 */
export declare const comonadTree: Comonad1<URI>