export default function Picture({ src }) {
  return (
    <img
      className="rounded-full border border-gray-700 object-cover h-48 w-48 shadow-xl"
      src={src}
      alt="profile avatar"
    />
  );
}
