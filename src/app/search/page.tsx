import Header from '../components/Header'

interface SearchResultsProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const { q } = await searchParams
  const results = await searchDatabase(q)

  async function searchDatabase(query: string | undefined) {
    if (!query) {
      return []
    }

    return []
  }

  return (
    <>
      <Header />

      <main>
        <div id="search-result-info">
          <h1 id="search-result-title"> {q}</h1>
          {/* Search the database for all results with the query and output each video here */}
          <p>{results.length} posts</p>
        </div>
      </main>
    </>
  )
}
