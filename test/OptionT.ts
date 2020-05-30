import * as assert from 'assert'
import * as O from '../src/Option'
import { getOptionM } from '../src/OptionT'
import { task } from '../src/Task'
import { pipe } from '../src/function'

const T = getOptionM(task)

describe('OptionT', () => {
  it('map', () => {
    const greetingT = T.of('welcome')
    const excitedGreetingT = pipe(
      greetingT,
      T.map((s) => s + '!')
    )
    return excitedGreetingT().then((o) => {
      assert.deepStrictEqual(o, O.some('welcome!'))
    })
  })

  it('chain', () => {
    const to1 = pipe(
      T.of('foo'),
      T.chain((a) => T.of(a.length))
    )
    const to2 = pipe(
      task.of(O.none),
      T.chain((a: string) => T.of(a.length))
    )
    return Promise.all([to1(), to2()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, O.some(3))
      assert.deepStrictEqual(o2, O.none)
    })
  })

  it('fold', async () => {
    const f = () => task.of('none')
    const g = (s: string) => task.of(`some${s.length}`)
    const s1 = await pipe(task.of(O.none), T.fold(f, g))()
    assert.deepStrictEqual(s1, 'none')
    const s2 = await pipe(T.of('s'), T.fold(f, g))()
    assert.deepStrictEqual(s2, 'some1')
  })

  it('alt', async () => {
    const o1 = await pipe(
      task.of(O.some(1)),
      T.alt(() => task.of(O.some(2)))
    )()
    assert.deepStrictEqual(o1, O.some(1))
    const o2 = await pipe(
      task.of(O.none),
      T.alt(() => task.of(O.some(2)))
    )()
    assert.deepStrictEqual(o2, O.some(2))
  })

  it('getOrElse', async () => {
    const n1 = await pipe(
      task.of(O.some(1)),
      T.getOrElse(() => task.of(2))
    )()
    assert.deepStrictEqual(n1, 1)
    const n2 = await pipe(
      task.of(O.none),
      T.getOrElse(() => task.of(2))
    )()
    assert.deepStrictEqual(n2, 2)
  })

  it('fromM', () => {
    return T.fromM(task.of(1))().then((o) => {
      assert.deepStrictEqual(o, O.some(1))
    })
  })

  it('none', () => {
    return T.none()().then((o) => {
      assert.deepStrictEqual(o, O.none)
    })
  })
})
