export default function capitalize(text) {
  if (text) {
    return text[0].toUpperCase() + text.substring(1)
  }
}
