export function convertCentsToReais(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',')
}

export function convertReaisToCents(reais: string): number {
  const cleanValue = reais.trim()
  const normalizedValue = cleanValue.replace(',', '.')
  const valueInReais = Number(normalizedValue)

  if (isNaN(valueInReais)) {
    throw new Error('Valor inválido fornecido')
  }

  return Math.round(valueInReais * 100)
}
