import { supabase } from "../../lib/supabaseClient";
import axios from "axios";

function recordStripeIdStripeTable(userId, stripeCustomerId) {
  axios
    .post('/api/v1/stripe-id', {
      "id": userId,
      "stripeCustomerId": stripeCustomerId,
    })
    .then(function (response) {
      console.log("recordStripeCustomerIdIN STRIPE TABLE: ", response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}

function recordStripeCustomerId(userResponse, stripeCustomerId) {
  console.log("Record stripe customer ID fired!")
  axios
    .post('/api/profiles', {
      "id": userResponse.id,
      "stripeCustomerId": stripeCustomerId,
      "email": userResponse.email
    })
    .then(function (response) {
      console.log("recordStripeCustomerId", response);
      recordStripeIdStripeTable(userResponse.id, stripeCustomerId)
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}

function createStripeCustomer(userEmail, userResponse){
  axios
    .post('/api/v1/create-customer', {
      "email": userEmail,
    })
    .then(function (response) {
      console.log(response);
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
    if (!userSession) {
      console.error(error)
    }
  } catch (error) {
    console.error(error['error_description'] || error.message)
  } finally {
    if (supabase.auth.session()) {
      createStripeCustomer(userEmail, userResponse)
      router.push('/app')
    }
  }
}