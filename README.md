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

To complete the setup, you will need API keys for the following accounts:
- Supabase
- Twilio
- Stripe

1. Fork and clone this repository.
2. From the project's root directory, install dependencies:
```shell
yarn
```

<details>
<summary>3. Set up Supabase ( <strong>Click for instructions </strong>)</summary>

## Set up Supabase
First, login or sign up to [Supabase](https://supabase.io/), and start a new project. Then, in your Supabase project's dashboard, navigate to the SQL editor. In the following steps, you'll create several queries to run in the editor and create the tables necessary for the project. 

1. Go to `SQL` in the side menu.
2. Click `+ New query`.

In the root directory of Tattle (not Supabase) navigate to the `/db/schema/` directory. Copy the contents of each file and paste it into a new query in Supabase, then click `Run`. If successful, you should see a message that states there were no rows returned.

> It is important to create the schemas in the specified order for relational purposes. 

Now with your database set up, and your environment variables configured in the `.env.local` file, you're ready to start the server.

</details>

<details>
<summary>4. Set up Stripe ( <strong>Click for instructions</strong> )</summary>

## Set up Stripe
The Stripe integration uses a signed webhook to check if the payment was successful. To test those webhooks, you'll need to either use the [Stripe CLI](https://stripe.com/docs/stripe-cli/webhooks), or expose your development environment to the internet with something like [Ngrok](https://ngrok.com/). 

> If you're not using the Stripe CLI, your webhook endpoint must be `https`

### Stripe CLI
If you are using the Stripe CLI, the app listens for Stripe webhooks at the `/api/v1/webhook` endpoint. To configure the CLI to listen to this endpoint, run the following command:

```shell
stripe listen --forward-to localhost:3000/api/v1/webhook
```

</details>

5. Copy the contents of the `.env.example` file into a new file called `.env.local` using the following command:
```shell
cp .env.example .env.local
```
6. Replace the default values with your own Supabase, Twilio, Stripe, email, and phone values.


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

<details>
<summary>
    <h3 style="display: inline">Using Storybook</h3>
</summary>

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
</details>

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
