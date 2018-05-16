const convert = require('../src/convert')
const path = require('path')
const { createCanvas, loadImage } = require('canvas')
const cheerio = require('cheerio')
const spectra = require('spectra')

const SAMPLE_IMAGE_PATH = path.join(__dirname, 'sample-image.png')

test('converts an image', async () => {
  const canvas = createCanvas(3, 3)
  const ctx = canvas.getContext('2d')
  const image = await loadImage(SAMPLE_IMAGE_PATH)
  ctx.drawImage(image, 0, 0)

  const result = convert(canvas)

  const $ = cheerio.load(result)

  const $table = $('table')
  expect($table).toHaveLength(1)
  expect($table.attr('border')).toEqual('0')
  expect($table.attr('cellspacing')).toEqual('0')
  expect($table.attr('cellpadding')).toEqual('0')
  expect($table.attr('width')).toEqual('3')
  expect($table.attr('height')).toEqual('3')

  const $tr = $('table tr')
  expect($tr).toHaveLength(3)

  const $td = $('table td')
  expect($td).toHaveLength(9)

  ;[
    'black',
    'white',
    '#fb0207',
    '#0000ff',
    '#fb02ff',
    '#21ff06',
    '#ffff0a',
    '#fd8008',
    '#800080'
  ].forEach((color, index) => {
    const expected = spectra(color)
    const actual = spectra($td.eq(index).attr('bgcolor'))
    expect(actual.equals(expected)).toBeTruthy()
  })
})
