const files_ = require.context("./requestUrl", false, /.js$/);
const filesMap_ = {};
for (let key of files_.keys()) {
  let fileKey = key.replace(/\.\/|\.js/g, "");
  filesMap_[fileKey] = files_(key).default;
}
export default filesMap_;
