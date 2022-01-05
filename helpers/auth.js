import { supabase } from "../lib/supabaseClient";
import axios from "axios";

// Magic link
export async function handleLogin(email) {
  try {
    const { error } = await supabase.auth.signIn({ email })
    if (error) throw error
    console.error(error)
  } catch (error) {
    console.error(error['error_description'] || error.message)
  }
}

// Email sign in
export async function handleSignIn(userEmail, userPassword, router) {
  try {
    const { email, password, error } = await supabase.auth.signIn(
      {
        email: userEmail,
        password: userPassword,
      })
    if (error) throw error
    const userSession = await supabase.auth.session()
    if (!userSession) {
      console.error(error)
    }
  } catch (error) {
    console.error(error['error_description'] || error.message)
  } finally {
    if (await supabase.auth.session()) {
      router.push('/app')
    }
  }
}

// Email sign up
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
      "stripeCustomerId": stripeCustomerId
      // "email": userResponse.email
    })
    .then(function (response) {
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
      const stripeCustomerId = response.data.id
      recordStripeCustomerId(userResponse, stripeCustomerId)
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}
export async function handleSignUp(userEmail, userPassword, userName, router) {
  let userResponse;
  try {
    const {email, password, error, data} = await supabase.auth.signUp(
      {
        email: userEmail,
        password: userPassword,
      },
      {
        data: {
          name: userName
        }
      }
      )
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
      setTimeout(() => {
        router.push('/app')
      }, 1000)
    }
  }
}

// Update auth table profile
export async function updateAuthProfile(email, password) {
  try {
    const { user, error } = await supabase.auth.update({
      'email': email,
      'password': password
    })
    if (user) {
      console.log(user)
    }
    if (error) {
      console.log(error)
    }
  } catch (error) {
    console.error(error.message)
  }
}