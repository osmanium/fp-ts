import * as assert from 'assert'
import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as _ from '../src/Identity'
import { monoidString } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { showString } from '../src/Show'

describe('Identity', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(1, _.map(double)), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      const fab = _.identity.of(double)
      assert.deepStrictEqual(pipe(fab, _.ap(1)), 2)
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe('a', _.apFirst('b')), 'a')
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe('a', _.apSecond('b')), 'b')
    })

    it('chain', () => {
      const f = (n: number) => _.identity.of(n * 2)
      assert.deepStrictEqual(pipe(1, _.chain(f)), 2)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.identity.of(n * 2)
      assert.deepStrictEqual(pipe(1, _.chainFirst(f)), 1)
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          'b',
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe('a', _.foldMap(monoidString)(identity)), 'a')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(pipe('a', _.reduceRight('', f)), 'a')
    })

    it('alt', () => {
      assert.deepStrictEqual(
        pipe(
          1,
          _.alt(() => 2)
        ),
        1
      )
    })

    it('extract', () => {
      assert.deepStrictEqual(pipe(1, _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: _.Identity<string>): number => fa.length
      assert.deepStrictEqual(pipe('foo', _.extend(f)), 3)
    })

    it('duplicate', () => {
      assert.deepStrictEqual(pipe('a', _.duplicate), 'a')
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe('a', _.flatten), 'a')
    })
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    assert.deepStrictEqual(S.equals(_.identity.of(1), _.identity.of(1)), true)
    assert.deepStrictEqual(S.equals(_.identity.of(1), _.identity.of(2)), false)
    assert.deepStrictEqual(S.equals(_.identity.of(2), _.identity.of(1)), false)
  })

  it('traverse', () => {
    assert.deepStrictEqual(pipe(_.identity.of(1), _.traverse(option)(some)), some(_.identity.of(1)))
    assert.deepStrictEqual(
      pipe(
        _.identity.of(1),
        _.traverse(option)(() => none)
      ),
      none
    )
  })

  it('sequence', () => {
    const sequence = _.identity.sequence(option)
    const x1 = _.identity.of(some('a'))
    assert.deepStrictEqual(sequence(x1), some(_.identity.of('a')))
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.deepStrictEqual(S.show(_.identity.of('a')), `"a"`)
  })
})
