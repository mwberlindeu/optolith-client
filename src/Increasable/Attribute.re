module Dynamic =
  Increasable.Dynamic({
    let minValue = 8;
  });

module Static = {
  type t = {
    id: int,
    name: string,
    short: string,
  };

  module Translations = {
    type t = {
      name: string,
      short: string,
    };

    let decode = json =>
      Json.Decode.{
        name: json |> field("name", string),
        short: json |> field("short", string),
      };
  };

  module TranslationMap = TranslationMap.Make(Translations);

  type multilingual = {
    id: int,
    translations: TranslationMap.t,
  };

  let decodeMultilingual = json =>
    Json.Decode.{
      id: json |> field("id", int),
      translations: json |> field("translations", TranslationMap.decode),
    };

  let resolveTranslations = (langs, x) =>
    Ley_Option.Functor.(
      x.translations
      |> TranslationMap.getFromLanguageOrder(langs)
      <&> (
        translation => {
          id: x.id,
          name: translation.name,
          short: translation.short,
        }
      )
    );

  let decode = (langs, json) =>
    json |> decodeMultilingual |> resolveTranslations(langs);
};