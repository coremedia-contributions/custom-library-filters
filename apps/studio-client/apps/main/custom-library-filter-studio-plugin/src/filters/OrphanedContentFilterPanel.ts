import ConfigBasedValueExpression from "@coremedia/studio-client.ext.ui-components/data/ConfigBasedValueExpression";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import Container from "@jangaroo/ext-ts/container/Container";
import Checkbox from "@jangaroo/ext-ts/form/field/Checkbox";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import FilterPanel from "@coremedia/studio-client.main.editor-components/sdk/collectionview/search/FilterPanel";
import CustomLibraryFilter_properties from "../CustomLibraryFilter_properties";
import IconDisplayField from "@coremedia/studio-client.ext.ui-components/components/IconDisplayField";
import {SvgIconUtil} from "@coremedia/studio-client.base-models";
import { help } from "@coremedia/studio-client.common-icons";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";


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
            Config(IconDisplayField, {
              margin: "0 0 0 5",
              itemId: `filterOrphanedContentToolTip`,
              tooltip: CustomLibraryFilter_properties.LibraryOrphanedItemsFilter_tooltip,
              iconCls: SvgIconUtil.getIconStyleClassForSvgIcon(help),
            }),
          ],
          layout: Config(HBoxLayout, {align: "left"}),
        }),
      ],

    }), config));
  }


  override buildQuery(): string {
    let checkboxSelected = this.getStateBean().get(this.ORPHANED_CHECKBOX_SELECTED);

    if (checkboxSelected === false) {
      return null
    }

    return "orphaned:true"
  }

  override getDefaultState(): any {
    const state: Record<string, any> = {};
    state[this.ORPHANED_CHECKBOX_SELECTED] = false;
    return state;
  }

}


export default OrphanedContentFilterPanel;
