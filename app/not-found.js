import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Sorry, this page was not found!</h1>
      <p>Try going back to the previous page.</p>
      <p>
        <Link href="/">Go Home</Link>
      </p>
    </main>
  );
}
