export function ButtonRedirect({ buttonName }: { buttonName: string }) {
  return (
    <button className="relative flex items-center justify-center p-[1px] bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb] rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95">
      <span className="bg-[#05062d] text-white text-xs font-semibold md:text-xl md:px-4 md:py-2 py-2 px-4 rounded-md w-full h-full transition-all hover:bg-transparent">
        {buttonName}
      </span>
    </button>
  )
}
