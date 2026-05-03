import { fetchWithUA } from "../lib/fetch";

export const getTrailer = async (code: string) => {
  const res = await fetchWithUA(`https://www.javdatabase.com/movies/${encodeURIComponent(code)}/`);
  if (!res.ok) throw new Error();

  let isInTag = false;
  let trailer = "";

  await new HTMLRewriter()
    .on("video#jav-player", {
      element: (el) => {
        isInTag = true;

        el.onEndTag(() => {
          isInTag = false;
        });
      },
    })
    .on("source", {
      element: (el) => {
        if (isInTag && !trailer) trailer = el.getAttribute("src") || "";
      },
    })
    .transform(res)
    .arrayBuffer();

  if (!trailer) throw new Error();

  return { trailer };
};
