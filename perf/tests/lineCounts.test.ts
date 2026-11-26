import { expect, it } from 'vite-plus/test'
import { lineCountDecoration } from '../src/lineCounts'
import { changedArtifacts, lineCounts, type ArtifactRef } from '../src/server/lineCounts'

const file = (key: string, path = 'a.mir', language = 'text'): ArtifactRef => ({
  path,
  language,
  key,
})
const count = (before: ArtifactRef[], after: ArtifactRef[], contents: Record<string, string>) =>
  lineCounts(changedArtifacts(before, after), new Map(Object.entries(contents)))

it('counts the lines the patience diff adds and removes', () => {
  expect(count([file('old')], [file('new')], { old: 'a\nb\nc\n', new: 'a\nB\nc\nd\n' })).toEqual({
    'a.mir': { added: 2, removed: 1 },
  })
})

it('counts the formatted contents the viewer shows', () => {
  const json = (key: string) => file(key, 'abi.json', 'json')
  expect(count([json('old')], [json('new')], { old: '{"a":1}', new: '{"a":1,"b":2}' })).toEqual({
    'abi.json': { added: 2, removed: 1 },
  })
  expect(count([json('old')], [json('new')], { old: '{"a":1}', new: '{ "a": 1 }' })).toEqual({})
})

it('counts every line of a file only one side published', () => {
  expect(count([], [file('new')], { new: 'a\nb\nc\n' })).toEqual({
    'a.mir': { added: 3, removed: 0 },
  })
  expect(count([file('old')], [], { old: 'a\nb' })).toEqual({ 'a.mir': { added: 0, removed: 2 } })
})

it('skips images and files with equal contents', () => {
  const changed = changedArtifacts(
    [file('same'), file('old', 'graph.png')],
    [file('same'), file('new', 'graph.png')],
  )
  expect(changed).toEqual([])
})

it('labels files and sums the files beneath a directory', () => {
  const counts = {
    'sources/a.sol': { added: 2, removed: 1 },
    'sources/lib/b.sol': { added: 3, removed: 0 },
    'sources.txt': { added: 100, removed: 100 },
  }
  const file = lineCountDecoration({ kind: 'file', path: 'sources/lib/b.sol' }, counts)
  expect(file).toMatchObject({ text: '+3', title: '3 added, 0 removed' })
  expect(lineCountDecoration({ kind: 'directory', path: 'sources/' }, counts)).toMatchObject({
    text: '+5 \u22121',
    parts: [{ text: '+5' }, { text: ' ' }, { text: '\u22121' }],
  })
  expect(lineCountDecoration({ kind: 'file', path: 'other.mir' }, counts)).toBeNull()
  expect(lineCountDecoration({ kind: 'directory', path: 'other' }, counts)).toBeNull()
})
