const { Moov, ALL_SCOPES } = require("@moovio/node");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    console.log('token getting');
    const moov = new Moov({
      accountID: process.env.MOOV_ACCOUNT,
      publicKey: process.env.MOOV_PUBLIC,
      secretKey: process.env.MOOV_SECRET,
      domain: "https://cute-starship-098086.netlify.app"
    });

    const accountId = process.env.PATIENT_ACCOUNT_ID;
    try {
      const { token } = await moov.generateToken(ALL_SCOPES, accountId);
      console.log(token);
      console.log(accountId);
      const body = JSON.stringify({ token, accountId });
      return { statusCode: 200, body };
    } catch (err) {
      console.log('error 401');
      return { statusCode: 401, body: 'something went wrong' };
    }
  } catch (error) {
    console.log('err 500');
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
