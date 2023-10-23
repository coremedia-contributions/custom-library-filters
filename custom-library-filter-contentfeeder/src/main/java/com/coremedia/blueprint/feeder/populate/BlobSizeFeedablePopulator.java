package com.coremedia.blueprint.feeder.populate;

import com.coremedia.cap.common.Blob;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.feeder.MutableFeedable;
import com.coremedia.cap.feeder.populate.FeedablePopulator;

public class BlobSizeFeedablePopulator implements FeedablePopulator<Content> {
  static final String SOLR_SIZE_FIELD_NAME = "size";

  @Override
  public void populate(MutableFeedable feedable, Content content) {
    if (feedable == null || content == null) {
      throw new IllegalArgumentException("feedable and content must not be null");
    }

    if (content.getType().isSubtypeOf("CMPicture")) {
      int size;
      Blob data = content.getBlob("data");
      if (data != null) {
        size = data.getSize();
        feedable.setNumberElement(SOLR_SIZE_FIELD_NAME, size);
      }
    }
  }
}
