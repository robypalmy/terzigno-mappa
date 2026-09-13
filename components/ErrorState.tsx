type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center px-6">
      <p className="max-w-md text-center text-base leading-7 text-stone-700" role="alert">
        {message}
      </p>
    </div>
  );
}
