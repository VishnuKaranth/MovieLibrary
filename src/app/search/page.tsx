import React, { Suspense } from "react";
import SearchResults from "~/components/search/SearchResults";

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
