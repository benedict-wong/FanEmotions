export const sanitizeInput = {
  init() {
    const form = document.getElementById('uploadForm')

    form.addEventListener('submit', async (event) => {
      event.preventDefault() // Prevent default form submission behavior.

      // start checking the file submission for any malicious data.

      const file = document.getElementById('videoUpload').files[0]

      if (!file) {
        console.log('No uploaded video.')
        return
      }

      if (!file.type.startsWith('video/')) {
        console.log('Uploaded file is not a video.')
        return
      }

      const maxSize = 15 * 1024 * 1024 // 15 MB
      if (file.size > maxSize) {
        alert('Your file is too big! Please upload a video smaller than 15 MB.')
        return
      }

      // First layer check: Validate the file based on its bytes

      const isValidVideo = await this.checkBytes(file)

      if (!isValidVideo) {
        console.log('Uploaded video has an invalid signature.')
        return
      }

      // Second layer check: Validate the file based on its MIME type
      const allowedTypes = ['video/mp4', 'video/webm', 'video/x-msvideo', 'video/quicktime']

      if (!allowedTypes.includes(file.type)) {
        return false
      }
    })
  },
  async checkBytes(file) {
    const signatures = {
      mp4: { offset: 4, bytes: [0x66, 0x74, 0x79, 0x70] },
      webm: { offset: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] },
      avi: { offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
    }

    const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer())
    const matches = (offset, signature) => signature.every((byte, index) => bytes[offset + index] === byte)

    return Object.values(signatures).some(({ offset, bytes: signature }) => matches(offset, signature))
  },
}