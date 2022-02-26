export default function decodeHtml(
  input: string,
  type: DOMParserSupportedType = "text/html"
) {
  return new DOMParser().parseFromString(input, type).documentElement
    .textContent;
}
