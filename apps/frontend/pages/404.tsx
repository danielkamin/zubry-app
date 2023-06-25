import ErrorMessage from '@/components/simple/ErrorMessage';

export default function FourOhFour() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <ErrorMessage message="404 - Strona nie odnaleziona." code={404} />
    </main>
  );
}
