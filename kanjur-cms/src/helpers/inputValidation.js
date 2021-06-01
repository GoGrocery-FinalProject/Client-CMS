export default function validateInput(name, barcode, stock, price, image_url, description) {
  let message = []

  if (!name) {
    message.push('Name must be filled')
  }
  if (!barcode) {
    message.push('barcode must be filled')
  }
  if (!image_url) {
    message.push('image_url must be filled')
  }
  if (!description) {
    message.push('description must be filled')
  }
  if (!stock || stock < 1) {
    message.push('stock must be greater than 0')
  }
  if (!price || price < 1) {
    message.push('price must be greater than 0')
  }

  return message
}