import config from "./config";
import app from "./app";

const port: number = config.get("port");

if (config.get("newRelic.appName") && config.get("newRelic.licenseKey")) {
  console.log(`New Relic Enabled - ${config.get("newRelic.appName")}`);
  require("newrelic");
} else {
  console.log(`New Relic Disabled`);
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
