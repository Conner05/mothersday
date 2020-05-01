import { BlobServiceClient } from "@azure/storage-blob"
const blobSasUrl =
  "https://mothersday.blob.core.windows.net/?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-05-01T22:22:00Z&st=2020-05-01T14:22:00Z&spr=https,http&sig=yCU3YeHeoarMARn81M%2BPgaXHfsWQrfGbiJGggdE5H%2BM%3D"
const blobServiceClient = new BlobServiceClient(blobSasUrl)
const containerClient = blobServiceClient.getContainerClient("happymothersday")

async function postFiles(files, name) {
  const getSnakeCaseName = () =>
    name
      .trim()
      .split(" ")
      .reduce((prev, curr) => `${prev}_${curr}`)
  try {
    const promises = []
    for (const file of files) {
      const blockBlobClient = containerClient.getBlockBlobClient(`${getSnakeCaseName()}_${file.name}`)
      promises.push(blockBlobClient.uploadBrowserData(file))
    }
    await Promise.all(promises)
  } catch (error) {
    throw error
  }
}

async function getNamesOfPosters() {
  const getName = (blobName) => blobName.split("_")[0]
  const names = []
  try {
    let iter = containerClient.listBlobsFlat()
    let blobItem = await iter.next()
    while (!blobItem.done) {
      names.unshift(getName(blobItem.value.name))
      blobItem = await iter.next()
    }
    console.log(names)
    return names
  } catch (error) {
    console.log(error)
    return names
  }
}

export { postFiles, getNamesOfPosters }
