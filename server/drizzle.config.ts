import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { config } from './src/config/index';

const dbUrl = config.database.url;
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
