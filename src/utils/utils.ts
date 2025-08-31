export function convertCentsToReais(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',')
}

export function convertReaisToCents(reais: number): number {
  return Number(reais) * 100
}
