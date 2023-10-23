import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import CopyResourceBundleProperties
  from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import ContentTypes_properties from "@coremedia/studio-client.cap-base-models/content/ContentTypes_properties";
import SearchFilters from "@coremedia/studio-client.main.editor-components/sdk/collectionview/search/SearchFilters";
import Component from "@jangaroo/ext-ts/Component";
import SiteFilterPanel from "@coremedia/studio-client.main.editor-components/sdk/collectionview/search/SiteFilterPanel";
import CustomLibraryFilter_properties from "./CustomLibraryFilter_properties";
import SizeFilterPanel from "./filters/SizeFilterPanel";
import OrphanedContentFilterPanel from "./filters/OrphanedContentFilterPanel";
import ConfigureCollectionViewColumnsPlugin from "./blueprint-forms/ConfigureCollectionViewColumnsPlugin";
import EditorStartup from "@coremedia/studio-client.main.editor-components/sdk/desktop/EditorStartup";

interface CustomLibraryFilterStudioPluginConfig extends Config<StudioPlugin> {

}

class CustomLibraryFilterStudioPlugin extends StudioPlugin {

  declare Config: CustomLibraryFilterStudioPluginConfig;

  constructor(config: Config<CustomLibraryFilterStudioPlugin> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(CustomLibraryFilterStudioPlugin, {

      rules: [

        Config(EditorStartup, {
          plugins: [
            Config(ConfigureCollectionViewColumnsPlugin),
          ],
        }),

        Config(SearchFilters, {
          plugins: [
            Config(AddItemsPlugin, {
              items: [
                Config(SizeFilterPanel),
                Config(OrphanedContentFilterPanel),
              ],
              before: [
                Config(Component, {itemId: SiteFilterPanel.FILTER_ID}),
              ],
            }),
          ],
        }),
      ],

      configuration: [
        new CopyResourceBundleProperties({
          destination: resourceManager.getResourceBundle(null, ContentTypes_properties),
          source: resourceManager.getResourceBundle(null, CustomLibraryFilter_properties),

        }),
      ],


    }), config));
  }

}

export default CustomLibraryFilterStudioPlugin;
