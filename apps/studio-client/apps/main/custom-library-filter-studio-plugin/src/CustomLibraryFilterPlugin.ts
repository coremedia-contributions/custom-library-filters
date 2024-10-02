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
import LocaleFilterPanel from "./filters/LocaleFilterPanel";
import DateRangeFilterPanel from "./filters/DateRangeFilterPanel";
import ReplaceItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/ReplaceItemsPlugin";

interface CustomLibraryFilterPluginConfig extends Config<StudioPlugin> {
}

class CustomLibraryFilterPlugin extends StudioPlugin {

  declare Config: CustomLibraryFilterPluginConfig;

  constructor(config: Config<CustomLibraryFilterPlugin> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(CustomLibraryFilterPlugin, {

      rules: [

        Config(SearchFilters, {
          plugins: [
            Config(AddItemsPlugin, {
              items: [
                Config(LocaleFilterPanel),
                Config(SizeFilterPanel),
                Config(OrphanedContentFilterPanel),
              ],
              before: [
                Config(Component, {itemId: SiteFilterPanel.FILTER_ID}),
              ],
            }),
            Config(AddItemsPlugin, {
              items: [
                Config(DateRangeFilterPanel, {dateFieldName: "creationdate"}),
              ],
              before: [
                Config(Component, {itemId: "datefilter-panel-modificationdate"}),
              ],
            }),
            Config(ReplaceItemsPlugin, {
              items: [
                Config(DateRangeFilterPanel, {
                  itemId: "datefilter-panel-publicationdate",
                  dateFieldName: "publicationdate"
                }),
                Config(DateRangeFilterPanel, {
                  itemId: "datefilter-panel-modificationdate",
                  dateFieldName: "modificationdate"
                }),
              ]
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

export default CustomLibraryFilterPlugin;
