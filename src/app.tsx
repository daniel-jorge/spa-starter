import { type PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";

import "./reset.css";

export function App({ children = "Hello, world!" }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default App;
