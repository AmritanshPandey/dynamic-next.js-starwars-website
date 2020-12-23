export async function getStaticProps(context) {
    const id = context.params.id;
    const res = await fetch(`https://swapi.dev/api/vehicles/${id}`);
    const data = await res.json();
  
    return {
      props: { data },
    }
  }
  
  export async function getStaticPaths() {
    const res = await fetch(`https://swapi.dev/api/vehicles/`);
    const data = await res.json();
  
    const paths = data.results.map((post) => {
      const urlArr = post.url.split("/")
      const id = urlArr[urlArr.length - 2];
  
      return {
          params: { id: id.toString() },
      }
    });
  
    return { paths, fallback: false };
  }
  
  export default function Vehicles({ data }) {
    return (
      <div>
        <h1 className="text-left text-xl font-semibold my-6 mb-2">{`Vehicle Name: ${data.name}`}</h1>
        <p><span className="font-semibold">Model: </span>{data.model}</p>
        <p><span className="font-semibold">Manufacturer: </span>{data.manufacturer}</p>
        <p><span className="font-semibold">Cost in Credit: </span>{data.cost_in_credits}</p>
        <p><span className="font-semibold">Length: </span>{data.length}</p>
        <p><span className="font-semibold">Max Atmosphering Speed: </span>{data.max_atmosphering_speed}</p>
        <p><span className="font-semibold">Crew: </span>{data.crew}</p>
        <p><span className="font-semibold">Passengers: </span>{data.passengers}</p>
        <p><span className="font-semibold">Vehicle Class: </span>{data.vehicle_class}</p>
      </div>
    );
  }
  