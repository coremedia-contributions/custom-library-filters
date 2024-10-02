import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import CustomLibraryFilter_properties from "./CustomLibraryFilter_properties";

/**
 * Overrides of ResourceBundle "CustomLibraryFilter" for Locale "de".
 * @see CustomLibraryFilter_properties#INSTANCE
 */
ResourceBundleUtil.override(CustomLibraryFilter_properties, {
  LibraryLocaleFilter_title: "Locale",
  LibraryLocaleFilter_emptyText: "Locales auswählen...",
  LibrarySizeFilter_title: "Blob Größe",
  LibrarySizeFilter_label_minSize: "Minimum",
  LibrarySizeFilter_label_maxSize: "Maximum",
  LibrarySizeFilter_emptyText: "Größe in MB",
  LibraryOrphanedItemsFilter_title: "Verwaiste Inhalte",
  LibraryOrphanedItemsFilter_checkbox_label: "Zeige nur verwaiste Inhalte",
  LibraryOrphanedItemsFilter_tooltip: "Zeige nicht statisch referenzierte Inhalte. Beachte, dass diese evtl. weiterhin in dynamischen Abfragen verwendet werden.",

  SizeColumn_header: "Größe",

  LibraryDateRangeFilter_modificationdate_title: "Bearbeitungsdatum ",
  LibraryDateRangeFilter_publicationdate_title: "Publikationsdatum",
  LibraryDateRangeFilter_creationdate_title: "Erstellungsdatum",
});
