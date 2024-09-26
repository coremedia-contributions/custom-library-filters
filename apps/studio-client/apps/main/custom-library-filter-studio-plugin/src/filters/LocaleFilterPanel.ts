import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import FilterPanel from "@coremedia/studio-client.main.editor-components/sdk/collectionview/search/FilterPanel";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import BindListPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindListPlugin";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import DataField from "@coremedia/studio-client.ext.ui-components/store/DataField";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import { Locale } from "@coremedia/studio-client.client-core";
import InputChipsFieldBase
  from "@coremedia/studio-client.main.editor-components/sdk/components/chipsfield/InputChipsFieldBase";
import { as } from "@jangaroo/runtime";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import EditorContextImpl from "@coremedia/studio-client.main.editor-components/sdk/EditorContextImpl";
import CustomLibraryFilter_properties from "../CustomLibraryFilter_properties";

const LOCALE_FIELD_NAME = "locale";
const LOCALES_STATE_FIELD = "locales";

interface LocaleFilterPanelConfig extends Config<FilterPanel> {
}

class LocaleFilterPanel extends FilterPanel {

  declare Config: LocaleFilterPanelConfig;

  static readonly FILTER_ID: string = "localeFilter";

  static readonly VALUE_FIELD: string = "languageTag";
  static readonly LABEL_FIELD: string = "displayName";

  localesExpression: ValueExpression = null;
  selectedLocalesExpression: ValueExpression = null;

  constructor(config: Config<LocaleFilterPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(LocaleFilterPanel, {
      itemId: LocaleFilterPanel.FILTER_ID,
      title: CustomLibraryFilter_properties.LibraryLocaleFilter_title,
      items: [
        Config(InputChipsFieldBase, {
          itemId: "localesSelector",
          labelSeparator: "",
          filterPickList: true,
          valueField: LocaleFilterPanel.VALUE_FIELD,
          displayField: LocaleFilterPanel.LABEL_FIELD,
          queryMode: "local",
          triggerAction: "all",
          publishes: LocaleFilterPanel.VALUE_FIELD,
          emptyText: CustomLibraryFilter_properties.LibraryLocaleFilter_emptyText,
          multiSelect: true,
          ariaRole: "text",
          forceSelection: false,
          anchor: "100%",
          ...ConfigUtils.append({
            plugins: [
              Config(BindListPlugin, {
                bindTo: this$.getLocalesExpression(),
                sortDirection: "ASC",
                sortField: LocaleFilterPanel.LABEL_FIELD,
                fields: [
                  Config(DataField, {
                    name: LocaleFilterPanel.LABEL_FIELD,
                    encode: false
                  }),
                  Config(DataField, {
                    name: LocaleFilterPanel.VALUE_FIELD,
                    encode: false
                  })

                ]
              }),
              Config(BindPropertyPlugin, {
                componentProperty: "value",
                bidirectional: true,
                bindTo: this$.getSelectedLocalesExpression()
              })
            ]
          })
        })
      ]
    }), config));
  }

  getLocalesExpression(): ValueExpression {
    if (!this.localesExpression) {
      this.localesExpression = ValueExpressionFactory.createTransformingValueExpression(
              as(editorContext._, EditorContextImpl).getLocalesService().getAvailableLocalesExpression(),
              (values:Object) => {
                return Object.values(values);
              });
    }
    return this.localesExpression;
  }

  getSelectedLocalesExpression(): ValueExpression {
    if (!this.selectedLocalesExpression) {
      this.selectedLocalesExpression = ValueExpressionFactory.create(LOCALES_STATE_FIELD, this.getStateBean());
    }
    return this.selectedLocalesExpression;
  }

  override buildQuery(): string {
    const locales:string[] = this.getStateBean().get(LOCALES_STATE_FIELD);
    if (!locales || locales.length < 1) {
      return null;
    }

    let filterArgs = [];
    locales.forEach(langTag => {
      langTag && filterArgs.push(`${LOCALE_FIELD_NAME}:${langTag}`);
    });

    return filterArgs.join(" OR ");
  }

  override getDefaultState(): any {
    let defaultState = {};
    defaultState[LOCALE_FIELD_NAME] = "";
    return defaultState;
  }
}

export default LocaleFilterPanel;
