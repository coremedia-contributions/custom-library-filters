package com.coremedia.blueprint.feeder.populate;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.feeder.MutableFeedable;
import com.coremedia.cap.feeder.TextParameters;
import com.coremedia.cap.feeder.populate.FeedablePopulator;
import com.coremedia.cap.multisite.SitesService;
import jakarta.annotation.PostConstruct;

import java.util.Locale;
import java.util.Optional;

public class LocaleFeedablePopulator implements FeedablePopulator<Content> {

  private static final String SOLR_LOCALE_FIELD_NAME = "locale";

  private SitesService sitesService;

  @Override
  public void populate(MutableFeedable feedable, Content content) {
    if (feedable == null || content == null) {
      throw new IllegalArgumentException("'feedable' and 'content' must not be null.");
    }

    if (content.getType().isSubtypeOf("CMLocalized")) {
      Optional.of(sitesService.getContentSiteAspect(content).getLocale())
              .map(Locale::toLanguageTag)
              .ifPresent(langTag -> feedable.setStringElement(SOLR_LOCALE_FIELD_NAME, langTag, TextParameters.NONE.asMap()));
    }
  }

  public void setSitesService(SitesService sitesService) {
    this.sitesService = sitesService;
  }

  @PostConstruct
  protected void initialize() {
    if (sitesService == null) {
      throw new IllegalArgumentException("Required property not set: sitesService");
    }
  }

}
