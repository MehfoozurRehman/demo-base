"use server";

export async function example(prevState: {
  status: string | null;
  error: string;
}) {
  return { ...prevState, status: "ok", error: "" };
}
