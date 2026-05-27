import { ButtonComponent } from "../button/button.component";

export interface Accordion {
  value: String;
  title: String;
  content: String;
  imageURL?: String;
  button?: ButtonComponent;
}