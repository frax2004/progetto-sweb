export abstract class Card {
  imageURL?: String;
  title?: String;
  subtitle?: String;
  content?: String;

  public static defaultImageURL(): String {
    return "https://ionicframework.com/docs/img/demos/card-media.png";
  }
}