import { useAuth } from "../util/auth";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1 className="text-center my-8 p-10 font-ubuntu text-[100px] text-primary">Welcome to Augur!</h1>
      <p className="p-4 text-center font-maven text-[30px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo cumque
        explicabo ipsum, facilis repellendus omnis amet in accusantium quisquam
        nam qui consectetur sunt distinctio nemo molestiae ratione. Iure,
        aliquam debitis.
      </p>
    </div>
  );
}
