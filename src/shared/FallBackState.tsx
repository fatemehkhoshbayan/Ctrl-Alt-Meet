import { LoadingState } from '.';

export function FallbackPage({ message }: { message: string }) {
  return (
    <>
      <section
        aria-hidden
        className={`bg-surface-container-high relative h-[614px] w-full animate-pulse overflow-hidden`}
      />
      <LoadingState message={message} />
    </>
  );
}
