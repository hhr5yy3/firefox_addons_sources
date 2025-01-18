/**
 * Copyright (C) 2014 Aerocasillas. All Rights Reserved.
 */

var Topics = {
  // API
  get AEROAPI_ERROR() { return "aeropost-aeroapi-error"; },
  get INVALID_CLIENT_ERROR() { return "aeropost-invalid-client-error"; },
  // topics
  get ACCOUNT_SIGNED_OUT() { return "aeropost-account-signedOut"; },
  get ACCOUNT_SIGNED_IN() { return "aeropost-account-signedIn"; },
  get ACCOUNT_SIGN_IN_FAILED() { return "aeropost-account-sign-in-failed"; },
  get ACCOUNT_SIGNING_IN() { return "aeropost-account-signingIn"; },
  get FORCE_ACCOUNT_SIGN_OUT() { return "aeropost-force-account-signOut"; },
  get PACKAGES_UPDATED() { return "aeropost-packages-updated"; },
  get PREALERTS_UPDATED() { return "aeropost-prealerts-updated"; },
  get UPDATE_STARTED() { return "aeropost-update-started"; },
  get UPDATE_FINISHED() { return "aeropost-update-finished"; },
  get CART_UPDATED() { return "aeropost-cart-updated"; },
  // properties
  get PROPERTY_CHANGED() { return "aeropost-property-changed"; },
  // kill switch
  get CLIENT_ALLOW_CHANGE() { return "aeropost-client-allow-change";},

  // database init
  get DATABASE_STARTED() { return "aeropost-database-started"; },

  get ORDERS_UPDATED() { return "aeropost-orders-updated"; },

};
