import "@testing-library/jest-dom/vitest";

import { describe, test, expect, vi, beforeAll } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { getDisneyCharacters } from "@/services";

import Home from "./index";

import { customRender, screen, waitFor } from "@/utils/helpers/test-utils";
import { charactersMockData } from "@/utils/helpers/test-utils/mocks";

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
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Component />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Home test suite", () => {
  beforeAll(() => {
    mocks.get.mockResolvedValue({
      data: charactersMockData,
    });
  });

  test("Should render component correctly", () => {
    customRender(renderWithRouter(Home));
  });

  test("renders and fetches data correctly", async () => {
    await getDisneyCharacters({ pageSize: 15 });

    customRender(renderWithRouter(Home));
    // screen.get

    expect(screen.getAllByText(/loading/i)).toHaveLength(3);

    await waitFor(() =>
      expect(screen.getByText(/achilles/i)).toBeInTheDocument(),
    );
  });

  test("Should return 15 list items", async () => {
    await getDisneyCharacters({ pageSize: 15 });

    customRender(renderWithRouter(Home));

    await waitFor(() =>
      expect(screen.getAllByTestId("list-item")).toHaveLength(15),
    );
  });
});
