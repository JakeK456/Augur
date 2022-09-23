import { useQuery } from "@apollo/client";
import { NEWS } from "../util/queries";
import NewsCard from "../components/NewsCard";

export default function News() {
  const { error, loading, data } = useQuery(NEWS, {
    fetchPolicy: "network-only",
  });
  console.log(data);
  return (
    <div className="flex flex-col p-4 items-center">
      {!loading &&
        data.news.map((article) => (
          <NewsCard key={article.uuid} data={article} />
        ))}
    </div>
  );
}
