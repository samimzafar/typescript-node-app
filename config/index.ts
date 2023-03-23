import convict from "convict";
// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  url: {
    base_url: {
      doc: "The url of react web application.",
      format: String,
      default: "",
      env: "BASE_URL",
    },
    website_url: {
      doc: "The url of website.",
      format: String,
      default: "",
      env: "WEBSITE_URL",
    },
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
      env: "DATABASE_HOST",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "database_development",
      env: "DATABASE_NAME",
    },
    username: {
      doc: "db user",
      format: String,
      default: "root",
      env: "DATABASE_USERNAME",
    },
    password: {
      doc: "db password",
      format: "*",
      default: "",
      env: "DATABASE_PASSWORD",
    },
  },
  cognito: {
    doc: "Confirguration for AWS Cognito",
    config: {
      region: {
        doc: "Region for AWS Cognito",
        format: String,
        default: "",
        env: "AWS_REGION",
      },
    },
    secrets: {
      clientId: {
        doc: "App Client Id for AWS Cognito User Pool",
        format: String,
        default: "",
        env: "AWS_CLIENT_ID",
      },
      poolId: {
        doc: "User Pool Id for AWS Cognito",
        format: String,
        default: "",
        env: "AWS_POOL_ID",
      },
    },
    env: "AWS_COGNITO",
  },
  SES: {
    doc: "Configuration for AWS SES",
    region: {
      doc: "Region for AWS SES",
      format: String,
      default: "",
      env: "AWS_REGION_SES",
    },
    access_key: {
      doc: "Access Key ID for AWS SES",
      format: String,
      default: "",
      env: "AWS_ACCESS_KEY",
    },
    secret_key: {
      doc: "Region for AWS SES",
      format: String,
      default: "",
      env: "AWS_SECRET_KEY",
    },
    source_email: {
      doc: "Source email for SES",
      format: String,
      default: "",
      env: "AWS_SES_SOURCE_EMAIL",
    },
  },
  newRelic: {
    appName: {
      doc: "New Relic App Name",
      format: String,
      default: "",
      env: "NEW_RELIC_APP_NAME",
    },
    licenseKey: {
      doc: "New Relic App License Key",
      format: String,
      default: "",
      env: "NEW_RELIC_APP_LICENSE_KEY",
    },
  },
});

// Load environment dependent configuration
let env = config.get("env");
if (env === "development" || env === "test") {
  config.loadFile(__dirname + "/../../config/environments/" + env + ".json");
}

// Perform validation
config.validate({ allowed: "strict" });
export default config;
