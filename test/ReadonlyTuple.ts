import * as assert from 'assert'
import { getMonoid } from '../src/Array'
import { left, right } from '../src/Either'
import { identity } from '../src/function'
import { monoidString } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import * as _ from '../src/ReadonlyTuple'
import { pipe } from '../src/pipeable'

describe('ReadonlyTuple', () => {
  describe('pipeables', () => {
    it('compose', () => {
      assert.deepStrictEqual(pipe([true, 2] as const, _.compose([1, 'a'])), [true, 'a'])
    })

    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.map(double)), [2, 'a'])
    })

    it('extract', () => {
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: readonly [number, string]): number => _.snd(fa).length + _.fst(fa)
      assert.deepStrictEqual(pipe([1, 'bb'], _.extend(f)), [3, 'bb'])
    })

    it('bimap', () => {
      const double = (n: number): number => n * 2
      const len = (s: string): number => s.length
      assert.deepStrictEqual(pipe([1, 'a'], _.bimap(len, double)), [2, 1])
    })

    it('mapLeft', () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.mapLeft(len)), [1, 1])
    })

    it('duplicate', () => {
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.duplicate), [[1, 'a'], 'a'])
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          ['b', 1] as const,
          _.reduce('a', (acc, a) => acc + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe(['a', 1] as const, _.foldMap(monoidString)(identity)), 'a')
    })

    it('reduceRight', () => {
      assert.deepStrictEqual(
        pipe(
          ['b', 1] as const,
          _.reduceRight('a', (acc, a) => acc + a)
        ),
        'ba'
      )
    })
  })

  it('swap', () => {
    assert.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
  })

  it('getApply', () => {
    const apply = _.getApply(monoidString)
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(apply.ap([double, 'a'], [1, 'b']), [2, 'ab'])
  })

  it('getApplicative', () => {
    const applicative = _.getApplicative(monoidString)
    assert.deepStrictEqual(applicative.of(1), [1, ''])
  })

  it('getMonad', () => {
    const monad = _.getMonad(monoidString)
    assert.deepStrictEqual(
      monad.chain([1, 'a'], (a) => [a * 2, 'b']),
      [2, 'ab']
    )
  })

  it('chainRec', () => {
    const { chainRec } = _.getChainRec(getMonoid<number>())
    function seqReq(upper: number): readonly [number, ReadonlyArray<number>] {
      return chainRec(1, (init) => [init >= upper ? right(init) : left(init + 1), [init]])
    }
    const xs = _.snd(seqReq(10000))
    assert.deepStrictEqual(xs.length, 10000)
    assert.deepStrictEqual(xs[0], 1)
    assert.deepStrictEqual(xs[xs.length - 1], 10000)
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      _.readonlyTuple.traverse(option)([2, 'a'], (n) => (n >= 2 ? some(n) : none)),
      some([2, 'a'])
    )
    assert.deepStrictEqual(
      _.readonlyTuple.traverse(option)([1, 'a'], (n) => (n >= 2 ? some(n) : none)),
      none
    )
  })

  it('sequence', () => {
    const sequence = _.readonlyTuple.sequence(option)
    assert.deepStrictEqual(sequence([some(2), 'a']), some([2, 'a']))
    assert.deepStrictEqual(sequence([none, 'a']), none)
  })
})
