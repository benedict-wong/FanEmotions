'use client'

import Header from '../components/Header/Header'
export default function Upload() {
  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      console.log('No file selected')
      return
    }

    const response = await fetch('/api/mux/upload', {
      method: 'POST',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Mux upload URL error:', error)
      throw new Error('Failed to create upload URL')
    }

    const { uploadURL, uploadId } = await response.json()

    const uploadResponse = await fetch(uploadURL, {
      method: 'PUT',
      body: file,
    })

    if (!uploadResponse.ok) {
      throw new Error('Upload failed')
    }

    console.log('Upload successful, ID:', uploadId)
  }
  return (
    <div id="upload-container">
      <Header />

      <input type="file" accept="video/*" onChange={handleUpload} />
    </div>
  )
}
