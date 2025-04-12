import { HugeiconsIcon } from '@hugeicons/react'
import { Mail02Icon } from '@hugeicons/core-free-icons'

export function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline font-dm-sans">
        Hello world!
      </h1>
      <button className="bg-orange-base text-white px-4 py-2 rounded">
        Clique aqui
      </button>

      <HugeiconsIcon icon={Mail02Icon} size={32} color="#FF5733" />
    </>
  )
}
