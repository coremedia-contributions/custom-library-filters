const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__custom-library-filter-studio-plugin",
    namespace: "com.coremedia.library.filter.studio",
    studioPlugins: [
      {
        mainClass: "com.coremedia.library.filter.studio.CustomLibraryFilterPlugin",
        name: "Custom Library Filter Extension",
      },
    ],
  },
  appManifests: {
    en: {
      categories: [
        "Content",
      ],
    },
  },
  command: {
    build: {
      ignoreTypeErrors: false
    },
  },
});
