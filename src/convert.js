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
  const hexed = rgbArray.map(color => color.toString(16))
  const canUseShorthand = hexed.every((value, index) => {
    const originalValue = rgbArray[index]
    if ((value.length === 1) && (originalValue <= 9)) {
      return true
    } else {
      return value[0] === value[1]
    }
  })
  const result = ['#']
  if (canUseShorthand) {
    result.push(...hexed.map(value => value[0]))
  } else {
    result.push(...hexed.map(value => (
      (value.length === 1) ? ('0' + value) : value
    )))
  }
  return result.join('')
}
