import store from '@/store'
import { monogramGradients } from '@/assets/monogramGradients'
import { uploadFile } from '@/services/firestorage'
import { getUser } from '@/services/user'
import { updateProfileData } from '@/services/user'

export function makeImage(monogram, selectedGradient) {
  if (!selectedGradient) {
    const randomGradient = Math.floor(Math.random() * monogramGradients.length)
    selectedGradient = monogramGradients[randomGradient]
  }

  const canvas = document.createElement('canvas')

  canvas.width = 400
  canvas.height = 400
  canvas.style.background = 'transparent'
  canvas.classList.add('monogram-canvas')
  canvas.setAttribute('style', 'top: -200vh; left: -200vw; position: absolute;')

  document.body.append(canvas)
  const context = canvas.getContext('2d')

  const center = canvas.width / 2
  const radius = canvas.width / 2

  context.arc(center, center, radius, 0, 2 * Math.PI, false)
  const gradient = context.createLinearGradient(
    center,
    0,
    center,
    canvas.height
  )
  gradient.addColorStop(0, selectedGradient.start)
  gradient.addColorStop(1, selectedGradient.end)
  context.fillStyle = gradient
  context.fill()

  context.font = '500 200px SF Compact Rounded'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = 'white'
  const measure = context.measureText(monogram.toUpperCase())
  const halfTextY =
    (measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent) / 2
  const halfTextX =
    (measure.actualBoundingBoxLeft - measure.actualBoundingBoxRight) / 2
  context.fillText(
    monogram.toUpperCase(),
    center + halfTextX,
    center + halfTextY
  )

  const imageURL = canvas.toDataURL('image/png', 1.0).toString()

  canvas.remove()

  return imageURL
}

function getMonogram({ firstname = '', lastname = '' }) {
  return (firstname.charAt(0) + lastname.charAt(0)).toUpperCase()
}

export async function createMonogram({ firstname, lastname }) {
  const monogram = getMonogram({ firstname, lastname })
  const imageURL = makeImage(monogram)
  await setAvatar(imageURL)
}

export async function setAvatar(imageURL) {
  const user = getUser()
  const url = await uploadFile({
    path: 'users/' + user.uid + '/avatar.png',
    file: imageURL,
    format: 'data_url'
  })
  await updateProfileData({ photoURL: url })
  await store.commit('setUserData', { avatar: url })
}
