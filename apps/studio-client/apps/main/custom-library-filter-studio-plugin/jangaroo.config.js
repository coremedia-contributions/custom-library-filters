const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    namespace: "com.coremedia.blueprint.studio.custom.library.filters",
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.studio.custom.library.filters.CustomLibraryFilterPlugin",
        name: "Custom Library Filter Extension",
      },
    ],
  },
});
