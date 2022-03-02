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
export async function handleSignIn(userEmail, userPassword, router, setMessage) {
  try {
    const { email, password, error } = await supabase.auth.signIn(
      {
        email: userEmail,
        password: userPassword,
      })
    if (error) {
      console.error(error)
      setMessage(error.message)
      console.error(error)
    }
    const userSession = await supabase.auth.session()
    if (!userSession) {
      setMessage(error.message)
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

function recordStripeCustomerId(userResponse, stripeCustomerId) {
  console.log("USER RESPONSE: !:  ", userResponse)
  axios
    .post('/api/v1/profiles', {
      "type": "update",
      "content": "stripeId",
      "id": userResponse.id,
      "stripeCustomerId": stripeCustomerId
      // "email": userResponse.email
    })
    .then(function (response) {
      // recordStripeIdStripeTable(userResponse.id, stripeCustomerId)
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
export async function handleSignUp(userEmail, userPassword, userName, setMessage) {
  let userResponse;
  try {
    const {email, password, error, data: result} = await supabase.auth.signUp(
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
    if (result) {
      userResponse = result.user
    }
    const userSession = await supabase.auth.session()
    if (userSession) {
      createCustomMessages(userSession?.user.id)
    } else {
      console.error("signupErr: ", error)
      setMessage(error.message)
    }
  } catch (error) {
    console.error(error['error_description'] || error.message)
  } finally {
    if (userResponse) {
      createStripeCustomer(userEmail, userResponse)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update({ username: userName })
          .match({ email: userEmail })
      } catch (err) {
        console.error(err)
      }
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