import "@testing-library/jest-dom/vitest";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { test, expect, vi } from "vitest";

import { getDisneyCharacter } from "@/services";

import Character from "./index"; // This is your component using React Query
import { characterMockData } from "@/utils/helpers/test-utils/mocks";
import { customRender, screen, waitFor } from "@/utils/helpers/test-utils";
import { describe } from "node:test";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

const renderWithRouter = (Component: () => JSX.Element) => {
  return (
    <MemoryRouter initialEntries={["/character/112"]}>
      <Routes>
        <Route path="/character/:id" element={<Component />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Character test suite", () => {
  test("renders and fetches data correctly", async () => {
    mocks.get.mockResolvedValue({
      data: characterMockData,
    });

    await getDisneyCharacter(112);

    customRender(renderWithRouter(Character));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/achilles/i)).toBeInTheDocument(),
    );

    expect(mocks.get).toHaveBeenCalledWith("/character/112");
  });
});
