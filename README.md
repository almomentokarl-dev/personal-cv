# Karl Almomento — Personal CV

A responsive personal CV and academic project portfolio for Karl Almomento, built with Next.js App Router and TypeScript. FeedSmart is featured as a collaborative academic capstone project. Individual responsibilities, skills, repositories, and project specifics are only shown when confirmed.

## Features

- Responsive one-page CV with sticky navigation, mobile menu, section indicators, and scroll-to-top control
- Profile introduction, basic information, objective, education, skills, academic experience, and achievements
- FeedSmart capstone feature with project illustration and interactive detail panel
- Editable portfolio content in `src/data/portfolio.ts`
- Social links, metadata, favicon, keyboard focus styles, and reduced-motion support
- No contact form, fake email, fabricated work history, or unverified project links

## Technology

Next.js, React, TypeScript, CSS, and Lucide React. Scroll reveal and navigation use browser APIs and lightweight CSS; there is no database or external animation runtime.

## Run locally

Install Node.js 20.9 or later, then run:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Edit portfolio information

Update `src/data/portfolio.ts`. Add only technologies Karl has personally used or studied. Replace the education, contribution, and project detail prompts with verified details. Set actual repository/demo URLs only when they are available. Skills and achievements remain hidden until populated.

If Karl has a real profile photograph, place it in `public/images/` and update the hero to use it. The current KA initials avatar is intentionally not a generated portrait. Replace the FeedSmart CSS illustration with actual project screenshots when available.

## Development and production

```bash
npm run dev       # local development
npm run lint      # lint the project
npm run build     # create production build
npm run start     # serve the production build
```

## Screenshots

Add screenshots after running the site, then link them here, for example:

```md
![Portfolio desktop screenshot](public/images/portfolio-desktop.png)
```

## GitHub setup

This project directory was not connected to a Git repository when prepared. To publish it to Karl’s GitHub account, first create a new empty repository (for example `karl-cv-website`) at [github.com/new](https://github.com/new). Then run the following from this directory, replacing the repository name if needed:

```bash
git init
git add .
git commit -m "Build Karl Almomento CV website"
git branch -M main
git remote add origin https://github.com/almomentokarl-dev/karl-cv-website.git
git push -u origin main
```

Do not commit `.env` files, credentials, `node_modules`, or `.next` output. The `.gitignore` already excludes these.

## Deploy to Vercel

1. Push the project to GitHub using the steps above.
2. Sign in to [Vercel](https://vercel.com), choose **Add New → Project**, and import the repository.
3. Keep the detected Next.js framework settings and select **Deploy**. No environment variables are required.
4. Open the generated deployment URL and check the page on mobile and desktop. Future pushes to `main` will trigger a new deployment.

No public GitHub repository or Vercel deployment has been configured for this project yet.
