import { useLocation } from "react-router-dom";

function GodDetailPage() {
  const { state } = useLocation();
  const god = state?.god;

  return (
    <>
      <section id="center">
        <p>{god.name}</p>
      </section>
    </>
  );
}

export default GodDetailPage;
