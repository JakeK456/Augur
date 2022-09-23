export default function NewsCard({ data }) {
  const { uuid, source, title, image_url, url } = { ...data };

  const handleClick = () => {
    if (
      window.confirm(
        `This will redirect you to the following link: ${url}. \n Are you sure you want to redirect here?`
      )
    ) {
      window.open(url);
    }
  };

  return (
    <div
      className="flex border items-center mb-4 rounded-xl max-w-md min-w-min h-48 shadow-xl bg-white cursor-pointer"
      onClick={handleClick}
    >
      <div className="basis-1/2 relative h-full w-full items-center">
        <img
          src={image_url}
          alt={title}
          className="object-cover h-full w-full rounded-l-xl"
        ></img>
        <h1 className="absolute bottom-0 w-full text-center bg-white rounded-bl-xl opacity-90">
          {source}
        </h1>
      </div>
      <h3 className="basis-1/2 text-center p-2">{title}</h3>
    </div>
  );
}
