const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

module.exports = verifyGoogleToken;
