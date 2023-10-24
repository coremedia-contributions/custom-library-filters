const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__custom-library-filter-studio-plugin",
    namespace: "com.coremedia.blueprint.studio",
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.studio.CustomLibraryFilterPlugin",
        name: "Custom Library Filter Extension",
      },
    ],
  },
});
