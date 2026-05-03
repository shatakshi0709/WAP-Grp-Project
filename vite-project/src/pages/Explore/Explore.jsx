import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import MasonryGrid from "../../Components/MasonryGrid/MasonryGrid";
import CategoryTabs from "../../Components/CategoryTabs/CategoryTabs";
import usePinsFeed from "../../hooks/usePinsFeed";
import useInfiniteScroll from "../../hooks/useInfineScroll";
import { categories } from "../../data/categories";
import styles from "./Explore.module.css";

const genreMeta = {
  Nature: { title: "Nature stories", subtitle: "Calm landscapes and outdoor inspiration." },
  Fashion: { title: "Fashion journal", subtitle: "Editorial looks, textures, and style ideas." },
  Travel: { title: "Travel diaries", subtitle: "Destinations worth pinning for your next trip." },
  Art: { title: "Art picks", subtitle: "Composition, illustration, and creative direction." },
  Food: { title: "Food magazine", subtitle: "Dishes, cafes, and visual recipes." },
  Technology: { title: "Technology edits", subtitle: "Devices, interfaces, and future vibes." },
  People: { title: "People & portraits", subtitle: "Portraits and candid stories." },
  Animals: { title: "Animal moments", subtitle: "Wildlife and pet photography." },
  Architecture: { title: "Architecture review", subtitle: "Interiors and urban structures." },
  All: {
    title: "Explore visual stories",
    subtitle: "A curated mix of visuals across trends and categories.",
  },
};

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const searchTerm = searchParams.get("q") || "";
  const currentMeta = useMemo(() => genreMeta[activeCategory] || genreMeta.All, [activeCategory]);

  const { pins, error, loadingInitial, loadingMore, hasMore, loadMore, retry } = usePinsFeed({
    searchTerm,
    activeCategory,
    perPage: 24,
  });

  const sentinelRef = useInfiniteScroll({
    enabled: true,
    loading: loadingMore,
    hasMore,
    onLoadMore: loadMore,
  });

  function onCategoryChange(nextCategory) {
    const params = new URLSearchParams(searchParams);
    if (nextCategory === "All") params.delete("category");
    else params.set("category", nextCategory);
    setSearchParams(params);
  }

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <span className={styles.heroLabel}>{activeCategory}</span>
          <h1>{currentMeta.title}</h1>
          <p>{currentMeta.subtitle}</p>
          <div className={styles.heroStats}>
            <span>{pins.length} pins loaded</span>
            <span>{searchTerm ? `Query: ${searchTerm}` : "Curated feed"}</span>
          </div>
        </div>
      </section>

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      {error && (
        <div className={styles.errorBox}>
          <p>{error}</p>
          <button type="button" onClick={retry}>
            Retry
          </button>
        </div>
      )}

      {loadingInitial ? (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))}
        </div>
      ) : (
        <>
          <MasonryGrid items={pins} variant="explore" />
          {!pins.length && !error && (
            <p className={styles.empty}>No visual stories found for this filter.</p>
          )}
        </>
      )}

      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      {loadingMore ? (
        <p className={styles.loading}>Loading visual stories...</p>
      ) : (
        !hasMore && pins.length > 0 && <p className={styles.loading}>All caught up.</p>
      )}
    </div>
  );
}
