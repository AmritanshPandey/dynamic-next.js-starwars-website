export async function getStaticProps(context) {
    const id = context.params.id;
    const res = await fetch(`https://swapi.dev/api/planets/${id}`);
    const data = await res.json();
  
    return {
      props: { data },
    }
  }
  
  export async function getStaticPaths() {
    const res = await fetch(`https://swapi.dev/api/planets/`);
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
  
  export default function Planets({ data }) {
    return (
      <div>
        <h1 className="text-left text-xl font-semibold my-6 mb-2">{`Planet Name: ${data.name}`}</h1>
        <p><span className="font-semibold">Rotation Period: </span>{data.rotation_period}</p>
        <p><span className="font-semibold">Orbital Period: </span>{data.orbital_period}</p>
        <p><span className="font-semibold">Diameter: </span>{data.diameter}</p>
        <p><span className="font-semibold">Climate: </span>{data.climate}</p>
        <p><span className="font-semibold">Gravity: </span>{data.gravity}</p>
        <p><span className="font-semibold">Terrain: </span>{data.terrain}</p>
        <p><span className="font-semibold">Population: </span>{data.population}</p>
      </div>
    );
  }
  