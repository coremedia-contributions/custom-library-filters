import Config from "@jangaroo/runtime/Config";
import FilterPanel from "@coremedia/studio-client.main.editor-components/sdk/collectionview/search/FilterPanel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import StatefulDateField from "@coremedia/studio-client.ext.ui-components/components/StatefulDateField";
import {BaseModels_properties} from "@coremedia/studio-client.base-models";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Container from "@jangaroo/ext-ts/container/Container";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import CustomLibraryFilter_properties from "../CustomLibraryFilter_properties";

const START_DATE_STATE_FIELD = "start";
const END_DATE_STATE_FIELD = "end";

interface DateRangeFilterPanelConfig extends Config<FilterPanel>,
        Partial<Pick<DateRangeFilterPanel, "dateFieldName">> {
}

class DateRangeFilterPanel extends FilterPanel {
  declare Config: DateRangeFilterPanelConfig;
  static readonly FILTER_ID: string = "date-range-filter-panel";

  constructor(config: Config<DateRangeFilterPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(DateRangeFilterPanel, {
      itemId: DateRangeFilterPanel.FILTER_ID + config.dateFieldName,
      title: CustomLibraryFilter_properties["LibraryDateRangeFilter_" + config.dateFieldName + "_title"],
      items: [
        Config(Container, {
          items: [
            Config(StatefulDateField, {
              format: BaseModels_properties.shortDateFormat,
              formatText: "",
              fieldLabel: "from",
              width: "100%",
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "value",
                  bindTo: this$.getStartDateValueExpression(),
                  bidirectional: true,
                }),
              ],
            }),
            Config(StatefulDateField, {
              format: BaseModels_properties.shortDateFormat,
              formatText: "",
              fieldLabel: "to",
              width: "100%",
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "value",
                  bindTo: this$.getEndDateValueExpression(),
                  bidirectional: true,
                }),
              ],
            }),
          ],
          layout: Config(VBoxLayout, {align: "stretch"}),
        }),
      ],
    }), config));
  }

  override buildQuery(): string {
    let startDateQueryExpression = this.buildStartDateExpression();
    let endDateQueryExpression = this.buildEndDateExpression();

    const query = `(${this.dateFieldName}:[${startDateQueryExpression} TO ${endDateQueryExpression}] AND isdeleted:false)`;
    console.debug(`DateRangeFilterPanel: build filter query: ${query} `)
    return query;
  }

  override getDefaultState(): any {
    let defaultState = {};
    defaultState[START_DATE_STATE_FIELD] = "*"
    defaultState[END_DATE_STATE_FIELD] = "NOW/HOUR"
    return defaultState;
  }

  private buildStartDateExpression() {
    let startDate = this.getStateBean().get(START_DATE_STATE_FIELD);
    if (!startDate || startDate == "*") {
      return "*"
    } else {
      return DateRangeFilterPanel.convertToLocalIsoDate(startDate);
    }
  }

  private buildEndDateExpression() {
    let endDate = this.getStateBean().get(END_DATE_STATE_FIELD);
    if (!endDate || endDate == "NOW/HOUR") {
      return "NOW/HOUR"
    } else {
      // solr expects the full iso date time string here. To include the current day we have to set the time correctly.
      const endOfDate = new Date(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDate(),
              23,
              59,
              59);
      return DateRangeFilterPanel.convertToLocalIsoDate(endOfDate);
    }
  }

  private static convertToLocalIsoDate(localDate) {
    //convert local Date to ISOString. Avoid conversion to UTC
    return new Date(localDate - new Date().getTimezoneOffset() * 60000).toISOString();
  }

  getStartDateValueExpression(): ValueExpression {
    if (!this.startDateValueExpression) {
      this.startDateValueExpression = ValueExpressionFactory.create(START_DATE_STATE_FIELD, this.getStateBean());
    }
    return this.startDateValueExpression;
  }

  getEndDateValueExpression(): ValueExpression {
    if (!this.endDateValueExpression) {
      this.endDateValueExpression = ValueExpressionFactory.create(END_DATE_STATE_FIELD, this.getStateBean());
    }
    return this.endDateValueExpression;
  }

  /** The name of the Solr (date) field that the filter should apply to, e.g. modificationdate. */
  dateFieldName: string = null;

  /**
   * A value expression that will be bound to the selected start date.
   */
  startDateValueExpression: ValueExpression = null;

  /**
   * A value expression that will be bound to the selected end date.
   */
  endDateValueExpression: ValueExpression = null;

}

export default DateRangeFilterPanel
