"use client";

import { Provider, createStore } from "jotai";

import React from "react";

export const jotaiStore = createStore();

export default function Jotai({ children }: { children: React.ReactNode }) {
  return <Provider store={jotaiStore}>{children}</Provider>;
}
