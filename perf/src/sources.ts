// Link to the exact repository revision without guessing the producer's script
// location, source filenames, or benchmark-to-source mapping.
export function benchmarkSource(_testId: string, solarCommit: string) {
  return {
    label: 'Run source revision',
    url: `https://github.com/paradigmxyz/solar/tree/${solarCommit}`,
  }
}
