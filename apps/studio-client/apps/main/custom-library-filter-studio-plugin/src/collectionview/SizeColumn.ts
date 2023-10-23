import BlobImpl from "@coremedia/studio-client.client-core-impl/data/impl/BlobImpl";
import Column from "@jangaroo/ext-ts/grid/column/Column";
import {as, bind} from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CustomLibraryFilter_properties from "../CustomLibraryFilter_properties";

interface SizeColumnConfig extends Config<Column> {
  sortField
}

class SizeColumn extends Column {

  declare Config: SizeColumnConfig;

  constructor(config: Config<SizeColumn> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(SizeColumn, {
      header: CustomLibraryFilter_properties.SizeColumn_header,
      dataIndex: "size",
      width: 80,
      sortable: true,
      sortField: "size",
      renderer: bind(this$, this$.#columnRenderer),
    }), config));
  }

  #columnRenderer(value: any): string {
    const blob = as(value, BlobImpl);
    if (!blob) {
      return "-";
    }

    return this.#formatBytes(blob.getSize(), 1);
  }

  #formatBytes(bytes, decimals = 2) {
    if (bytes == 0) return "0 Bytes";
    const k = 1024,
      dm = decimals || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}

export default SizeColumn;
