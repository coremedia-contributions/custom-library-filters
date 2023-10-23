import ConfigBasedValueExpression from "@coremedia/studio-client.ext.ui-components/data/ConfigBasedValueExpression";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import Container from "@jangaroo/ext-ts/container/Container";
import Checkbox from "@jangaroo/ext-ts/form/field/Checkbox";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import FilterPanel from "@coremedia/studio-client.main.editor-components/sdk/collectionview/search/FilterPanel";
import CustomLibraryFilter_properties from "../CustomLibraryFilter_properties";

interface OrphanedContentFilterPanelConfig extends Config<FilterPanel> {
}

class OrphanedContentFilterPanel extends FilterPanel {
  private readonly ORPHANED_CHECKBOX_SELECTED: string = "orphanedCheckboxSelected";

  declare Config: OrphanedContentFilterPanelConfig;

  /**
   * The filter ID for this filter. It is used as itemId and identifier in saved searches.
   */
  static readonly FILTER_ID: string = "orphanedcontentfilterid";

  constructor(config: Config<OrphanedContentFilterPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(OrphanedContentFilterPanel, {
      itemId: OrphanedContentFilterPanel.FILTER_ID,
      title: CustomLibraryFilter_properties.LibraryOrphanedItemsFilter_title,

      items: [
        Config(Container, {
          items: [
            Config(Checkbox, {
              itemId: "filterOrphanedContentCheckbox",
              boxLabel: CustomLibraryFilter_properties.LibraryOrphanedItemsFilter_checkbox_label,
              hideLabel: true,
              plugins: [
                Config(BindPropertyPlugin, {
                  bidirectional: true,
                  bindTo: new ConfigBasedValueExpression({
                    expression: this$.ORPHANED_CHECKBOX_SELECTED,
                    context: this$.getStateBean(),
                  }),
                }),
              ],
            }),
          ],
        }),
      ],

    }), config));
  }


  override buildQuery(): string {
    let checkboxSelected = this.getStateBean().get(this.ORPHANED_CHECKBOX_SELECTED);

    if (checkboxSelected === false) {
      return null
    }

    return "NOT references:[* TO *]"
  }

  override getDefaultState(): any {
    const state: Record<string, any> = {};
    state[this.ORPHANED_CHECKBOX_SELECTED] = false;
    return state;
  }

}


export default OrphanedContentFilterPanel;
