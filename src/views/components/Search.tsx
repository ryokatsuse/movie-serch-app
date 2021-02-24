import React, { useState } from 'react'

type Props = {
  search: (searchValue: any) => void
}

const Search: React.VFC<Props> = (props) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChanges = (event: any) => {
    setSearchValue(event.target.value)
  }
  const resetInputField = () => {
    setSearchValue('')
  }

  const callSerch = (event: any) => {
    event.preventDefault()
    props.search(searchValue)
    resetInputField()
  }

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSerch} type="submit" value="SEARCH" />
    </form>
  )
}

export default Search
