export const PostFetcher = async (url: string, { arg }: { arg: Object }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
};
