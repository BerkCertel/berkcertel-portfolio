// Adds jest-dom matchers (toBeInTheDocument, toHaveAttribute …) to Vitest's expect.
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only auto-cleans with Vitest globals enabled; unmount between tests ourselves.
afterEach(cleanup);
