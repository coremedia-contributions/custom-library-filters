import Config from "@jangaroo/runtime/Config";
import FilterPanel from "@coremedia/studio-client.main.editor-components/sdk/collectionview/search/FilterPanel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import Container from "@jangaroo/ext-ts/container/Container";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import NumberField from "@jangaroo/ext-ts/form/field/Number";
import CustomLibraryFilter_properties from "../CustomLibraryFilter_properties";

interface SizeFilterPanelConfig extends Config<FilterPanel> {
}

class SizeFilterPanel extends FilterPanel {
  declare Config: SizeFilterPanelConfig;

  private readonly BLOB_SIZE_RANGE_MIN_KEY: string = "blobSizeRangeMin";
  private readonly BLOB_SIZE_RANGE_MAX_KEY: string = "blobSizeRangeMax";


  static readonly FILTER_ID: string = "blobSize";

  #sizeFilterMinExpression: ValueExpression = null;
  #sizeFilterMaxExpression: ValueExpression = null;

  constructor(config: Config<SizeFilterPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(SizeFilterPanel, {
      itemId: SizeFilterPanel.FILTER_ID,
      title: CustomLibraryFilter_properties.LibrarySizeFilter_title,

      items: [
        Config(Container, {
          items: [
            Config(NumberField, {
              fieldLabel: CustomLibraryFilter_properties.LibrarySizeFilter_label_minSize,
              emptyText: CustomLibraryFilter_properties.LibrarySizeFilter_emptyText,
              width: 25,
              allowDecimals: false,
              minValue: 0,
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "value",
                  bindTo: this$.getSizeFilterMinExpression(),
                  bidirectional: true,
                }),
              ],
            }),
            Config(NumberField, {
              fieldLabel: CustomLibraryFilter_properties.LibrarySizeFilter_label_maxSize,
              emptyText: CustomLibraryFilter_properties.LibrarySizeFilter_emptyText,
              width: 25,
              allowDecimals: false,
              minValue: 1,
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "value",
                  bindTo: this$.getSizeFilterMaxExpression(),
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

  getSizeFilterMinExpression(): ValueExpression {
    if (!this.#sizeFilterMinExpression) {
      this.#sizeFilterMinExpression = ValueExpressionFactory.create(this.BLOB_SIZE_RANGE_MIN_KEY, this.getStateBean());
    }
    return this.#sizeFilterMinExpression;
  }

  getSizeFilterMaxExpression(): ValueExpression {
    if (!this.#sizeFilterMaxExpression) {
      this.#sizeFilterMaxExpression = ValueExpressionFactory.create(this.BLOB_SIZE_RANGE_MAX_KEY, this.getStateBean());
    }
    return this.#sizeFilterMaxExpression;
  }

  override buildQuery(): string {
    let rangeMin = this.getStateBean().get(this.BLOB_SIZE_RANGE_MIN_KEY);
    let rangeMax = this.getStateBean().get(this.BLOB_SIZE_RANGE_MAX_KEY);

    if (rangeMin === "" || rangeMin === null) {
      rangeMin = "*"
    }

    if (rangeMax === "" || rangeMax === null) {
      rangeMax = "*"
    }

    if ((rangeMin === "*") && rangeMax === "*") {
      return null;
    }

    if (rangeMin != "*") {
      rangeMin = convertMbToBytes(parseInt(rangeMin));
    }

    if (rangeMax != "*") {
      rangeMax = convertMbToBytes(parseInt(rangeMax));
    }

    return `size:[${rangeMin} TO ${rangeMax}]`;
  }

  override getDefaultState(): any {
    const state: Record<string, any> = {};
    state[this.BLOB_SIZE_RANGE_MIN_KEY] = "*";
    state[this.BLOB_SIZE_RANGE_MAX_KEY] = "*";

    return state;
  }
}

function convertMbToBytes(mb: number): string {
  let result = mb * 1024 * 1024;
  return String(result);
}

export default SizeFilterPanel;
