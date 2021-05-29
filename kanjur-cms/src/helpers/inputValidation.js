export default function validateInput(name, barcode, stock, price) {
  let message = []

  if (!name) {
    message.push('Name must be filled')
  }
  if (!barcode) {
    message.push('barcode must be filled')
  }
  if (!stock || stock < 1) {
    message.push('stock must be greater than 0')
  }
  if (!price || price < 1) {
    message.push('price must be greater than 0')
  }

  return message
}