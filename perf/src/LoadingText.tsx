export function LoadingText({ children }: { children: string }) {
  return (
    <span>
      {children.replace(/[.…]+$/, '')}
      <span className="loading-dots" aria-hidden="true">
        <span>...</span>
      </span>
    </span>
  )
}
