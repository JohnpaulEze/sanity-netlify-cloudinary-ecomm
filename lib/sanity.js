import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "as75cbjv",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-08-10"
});
