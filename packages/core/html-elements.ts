import { genericElement } from "./dom-manager";

// Document Structure Elements
export const html = genericElement<HTMLHtmlElement>("html");
export const head = genericElement<HTMLHeadElement>("head");
export const body = genericElement<HTMLBodyElement>("body");
export const title = genericElement<HTMLTitleElement>("title");
export const meta = genericElement<HTMLMetaElement>("meta");
export const link = genericElement<HTMLLinkElement>("link");
export const style = genericElement<HTMLStyleElement>("style");
export const script = genericElement<HTMLScriptElement>("script");
export const base = genericElement<HTMLBaseElement>("base");

// Content Sectioning Elements
export const header = genericElement<HTMLElement>("header");
export const nav = genericElement<HTMLElement>("nav");
export const main = genericElement<HTMLElement>("main");
export const section = genericElement<HTMLElement>("section");
export const article = genericElement<HTMLElement>("article");
export const aside = genericElement<HTMLElement>("aside");
export const footer = genericElement<HTMLElement>("footer");
export const address = genericElement<HTMLElement>("address");

// Heading Elements
export const h1 = genericElement<HTMLHeadingElement>("h1");
export const h2 = genericElement<HTMLHeadingElement>("h2");
export const h3 = genericElement<HTMLHeadingElement>("h3");
export const h4 = genericElement<HTMLHeadingElement>("h4");
export const h5 = genericElement<HTMLHeadingElement>("h5");
export const h6 = genericElement<HTMLHeadingElement>("h6");
export const hgroup = genericElement<HTMLElement>("hgroup");

// Text Content Elements
export const div = genericElement<HTMLDivElement>("div");
export const p = genericElement<HTMLParagraphElement>("p");
export const span = genericElement<HTMLSpanElement>("span");
export const pre = genericElement<HTMLPreElement>("pre");
export const blockquote = genericElement<HTMLQuoteElement>("blockquote");
export const hr = genericElement<HTMLHRElement>("hr");

// List Elements
export const ul = genericElement<HTMLUListElement>("ul");
export const ol = genericElement<HTMLOListElement>("ol");
export const li = genericElement<HTMLLIElement>("li");
export const dl = genericElement<HTMLDListElement>("dl");
export const dt = genericElement<HTMLElement>("dt");
export const dd = genericElement<HTMLElement>("dd");

// Inline Text Semantics
export const a = genericElement<HTMLAnchorElement>("a");
export const abbr = genericElement<HTMLElement>("abbr");
export const b = genericElement<HTMLElement>("b");
export const bdi = genericElement<HTMLElement>("bdi");
export const bdo = genericElement<HTMLElement>("bdo");
export const br = genericElement<HTMLBRElement>("br");
export const cite = genericElement<HTMLElement>("cite");
export const code = genericElement<HTMLElement>("code");
export const data = genericElement<HTMLDataElement>("data");
export const dfn = genericElement<HTMLElement>("dfn");
export const em = genericElement<HTMLElement>("em");
export const i = genericElement<HTMLElement>("i");
export const kbd = genericElement<HTMLElement>("kbd");
export const mark = genericElement<HTMLElement>("mark");
export const q = genericElement<HTMLQuoteElement>("q");
export const rp = genericElement<HTMLElement>("rp");
export const rt = genericElement<HTMLElement>("rt");
export const ruby = genericElement<HTMLElement>("ruby");
export const s = genericElement<HTMLElement>("s");
export const samp = genericElement<HTMLElement>("samp");
export const small = genericElement<HTMLElement>("small");
export const strong = genericElement<HTMLElement>("strong");
export const sub = genericElement<HTMLElement>("sub");
export const sup = genericElement<HTMLElement>("sup");
export const time = genericElement<HTMLTimeElement>("time");
export const u = genericElement<HTMLElement>("u");
export const variable = genericElement<HTMLElement>("var");
export const wbr = genericElement<HTMLElement>("wbr");

// Image and Multimedia Elements
export const img = genericElement<HTMLImageElement>("img");
export const audio = genericElement<HTMLAudioElement>("audio");
export const video = genericElement<HTMLVideoElement>("video");
export const source = genericElement<HTMLSourceElement>("source");
export const track = genericElement<HTMLTrackElement>("track");
export const picture = genericElement<HTMLPictureElement>("picture");

// Embedded Content Elements
export const embed = genericElement<HTMLEmbedElement>("embed");
export const iframe = genericElement<HTMLIFrameElement>("iframe");
export const object = genericElement<HTMLObjectElement>("object");
export const param = genericElement<HTMLParamElement>("param");

// SVG and MathML Elements
export const svg = genericElement<HTMLElement>("svg");
export const math = genericElement<HTMLElement>("math");

// Scripting Elements
export const canvas = genericElement<HTMLCanvasElement>("canvas");
export const noscript = genericElement<HTMLElement>("noscript");

// Demarcating Edits Elements
export const del = genericElement<HTMLModElement>("del");
export const ins = genericElement<HTMLModElement>("ins");

// Table Content Elements
export const table = genericElement<HTMLTableElement>("table");
export const caption = genericElement<HTMLTableCaptionElement>("caption");
export const colgroup = genericElement<HTMLTableColElement>("colgroup");
export const col = genericElement<HTMLTableColElement>("col");
export const tbody = genericElement<HTMLTableSectionElement>("tbody");
export const thead = genericElement<HTMLTableSectionElement>("thead");
export const tfoot = genericElement<HTMLTableSectionElement>("tfoot");
export const tr = genericElement<HTMLTableRowElement>("tr");
export const td = genericElement<HTMLTableCellElement>("td");
export const th = genericElement<HTMLTableCellElement>("th");

// Forms Elements
export const form = genericElement<HTMLFormElement>("form");
export const fieldset = genericElement<HTMLFieldSetElement>("fieldset");
export const legend = genericElement<HTMLLegendElement>("legend");
export const label = genericElement<HTMLLabelElement>("label");
export const input = genericElement<HTMLInputElement>("input");
export const button = genericElement<HTMLButtonElement>("button");
export const select = genericElement<HTMLSelectElement>("select");
export const datalist = genericElement<HTMLDataListElement>("datalist");
export const optgroup = genericElement<HTMLOptGroupElement>("optgroup");
export const option = genericElement<HTMLOptionElement>("option");
export const textarea = genericElement<HTMLTextAreaElement>("textarea");
export const output = genericElement<HTMLOutputElement>("output");
export const progress = genericElement<HTMLProgressElement>("progress");
export const meter = genericElement<HTMLMeterElement>("meter");

// Interactive Elements
export const details = genericElement<HTMLDetailsElement>("details");
export const summary = genericElement<HTMLElement>("summary");
export const dialog = genericElement<HTMLDialogElement>("dialog");

// Web Components Elements
export const slot = genericElement<HTMLSlotElement>("slot");
export const template = genericElement<HTMLTemplateElement>("template");

// Obsolete/Deprecated Elements (for completeness)
export const acronym = genericElement<HTMLElement>("acronym");
export const applet = genericElement<HTMLElement>("applet");
export const basefont = genericElement<HTMLElement>("basefont");
export const big = genericElement<HTMLElement>("big");
export const center = genericElement<HTMLElement>("center");
export const dir = genericElement<HTMLDirectoryElement>("dir");
export const font = genericElement<HTMLFontElement>("font");
export const frame = genericElement<HTMLFrameElement>("frame");
export const frameset = genericElement<HTMLFrameSetElement>("frameset");
export const marquee = genericElement<HTMLMarqueeElement>("marquee");
export const nobr = genericElement<HTMLElement>("nobr");
export const noembed = genericElement<HTMLElement>("noembed");
export const noframes = genericElement<HTMLElement>("noframes");
export const plaintext = genericElement<HTMLElement>("plaintext");
export const strike = genericElement<HTMLElement>("strike");
export const tt = genericElement<HTMLElement>("tt");
export const xmp = genericElement<HTMLElement>("xmp");

// HTML5 Semantic Elements
export const figure = genericElement<HTMLElement>("figure");
export const figcaption = genericElement<HTMLElement>("figcaption");

// Ruby Annotation Elements
export const rtc = genericElement<HTMLElement>("rtc");

// Additional Form Elements
export const keygen = genericElement<HTMLElement>("keygen");

// Custom Elements Support
export const customElement = <T extends HTMLElement = HTMLElement>(
  tagName: string
) => genericElement<T>(tagName);

// Utility type for all element creators
export type ElementCreator<T extends HTMLElement> = (...args: any[]) => T;

// Export all as a namespace for organized imports
export const h = {
  // Document Structure
  Html: html,
  Head: head,
  Body: body,
  Title: title,
  Meta: meta,
  Link: link,
  Style: style,
  Script: script,
  Base: base,

  // Content Sectioning
  Header: header,
  Nav: nav,
  Main: main,
  Section: section,
  Article: article,
  Aside: aside,
  Footer: footer,
  Address: address,

  // Headings
  Heading1: h1,
  Heading2: h2,
  Heading3: h3,
  Heading4: h4,
  Heading5: h5,
  Heading6: h6,
  HeadingGroup: hgroup,

  // Text Content
  Div: div,
  Paragraph: p,
  Span: span,
  Pre: pre,
  Blockquote: blockquote,
  HorizontalRule: hr,

  // Lists
  UnorderedList: ul,
  OrderedList: ol,
  ListItem: li,
  DescriptionList: dl,
  DescriptionTerm: dt,
  DescriptionDetails: dd,

  // Inline Text
  Anchor: a,
  Abbreviation: abbr,
  Bold: b,
  BidirectionalIsolate: bdi,
  BidirectionalOverride: bdo,
  Break: br,
  Citation: cite,
  Code: code,
  Data: data,
  Definition: dfn,
  Emphasis: em,
  Italic: i,
  Keyboard: kbd,
  Mark: mark,
  Quote: q,
  RubyParenthesis: rp,
  RubyText: rt,
  Ruby: ruby,
  Strikethrough: s,
  Sample: samp,
  Small: small,
  Strong: strong,
  Subscript: sub,
  Superscript: sup,
  Time: time,
  Underline: u,
  Variable: variable,
  WordBreak: wbr,

  // Media
  Image: img,
  Audio: audio,
  Video: video,
  Source: source,
  Track: track,
  Picture: picture,

  // Embedded
  Embed: embed,
  IFrame: iframe,
  Object: object,
  Parameter: param,

  // Graphics
  Svg: svg,
  Math: math,
  Canvas: canvas,

  // Scripting
  NoScript: noscript,

  // Edits
  Delete: del,
  Insert: ins,

  // Tables
  Table: table,
  TableCaption: caption,
  TableColumnGroup: colgroup,
  TableColumn: col,
  TableBody: tbody,
  TableHead: thead,
  TableFoot: tfoot,
  TableRow: tr,
  TableData: td,
  TableHeader: th,

  // Forms
  Form: form,
  Fieldset: fieldset,
  Legend: legend,
  Label: label,
  Input: input,
  Button: button,
  Select: select,
  DataList: datalist,
  OptionGroup: optgroup,
  Option: option,
  TextArea: textarea,
  Output: output,
  Progress: progress,
  Meter: meter,

  // Interactive
  Details: details,
  Summary: summary,
  Dialog: dialog,

  // Web Components
  Slot: slot,
  Template: template,

  // Semantic
  Figure: figure,
  FigureCaption: figcaption,

  // Obsolete/Deprecated (for completeness)
  Acronym: acronym,
  Applet: applet,
  BaseFont: basefont,
  Big: big,
  Center: center,
  Directory: dir,
  Font: font,
  Frame: frame,
  FrameSet: frameset,
  Marquee: marquee,
  NoBr: nobr,
  NoEmbed: noembed,
  NoFrames: noframes,
  PlainText: plaintext,
  Strike: strike,
  Teletype: tt,
  Xmp: xmp,
  KeyGen: keygen,
  RubyTextContainer: rtc,

  // Utility
  CustomElement: customElement,
};

// Default export for convenience
export default h;
