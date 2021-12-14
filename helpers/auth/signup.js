import { supabase } from "../../lib/supabaseClient";
import axios from "axios";

function createCustomMessages(userId) {
  axios
    .post('/api/v1/custom-messages', {
      "type": "create",
      "id": userId,
      "customSmsMessage": "Hey {{ contact_name }}! {{ user_name }} didn't achieve their goal: {{ goal_title }}",
      "customVoiceMessage": "Hey {{ contact_name }}! {{ user_name }} didn't achieve their goal: {{ goal_title }}"
    })
    .then(function (response) {
      console.log("Successfully created custom messages: ", response);
    })
    .catch(function (error) {
      console.log("Create error", error);
    });
}

function recordStripeIdStripeTable(userId, stripeCustomerId) {
  axios
    .post('/api/v1/stripe-id', {
      "id": userId,
      "stripeCustomerId": stripeCustomerId,
    })
    .then(function (response) {
      console.log("Successfully recorded ID: ", response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}

function recordStripeCustomerId(userResponse, stripeCustomerId) {
  axios
    .post('/api/profiles', {
      "id": userResponse.id,
      "stripeCustomerId": stripeCustomerId,
      "email": userResponse.email
    })
    .then(function (response) {
      recordStripeIdStripeTable(userResponse.id, stripeCustomerId)
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}

function createStripeCustomer(userEmail, userResponse){
  console.log("Signup.js!")
  axios
    .post('/api/v1/create-customer', {
      "email": userEmail,
    })
    .then(function (response) {
      const stripeCustomerId = response.data.id
      recordStripeCustomerId(userResponse, stripeCustomerId)
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}

export default async function handleSignUp(userEmail, userPassword, router) {
  let userResponse;
  try {
    const {email, password, error, data} = await supabase.auth.signUp(
      {
        email: userEmail,
        password: userPassword,
      })
    if (data) {
      userResponse = data.user
    }
    const userSession = await supabase.auth.session()
    if (userSession) {
      createCustomMessages(userSession?.user.id)
    } else {
      console.error(error)
    }
  } catch (error) {
    console.error(error['error_description'] || error.message)
  } finally {
    if (userResponse) {
      createStripeCustomer(userEmail, userResponse)
      router.push('/app')
    }
  }
}