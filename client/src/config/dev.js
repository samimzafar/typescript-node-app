const baseUrl = "http://localhost:";
const port = 4000;

module.exports = {
  domain: `${baseUrl}${port}/api`,
  version: process.env.REACT_APP_WEB_VERSION,
  baseUrl: "http://localhost:4000",
  s3_access_key: process.env.REACT_APP_S3_TAZAH_GLOBAL_ACCESS_KEY,
  s3_secret_key: process.env.REACT_APP_S3_TAZAH_GLOBAL_SECRET_ACCESS_KEY,
  s3_bucket_name: process.env.REACT_APP_S3_TAZAH_GLOBAL_BUCKET_NAME,
  s3_dir_name: process.env.REACT_APP_S3_TAZAH_GLOBAL_DIR_NAME_PRODUCTS,
  s3_dir_name_documents:
    process.env.REACT_APP_S3_TAZAH_GLOBAL_DIR_NAME_DOCUMENTS,
  s3_region: process.env.REACT_APP_S3_TAZAH_GLOBAL_REGION,
  home_url: process.env.REACT_APP_HOME_URL,
  url_facebook: process.env.REACT_APP_TAZAH_FACEBOOK,
  url_twitter: process.env.REACT_APP_TAZAH_TWITTER,
  url_linkedin: process.env.REACT_APP_TAZAH_LINKEDIN,
  url_instagram: process.env.REACT_APP_TAZAH_INSTAGRAM,
};
