const { Moov } = require("@moovio/node");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    console.log('token getting');
    console.log(process.env.MOOV_ACCOUNT);
    const moov = new Moov({
      accountID: process.env.MOOV_ACCOUNT,
      publicKey: process.env.MOOV_PUBLIC,
      secretKey: process.env.MOOV_SECRET,
      domain: "https://cute-starship-098086.netlify.app"
    });

    console.log(process.env.PATIENT_ACCOUNT_ID);
    const accountId = process.env.PATIENT_ACCOUNT_ID;
    try {
      const { token } = await moov.generateToken(ALL_SCOPES, accountId);
      return { statusCode: 200, body: { token, accountId } };
    } catch (err) {
      return { statusCode: 401, body: err.toString() };
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
