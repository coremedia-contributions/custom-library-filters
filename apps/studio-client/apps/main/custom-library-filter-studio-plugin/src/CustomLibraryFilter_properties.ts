/**
 * Interface values for ResourceBundle "FeedbackHubABTesting".
 * @see CustomLibraryFilter_properties#INSTANCE
 */
interface CustomLibraryFilter_properties {
  LibrarySizeFilter_title: string;
  LibrarySizeFilter_label_minSize: string;
  LibrarySizeFilter_label_maxSize: string;
  LibrarySizeFilter_emptyText: string;
  LibraryOrphanedItemsFilter_title: string;
  LibraryOrphanedItemsFilter_checkbox_label: string;

  SizeColumn_header: string;

}


/**
 * Singleton for the current user Locale's instance of ResourceBundle "FeedbackHubABTesting".
 * @see CustomLibraryFilter_properties
 */
const CustomLibraryFilter_properties: CustomLibraryFilter_properties = {
  LibrarySizeFilter_title: "Blob Size",
  LibrarySizeFilter_label_minSize: "Minimum",
  LibrarySizeFilter_label_maxSize: "Maximum",
  LibrarySizeFilter_emptyText: "Size in MB",
  LibraryOrphanedItemsFilter_title: "Orphaned Items",
  LibraryOrphanedItemsFilter_checkbox_label: "Only Show Orphaned Items",

  SizeColumn_header: "Size"
};

export default CustomLibraryFilter_properties;
