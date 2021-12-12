import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import {useEffect, useState} from "react";
import getSearch from "../../../../helpers/getSearch";
import {supabase} from "../../../../lib/supabaseClient";

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    console.log(searchText)
    if (searchText?.length > 1) {
      getSearch(searchText, user?.id, setSearchResults)
    }
  }, [searchText])

  useEffect(() => {
    console.log("FrontEndSearchResults: ", searchResults)
  }, [searchResults])

  return (
    <>
      <SearchInput searchText={searchText} setSearchText={setSearchText} />
      {searchText?.length > 0 && (
        <div className="fixed top-16 w-full">
          <SearchResults searchResults={searchResults} />
        </div>
      )}
    </>
  )
}