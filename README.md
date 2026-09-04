# Elevated Everyday Living

A modern, fast, editorial commerce platform optimized for Pinterest and SEO.

## Architecture

This site uses a **Git-based CMS**. 
Products are stored as strict JSON files. The application runs on Next.js App Router and utilizes a build-time validation script to ensure no unsafe data is ever deployed.

## Local Setup

Since this is a standard Next.js app:
1. `npm install`
2. `npm run dev`
3. View at `http://localhost:3000`

## Workflow: How to Add a New Product

We intentionally avoided a complex CMS backend. Adding a product is simple and safe.

1. **Copy the Template**
   Duplicate `/data/products/template.json` and name it `your-product-slug.json`.

2. **Fill in Data**
   Populate the required fields. Pay close attention to:
   - `status`: Must be `VERIFIED` or `PUBLISHED` to be public.
   - `safetyStatus`: Must be `CLEAR`.
   - `fraudRisk`: Must be `LOW` or `MODERATE`.
   - `affiliate`: Populate the affiliate network URL.

3. **Validate & Commit**
   Run `npm run validate` locally (optional, Vercel will do this automatically).
   ```bash
   git add data/products/your-product-slug.json
   git commit -m "Add product: [Name]"
   git push
   ```

4. **Vercel Automatic Deployment**
   Once pushed, Vercel will automatically build the site. 
   - The pre-build script `validate-data.mjs` will run.
   - If you accidentally pushed a `RECALLED` product or left missing URLs, the build will **FAIL**, preventing unsafe data from reaching production.
   - If successful, the site updates immediately.

## Updating Affiliate Links

To update an affiliate link, simply edit the `affiliate.url` in the specific product's JSON file.
Because all product buttons use `/go/[product-slug]`, you do NOT need to edit any UI components or articles. 
The internal redirect system will immediately use the new link on the next build.

## How to Add an Article

Articles are stored in `/content/blog/` as MDX files. You can reference product slugs directly inside the MDX to render `RelatedProducts` components.
