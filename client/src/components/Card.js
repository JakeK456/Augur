import moment from "moment";

const formatDate = (unixTime) => {
  return moment(unixTime).format("MM/DD/YY");
};

export default function Card({ data }) {
  console.log(data);
  return (
    <div className="flex flex-row border">
      <p className="basis-1/3 text-center">{data.ticker}</p>
      <p className="basis-1/3 text-center">{formatDate(data.startDate)}</p>
      <p className="basis-1/3 text-center">{formatDate(data.endDate)}</p>
    </div>
  );
}
