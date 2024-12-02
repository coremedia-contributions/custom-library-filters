/**
 * Interface values for ResourceBundle "FeedbackHubABTesting".
 * @see CustomLibraryFilter_properties#INSTANCE
 */
interface CustomLibraryFilter_properties {
  LibraryLocaleFilter_title: string;
  LibraryLocaleFilter_emptyText: string;
  LibrarySizeFilter_title: string;
  LibrarySizeFilter_label_minSize: string;
  LibrarySizeFilter_label_maxSize: string;
  LibrarySizeFilter_emptyText: string;
  LibraryOrphanedItemsFilter_title: string;
  LibraryOrphanedItemsFilter_checkbox_label: string;
  LibraryOrphanedItemsFilter_tooltip: string;

  SizeColumn_header: string;

  LibraryDateRangeFilter_modificationdate_title: string;
  LibraryDateRangeFilter_publicationdate_title: string;
  LibraryDateRangeFilter_creationdate_title: string;
}


/**
 * Singleton for the current user Locale's instance of ResourceBundle "FeedbackHubABTesting".
 * @see CustomLibraryFilter_properties
 */
const CustomLibraryFilter_properties: CustomLibraryFilter_properties = {
  LibraryLocaleFilter_title: "Locale",
  LibraryLocaleFilter_emptyText: "Select locales ...",
  LibrarySizeFilter_title: "Blob Size",
  LibrarySizeFilter_label_minSize: "Minimum",
  LibrarySizeFilter_label_maxSize: "Maximum",
  LibrarySizeFilter_emptyText: "Size in MB",
  LibraryOrphanedItemsFilter_title: "Orphaned Content",
  LibraryOrphanedItemsFilter_checkbox_label: "Show orphaned Content",
  LibraryOrphanedItemsFilter_tooltip: "Filter for content which is not referenced by any other content. The content may still be used in dynamic queries.",

  SizeColumn_header: "Size",

  LibraryDateRangeFilter_modificationdate_title: "Modification Date",
  LibraryDateRangeFilter_publicationdate_title: "Publication Date",
  LibraryDateRangeFilter_creationdate_title: "Creation Date",
};

export default CustomLibraryFilter_properties;
