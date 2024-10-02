![Status: Active](https://documentation.coremedia.com/badges/badge_status_active.png "Status: Active")
![For CoreMedia CMS](https://documentation.coremedia.com/badges/badge_coremedia_cms.png "For CoreMedia CMS")

Custom library filters
==============

This extension bundles a set of additional filters for the Studio Library.

The following filter are included 
* **Locale filter**
Allows to filter search results by selected locales.
* **Blob size filter** 
Allows to filter binary content items like pictures, videos and downloads by size. 
This extension also includes the definition of a size column for the library. Follow the instructions below to integrate it into the library.
* **Improved date range filter**
  Offers more flexibility when filtering for date ranges e.g. creation, modification or publication date
* **Orphaned items filter**
Allows to filter for content which is not referenced by any other content. **Note:** The content may still used in dynamic queries.

![Custom Library Filters](docs/images/custom-library-filter.gif)

## Installation

- From the project's root folder, clone this repository as a submodule of the extensions folder. Make sure to use the branch name that matches your workspace version.
```
git submodule add https://github.com/coremedia-contributions/custom-library-filters.git
```

- Use the extension tool in the root folder of the project to link the modules to your workspace.
 ```
mvn -f workspace-configuration/extensions com.coremedia.maven:extensions-maven-plugin:LATEST:sync -Denable=custom-library-filters
```

## Adding the Solr search indices

The size filter and the orphaned items filter require additional solr indices.
In order to configure these just add the following to your ``apps/solr/modules/search/solr-config/src/main/app/configsets/content/conf/schema.xml``
```
  <!-- for locale search filter -->
  <field name="locale" type="string" indexed="true" stored="true"/>
  
  <!-- for file size library column & search filter -->
  <field name="size" type="plong" indexed="true" stored="true"/>

  <!-- for orphaned items search filter -->
  <field name="orphaned" type="boolean" indexed="true" stored="true"/>
```

## Adding the size column to the library
The definition of the size column is provided in the ``apps/studio-client/apps/main/custom-library-filter-studio-plugin/src/collectionview/SizeColumn.ts``

To include the size column in the library, copy this file to the ``@coremedia-blueprint/studio-client.main.blueprint-forms"`` module and define your column like shown below for the repository and the search view ``apps/studio-client/apps/main/blueprint-forms/src/ConfigureCollectionViewColumnsPlugin.ts``

```
 repositoryListViewColumns: [
    <Exising Columns>
      ...
    Config(SizeColumn),
    ]
    
 searchListViewColumns: [
    <Exising Columns>
      ...
    Config(SizeColumn),
    ]
```
