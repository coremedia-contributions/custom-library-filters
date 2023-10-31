package com.coremedia.blueprint.feeder.populate;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.feeder.MutableFeedable;
import com.coremedia.cap.feeder.populate.FeedablePopulator;

import java.util.Collection;

public class OrphanedContentFeedablePopulator implements FeedablePopulator<Content> {
  static final String SOLR_IS_ORPHANED_FIELD_NAME = "orphaned";
  public static final String FEEDABLE_AND_CONTENT_MUST_NOT_BE_NULL = "feedable and content must not be null";

  @Override
  public void populate(MutableFeedable feedable, Content content) {
    if (feedable == null || content == null) {
      throw new IllegalArgumentException(FEEDABLE_AND_CONTENT_MUST_NOT_BE_NULL);
    }
    boolean orphaned;
    Collection<Content> referrers = content.getReferrersFulfilling("NOT isDeleted");
    if (referrers != null) {
      orphaned = referrers.isEmpty();
      feedable.setStringElement(SOLR_IS_ORPHANED_FIELD_NAME, String.valueOf(orphaned));
    }
  }
}
