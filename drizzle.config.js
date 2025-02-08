import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_6RlTOktGSfw3@ep-misty-recipe-a1dg37hk-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
  }
})
