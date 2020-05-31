/**
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { State } from './State'
/**
 * @since 2.0.0
 */
export interface StateT<M, S, A> {
  (s: S): HKT<M, [A, S]>
}
/**
 * @since 3.0.0
 */
export interface StateM<M> {
  readonly map: <A, B>(f: (a: A) => B) => <S>(fa: StateT<M, S, A>) => StateT<M, S, B>
  readonly of: <S, A>(a: A) => StateT<M, S, A>
  readonly ap: <S, A>(fa: StateT<M, S, A>) => <B>(fab: StateT<M, S, (a: A) => B>) => StateT<M, S, B>
  readonly chain: <S, A, B>(f: (a: A) => StateT<M, S, B>) => (fa: StateT<M, S, A>) => StateT<M, S, B>
  readonly get: <S>() => StateT<M, S, S>
  readonly put: <S>(s: S) => StateT<M, S, void>
  readonly modify: <S>(f: (s: S) => S) => StateT<M, S, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT<M, S, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT<M, S, A>
  readonly fromM: <S, A>(ma: HKT<M, A>) => StateT<M, S, A>
  readonly evalState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, A>
  readonly execState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, S>
}
/**
 * @since 2.0.0
 */
export interface StateT1<M extends URIS, S, A> {
  (s: S): Kind<M, [A, S]>
}
/**
 * @since 3.0.0
 */
export interface StateM1<M extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => <S>(fa: StateT1<M, S, A>) => StateT1<M, S, B>
  readonly of: <S, A>(a: A) => StateT1<M, S, A>
  readonly ap: <S, A>(fa: StateT1<M, S, A>) => <B>(fab: StateT1<M, S, (a: A) => B>) => StateT1<M, S, B>
  readonly chain: <S, A, B>(f: (a: A) => StateT1<M, S, B>) => (fa: StateT1<M, S, A>) => StateT1<M, S, B>
  readonly get: <S>() => StateT1<M, S, S>
  readonly put: <S>(s: S) => StateT1<M, S, void>
  readonly modify: <S>(f: (s: S) => S) => StateT1<M, S, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT1<M, S, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT1<M, S, A>
  readonly fromM: <S, A>(ma: Kind<M, A>) => StateT1<M, S, A>
  readonly evalState: <S, A>(ma: StateT1<M, S, A>, s: S) => Kind<M, A>
  readonly execState: <S, A>(ma: StateT1<M, S, A>, s: S) => Kind<M, S>
}
/**
 * @since 2.0.0
 */
export interface StateT2<M extends URIS2, S, E, A> {
  (s: S): Kind2<M, E, [A, S]>
}
/**
 * @since 3.0.0
 */
export interface StateM2<M extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <S, E>(fa: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
  readonly of: <S, E, A>(a: A) => StateT2<M, S, E, A>
  readonly ap: <S, E, A>(fa: StateT2<M, S, E, A>) => <B>(fab: StateT2<M, S, E, (a: A) => B>) => StateT2<M, S, E, B>
  readonly chain: <S, E, A, B>(f: (a: A) => StateT2<M, S, E, B>) => (fa: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
  readonly get: <E, S>() => StateT2<M, S, E, S>
  readonly put: <E, S>(s: S) => StateT2<M, S, E, void>
  readonly modify: <E, S>(f: (s: S) => S) => StateT2<M, S, E, void>
  readonly gets: <S, E, A>(f: (s: S) => A) => StateT2<M, S, E, A>
  readonly fromState: <S, E, A>(fa: State<S, A>) => StateT2<M, S, E, A>
  readonly fromM: <S, E, A>(ma: Kind2<M, E, A>) => StateT2<M, S, E, A>
  readonly evalState: <S, E, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, A>
  readonly execState: <S, E, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, S>
}
/**
 * @since 3.0.0
 */
export interface StateM2C<M extends URIS2, E> {
  readonly map: <A, B>(f: (a: A) => B) => <S>(fa: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
  readonly of: <S, A>(a: A) => StateT2<M, S, E, A>
  readonly ap: <S, A>(fa: StateT2<M, S, E, A>) => <B>(fab: StateT2<M, S, E, (a: A) => B>) => StateT2<M, S, E, B>
  readonly chain: <S, A, B>(f: (a: A) => StateT2<M, S, E, B>) => (fa: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
  readonly get: <S>() => StateT2<M, S, E, S>
  readonly put: <S>(s: S) => StateT2<M, S, E, void>
  readonly modify: <S>(f: (s: S) => S) => StateT2<M, S, E, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT2<M, S, E, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT2<M, S, E, A>
  readonly fromM: <S, A>(ma: Kind2<M, E, A>) => StateT2<M, S, E, A>
  readonly evalState: <S, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, A>
  readonly execState: <S, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, S>
}
/**
 * @since 2.0.0
 */
export interface StateT3<M extends URIS3, S, R, E, A> {
  (s: S): Kind3<M, R, E, [A, S]>
}
/**
 * @since 3.0.0
 */
export interface StateM3<M extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
  readonly of: <S, R, E, A>(a: A) => StateT3<M, S, R, E, A>
  readonly ap: <S, R, E, A>(
    fa: StateT3<M, S, R, E, A>
  ) => <B>(fab: StateT3<M, S, R, E, (a: A) => B>) => StateT3<M, S, R, E, B>
  readonly chain: <S, R, E, A, B>(
    f: (a: A) => StateT3<M, S, R, E, B>
  ) => (fa: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
  readonly get: <R, E, S>() => StateT3<M, S, R, E, S>
  readonly put: <R, E, S>(s: S) => StateT3<M, S, R, E, void>
  readonly modify: <R, E, S>(f: (s: S) => S) => StateT3<M, S, R, E, void>
  readonly gets: <S, R, E, A>(f: (s: S) => A) => StateT3<M, S, R, E, A>
  readonly fromState: <S, R, E, A>(fa: State<S, A>) => StateT3<M, S, R, E, A>
  readonly fromM: <S, R, E, A>(ma: Kind3<M, R, E, A>) => StateT3<M, S, R, E, A>
  readonly evalState: <S, R, E, A>(ma: StateT3<M, S, R, E, A>, s: S) => Kind3<M, R, E, A>
  readonly execState: <S, R, E, A>(ma: StateT3<M, S, R, E, A>, s: S) => Kind3<M, R, E, S>
}
/**
 * @since 3.0.0
 */
export interface StateM3C<M extends URIS3, E> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
  readonly of: <S, R, A>(a: A) => StateT3<M, S, R, E, A>
  readonly ap: <S, R, A>(
    fa: StateT3<M, S, R, E, A>
  ) => <B>(fab: StateT3<M, S, R, E, (a: A) => B>) => StateT3<M, S, R, E, B>
  readonly chain: <S, R, A, B>(
    f: (a: A) => StateT3<M, S, R, E, B>
  ) => (fa: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
  readonly get: <R, S>() => StateT3<M, S, R, E, S>
  readonly put: <R, S>(s: S) => StateT3<M, S, R, E, void>
  readonly modify: <R, S>(f: (s: S) => S) => StateT3<M, S, R, E, void>
  readonly gets: <S, R, A>(f: (s: S) => A) => StateT3<M, S, R, E, A>
  readonly fromState: <S, R, A>(fa: State<S, A>) => StateT3<M, S, R, E, A>
  readonly fromM: <S, R, A>(ma: Kind3<M, R, E, A>) => StateT3<M, S, R, E, A>
  readonly evalState: <S, R, A>(ma: StateT3<M, S, R, E, A>, s: S) => Kind3<M, R, E, A>
  readonly execState: <S, R, A>(ma: StateT3<M, S, R, E, A>, s: S) => Kind3<M, R, E, S>
}
/**
 * @since 2.0.0
 */
export declare function getStateM<M extends URIS3>(M: Monad3<M>): StateM3<M>
export declare function getStateM<M extends URIS3, E>(M: Monad3C<M, E>): StateM3C<M, E>
export declare function getStateM<M extends URIS2>(M: Monad2<M>): StateM2<M>
export declare function getStateM<M extends URIS2, E>(M: Monad2C<M, E>): StateM2C<M, E>
export declare function getStateM<M extends URIS>(M: Monad1<M>): StateM1<M>
export declare function getStateM<M>(M: Monad<M>): StateM<M>