module.exports = function convert (canvas) {
  const {width, height} = canvas
  const ctx = canvas.getContext('2d')
  const {data} = ctx.getImageData(0, 0, width, height)

  const result = [
    `<table width=${width} height=${height} border=0 cellspacing=0 cellpadding=0>`
  ]

  for (let y = 0; y < height; y++) {
    const row = ['<tr>']
    for (let x = 0; x < width; x++) {
      const index = ((y * width) + x) * 4
      const [r, g, b] = [data[index], data[index + 1], data[index + 2]]
      const bgcolor = hex(r, g, b)
      row.push(`<td bgcolor=${bgcolor} />`)
    }
    row.push('</tr>')
    result.push(...row)
  }

  result.push('</table>')

  return result.join('')
}

function hex (...rgbArray) {
  return rgbArray.reduce((result, color) => {
    let hexed = color.toString(16)
    if (hexed.length === 1) { hexed = '0' + hexed }
    return result + hexed
  }, '#')
}
