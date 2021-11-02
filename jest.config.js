module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
    + "|@react-native"
    + "|galio-framework"
    + "|react-native-vector-icons"
    + "|react-native-image-picker"
    + "|react-native-super-grid"
    + ")/)",
  ],
  moduleNameMapper: {
    galio: "identity-obj-proxy"
  }
}
