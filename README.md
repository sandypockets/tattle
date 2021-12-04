# Tattle
Tattle is a full stack goal tracking and accountability platform, with a bit of a twist. If you don't achieve your goal, we'll tattle on you. We'll give your mom a ring, or send her an SMS (your preference) to let her know of your disappointment. 

Don't want to rope dear old mom into this? Use any phone number you want, just pick someone that will help keep you accountable.

## Features
- Create, edit, delete goals
- Create edit, delete contacts
- Assign contacts to goals
- Assign a date to a goal
- Choose to send either SMS or voice message
- Create custom SMS or voice message
- Stats and reporting
- Recurring subscription payments

## Tech stack
- Next.js
- React
- Tailwind CSS
- Supabase
- Twilio
- Stripe
- Storybook

# Getting started
This guide will walk you through setting up Tattle locally. Tattle was developed and tested with `Node 14`, and `Node 16`, and `yarn`.

1. Fork and clone this repository.
2. From the project's root directory, install dependencies:
```shell
yarn
```
3. Create a new file in the project's root directory:
```shell
touch .env.local
```
4. Copy the contents of `.env.example` into the new `.env.local` file. Replace the default values with your own Supabase, Twilio, Stripe, email, and phone values.
```dotenv
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_TWILIO_ACCOUNT_SID=your_twilio_account_sid
NEXT_TWILIO_AUTH_TOKEN=your_twilio_auth_token
NEXT_TEST_TO_PHONE_NUMBER=your_phone_number
NEXT_TEST_FROM_PHONE_NUMBER=your_twilio_phone_number
NEXT_STRIPE_SECRET_KEY=sk_your_stripe_secret_key
NEXT_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_STRIPE_TEST_RECEIPT_EMAIL_ADDRESS=your_email_address
NEXT_STRIPE_ENDPOINT_SECRET=your_stripe_webhook_signature_secret
```
5. Set up Supabase in the steps below.

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

The above query will create a relational table, connecting the profile the user creates to the user's `uuid` in Supabase. 

There are plenty more tables that need creating though. Create some new queries in Supabase following the steps above, and paste in the code snippets below:

```sql
-- contacts table
```

```sql
-- goals table
```

```sql
-- payments table
```

```sql
-- stripe table
```

```sql
-- subscriptions table
```

```sql
-- tattles table
```

Now with your database set up, and your environment variables configured in the `.env.local` file, you're ready to start the server.

## Set up Stripe
The Stripe integration uses a signed webhook to check if the payment was successful. To test those webhooks, you'll need to either use the [Stripe CLI](https://stripe.com/docs/stripe-cli/webhooks), or expose your development environment to the internet with something like [Ngrok](https://ngrok.com/). 

> If you're not using the Stripe CLI, your webhook endpoint must be `https`

### Stripe CLI
If you are using the Stripe CLI, the app listens for Stripe webhooks at the `/api/v1/webhook` endpoint. To configure the CLI to listen to this endpoint, run the following command:

```shell
stripe listen --forward-to localhost:3000/api/v1/webhook
```



## Server commands
Once the server is started, visit [`http://localhost:3000/`](http://localhost:3000/) in your browser to view the app.

### Start the development server
```shell
yarn dev
```
### Create a production build
```shell
yarn build
```
#### Run the build you just created
```shell
yarn start
```

## Testing
Components can be developed in isolation using Storybook. This template comes with Storybook 6.3.0

### Using Storybook
To start the Storybook development server, run:
```bash
yarn storybook
```
If a new browser tab doesn't open automatically, then visit [`http://localhost:6006/`](http://localhost:6006/) in your browser. 

Storybook has built-in TypeScript support, but Next.js requires [some configuration](https://nextjs.org/docs/basic-features/typescript#existing-projects). If you want to customize the default configuration, refer to the [TypeScript docs](https://storybook.js.org/docs/react/configure/typescript).

#### Build Static Storybook
If you want to deploy a static version of Storybook, you first need to build it. Run:
```bash
yarn build-storybook
```
If you're deploying to Vercel, specify `storybook-static` as the output directory.

## Dependencies
- @headlessui/react `^1.4.0`
- @heroicons/react `^1.0.3`
- @stripe/react-stripe-js `^1.6.0`
- @stripe/stripe-js `^1.21.2`
- @supabase/supabase-js `^1.21.0`
- @tailwindcss/forms `^0.3.3`
- axios `^0.24.0`
- next `latest`
- react `^17.0.2`
- react-datepicker `^4.3.0`
- react-dom `^17.0.2`
- stripe `^8.191.0`
- twilio `^3.71`

## Dev Dependencies
- @storybook/addon-essentials `6.3.0`
- @storybook/addon-links `6.3.0`
- @storybook/react `6.3.0`
- autoprefixer `^9.8.6`
- babel-loader `^8.0.5`
- postcss `^7.0.36`
- serve `11.3.2`
- tailwindcss `npm:@tailwindcss/postcss7-compat@^2.2.`

## Additional Docs
- [React.js](https://reactjs.org/docs/getting-started.html)
- [Next.js](https://nextjs.org/docs/getting-started)
- [PostCSS](https://github.com/postcss/postcss/tree/main/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeroIcons - TailwindLabs](https://github.com/tailwindlabs/heroicons)
- [HeadlessUI - TailwindLabs](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-react)
- [Supabase](https://supabase.io/)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Vercel](https://vercel.com/)

