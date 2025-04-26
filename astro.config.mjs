import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import clerk from "@clerk/astro";
import icon from 'astro-icon';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [clerk(), icon()],
});