module.exports = {
  preset: "react-native",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
    + "|@react-native"
    + "|galio-framework"
    + "|react-native-vector-icons"
    + "|react-native-image-picker"
    + "|react-native-image-crop-picker"
    + "|react-native-super-grid"
    + "|react-native-collapsible"
    + ")/)",
  ],
  moduleNameMapper: {
    galio: "identity-obj-proxy"
  }
}
