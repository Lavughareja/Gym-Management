import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

// ─────────────────────────────────────────────────────────────────────────────
// Typed Redux Hooks
// Use these instead of plain `useDispatch` / `useSelector` throughout the app.
// ─────────────────────────────────────────────────────────────────────────────

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
