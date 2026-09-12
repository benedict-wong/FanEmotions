interface SearchResultsProps {
  searchParams: Promise<{
    query?: string
  }>
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const { query } = await searchParams

  return (
    <main>
      <h1> Search Results for: {query}</h1>
      {/* Search the database for all results with the query and output each video here */}
    </main>
  )
}
