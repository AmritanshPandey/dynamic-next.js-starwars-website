export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`https://swapi.dev/api/people/${id}`);
  const data = await res.json();

  return {
    props: { data },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`https://swapi.dev/api/people/`);
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

export default function Characters({ data }) {
  return (
    <div>
      <h1 className="text-left text-xl font-semibold my-6 mb-2">{`Character Name: ${data.name}`}</h1>
      <p><span className="font-semibold">Height: </span>{data.height}</p>
      <p><span className="font-semibold">Mass: </span>{data.mass}</p>
      <p><span className="font-semibold">Hair Color: </span>{data.hair_color}</p>
      <p><span className="font-semibold">Skin Color: </span>{data.skin_color}</p>
      <p><span className="font-semibold">Eye Color: </span>{data.eye_color}</p>
      <p><span className="font-semibold">Birth Year: </span>{data.birth_year}</p>
      <p><span className="font-semibold">Gender: </span>{data.gender}</p>
    </div>
  );
}
