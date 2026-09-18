import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "team-amani",
  title: "Team AMANI",
  projectId: "vufb5el5",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Riders").child(S.documentTypeList("rider").title("Riders")),
            S.listItem().title("Stories").child(S.documentTypeList("story").title("Stories")),
            S.listItem().title("Races").child(S.documentTypeList("race").title("Races")),
            S.listItem().title("Programmes").child(S.documentTypeList("programme").title("Programmes")),
            S.listItem().title("Partners").child(S.documentTypeList("partner").title("Partners")),
            S.divider(),
            S.listItem()
              .title("Site settings")
              .child(S.document().schemaType("settings").documentId("siteSettings")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
