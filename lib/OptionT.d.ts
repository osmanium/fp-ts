/**
 * @since 2.0.0
 */
import {
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeCompositionHKT1
} from './Applicative'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C } from './Monad'
import { Option, URI } from './Option'
/**
 * @since 2.0.0
 */
export interface OptionT<M, A> extends HKT<M, Option<A>> {}
/**
 * @since 3.0.0
 */
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, URI> {
  readonly chain: <A, B>(f: (a: A) => OptionT<M, B>) => (ma: OptionT<M, A>) => OptionT<M, B>
  readonly alt: <A>(that: () => OptionT<M, A>) => (fa: OptionT<M, A>) => OptionT<M, A>
  readonly fold: <A, R>(onNone: () => HKT<M, R>, onSome: (a: A) => HKT<M, R>) => (ma: OptionT<M, A>) => HKT<M, R>
  readonly getOrElse: <A>(onNone: () => HKT<M, A>) => (ma: OptionT<M, A>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}
/**
 * @since 2.0.0
 */
export declare type OptionT1<M extends URIS, A> = Kind<M, Option<A>>
/**
 * @since 3.0.0
 */
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(f: (a: A) => OptionT1<M, B>) => (ma: OptionT1<M, A>) => OptionT1<M, B>
  readonly alt: <A>(that: () => OptionT1<M, A>) => (fa: OptionT1<M, A>) => OptionT1<M, A>
  readonly fold: <A, R>(onNone: () => Kind<M, R>, onSome: (a: A) => Kind<M, R>) => (ma: OptionT1<M, A>) => Kind<M, R>
  readonly getOrElse: <A>(onNone: () => Kind<M, A>) => (ma: OptionT1<M, A>) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}
/**
 * @since 2.0.0
 */
export declare type OptionT2<M extends URIS2, E, A> = Kind2<M, E, Option<A>>
/**
 * @since 3.0.0
 */
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <E, A, B>(f: (a: A) => OptionT2<M, E, B>) => (ma: OptionT2<M, E, A>) => OptionT2<M, E, B>
  readonly alt: <E, A>(that: () => OptionT2<M, E, A>) => (fa: OptionT2<M, E, A>) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    onNone: () => Kind2<M, E, R>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => (ma: OptionT2<M, E, A>) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(onNone: () => Kind2<M, E, A>) => (ma: OptionT2<M, E, A>) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}
/**
 * @since 3.0.0
 */
export interface OptionM2C<M extends URIS2, E> extends ApplicativeComposition2C1<M, URI, E> {
  readonly chain: <A, B>(f: (a: A) => OptionT2<M, E, B>) => (ma: OptionT2<M, E, A>) => OptionT2<M, E, B>
  readonly alt: <A>(that: () => OptionT2<M, E, A>) => (fa: OptionT2<M, E, A>) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    onNone: () => Kind2<M, E, R>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => (ma: OptionT2<M, E, A>) => Kind2<M, E, R>
  readonly getOrElse: <A>(onNone: () => Kind2<M, E, A>) => (ma: OptionT2<M, E, A>) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}
/**
 * @since 2.0.0
 */
export declare function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export declare function getOptionM<M extends URIS2, E>(M: Monad2C<M, E>): OptionM2C<M, E>
export declare function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export declare function getOptionM<M>(M: Monad<M>): OptionM<M>