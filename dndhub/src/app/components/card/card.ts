export abstract class Card {
  imageURL?: String;
  title?: string;
  subtitle?: String;
  content?: String;

  public static defaultImageURL(): String {
    return "https://ionicframework.com/docs/img/demos/card-media.png";
  }
}