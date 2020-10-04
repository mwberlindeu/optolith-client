module Dynamic: {
  type dependency = {source: Id.Activatable.t};

  type t = {
    id: int,
    dependencies: list(dependency),
  };
};

module Static: {
  type t = {
    id: int,
    name: string,
    description: option(string),
    src: list(PublicationRef.t),
    errata: list(Erratum.t),
  };

  let decode: list(string) => Json.Decode.decoder(option((int, t)));
};