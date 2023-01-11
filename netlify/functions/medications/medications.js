
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    console.log('getting meds');
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      body: JSON.stringify({
        medication: {
          active: true,
          name: 'drugz'
        }
      })
    };
  } catch (error) {
    console.log('err 500');
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
