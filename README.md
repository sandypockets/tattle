# Tattle
Tattle is a goal tracking and accountability platform, with a fun spin. If you don't achieve your goal, we'll tattle on you. We'll give your mom a ring, or send her an SMS to let her know of your disappointment. Don't want to rope dear old mom into this? Use any phone number you want, as long as it will help keep you accountable.

## Features
- Create, edit, delete goals
- Create edit, delete contacts
- Assign contacts to goals
- Choose to send either SMS or voice message
- Create custom SMS or voice message
- Stats and reporting

## Tech stack
- Next.js
- React
- Tailwind CSS
- Supabase
- Storybook

---

# Get Started
Storybook has built-in TypeScript support, but Next.js requires [some configuration](https://nextjs.org/docs/basic-features/typescript#existing-projects). If you want to customize the default configuration, refer to the [TypeScript docs](https://storybook.js.org/docs/react/configure/typescript).

Developed and tested with `Node 14`. Packages managed with `yarn`.  

## Set up Supabase
First, login or sign up to [Supabase](https://supabase.io/), and start a new project. For this template to work out of the box, you need to create a `profiles` table for your users. 

From within your project in Supabase:

1. Go to `SQL` in the side menu.
2. Click `+ New query`.
3. Paste the following SQL into the text area, then click `Run`. If successful, you should see a message that states there were no rows returned.

```sql
-- Create a table for public "profiles"
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;

-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );
```

The above query will create a relational table, connecting the profile the user creates to the user's `uuid` in Supabase. In this starter template, users edit their profile information in the `<Account/>` component.

## Set up this template
1. Click `Use this template`.
2. Install dependencies with `yarn install`
3. Create a new file, `.env.local`
4. Copy the contents of `.env.example` into `.env.local`
5. Login to Supabase, and replace the placeholders in the `.env.local` with your real Supabase project information. You can find it in Supabase by clicking **Index > API**.
6. Start the Next development server.
```shell
yarn dev
```
7. Visit [`http://localhost:3000/`](http://localhost:3000/) in your browser. 

## Testing
Components can be developed in isolation using Storybook. This template comes with Storybook 6.3.0

### Use Storybook
To start the Storybook development server, run:
```bash
yarn storybook
```
If a new browser tab doesn't open automatically, then visit [`http://localhost:6006/`](http://localhost:6006/) in your browser. 

### Build Static Storybook
If you want to deploy a static version of Storybook, you first need to build it. Run:
```bash
yarn build-storybook
```
If you're deploying to Vercel, specify `storybook-static` as the output directory.

## Dependencies
* Next 11.01
* React 17.0.2
* React-DOM 17.0.2
* supabase/supabase-js 1.21.0

## Dev Dependencies
* storybook/addon-essentials 6.3.0
* storybook/addon-links 6.3.0
* storybook/react 6.3.0
* autoprefixer 9.8.6 
* babel-loader 8.0.5 
* postcss 7.0.36 
* serve 11.3.2
* tailwindcss `tailwindcss/postcss7-compat@^2.2.4`

## Additional Docs
* [React.js](https://reactjs.org/docs/getting-started.html)
* [Next.js](https://nextjs.org/docs/getting-started)
* [PostCSS](https://github.com/postcss/postcss/tree/main/docs)
* [Tailwind CSS](https://tailwindcss.com/)
* [HeroIcons - TailwindLabs](https://github.com/tailwindlabs/heroicons)
* [HeadlessUI - TailwindLabs](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-react)
* [Supabase](https://supabase.io/)
* [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
* [Vercel](https://vercel.com/)