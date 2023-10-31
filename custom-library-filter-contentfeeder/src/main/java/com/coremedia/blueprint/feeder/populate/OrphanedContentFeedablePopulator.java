package com.coremedia.blueprint.feeder.populate;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.feeder.MutableFeedable;
import com.coremedia.cap.feeder.populate.FeedablePopulator;
import com.coremedia.cap.multisite.ContentSiteAspect;
import com.coremedia.cap.multisite.SitesService;

import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.*;

public class OrphanedContentFeedablePopulator implements FeedablePopulator<Content> {
  static final String SOLR_IS_ORPHANED_FIELD_NAME = "orphaned";

  private final SitesService sitesService;
  public static final String FEEDABLE_AND_CONTENT_MUST_NOT_BE_NULL = "feedable and content must not be null";

  public OrphanedContentFeedablePopulator(SitesService sitesService) {
    this.sitesService = sitesService;
  }

  @Override
  public void populate(MutableFeedable feedable, Content content) {
    if (feedable == null || content == null) {
      throw new IllegalArgumentException(FEEDABLE_AND_CONTENT_MUST_NOT_BE_NULL);
    }
    ContentSiteAspect contentSiteAspect = sitesService.getContentSiteAspect(content);
    String variantIds = contentSiteAspect.getVariants().stream().map(Content::getId).collect(joining(",")).concat(",");

    boolean orphaned;
    Collection<Content> referrers = content.getReferrersFulfilling("NOT isDeleted");
    if (referrers != null) {
      List<Content> filteredReferrers = referrers
              .stream()
              .filter(ref -> ref.getType().isSubtypeOf("CMObject"))
              .filter(ref -> !variantIds.contains(ref.getId() + ","))
              .collect(toList());
      orphaned = filteredReferrers.isEmpty();
      feedable.setStringElement(SOLR_IS_ORPHANED_FIELD_NAME, String.valueOf(orphaned));
    }
  }
}
