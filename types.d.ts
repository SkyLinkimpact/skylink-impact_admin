import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};
type HeaderElement = { type: "header"; level: number; children: CustomText[] };
type LinkElement = { type: "link"; url: string; children: CustomText[] };
type ImageElement = {
  type: "image";
  alt: string;
  url: string;
  children: CustomText[];
};

type CustomElement =
  | ParagraphElement
  | HeaderElement
  | LinkElement
  | ImageElement;
type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
