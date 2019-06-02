import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn: "https://16bb6c71afba490fb79675c62477adc2@sentry.io/1466885"
  // });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };
