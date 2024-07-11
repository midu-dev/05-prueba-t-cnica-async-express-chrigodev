import net from 'node:net'
import fs from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'

// # EJERCICIO 1
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    const time = process.hrtime(startTime)
    const result = { time, ip }
    callback(null, result)
    client.end()
  })

  client.on('error', (err) => {
    callback(err, null)
    client.end()
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

// # EJERCICIO 2
export function obtenerDatosPromise (callback) {
  return new Promise((resolve, reject) => {
    try {
      resolve({ data: 'datos importantes' })
    } catch (err) {
      reject(err)
    }
  })
}

// # EJERCICIO 3
export function procesarArchivo (callback) {
  const handleError = (message, error) => {
    console.error(message, error.message)
    callback(error)
  }

  const sendResponse = (mensaje) => {
    console.log(mensaje)
    callback()
  }

  const writeFilePA = (error) => {
    if (error) {
      handleError('Error guardando archivo:', error)
    }
    sendResponse('Archivo procesado y guardado con éxito')
  }

  const readFilePA = (error, contenido) => {
    if (error) {
      handleError('Error leyendo archivo:', error)
    }
    const textoProcesado = contenido.toUpperCase()
    fs.writeFile('output.txt', textoProcesado, writeFilePA)
  }

  console.log('Archivo procesado y guardado con éxito')
  fs.readFile('input.txt', 'utf8', readFilePA)
}

export async function procesarArchivoPromise () {
  let contenido = ''
  try {
    contenido = await readFile('input.txt', 'utf-8')
  } catch (error) {
    console.error(error.message)
    throw error
  }
  const textoProcesado = contenido.toUpperCase()

  try {
    await writeFile('output.txt', textoProcesado)
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

// # EJERCICIO 4
export async function leerArchivos () {
  const archivo1 = await readFile('archivo1.txt', 'utf8')
  const archivo2 = await readFile('archivo2.txt', 'utf8')
  const archivo3 = await readFile('archivo3.txt', 'utf8')

  return `${archivo1} ${archivo2} ${archivo3}`
}

// # EJERCICIO 5
export async function delay (timeDelay) {
  // ...
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve({ data: 'Promesa resuelta' })
      }, timeDelay)
    } catch (error) {
      reject(error)
    }
  })
}
